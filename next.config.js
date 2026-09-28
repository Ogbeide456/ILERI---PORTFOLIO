/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable Turbopack — Next.js's Rust-based bundler.
  // It's significantly faster than Webpack, especially on slow/indexed filesystems.
  // This replaces the old "experimental.turbo" flag (stable in Next.js 15+).
  turbopack: {},

  // Reduce the amount of work done during dev by skipping type-checking
  // in the build pipeline (rely on your editor/IDE for type errors instead).
  typescript: {
    // Type-checking runs separately in your editor; don't block dev server on it.
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
