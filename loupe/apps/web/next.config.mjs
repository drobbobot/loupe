/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Sanity CDN
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Transpile shared packages from the monorepo
  transpilePackages: ["@loupe/types", "@loupe/ui"],
};

export default nextConfig;
