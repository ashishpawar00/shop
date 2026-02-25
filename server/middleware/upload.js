// server/middleware/upload.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage for product images
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'laxmi-krashi-kendra/products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }]
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Delete image from Cloudinary
const deleteImage = async (imageUrl) => {
    try {
        if (!imageUrl || !imageUrl.includes('cloudinary')) return;
        // Extract public_id from URL
        const parts = imageUrl.split('/');
        const folderAndFile = parts.slice(parts.indexOf('laxmi-krashi-kendra')).join('/');
        const publicId = folderAndFile.replace(/\.[^.]+$/, '');
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error('Cloudinary delete error:', err.message);
    }
};

module.exports = { upload, deleteImage, cloudinary };
