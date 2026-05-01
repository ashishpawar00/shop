const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percent', 'flat'],
    required: true,
    default: 'percent'
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  maxUses: {
    type: Number,
    default: 100
  },
  usedCount: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

couponSchema.methods.isValid = function(orderAmount) {
  if (!this.isActive) return { valid: false, reason: 'Coupon is not active' };
  if (this.expiresAt < new Date()) return { valid: false, reason: 'Coupon has expired' };
  if (this.usedCount >= this.maxUses) return { valid: false, reason: 'Coupon usage limit reached' };
  if (orderAmount < this.minOrderAmount) return { valid: false, reason: `Minimum order amount is ₹${this.minOrderAmount}` };
  return { valid: true };
};

couponSchema.methods.calculateDiscount = function(orderAmount) {
  if (this.discountType === 'percent') {
    return Math.round(orderAmount * this.discountValue / 100);
  }
  return Math.min(this.discountValue, orderAmount);
};

module.exports = mongoose.model('Coupon', couponSchema);
