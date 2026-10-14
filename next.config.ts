import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_URL;
const isProd = process.env.NODE_ENV === "production";
const basePath = isVercel
  ? ""
  : (process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? "/Premium-dental" : ""));

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
