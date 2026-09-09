import type { NextConfig } from 'next';

/**
 * Two large trees live inside this project root and must never be walked by a build,
 * a type-check, a file watcher or Tailwind's source scanner:
 *
 *   Context/   ~37 GB of source media and the 703-frame vision audit. Read-only truth.
 *   archive/   the two failed prototypes, each with its own node_modules.
 *
 * Every exclusion below is either an allow-list or an explicit ignore.
 */
const ISOLATED = ['Context/**/*', 'archive/**/*', 'design/**/*'];

const nextConfig: NextConfig = {
  // A brochure site with pre-encoded media derivatives needs no server at runtime, and a
  // static export deploys anywhere. Media is built ahead of time, not optimised per request.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // The Next image optimiser is unavailable under `output: 'export'`. Every image on this
  // site is a build-time AVIF/WebP derivative served through the media components.
  images: { unoptimized: true },

  // Turbopack is the Next 16 default and its config is no longer under `experimental`.
  // Pinning the root stops it inferring a workspace root above this directory.
  turbopack: { root: import.meta.dirname },

  outputFileTracingRoot: import.meta.dirname,
  outputFileTracingExcludes: { '*': [...ISOLATED, '.git/**/*'] },
};

export default nextConfig;
