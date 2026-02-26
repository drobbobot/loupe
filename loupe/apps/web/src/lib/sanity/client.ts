// Sanity client configuration
// Two clients:
//   client       — server-side, full API token, for Route Handlers + Server Components
//   publicClient — read-only, for any client-side content fetching (if needed)

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

// Server-side client — uses full API token
// Only use in Server Components, Route Handlers, Server Actions
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for server-side to always get fresh content
  token: process.env.SANITY_API_TOKEN,
});

// Public client — no token, read-only published content via CDN
// Safe to use in Client Components for publicly available content
export const sanityPublicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // No token — read-only access to published content
});

// Helper for building Sanity image URLs
export { default as imageUrlBuilder } from "@sanity/image-url";
