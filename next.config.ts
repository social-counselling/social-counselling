import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.socialcounselling.co.in",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
