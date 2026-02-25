// server/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nameHindi: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  descriptionHindi: {
    type: String
  },
  category: {
    type: String,
    enum: ['seeds', 'fertilizers', 'pesticides', 'hardware'],
    required: true
  },
  subCategory: {
    type: String
  },
  cropType: [{
    type: String,
    enum: ['wheat', 'rice', 'cotton', 'sugarcane', 'vegetables', 'fruits', 'pulses', 'oilseeds', 'all']
  }],
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  usage: {
    type: String
  },
  usageHindi: {
    type: String
  },
  dosage: {
    type: String
  },
  dosageHindi: {
    type: String
  },
  safetyInstructions: {
    type: String
  },
  safetyInstructionsHindi: {
    type: String
  },
  brand: {
    type: String
  },
  price: {
    type: Number
  },
  unit: {
    type: String,
    enum: ['kg', 'g', 'litre', 'ml', 'packet', 'piece']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);