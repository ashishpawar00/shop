// server/routes/orders.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Counter = require('../models/Counter');
const { auth, adminOnly } = require('../middleware/auth');

const MAX_LINE_QTY = 99;

async function getNextOrderNumber() {
    await Counter.updateOne(
        { _id: 'orderNumber' },
        { $setOnInsert: { seq: 1000 } },
        { upsert: true }
    );
    const doc = await Counter.findOneAndUpdate(
        { _id: 'orderNumber' },
        { $inc: { seq: 1 } },
        { new: true }
    );
    return `LKK-${String(doc.seq).padStart(6, '0')}`;
}

// USER: Create order
router.post('/', auth, async (req, res) => {
    try {
        const { items, deliveryAddress, paymentMethod, notes } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Order must have at least one item' });
        }
        if (!deliveryAddress || !deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.pincode) {
            return res.status(400).json({ message: 'Complete delivery address is required' });
        }
        if (!['COD', 'UPI'].includes(paymentMethod)) {
            return res.status(400).json({ message: 'Payment method must be COD or UPI' });
        }

        const byProduct = new Map();
        for (const raw of items) {
            const pid = raw.product || raw.productId || raw._id;
            if (!pid || !mongoose.Types.ObjectId.isValid(String(pid))) {
                return res.status(400).json({ message: 'Each item must include a valid product id' });
            }
            const qty = Math.min(Math.max(parseInt(raw.quantity, 10) || 0, 1), MAX_LINE_QTY);
            const key = String(pid);
            byProduct.set(key, (byProduct.get(key) || 0) + qty);
        }

        const ids = [...byProduct.keys()];
        const products = await Product.find({ _id: { $in: ids } });
        const pmap = new Map(products.map((p) => [String(p._id), p]));
        if (products.length !== ids.length) {
            return res.status(400).json({ message: 'One or more products were not found' });
        }

        const lineItems = [];
        for (const [idStr, qty] of byProduct) {
            const product = pmap.get(idStr);
            if (!product.inStock) {
                return res.status(400).json({ message: `Out of stock: ${product.name}` });
            }
            const unitPrice = Number(product.price);
            if (Number.isNaN(unitPrice) || unitPrice < 0) {
                return res.status(400).json({ message: `Invalid price for product: ${product.name}` });
            }
            lineItems.push({
                product: product._id,
                name: product.name,
                nameHindi: product.nameHindi || '',
                price: unitPrice,
                quantity: qty,
                image: product.image || '',
                category: product.category || ''
            });
        }

        const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryCharge = subtotal >= 500 ? 0 : 50;
        const totalAmount = subtotal + deliveryCharge;
        const orderNumber = await getNextOrderNumber();

        const order = new Order({
            orderNumber,
            user: req.user._id,
            customerName: req.user.name,
            customerPhone: req.user.phone,
            customerEmail: req.user.email,
            deliveryAddress,
            items: lineItems,
            subtotal,
            deliveryCharge,
            totalAmount,
            paymentMethod,
            paymentStatus: 'Pending',
            orderStatus: 'Pending',
            notes: notes || ''
        });

        await order.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order: {
                orderNumber: order.orderNumber,
                totalAmount: order.totalAmount,
                paymentMethod: order.paymentMethod,
                paymentStatus: order.paymentStatus,
                orderStatus: order.orderStatus,
                _id: order._id
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// USER: Get my orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// USER: Update UPI payment status
router.put('/:id/payment', auth, async (req, res) => {
    try {
        const { transactionId, paymentStatus } = req.body;
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id });

        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.paymentMethod !== 'UPI') return res.status(400).json({ message: 'Only UPI orders can update payment' });

        order.transactionId = transactionId || '';
        order.paymentStatus = paymentStatus === 'Paid' ? 'Paid' : 'Failed';
        if (paymentStatus === 'Paid') order.orderStatus = 'Confirmed';
        await order.save();

        res.json({ message: 'Payment updated', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ADMIN: Get all orders
router.get('/', auth, adminOnly, async (req, res) => {
    try {
        const { status, payment, paymentStatus, page = 1, limit = 20 } = req.query;
        const query = {};

        if (status && status !== 'all') query.orderStatus = status;
        if (payment && payment !== 'all') query.paymentMethod = payment;
        if (paymentStatus && paymentStatus !== 'all') query.paymentStatus = paymentStatus;

        const skip = (page - 1) * limit;
        const total = await Order.countDocuments(query);
        const orders = await Order.find(query)
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            orders,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ADMIN: Get order stats
router.get('/stats', auth, adminOnly, async (req, res) => {
    try {
        const total = await Order.countDocuments();
        const pending = await Order.countDocuments({ orderStatus: 'Pending' });
        const confirmed = await Order.countDocuments({ orderStatus: 'Confirmed' });
        const shipped = await Order.countDocuments({ orderStatus: 'Shipped' });
        const delivered = await Order.countDocuments({ orderStatus: 'Delivered' });
        const cancelled = await Order.countDocuments({ orderStatus: 'Cancelled' });

        const codOrders = await Order.countDocuments({ paymentMethod: 'COD' });
        const upiOrders = await Order.countDocuments({ paymentMethod: 'UPI' });
        const paidOrders = await Order.countDocuments({ paymentStatus: 'Paid' });
        const pendingPayments = await Order.countDocuments({ paymentStatus: 'Pending' });
        const failedPayments = await Order.countDocuments({ paymentStatus: 'Failed' });

        // Total revenue
        const revenueResult = await Order.aggregate([
            { $match: { paymentStatus: 'Paid' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;

        res.json({
            total, pending, confirmed, shipped, delivered, cancelled,
            codOrders, upiOrders, paidOrders, pendingPayments, failedPayments,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ADMIN: Update order status
router.put('/:id/status', auth, adminOnly, async (req, res) => {
    try {
        const { orderStatus, paymentStatus, adminNotes } = req.body;
        const update = {};

        if (orderStatus) update.orderStatus = orderStatus;
        if (paymentStatus) update.paymentStatus = paymentStatus;
        if (adminNotes !== undefined) update.adminNotes = adminNotes;

        // Auto-update payment for COD when delivered
        if (orderStatus === 'Delivered') update.paymentStatus = 'Paid';

        const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true })
            .populate('user', 'name email phone');

        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ADMIN: Delete order
router.delete('/:id', auth, adminOnly, async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
