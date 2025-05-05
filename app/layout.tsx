import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/lib/contexts/language-context";

const geistSans = Geist({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.mariorafaelayala.com/"),
  title: "Mario Rafael Ayala | Ingeniero de Software",
  keywords:
    "desarrollador, full stack, ingeniero de software, ingeniero de sistemas, ingeniero informático, ingeniero en computación, ingeniero en software, ingeniero de software full stack, ingeniero de software backend, ingeniero de software frontend, ingeniero de software full stack, nextjs, typescript, javascript, react, nodejs, .net core, c#, sql server, mysql, mongodb, firebase, ingeniero de software en la nube, vercel",
  description:
    "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
  alternates: {
    canonical: "https://profile-black-gamma.vercel.app/",
  },
  openGraph: {
    siteName: "Mario Rafael Ayala",
    url: "https://profile-black-gamma.vercel.app/",
    type: "website",
    title: "Mario Rafael Ayala | Ingeniero de Software",
    description:
      "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
    locale: "es-PR",
    images: "https://profile-black-gamma.vercel.app/mra-profile.jpg",
  },
  icons: {
    icon: "/favicon.ico",
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
    images: "https://profile-black-gamma.vercel.app/mra-profile.jpg",
    description:
      "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas. Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core, siempre manteniendo un enfoque pragmático orientado a resultados.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.className} antialiased`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
