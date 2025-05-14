import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mariorafaelayala.com/"),
  title: {
    default: "Mario Rafael Ayala | Ingeniero de Software",
    template: "%s | Mario Rafael Ayala",
  },
  keywords: [
    "mario rafael ayala, feliche, humacao, puerto rico, desarrollador, full stack, ingeniero de software, ingeniero de sistemas, ingeniero informático, ingeniero en computación, ingeniero en software, ingeniero de software full stack, ingeniero de software backend, ingeniero de software frontend, ingeniero de software full stack, nextjs, typescript, javascript, react, nodejs, .net core, c#, sql server, mysql, mongodb, firebase, ingeniero de software en la nube, vercel",
  ],
  description:
    "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
  authors: [
    { name: "Mario R. Ayala", url: "https://www.mariorafaelayala.com" },
  ],
  creator: "Mario R. Ayala",
  publisher: "Mario R. Ayala",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://www.mariorafaelayala.com/",
  },
  openGraph: {
    siteName: "Mario Rafael Ayala",
    url: "https://www.mariorafaelayala.com/",
    type: "website",
    title: "Mario Rafael Ayala | Ingeniero de Software",
    description:
      "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
    locale: "es-PR",
    images: "https://www.mariorafaelayala.com/mra-profile.jpg",
  },
  icons: {
    icon: [
      {
        url: "https://www.mariorafaelayala.com/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "https://www.mariorafaelayala.com/mra-logo-icon.png",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "https://www.mariorafaelayala.com/mra-logo-icon.png",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Rafael Ayala | Ingeniero de Software",
    images: "https://www.mariorafaelayala.com/mra-profile.jpg",
    description:
      "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
  },
  verification: {
    google:
      "google-site-verification=2uRJuyTYErHg2stXKELBTwZif3Kc7FlbMjyNDwwNwnQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
