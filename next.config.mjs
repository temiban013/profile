// next.config.mjs (change from .ts to .mjs)
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /* config options here */
  devIndicators: false,
};

export default withContentlayer(nextConfig);
