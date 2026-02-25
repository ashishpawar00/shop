// server/models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  addressHindi: {
    type: String
  },
  location: {
    lat: Number,
    lng: Number
  },
  workingHours: {
    type: String,
    required: true
  },
  workingHoursHindi: {
    type: String
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    youtube: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', ContactSchema);