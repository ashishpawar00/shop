// server/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleHindi: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentHindi: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['crop-advisory', 'fertilizer-tips', 'pest-control', 'seasonal', 'general'],
    required: true
  },
  cropType: [{
    type: String
  }],
  image: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);