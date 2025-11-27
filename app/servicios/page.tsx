import { Metadata } from "next";
import { HeroSection } from "./components/hero-section";
import { ProblemSection } from "./components/problem-section";
import { ServicesGrid } from "./components/services-grid";
import { CTAForm } from "./components/cta-form";

export const metadata: Metadata = {
  title: "Desarrollo Web para Negocios en Puerto Rico | Mario Ayala Dev",
  description:
    "Sitios web profesionales para restaurantes y negocios en Puerto Rico. 7.5M turistas buscan en Google. ¿Pueden encontrarte? Consulta gratis.",
  keywords: [
    "desarrollo web Puerto Rico",
    "sitio web restaurante",
    "diseño web PR",
    "páginas web para negocios",
    "e-commerce Puerto Rico",
    "menú digital",
    "Google Business",
  ],
  openGraph: {
    title: "Tu Negocio Merece Más Que Solo Facebook | Mario Ayala Dev",
    description:
      "$4.6 mil millones gastados en comida en PR en 2024. Asegura que los turistas te encuentren.",
    type: "website",
    locale: "es_PR",
    url: "https://marioayala.dev/servicios",
  },
  alternates: {
    canonical: "https://marioayala.dev/servicios",
    languages: {
      "es-PR": "https://marioayala.dev/servicios",
      "en-US": "https://marioayala.dev/services",
    },
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Phase 1 Components */}
      <HeroSection />
      <ProblemSection />
      <ServicesGrid />
      <CTAForm />

      {/* Phase 2-3 components will be added here */}
    </main>
  );
}
