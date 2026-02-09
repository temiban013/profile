// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mario Rafael Ayala | Full-Stack AI Engineer | Ingeniero Full-Stack de IA",
    short_name: "Mario Ayala",
    description:
      "Full-Stack AI Engineer specialized in AI agent development, Next.js, TypeScript, and multi-agent orchestration | Ingeniero Full-Stack de IA especializado en desarrollo de agentes de IA, Next.js, TypeScript y orquestación multi-agente",
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
