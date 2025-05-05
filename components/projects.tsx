// components/projects.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lock } from "lucide-react";
import Image from "next/image";
import { GithubLogo } from "./icons";
import { useLanguage } from "@/lib/contexts/language-context";
import { allProjects } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { labels } from "@/lib/content";

import type { Project } from "contentlayer/generated";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { language } = useLanguage();
  const MDXContent = useMDXComponent(project.body.code);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-accent">
        <Image
          src={project.image}
          alt={project.title}
          className="object-cover transition-transform duration-300 group-hover:scale-100"
          width={500}
          height={500}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech: string) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          {project.urlSitio && (
            <Button variant="default" className="rounded-full" asChild>
              <a
                href={project.urlSitio}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-1 h-4 w-4" />
                {labels[language].viewSite}
              </a>
            </Button>
          )}
          {project.urlGithub && (
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              asChild
            >
              <a
                href={project.urlGithub}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo className="mr-1 h-4 w-4" />
                {labels[language].viewCode}
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

const Projects = () => {
  const { language } = useLanguage();

  // Get projects for the current language
  const projects = allProjects.filter(
    (project) => project.language === language
  );

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {labels[language].projects}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {labels[language].featuredWork}
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            {labels[language].innovativeTech}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
