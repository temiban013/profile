// app/resume/layout.tsx
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.mariorafaelayala.com';

export const metadata: Metadata = {
  title: "Mario Rafael Ayala Resume | Full-Stack AI Engineer | Disney Alumni | Download CV",
  description:
    "Download resume of Mario Rafael Ayala, Full-Stack AI Engineer with 25+ years experience at Disney Parks and Office Depot. Expert in AI agent development, Next.js, TypeScript, Enterprise Architecture. Available for hire.",
  keywords: [
    "mario rafael ayala resume",
    "mario ayala cv",
    "full-stack ai engineer resume",
    "ai agent developer cv",
    "disney software engineer cv",
    "next.js developer resume",
    "typescript expert cv",
    "puerto rico ai engineer resume",
    "download resume",
    "hire ai engineer",
  ],
  alternates: {
    canonical: `${baseUrl}/resume`,
    languages: {
      "en-US": `${baseUrl}/resume`,
      "es-PR": `${baseUrl}/resume`,
    },
  },
  openGraph: {
    title: "Mario Rafael Ayala Resume | Full-Stack AI Engineer | Available for Hire",
    description:
      "Download resume of Mario Rafael Ayala, Full-Stack AI Engineer with 25+ years experience at Disney Parks and Office Depot. Expert in AI agent development, Next.js, TypeScript, Enterprise Architecture.",
    type: "profile",
    url: `${baseUrl}/resume`,
    siteName: "Mario Rafael Ayala - Full-Stack AI Engineer",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/mra-profile.jpg`,
        width: 800,
        height: 800,
        alt: "Mario Rafael Ayala - Full-Stack AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Rafael Ayala Resume | Full-Stack AI Engineer | Hiring",
    description:
      "25+ years enterprise experience including Disney & Office Depot. Download CV. Available for remote work & consulting.",
    images: [`${baseUrl}/mra-profile.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
