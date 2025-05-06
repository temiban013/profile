// next.config.mjs (change from .ts to .mjs)
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "www.mariorafaelayala.com"], // Add any domains for images
  },
};

export default withContentlayer(nextConfig);
