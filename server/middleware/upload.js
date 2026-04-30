// server/middleware/upload.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function createUpload(folder = 'products') {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: `laxmi-krashi-kendra/${folder}`,
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }]
        }
    });

    return multer({
        storage,
        limits: { fileSize: 10 * 1024 * 1024 } // 10MB
    });
}

const upload = createUpload('products');

// Delete image from Cloudinary
const deleteImage = async (imageUrl) => {
    try {
        if (!imageUrl || !imageUrl.includes('cloudinary')) return;
        // Extract public_id from URL
        const parts = imageUrl.split('/');
        const folderAndFile = parts.slice(parts.indexOf('laxmi-krashi-kendra')).join('/');
        const publicId = folderAndFile.replace(/\.[^.]+$/, '');
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error('Cloudinary delete error:', err.message);
    }
};

module.exports = { upload, createUpload, deleteImage, cloudinary };
