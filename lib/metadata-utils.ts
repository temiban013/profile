// lib/metadata-utils.ts
import type { Metadata } from "next";

interface PageMetadataParams {
  title: string;
  description: string;
  path: string;
  ogImagePath?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImagePath = "/og-image.jpg",
}: PageMetadataParams): Metadata {
  const url = `https://www.mariorafaelayala.com${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImagePath],
    },
  };
}
