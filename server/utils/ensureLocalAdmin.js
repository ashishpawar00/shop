const User = require('../models/User');

function shouldSeedAdmin() {
  if (process.env.AUTO_SEED_ADMIN === 'true') {
    return true;
  }

  if (process.env.AUTO_SEED_ADMIN === 'false') {
    return false;
  }

  return process.env.NODE_ENV !== 'production';
}

async function ensureLocalAdminUser() {
  if (!shouldSeedAdmin()) {
    return;
  }

  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    return;
  }

  const admin = new User({
    name: process.env.ADMIN_NAME || 'Ashish Pawar',
    email: (process.env.ADMIN_EMAIL || 'admin@laxmikrashi.com').toLowerCase(),
    phone: process.env.ADMIN_PHONE || '9977938192',
    password: process.env.ADMIN_PASSWORD || 'Admin@2025',
    role: 'admin',
    isActive: true,
  });

  await admin.save();

  console.log('[bootstrap] Local admin account created.');
  console.log(`[bootstrap] Email: ${admin.email}`);
  console.log('[bootstrap] Password: use ADMIN_PASSWORD or the local default password.');
}

module.exports = { ensureLocalAdminUser };
