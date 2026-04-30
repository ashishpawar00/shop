// server/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleHindi: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  contentHindi: {
    type: String,
    default: ''
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
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
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

PostSchema.pre('save', function updatePostState(next) {
  this.updatedAt = new Date();
  this.isPublished = this.status === 'published';
  next();
});

module.exports = mongoose.model('Post', PostSchema);
