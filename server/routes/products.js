// server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, adminOnly } = require('../middleware/auth');
const { upload, deleteImage } = require('../middleware/upload');

// PUBLIC: Get all products (with filters, search, pagination)
router.get('/', async (req, res) => {
  try {
    const { category, crop, search, sortBy, inStock, page = 1, limit = 20 } = req.query;
    const query = {};

    if (category && category !== 'all') query.category = category;
    if (crop && crop !== 'all') query.cropType = crop;
    if (inStock === 'true') query.inStock = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameHindi: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    let sort = { createdAt: -1 };
    if (sortBy === 'price_low') sort = { price: 1 };
    else if (sortBy === 'price_high') sort = { price: -1 };
    else if (sortBy === 'popular') sort = { featured: -1, createdAt: -1 };
    else if (sortBy === 'name') sort = { name: 1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sort).skip(skip).limit(parseInt(limit));

    res.json({
      products,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      totalCount: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUBLIC: Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN: Create product (with image upload)
router.post('/', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const productData = { ...req.body };

    // Parse cropType if sent as string
    if (typeof productData.cropType === 'string') {
      productData.cropType = productData.cropType.split(',').map(s => s.trim()).filter(Boolean);
    }

    // Handle Cloudinary image
    if (req.file) {
      productData.image = req.file.path;
    } else if (!productData.image) {
      productData.image = `https://placehold.co/400x400/16a34a/white?text=${encodeURIComponent(productData.name?.substring(0, 10) || 'Product')}`;
    }

    // Parse numeric fields
    if (productData.price) productData.price = Number(productData.price);
    if (productData.inStock !== undefined) productData.inStock = productData.inStock === 'true' || productData.inStock === true;
    if (productData.featured !== undefined) productData.featured = productData.featured === 'true' || productData.featured === true;

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADMIN: Update product
router.put('/:id', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const productData = { ...req.body, updatedAt: Date.now() };

    if (typeof productData.cropType === 'string') {
      productData.cropType = productData.cropType.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (productData.price) productData.price = Number(productData.price);
    if (productData.inStock !== undefined) productData.inStock = productData.inStock === 'true' || productData.inStock === true;
    if (productData.featured !== undefined) productData.featured = productData.featured === 'true' || productData.featured === true;

    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary
      const oldProduct = await Product.findById(req.params.id);
      if (oldProduct?.image) await deleteImage(oldProduct.image);
      productData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADMIN: Delete product
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    // Delete image from Cloudinary
    if (product.image) await deleteImage(product.image);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN: Product stats
router.get('/admin/stats', auth, adminOnly, async (req, res) => {
  try {
    const total = await Product.countDocuments();
    const inStock = await Product.countDocuments({ inStock: true });
    const outOfStock = await Product.countDocuments({ inStock: false });
    const featured = await Product.countDocuments({ featured: true });

    const byCategory = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({ total, inStock, outOfStock, featured, byCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;