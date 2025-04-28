/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  experimental: {
    esmExternals: true,
  },
};

module.exports = nextConfig;
