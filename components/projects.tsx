import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock } from "lucide-react";
import Image from "next/image";
import { GithubLogo } from "./icons";

interface ProyectoCardProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias: string[];
  urlSitio?: string;
  urlGithub?: string;
}

const ProyectoCard = ({
  titulo,
  descripcion,
  imagen,
  tecnologias,
  urlSitio,
  urlGithub,
}: ProyectoCardProps) => {
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
                Ver Sitio
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
                Ver Código
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-full shadow-none opacity-80 cursor-default"
              disabled
            >
              <Lock className="mr-1 h-4 w-4" />
              Código Propietario
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Proyectos = () => {
  const proyectos = [
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
      urlGithub: "https://github.com/temiban013/jibaroeats.git",
    },
  ];

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Proyectos
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Trabajo Destacado
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            Soluciones tecnológicas innovadoras que he desarrollado e
            implementado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.titulo} {...proyecto} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
