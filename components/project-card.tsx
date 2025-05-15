// components/project-card.tsx (example implementation)
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock } from "lucide-react";
import OptimizedImage from "@/components/optimized-image";
import { GithubLogo } from "./icons";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo?: string;
  github?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  demo,
  github,
}: ProjectCardProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50">
      {/* Project image */}
      <div className="relative h-64 overflow-hidden bg-accent">
        <OptimizedImage
          src={image}
          alt={`Screenshot of ${title} project`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          {demo && (
            <Button variant="default" className="rounded-full" asChild>
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title}`}
              >
                <ExternalLink className="mr-1 h-4 w-4" />
                {t.viewSite}
              </a>
            </Button>
          )}
          {github ? (
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              asChild
            >
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code for ${title} on GitHub`}
              >
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
}
