// lib/seo-config.ts
export const seoConfig = {
  defaultTitle: "Mario Rafael Ayala | Ingeniero de Software",
  titleTemplate: "%s | Mario Rafael Ayala",
  description:
    "Con más de 20 años de experiencia en el desarrollo de software, especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento.",
  canonical: "https://www.mariorafaelayala.com",
  openGraph: {
    type: "website",
    locale: "es-PR",
    url: "https://www.mariorafaelayala.com",
    siteName: "Mario Rafael Ayala",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mario Rafael Ayala - Ingeniero de Software",
      },
    ],
  },
  twitter: {
    handle: "@MarioAyalaDev",
    site: "@MarioAyalaDev",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "Mario Rafael Ayala",
    },
    {
      name: "application-name",
      content: "Mario Rafael Ayala",
    },
    {
      name: "msapplication-TileColor",
      content: "#000000",
    },
    {
      httpEquiv: "content-type",
      content: "text/html; charset=utf-8",
    },
  ],
};
