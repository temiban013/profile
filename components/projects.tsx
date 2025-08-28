"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Code2,
  Globe2,
  Filter,
  Star,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import { useState, useEffect, useMemo } from "react";
import type { Metadata } from "next";

// Types
interface Project {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias: string[];
  categoria: string;
  urlSitio?: string;
  urlGithub?: string;
  destacado?: boolean;
  anio: number;
}

// Enhanced Project Card Component
const EnhancedProjectCard = ({
  titulo,
  descripcion,
  imagen,
  tecnologias,
  categoria,
  urlSitio,
  urlGithub,
  destacado = false,
  delay = 0,
}: Project & { delay?: number }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {destacado && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-full shadow-lg animate-pulse-glow">
            <Star className="h-4 w-4" />
          </div>
        </div>
      )}

      <div className="relative flex flex-col overflow-hidden rounded-xl border border-accent bg-card transition-all duration-500 hover:border-primary/50 hover:shadow-xl professional-shadow group-hover:professional-shadow-lg">
        {/* Project Image with Overlay */}
        <div className="relative h-64 overflow-hidden bg-accent">
          <Image
            src={imagen}
            alt={`Screenshot of ${titulo} project`}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-white text-sm font-medium mb-2">
                {categoria}
              </div>
              <div className="flex gap-2">
                {urlSitio && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
                    asChild
                  >
                    <a
                      href={urlSitio}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe2 className="h-3 w-3 mr-1" />
                      {t.viewSite}
                    </a>
                  </Button>
                )}
                {urlGithub && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30"
                    asChild
                  >
                    <a
                      href={urlGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-3 w-3 mr-1" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
              {titulo}
            </h3>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {descripcion}
          </p>

          {/* Technology Stack with Animated Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tecnologias.map((tech, index) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-full transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
                style={{
                  animationDelay: `${delay + index * 100}ms`,
                }}
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Actions - Always Visible */}
          <div className="flex gap-3 mt-auto">
            {urlSitio && (
              <Button variant="default" className="flex-1 rounded-full" asChild>
                <a
                  href={urlSitio}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${titulo}`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t.viewSite}
                </a>
              </Button>
            )}
            {urlGithub && (
              <Button
                variant="outline"
                className={`${
                  urlSitio ? "flex-shrink-0" : "flex-1"
                } rounded-full`}
                asChild
              >
                <a
                  href={urlGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${titulo}`}
                >
                  <Github className="mr-2 h-4 w-4" />
                  {urlSitio ? "" : "GitHub"}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton = ({
  label,
  isActive,
  onClick,
  count,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}) => (
  <Button
    variant={isActive ? "default" : "outline"}
    className="rounded-full transition-all duration-300 hover:scale-105"
    onClick={onClick}
  >
    <Filter className="mr-2 h-4 w-4" />
    {label}
    <Badge variant="secondary" className="ml-2 text-xs">
      {count}
    </Badge>
  </Button>
);

// Main Projects Component
const EnhancedProjects = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);

  // Enhanced project data with categories and years
  const proyectos: Record<"en" | "es", Project[]> = {
    en: [
      {
        id: "cafe-papamin",
        titulo: "Café Papamin",
        descripcion:
          "Modern restaurant website for Café Papamín in San Sebastián, Puerto Rico. Features responsive design, location services, menu display, and integrated contact system. Built with Next.js and optimized for mobile-first experience to attract local customers and tourists.",
        imagen: "/papamin-preview.png",
        tecnologias: [
          "Next.js 14",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "Stripe API",
          "Google Maps",
          "Vercel",
          "SEO",
        ],
        categoria: "Web Development",
        urlSitio: "https://cafepapamin.com",
        destacado: true,
        anio: 2024,
      },
      {
        id: "pabellon-fama-deporte",
        titulo: "Pabellón de la Fama del Deporte Humacaeño",
        descripcion:
          "Official digital museum for Puerto Rico's Humacao Sports Hall of Fame, honoring 81+ sports legends. Complete digital transformation project featuring advanced search and filtering systems, interactive timeline, virtual museum tours, and bilingual support. Achieved 95+ Lighthouse scores with comprehensive SEO optimization for cultural heritage preservation.",
        imagen: "/pabellon-preview.png",
        tecnologias: [
          "Next.js 15",
          "TypeScript",
          "Tailwind CSS",
          "React 19",
          "Vercel",
          "SEO Optimization",
          "Cultural Heritage Tech",
          "Digital Museum",
          "Search & Filter System",
        ],
        categoria: "Cultural Heritage",
        urlSitio: "https://pfdh-humacao.vercel.app",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/pfdh-website`,
        destacado: true,
        anio: 2025,
      },
      {
        id: "jibaro-eats",
        titulo: "Jíbaro Eats Photography",
        descripcion:
          "Visual portfolio website for a professional photographer specializing in gastronomy. Features high-quality image galleries, lazy-loading optimization, and fluid navigation between collections.",
        imagen: "/jibaroeats-preview.png",
        tecnologias: [
          "Next.js 13+",
          "TypeScript",
          "Tailwind CSS",
          "CSR",
          "SSR",
          "Cloudinary",
          "Vercel",
        ],
        categoria: "Portfolio",
        urlSitio: "https://jibaroeats.com",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/${process.env.NEXT_PUBLIC_JIBAROEATS_REPO}`,
        destacado: false,
        anio: 2023,
      },
      {
        id: "yukayeke-playa",
        titulo: "Yukayeke Playa Real Estate",
        descripcion:
          "Modern real estate platform showcasing luxury beachfront properties in Puerto Rico. Features comprehensive property listings, bilingual SEO optimization, and responsive design for optimal mobile experience.",
        imagen: "/yukayeke-preview.png",
        tecnologias: [
          "Next.js 14",
          "TypeScript",
          "Tailwind CSS",
          "i18n",
          "Vercel",
          "SEO",
          "SSR",
          "ImageKit",
          "Cloudinary",
        ],
        categoria: "Web Development",
        urlSitio: "https://yukayekeplaya.com",
        destacado: true,
        anio: 2024,
      },
      {
        id: "jayei-writers-platform",
        titulo: "JAYEI - Caribbean Writers Platform",
        descripcion:
          "Comprehensive website for Junte de Artistas y Escritores Internacionales, a Caribbean poets and writers organization. Features progressive photo gallery with custom loading algorithms, responsive design, accessibility compliance (WCAG), and mobile-optimized interactions. Designed to showcase literary community and attract younger artists to join the organization.",
        imagen: "/jayei-preview.png",
        tecnologias: [
          "Next.js 15.4.3",
          "React 19.1.0",
          "TypeScript",
          "Tailwind CSS v4",
          "Progressive Loading",
          "Accessibility (WCAG)",
          "Responsive Design",
          "Performance Optimization",
        ],
        categoria: "Arts & Culture",
        urlSitio: "https://jayei-writers.vercel.app",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/jayei`,
        destacado: true,
        anio: 2025,
      },
      {
        id: "mario-portfolio",
        titulo: "Mario Rafael Ayala Portfolio",
        descripcion:
          "Professional portfolio website showcasing 25+ years of software engineering experience. Built with Next.js 15 App Router, featuring bilingual support, professional animations, dark mode, and comprehensive SEO optimization.",
        imagen: "/portfolio-preview.png",
        tecnologias: [
          "Next.js 15",
          "TypeScript",
          "Tailwind CSS 4.0",
          "React Context",
          "Lucide Icons",
          "Vercel Analytics",
          "i18n",
          "SEO",
          "PWA",
        ],
        categoria: "Portfolio",
        urlSitio: "https://www.mariorafaelayala.com",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/${process.env.NEXT_PUBLIC_PROFILE_REPO}`,
        destacado: true,
        anio: 2025,
      },
    ],
    es: [
      {
        id: "cafe-papamin",
        titulo: "Café Papamin",
        descripcion:
          "Sitio web moderno de café y restaurante con una elegante presentación del menú, sistema de pedidos en línea e información de ubicación. Diseñado con una estética cálida y acogedora que refleja la auténtica experiencia del café.",
        imagen: "/papamin-preview.png",
        tecnologias: [
          "Next.js 14",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "Stripe API",
          "Google Maps",
          "Vercel",
          "SEO",
        ],
        categoria: "Desarrollo Web",
        urlSitio: "https://cafepapamin.com",
        destacado: true,
        anio: 2024,
      },
      {
        id: "pabellon-fama-deporte",
        titulo: "Pabellón de la Fama del Deporte Humacaeño",
        descripcion:
          "Museo digital oficial del Pabellón de la Fama del Deporte de Humacao, Puerto Rico, honrando 81+ leyendas deportivas. Proyecto completo de transformación digital con sistemas avanzados de búsqueda y filtrado, cronología interactiva, tours virtuales del museo y soporte bilingüe. Logró puntuaciones Lighthouse 95+ con optimización SEO integral para preservación del patrimonio cultural.",
        imagen: "/pabellon-preview.png",
        tecnologias: [
          "Next.js 15",
          "TypeScript",
          "Tailwind CSS",
          "React 19",
          "Vercel",
          "Optimización SEO",
          "Tecnología Patrimonio Cultural",
          "Museo Digital",
          "Sistema Búsqueda & Filtros",
        ],
        categoria: "Patrimonio Cultural",
        urlSitio: "https://pfdh-humacao.vercel.app",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/pabellon-fama`,
        destacado: true,
        anio: 2025,
      },
      {
        id: "jibaro-eats",
        titulo: "Jíbaro Eats Fotografía",
        descripcion:
          "Sitio web de portafolio visual para un fotógrafo profesional especializado en gastronomía. Presenta galerías de imágenes de alta calidad, optimización lazy-loading y navegación fluida entre colecciones.",
        imagen: "/jibaroeats-preview.png",
        tecnologias: [
          "Next.js 13+",
          "TypeScript",
          "Tailwind CSS",
          "CSR",
          "SSR",
          "Cloudinary",
          "Vercel",
        ],
        categoria: "Portafolio",
        urlSitio: "https://jibaroeats.com",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/${process.env.NEXT_PUBLIC_JIBAROEATS_REPO}`,
        destacado: false,
        anio: 2023,
      },
      {
        id: "yukayeke-playa",
        titulo: "Yukayeke Playa Bienes Raíces",
        descripcion:
          "Plataforma moderna de bienes raíces que muestra propiedades de lujo frente al mar en Puerto Rico. Incluye listados completos de propiedades, optimización SEO bilingüe y diseño responsivo para experiencia móvil óptima.",
        imagen: "/yukayeke-preview.png",
        tecnologias: [
          "Next.js 14",
          "TypeScript",
          "Tailwind CSS",
          "i18n",
          "Vercel",
          "SEO",
          "SSR",
          "ImageKit",
          "Cloudinary",
        ],
        categoria: "Desarrollo Web",
        urlSitio: "https://yukayekeplaya.com",
        destacado: true,
        anio: 2024,
      },
      {
        id: "jayei-writers-platform",
        titulo: "JAYEI - Plataforma Escritores Caribeños",
        descripcion:
          "Sitio web integral para Junte de Artistas y Escritores Internacionales, organización de poetas y escritores caribeños. Presenta galería de fotos progresiva con algoritmos de carga personalizados, diseño responsivo, cumplimiento de accesibilidad (WCAG) e interacciones optimizadas para móviles. Diseñado para mostrar la comunidad literaria y atraer artistas jóvenes a unirse a la organización.",
        imagen: "/jayei-preview.png",
        tecnologias: [
          "Next.js 15.4.3",
          "React 19.1.0",
          "TypeScript",
          "Tailwind CSS v4",
          "Carga Progresiva",
          "Accesibilidad (WCAG)",
          "Diseño Responsivo",
          "Optimización Rendimiento",
        ],
        categoria: "Artes y Cultura",
        urlSitio: "https://jayei-writers.vercel.app",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/jayei-website`,
        destacado: true,
        anio: 2025,
      },
      {
        id: "mario-portfolio",
        titulo: "Portafolio Mario Rafael Ayala",
        descripcion:
          "Sitio web de portafolio profesional que muestra más de 25 años de experiencia en ingeniería de software. Construido con Next.js 15 App Router, con soporte bilingüe, animaciones profesionales, modo oscuro y optimización SEO integral.",
        imagen: "/portfolio-preview.png",
        tecnologias: [
          "Next.js 15",
          "TypeScript",
          "Tailwind CSS 4.0",
          "React Context",
          "Lucide Icons",
          "Vercel Analytics",
          "i18n",
          "SEO",
          "PWA",
        ],
        categoria: "Portafolio",
        urlSitio: "https://www.mariorafaelayala.com",
        urlGithub: `${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}/${process.env.NEXT_PUBLIC_PROFILE_REPO}`,
        destacado: true,
        anio: 2025,
      },
    ],
  };

  const currentProjects = proyectos[language];

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const allCategories = currentProjects.map((p) => p.categoria);
    const uniqueCategories = Array.from(new Set(allCategories));
    return [
      {
        label: language === "en" ? "All Projects" : "Todos los Proyectos",
        value: "all",
      },
      ...uniqueCategories.map((cat) => ({ label: cat, value: cat })),
    ];
  }, [currentProjects, language]);

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (selectedFilter === "all") return currentProjects;
    return currentProjects.filter(
      (project) => project.categoria === selectedFilter
    );
  }, [currentProjects, selectedFilter]);

  // Get project count for each category
  const getCategoryCount = (categoryValue: string) => {
    if (categoryValue === "all") return currentProjects.length;
    return currentProjects.filter((p) => p.categoria === categoryValue).length;
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Animation */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="secondary" className="mb-4 professional-shadow">
            <Code2 className="mr-2 h-4 w-4" />
            {t.projects}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gradient">
            {t.featuredWork}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.innovativeTech}
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((category) => (
            <FilterButton
              key={category.value}
              label={category.label}
              isActive={selectedFilter === category.value}
              onClick={() => setSelectedFilter(category.value)}
              count={getCategoryCount(category.value)}
            />
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((proyecto, index) => (
            <EnhancedProjectCard
              key={`${proyecto.id}-${selectedFilter}`}
              {...proyecto}
              delay={200 + index * 200}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto professional-shadow">
            <h3 className="text-2xl font-semibold mb-4">
              {language === "en"
                ? "Interested in working together?"
                : "¿Interesado en trabajar juntos?"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === "en"
                ? "Let's discuss how we can bring your ideas to life with modern web technologies."
                : "Hablemos sobre cómo podemos dar vida a tus ideas con tecnologías web modernas."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="rounded-full professional-shadow-lg" asChild>
                <a href="#contact">
                  {language === "en"
                    ? "Start a Project"
                    : "Iniciar un Proyecto"}
                </a>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <a
                  href={`${process.env.NEXT_PUBLIC_SOCIAL_GITHUB}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  {language === "en"
                    ? "View More on GitHub"
                    : "Ver Más en GitHub"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Metadata export for SEO
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

export default EnhancedProjects;
