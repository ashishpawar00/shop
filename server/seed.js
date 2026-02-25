// server/seed.js — Run: node seed.js
// Creates the admin user in MongoDB Atlas
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // Check if admin exists
        const existing = await User.findOne({ email: 'admin@laxmikrashi.com' });
        if (existing) {
            console.log('⚠️ Admin already exists:', existing.email);
            process.exit(0);
        }

        // Create admin user
        const admin = new User({
            name: 'Ashish (Admin)',
            email: 'admin@laxmikrashi.com',
            phone: '9977938192',
            password: 'admin123',
            role: 'admin',
            isActive: true
        });

        await admin.save();
        console.log('✅ Admin user created:');
        console.log('   Email: admin@laxmikrashi.com');
        console.log('   Password: admin123');
        console.log('   Role: admin');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        process.exit(1);
    }
}

seed();
