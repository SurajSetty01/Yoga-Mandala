import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Library plates are public-domain scans served by the Internet Archive.
    // Local files live in public/assets — see public/assets/CREDITS.md.
    remotePatterns: [{ protocol: "https", hostname: "archive.org" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
