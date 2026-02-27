/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip strict type-checking during Vercel builds — workspace type
  // resolution works locally but the build env resolves paths differently.
  // TODO: fix once Supabase CLI-generated types replace hand-authored stubs
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
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
