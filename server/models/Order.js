// server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // Order number (auto-generated)
    orderNumber: {
        type: String,
        unique: true
    },

    // Customer info (stored with order for history)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customerName: {
        type: String,
        required: [true, 'Customer name is required']
    },
    customerPhone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    customerEmail: {
        type: String
    },

    // Delivery address
    deliveryAddress: {
        street: { type: String, required: true },
        village: { type: String },
        city: { type: String, required: true },
        district: { type: String },
        state: { type: String, default: 'Madhya Pradesh' },
        pincode: { type: String, required: true }
    },

    // Products in this order
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: { type: String, required: true },
        nameHindi: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String },
        category: { type: String }
    }],

    // Pricing
    subtotal: {
        type: Number,
        required: true
    },
    deliveryCharge: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },

    // Payment
    paymentMethod: {
        type: String,
        enum: ['COD', 'UPI'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    transactionId: {
        type: String,
        default: ''
    },

    // Order status
    orderStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

    // Notes
    notes: {
        type: String,
        default: ''
    },

    // Admin notes
    adminNotes: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Auto-generate order number before save
OrderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `LKK-${String(count + 1001).padStart(6, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Order', OrderSchema);
