import type { NextConfig } from "next";
import { build } from "velite";

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: { hooks: { beforeCompile: { tapPromise: (name: string, fn: () => Promise<void>) => void } } }) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = process.env.NODE_ENV === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
