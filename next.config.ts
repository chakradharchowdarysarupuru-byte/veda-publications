import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { unoptimized: true },
  async rewrites() {
    if (process.env.NODE_ENV === "development" && !process.env.VERCEL) {
      return [
        {
          source: "/api/:path",
          destination: "http://localhost:5001/api/:path",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
