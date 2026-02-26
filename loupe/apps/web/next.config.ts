import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
