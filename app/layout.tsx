// app/layout.tsx
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/lib/contexts/language-context";
import { Suspense } from "react";
import LanguageUrlHandler from "@/components/language-url-handler";
import { generateMetadata } from "@/lib/metadata-i18n";

const geistSans = Geist({
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Generate metadata based on the default language (Spanish)
// We'll update this in the client-side
export const metadata = generateMetadata("es");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
        <LanguageProvider>
          <Suspense fallback={null}>
            <LanguageUrlHandler />
          </Suspense>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
