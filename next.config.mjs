// Plain .mjs config (not .ts) on purpose: some hosts run an old glibc where
// Next's native SWC binary can't load, and the TypeScript-config compile step
// then fails ("Cannot find module ...next.config"). A .mjs config is loaded
// directly by Node with no compile step, which avoids that failure entirely.

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Library plates are public-domain scans served by the Internet Archive.
    // Local files live in public/assets — see public/assets/CREDITS.md.
    remotePatterns: [{ protocol: "https", hostname: "archive.org" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
