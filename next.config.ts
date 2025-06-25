import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other config options if any

  env: {
    // This makes process.env.ASSEMBLYAI_API_KEY available in the app code
    ASSEMBLYAI_API_KEY: process.env.ASSEMBLYAI_API_KEY,
  },
};

export default nextConfig;
