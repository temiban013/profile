// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mario Rafael Ayala | Software Engineer | Ingeniero de Software",
    short_name: "Mario Ayala",
    description:
      "Senior Software Engineer specialized in Next.js, TypeScript, React, and .NET Core | Ingeniero de Software Senior especializado en Next.js, TypeScript, React, y .NET Core",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
