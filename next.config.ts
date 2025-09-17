import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  },
}

export default nextConfig