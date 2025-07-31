// app/page.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SpeedInsights } from "@vercel/speed-insights/next";
import About from "@/components/about";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import StructuredData from "@/components/structured-data";

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mario Rafael Ayala | Ingeniero de Software",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    description:
      "Portfolio profesional de Mario Rafael Ayala, Ingeniero de Software Senior",
    author: {
      "@type": "Person",
      name: "Mario Rafael Ayala",
      jobTitle: "Ingeniero de Software Senior",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    inLanguage: "es",
  };

  return (
    <>
      <StructuredData data={websiteSchema} />

      <div className="space-y-10 sm:space-y-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
