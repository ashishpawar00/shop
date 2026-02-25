// server/routes/enquiries.js
const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { auth, adminOnly } = require('../middleware/auth');

// Submit enquiry (public)
router.post('/', async (req, res) => {
  try {
    const enquiry = new Enquiry({
      ...req.body,
      source: 'website'
    });
    
    await enquiry.save();
    
    // Here you can add WhatsApp notification logic
    
    res.status(201).json({ 
      message: 'Enquiry submitted successfully',
      enquiry 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all enquiries (admin)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    const total = await Enquiry.countDocuments(query);
    
    const enquiries = await Enquiry.find(query)
      .populate('product', 'name image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    res.json({
      enquiries,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update enquiry status (admin)
router.put('/:id/status', auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add note to enquiry (admin)
router.post('/:id/notes', auth, adminOnly, async (req, res) => {
  try {
    const { text } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    
    enquiry.notes.push({
      text,
      createdBy: req.user._id
    });
    
    await enquiry.save();
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get enquiry stats (admin)
router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const total = await Enquiry.countDocuments();
    const pending = await Enquiry.countDocuments({ status: 'pending' });
    const contacted = await Enquiry.countDocuments({ status: 'contacted' });
    const resolved = await Enquiry.countDocuments({ status: 'resolved' });
    
    res.json({
      total,
      pending,
      contacted,
      resolved
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;