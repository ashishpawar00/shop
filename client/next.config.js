/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_NUMBER: '919977938192',
    NEXT_PUBLIC_PHONE_NUMBER: '9977938192',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
