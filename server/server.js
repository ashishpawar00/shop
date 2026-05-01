// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const configuredOrigins = String(process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set(configuredOrigins);
const localOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i;

// Import routes
const authRoutes = require('./routes/auth');
const cropDoctorRoutes = require('./routes/cropDoctor');
const enquiryRoutes = require('./routes/enquiries');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const postRoutes = require('./routes/posts');
const couponRoutes = require('./routes/coupons');
const { ensureLocalAdminUser } = require('./utils/ensureLocalAdmin');

const app = express();

// Security
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// Trust proxy (required for Render, Railway, etc.)
app.set('trust proxy', 1);

// Rate limiting
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { message: 'Too many requests, please try again later.' }
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin) || localOriginPattern.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true
}));

// Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => { console.error('❌ MongoDB error:', err.message); process.exit(1); });

mongoose.connection.once('connected', () => {
  ensureLocalAdminUser().catch((error) => {
    console.error('Admin bootstrap error:', error.message);
  });
});

mongoose.connection.asPromise().then(() => {
  return ensureLocalAdminUser().catch((error) => {
    console.error('Admin bootstrap error:', error.message);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crop-doctor', cropDoctorRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/coupons', couponRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
});
