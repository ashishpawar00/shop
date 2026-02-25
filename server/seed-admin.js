// server/seed-admin.js — Create admin user in MongoDB
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

async function seedAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existing = await User.findOne({ role: 'admin' });
        if (existing) {
            console.log('⚠️ Admin already exists:');
            console.log(`   Email: ${existing.email}`);
            console.log(`   Name: ${existing.name}`);
            console.log('   If you want to reset, delete the user first.');
            process.exit(0);
        }

        // Create admin user
        const admin = new User({
            name: 'Ashish Pawar',
            email: 'admin@laxmikrashi.com',
            phone: '9977938192',
            password: 'Admin@2025',
            role: 'admin',
            isActive: true
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('   Email: admin@laxmikrashi.com');
        console.log('   Password: Admin@2025');
        console.log('   ⚠️ CHANGE THIS PASSWORD after first login!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

seedAdmin();
