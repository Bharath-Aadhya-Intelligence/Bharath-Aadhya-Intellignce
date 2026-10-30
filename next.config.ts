import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Bharath-Aadhya-Intellignce",
  // Dev only: lets the page load its JavaScript when opened via these hosts.
  // Without it, Next blocks the JS and the header/hero never hydrate.
  allowedDevOrigins: ["0.0.0.0", "127.0.0.1"],
};

export default nextConfig;
