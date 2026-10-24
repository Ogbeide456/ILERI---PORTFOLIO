/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Keep Turbopack's file watcher scoped to this app instead of the drive root.
  turbopack: {
    root: __dirname,
  },

  // Reduce the amount of work done during dev by skipping type-checking
  // in the build pipeline (rely on your editor/IDE for type errors instead).
  typescript: {
    // Type-checking runs separately in your editor; don't block dev server on it.
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
