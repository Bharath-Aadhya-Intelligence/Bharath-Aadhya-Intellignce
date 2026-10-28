import type { NextConfig } from "next";
import path from "path";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // Disables the floating Next.js 'N' dev indicator badge
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? "/Bharath-Aadhya-Intellignce" : "",
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
