import { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, DM_Sans } from "next/font/google";
import { HeroSection } from "./components/hero-section";
import { ProblemSection } from "./components/problem-section";
import { SolutionBento } from "./components/solution-bento";
import { ServicesGrid } from "./components/services-grid";
import { ComparisonTable } from "./components/comparison-table";
import { PricingCards } from "./components/pricing-cards";
import { ProcessTimeline } from "./components/process-timeline";
import { TestimonialsCarousel } from "./components/testimonials-carousel";
import { FoodIndustrySection } from "./components/food-industry-section";
import { FAQAccordion } from "./components/faq-accordion";
import { CTAForm } from "./components/cta-form";
import { servicesContentES } from "./data/services-content";
import { Analytics } from "./components/analytics";
import { ScrollTracker } from "./components/scroll-tracker";

// Google Fonts for Services Landing Page
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "Desarrollo Web para Negocios en Puerto Rico | Nitaíno Digital",
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
    title: "Tu Negocio Merece Más Que Solo Facebook | Nitaíno Digital",
    description:
      "$4.6 mil millones gastados en comida en PR en 2024. Asegura que los turistas te encuentren.",
    type: "website",
    locale: "es_PR",
    url: "https://www.mariorafaelayala.com/servicios",
  },
  alternates: {
    canonical: "https://www.mariorafaelayala.com/servicios",
    languages: {
      "es-PR": "https://www.mariorafaelayala.com/servicios",
      "en-US": "https://www.mariorafaelayala.com/services",
    },
  },
};

export default function ServicesPage() {
  // Prepare structured data for services
  const servicesSchema = servicesContentES.services.offerings.map((service) => ({
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Nitaíno Digital",
      url: "https://www.mariorafaelayala.com",
      telephone: "+1-407-476-7353",
      areaServed: "PR",
    },
    offers: {
      "@type": "Offer",
      price: service.price.toString(),
      priceCurrency: "USD",
    },
  }));

  // FAQ Schema
  const faqSchema = servicesContentES.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  // Local Business Schema
  const localBusinessSchema = {
    "@type": "LocalBusiness",
    name: "Nitaíno Digital",
    image: "https://www.mariorafaelayala.com/logo.png",
    description:
      "Desarrollo web profesional para negocios en Puerto Rico. Sitios web, e-commerce, menús digitales y optimización de Google Business.",
    url: "https://www.mariorafaelayala.com",
    telephone: "+1-407-476-7353",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PR",
      addressLocality: "Puerto Rico",
    },
    areaServed: "PR",
    priceRange: "$500 - $8000",
  };

  // Pricing Schema
  const pricingSchema = servicesContentES.pricing.tiers.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    price: tier.price.toString(),
    priceCurrency: "USD",
    description: tier.features.join(", "),
  }));

  return (
    <>
      {/* Google Analytics 4 */}
      <Analytics />

      {/* Scroll Depth Tracking */}
      <ScrollTracker />

      <main className={`min-h-screen ${playfair.variable} ${sourceSans.variable} ${dmSans.variable}`}>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Nitaíno Digital",
                  url: "https://www.mariorafaelayala.com",
                  logo: "https://www.mariorafaelayala.com/logo.png",
                  description:
                    "Desarrollo web profesional para negocios en Puerto Rico",
                  areaServed: "PR",
                },
                localBusinessSchema,
                {
                  "@type": "FAQPage",
                  mainEntity: faqSchema,
                },
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Inicio",
                      item: "https://www.mariorafaelayala.com",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Servicios",
                      item: "https://www.mariorafaelayala.com/servicios",
                    },
                  ],
                },
                ...servicesSchema.map((schema, index) => ({
                  ...schema,
                  "@context": undefined,
                  url: `https://www.mariorafaelayala.com/servicios#service-${index}`,
                })),
                {
                  "@type": "AggregateOffer",
                  priceCurrency: "USD",
                  lowPrice: "500",
                  highPrice: "8000",
                  offers: pricingSchema,
                },
              ],
            }),
          }}
        />

        {/* Phase 1 Components */}
        <HeroSection />
        <ProblemSection />
        <SolutionBento />
        <ServicesGrid />

        {/* Phase 2 Components */}
        <ComparisonTable />
        <PricingCards />

        {/* Phase 3 Components */}
        <ProcessTimeline />
        <TestimonialsCarousel />
        <FoodIndustrySection />
        <FAQAccordion />

        {/* CTA Form */}
        <div id="cta-form">
          <CTAForm />
        </div>
      </main>
    </>
  );
}
