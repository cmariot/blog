import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
};

const isProd = process.env.ENV === 'production';

export default nextConfig;
