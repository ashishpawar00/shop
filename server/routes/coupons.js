const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// POST /api/coupons/validate — Apply a coupon code
router.post('/validate', async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code || !orderAmount) {
      return res.status(400).json({ message: 'Coupon code and order amount are required.' });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code.' });
    }

    const validation = coupon.isValid(orderAmount);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.reason });
    }

    const discount = coupon.calculateDiscount(orderAmount);
    return res.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount,
      finalAmount: orderAmount - discount,
      description: coupon.description
    });
  } catch (error) {
    console.error('Coupon validation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/coupons/use — Increment usage count after order placed
router.post('/use', async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { usedCount: 1 } },
      { new: true }
    );
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    return res.json({ message: 'Coupon used', remaining: coupon.maxUses - coupon.usedCount });
  } catch (error) {
    console.error('Coupon use error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/coupons — Admin: list all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return res.json(coupons);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/coupons — Admin: create a coupon
router.post('/', async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    return res.status(201).json(coupon);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
