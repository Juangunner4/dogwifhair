/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable static HTML export
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
