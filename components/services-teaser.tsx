"use client";

import Link from "next/link";
import { Bot, Globe, Clapperboard, GraduationCap } from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";

const pillars = {
  en: [
    {
      icon: Bot,
      title: "AI Engineering",
      description:
        "AI-powered features and agentic development—from vision-based validators to orchestrated multi-agent delivery.",
    },
    {
      icon: Globe,
      title: "Web Development",
      description:
        "High-performance platforms, e-commerce, and SaaS built with Next.js, TypeScript, and enterprise discipline.",
    },
    {
      icon: Clapperboard,
      title: "Video Production",
      description:
        "AI-assisted video pipeline: transcription, researched graphics, and programmatic editing—from raw footage to published film.",
    },
    {
      icon: GraduationCap,
      title: "Training & Education",
      description:
        "Corporate accessibility training and community digital-literacy programs, delivered bilingually.",
    },
  ],
  es: [
    {
      icon: Bot,
      title: "Ingeniería de IA",
      description:
        "Funciones impulsadas por IA y desarrollo agéntico—desde validadores por visión hasta entregas orquestadas multi-agente.",
    },
    {
      icon: Globe,
      title: "Desarrollo Web",
      description:
        "Plataformas de alto rendimiento, e-commerce y SaaS construidos con Next.js, TypeScript y disciplina empresarial.",
    },
    {
      icon: Clapperboard,
      title: "Producción de Video",
      description:
        "Pipeline de video asistido por IA: transcripción, gráficos investigados y edición programática—de material crudo a película publicada.",
    },
    {
      icon: GraduationCap,
      title: "Adiestramiento y Educación",
      description:
        "Adiestramiento corporativo en accesibilidad y programas comunitarios de alfabetización digital, en español e inglés.",
    },
  ],
} as const;

const ServicesTeaser = () => {
  const { language } = useLanguage();
  const items = pillars[language];

  return (
    <section id="que-hacemos" className="px-6 scroll-mt-24">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">
          {language === "en" ? "What We Do" : "Lo Que Hacemos"}
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Four pillars, one studio—engineering, web, video, and training under the Nitaíno Digital roof."
            : "Cuatro pilares, un estudio—ingeniería, web, video y adiestramiento bajo el techo de Nitaíno Digital."}
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-muted/30 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-md"
            >
              <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={language === "en" ? "/services" : "/servicios"}
            className="text-primary font-medium hover:underline"
          >
            {language === "en"
              ? "Explore services and pricing →"
              : "Explora servicios y precios →"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;
