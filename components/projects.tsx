// components/projects.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock } from "lucide-react";
import Image from "next/image";
import { GithubLogo } from "./icons";
// Import fallback data
import { fallbackProjects } from "@/lib/fallback-content";

interface ProyectoCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo?: string;
  github?: string;
  featured?: boolean;
}

const ProyectoCard = ({
  title,
  description,
  image,
  technologies,
  demo,
  github,
}: ProyectoCardProps) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50">
      {/* image del Proyecto */}
      <div className="relative h-64 overflow-hidden bg-accent">
        <Image
          src={image}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-100"
          width={500}
          height={500}
        />
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex gap-3 mt-auto">
          {demo && (
            <Button variant="default" className="rounded-full" asChild>
              <a href={demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                Ver Sitio
              </a>
            </Button>
          )}
          {github ? (
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              asChild
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
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
  // Use fallback data instead of Contentlayer
  const proyectos = fallbackProjects;

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
            <ProyectoCard key={proyecto.title} {...proyecto} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Proyectos;
