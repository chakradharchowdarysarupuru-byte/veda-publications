import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// Let phones and laptops on the local network use the dev server
// (Next blocks dev-only resources from non-localhost origins by default).
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { unoptimized: true },
  allowedDevOrigins: lanAddresses,
  async rewrites() {
    if (process.env.NODE_ENV === "development" && !process.env.VERCEL) {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:5001/api/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
