// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nitaíno Digital — AI Engineering, Web & Video | Mario Rafael Ayala",
    short_name: "Nitaíno",
    description:
      "Puerto Rico–based studio for AI engineering, web development, video production, and training & education | Estudio con base en Puerto Rico de ingeniería de IA, desarrollo web, producción de video y adiestramiento",
    start_url: "/",
    display: "standalone",
    background_color: "#EFF6FA",
    theme_color: "#1E3A8A",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
