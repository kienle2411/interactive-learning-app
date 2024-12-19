import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
        {
        source: "/documentation/:path*",
        destination: "http://localhost:3001/documentation/:path*",
},
    ];
  },
};

export default nextConfig;
