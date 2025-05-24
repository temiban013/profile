"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock } from "lucide-react";
import Image from "next/image";
import { GithubLogo } from "./icons";
import type { Metadata } from "next";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";

interface ProyectoCardProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias: string[];
  urlSitio?: string;
  urlGithub?: string;
}

export const projectsMetadata = (language: "en" | "es"): Metadata => {
  const t = translations[language];
  return {
    title: t.projects,
    description: t.innovativeTech,
    openGraph: {
      title: `${t.projects} | Mario Rafael Ayala`,
      description: t.innovativeTech,
      images: [
        {
          url: "/images/projects-og.jpg",
          width: 1200,
          height: 630,
          alt:
            language === "en"
              ? `Mario Rafael Ayala's ${t.projects}`
              : `${t.projects} de Mario Rafael Ayala`,
        },
      ],
    },
  };
};

const ProyectoCard = ({
  titulo,
  descripcion,
  imagen,
  tecnologias,
  urlSitio,
  urlGithub,
}: ProyectoCardProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50">
      {/* Imagen del Proyecto */}
      <div className="relative h-64 overflow-hidden bg-accent">
        <Image
          src={imagen}
          alt={titulo}
          className="object-cover transition-transform duration-300 group-hover:scale-100"
          width={500}
          height={500}
        />
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
        <p className="text-muted-foreground mb-4">{descripcion}</p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tecnologias.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex gap-3 mt-auto">
          {urlSitio && (
            <Button variant="default" className="rounded-full" asChild>
              <a href={urlSitio} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                {t.viewSite}
              </a>
            </Button>
          )}
          {urlGithub ? (
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              asChild
            >
              <a href={urlGithub} target="_blank" rel="noopener noreferrer">
                <GithubLogo className="mr-1 h-4 w-4" />
                {t.viewCode}
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-full shadow-none opacity-80 cursor-default"
              disabled
            >
              <Lock className="mr-1 h-4 w-4" />
              {t.proprietaryCode}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Proyectos = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const proyectos = {
    es: [
      {
        titulo: "Café Papamín",
        descripcion:
          "Plataforma de comercio electrónico personalizada para productor artesanal de café en Puerto Rico, desarrollada con Next.js 15.3.2 y TypeScript 5.8.3. Implementa integración directa con WhatsApp para procesamiento de pedidos, sistema de gestión de imágenes para storytelling visual de la finca al café, y optimizaciones de rendimiento específicas para el mercado móvil puertorriqueño. Representa una alternativa 95% más económica comparada con plataformas tradicionales de e-commerce.",
        imagen: "/papamin-preview.png",
        tecnologias: [
          "Next.js 15.3.2 (App Router)",
          "TypeScript 5.8.3",
          "Tailwind CSS 4.1.7",
          "React 19.1.0",
          "WhatsApp Integration",
          "Comercio Electrónico",
          "SEO Optimization",
          "Performance Optimization",
          "Mobile-First Design",
        ],
        urlSitio: "https://www.cafepapaminllc.com",
        // urlGithub removed for proprietary code
      },
      {
        titulo: "Yukayeke Playa",
        descripcion:
          "Plataforma web bilingüe (español/inglés) con detección automática de idioma para hospedería turística en Añasco, desarrollada con Next.js 14, TypeScript y arquitectura app router. Implementa estrategias de SEO optimizadas, sistema de internacionalización basado en rutas dinámicas, y diseño responsivo adaptado específicamente para dispositivos móviles utilizando CSS modular.",
        imagen: "/yukayeke-preview.png",
        tecnologias: [
          "Next.js 14 (App Router)",
          "TypeScript",
          "Tailwind CSS",
          "i18n",
          "Vercel",
          "SEO",
          "SSR",
          "SSG",
          "ImageKit",
          "Cloudinary",
        ],
        urlSitio: "https://yukayekeplaya.com",
        // urlGithub removed for proprietary code
      },
      {
        titulo: "Jíbaro Eats",
        descripcion:
          "Sitio web de portafolio visual para un fotógrafo profesional especializado en gastronomía y diversas temáticas, que presenta imágenes de alta calidad y producciones audiovisuales en un diseño elegante y minimalista, desarrollado con Next.js App Router, optimizado con lazy-loading, imágenes adaptativas de Cloudinary y una experiencia de navegación fluida entre colecciones.",
        imagen: "/jibaroeats-preview.png",
        tecnologias: [
          "Next.js 13+ (App Router)",
          "TypeScript",
          "Tailwind CSS",
          "CSR",
          "SSR",
          "SSG",
          "Cloudinary",
          "Vercel",
        ],
        urlSitio: "https://jibaroeats.com",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/${process.env.NEXT_PUBLIC_JIBAROEATS_REPO}`,
      },
    ],
    en: [
      {
        titulo: "Café Papamín",
        descripcion:
          "Custom e-commerce platform for artisanal coffee producer in Puerto Rico, developed with Next.js 15.3.2 and TypeScript 5.8.3. Implements direct WhatsApp integration for order processing, image management system for visual farm-to-cup storytelling, and performance optimizations specifically for the Puerto Rican mobile market. Represents a 95% cost reduction compared to traditional e-commerce platforms.",
        imagen: "/papamin-preview.png",
        tecnologias: [
          "Next.js 15.3.2 (App Router)",
          "TypeScript 5.8.3",
          "Tailwind CSS 4.1.7",
          "React 19.1.0",
          "WhatsApp Integration",
          "E-commerce",
          "SEO Optimization",
          "Performance Optimization",
          "Mobile-First Design",
        ],
        urlSitio: "https://www.cafepapaminllc.com",
        // urlGithub removed for proprietary code
      },
      {
        titulo: "Yukayeke Playa",
        descripcion:
          "Bilingual web platform (Spanish/English) with automatic language detection for tourist accommodation in Añasco, developed with Next.js 14, TypeScript, and app router architecture. Implements optimized SEO strategies, a dynamic route-based internationalization system, and responsive design specifically adapted for mobile devices using modular CSS.",
        imagen: "/yukayeke-preview.png",
        tecnologias: [
          "Next.js 14 (App Router)",
          "TypeScript",
          "Tailwind CSS",
          "i18n",
          "Vercel",
          "SEO",
          "SSR",
          "SSG",
          "ImageKit",
          "Cloudinary",
        ],
        urlSitio: "https://yukayekeplaya.com",
      },
      {
        titulo: "Jíbaro Eats",
        descripcion:
          "Visual portfolio website for a professional photographer specializing in gastronomy and various themes, showcasing high-quality images and audiovisual productions in an elegant and minimalist design, developed with Next.js App Router, optimized with lazy-loading, adaptive Cloudinary images, and a fluid navigation experience between collections.",
        imagen: "/jibaroeats-preview.png",
        tecnologias: [
          "Next.js 13+ (App Router)",
          "TypeScript",
          "Tailwind CSS",
          "CSR",
          "SSR",
          "SSG",
          "Cloudinary",
          "Vercel",
        ],
        urlSitio: "https://jibaroeats.com",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/${process.env.NEXT_PUBLIC_JIBAROEATS_REPO}`,
      },
    ],
  };

  const currentLanguageData = proyectos[language];

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {t.projects}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t.featuredWork}
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            {t.innovativeTech}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentLanguageData.map((proyecto) => (
            <ProyectoCard key={proyecto.titulo} {...proyecto} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
