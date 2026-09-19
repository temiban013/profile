// app/conecta/page.tsx
import { Metadata } from "next";
import ConectaClient from "./conecta-client";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.nitainodigital.com";

// Utility page for QR/NFC scans — never indexed, but crawlable so link
// checkers and the vCard download itself work normally. Not listed in
// app/sitemap.ts or app/llms.txt/route.ts (decision, 2026-09-18).
export const metadata: Metadata = {
  title: "Contacto — Mario Ayala | Nitaíno Digital",
  description:
    "Guarda el contacto de Mario Ayala (Nitaíno Digital): vCard, WhatsApp, llamada, correo, Calendly y LinkedIn desde un solo enlace.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${baseUrl}/conecta`,
  },
  openGraph: {
    title: "Mario Ayala — Nitaíno Digital",
    description:
      "Guarda mi contacto, escríbeme por WhatsApp o agenda una llamada.",
    type: "profile",
    locale: "es_PR",
    url: `${baseUrl}/conecta`,
    images: [
      {
        url: `${baseUrl}/og-nitaino.png`,
        width: 1200,
        height: 630,
        alt: "Nitaíno Digital",
      },
    ],
  },
};

export default function ConectaPage() {
  return <ConectaClient />;
}
