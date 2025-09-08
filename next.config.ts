import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ecommerce.routemisr.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
      },
    ],
  },
};

export default nextConfig;
