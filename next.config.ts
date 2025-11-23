import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  transpilePackages: ['@google/genai'],
  serverExternalPackages: ['pino', 'pino-pretty', 'thread-stream', '@hashgraph/sdk'],
};

export default nextConfig;
