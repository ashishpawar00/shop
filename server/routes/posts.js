const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { auth, adminOnly } = require('../middleware/auth');
const { createUpload, deleteImage } = require('../middleware/upload');

const upload = createUpload('posts');

function normalizeList(values) {
  if (Array.isArray(values)) {
    return values.map((value) => String(value).trim()).filter(Boolean);
  }

  if (typeof values === 'string') {
    return values
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return [];
}

function mapPostPayload(body, userId) {
  const title = String(body.title || '').trim();
  const content = String(body.content || '').trim();

  return {
    title,
    titleHindi: String(body.titleHindi || '').trim(),
    content,
    contentHindi: String(body.contentHindi || '').trim(),
    category: body.category,
    cropType: normalizeList(body.cropType),
    image: String(body.image || '').trim(),
    status: body.status || 'draft',
    tags: normalizeList(body.tags),
    author: userId,
  };
}

// Public: get published posts
router.get('/', async (req, res) => {
  try {
    const { category, limit = 12, page = 1 } = req.query;
    const query = { status: 'published' };

    if (category && category !== 'all') {
      query.category = category;
    }

    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
    const safePage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .lean();

    res.json({
      posts,
      total,
      totalPages: Math.ceil(total / safeLimit),
      currentPage: safePage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: list all posts
router.get('/admin/list', auth, adminOnly, async (req, res) => {
  try {
    const { status, category, limit = 100 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 100, 1), 200);
    const posts = await Post.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(safeLimit)
      .lean();

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: post stats
router.get('/admin/stats', auth, adminOnly, async (req, res) => {
  try {
    const total = await Post.countDocuments();
    const published = await Post.countDocuments({ status: 'published' });
    const draft = await Post.countDocuments({ status: 'draft' });
    const archived = await Post.countDocuments({ status: 'archived' });

    const viewsResult = await Post.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]);

    res.json({
      total,
      published,
      draft,
      archived,
      totalViews: viewsResult[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public/Admin: get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name').lean();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.status !== 'published') {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: create post
router.post('/', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const payload = mapPostPayload(req.body, req.user._id);

    if (!payload.title || !payload.content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    if (req.file) {
      payload.image = req.file.path;
    }

    const post = new Post(payload);
    await post.save();

    const createdPost = await Post.findById(post._id).populate('author', 'name email');
    res.status(201).json({ message: 'Post created successfully', post: createdPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: update post
router.put('/:id', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const payload = mapPostPayload(req.body, req.user._id);

    if (!payload.title || !payload.content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.file) {
      if (post.image) {
        await deleteImage(post.image);
      }
      payload.image = req.file.path;
    } else if (!payload.image) {
      payload.image = post.image || '';
    }

    Object.assign(post, payload);
    await post.save();

    const updatedPost = await Post.findById(post._id).populate('author', 'name email');
    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: delete post
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.image) {
      await deleteImage(post.image);
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
