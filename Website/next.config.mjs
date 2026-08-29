/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local optimized assets only in Phase A. Remote patterns can be added in Phase B.
    formats: ["image/avif", "image/webp"],
  },
  // Public site should be crawlable; per-page metadata handles SEO.
};

export default nextConfig;
