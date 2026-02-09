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
  ChevronDown,
  TrendingUp,
  DollarSign,
  Clock,
  BarChart3,
  Building2,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import { useState, useEffect, useMemo } from "react";
import { type Project, projectData } from "@/lib/data/projects";

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
  businessImpact,
  clientType,
  industry,
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
            className="object-cover object-top transition-all duration-500 group-hover:scale-110"
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

          {/* Business Impact & ROI Metrics */}
          {businessImpact && (
            <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {language === "en" ? "Business Impact" : "Impacto Comercial"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{businessImpact.metric}:</span>
                  <span className="text-primary font-semibold">{businessImpact.result}</span>
                </div>
                {businessImpact.savings && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {language === "en" ? "Cost Savings" : "Ahorro de Costos"}:
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">{businessImpact.savings}</span>
                  </div>
                )}
                {businessImpact.efficiency && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      {language === "en" ? "Efficiency Gain" : "Ganancia de Eficiencia"}:
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{businessImpact.efficiency}</span>
                  </div>
                )}
                {businessImpact.timeline && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {language === "en" ? "Timeline" : "Cronograma"}:
                    </span>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold">{businessImpact.timeline}</span>
                  </div>
                )}
              </div>
              {(clientType || industry) && (
                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-primary/10">
                  {industry && (
                    <div className="flex items-center gap-1 text-xs">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{industry}</span>
                    </div>
                  )}
                  {clientType && (
                    <div className="text-xs text-muted-foreground">
                      {clientType}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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
  const [showAllProjects, setShowAllProjects] = useState(false);

  const currentProjects = projectData[language];

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
    let projects = currentProjects;
    if (selectedFilter !== "all") {
      projects = currentProjects.filter(
        (project) => project.categoria === selectedFilter
      );
    }

    // Apply "read more" logic - show only first 2 projects initially
    if (!showAllProjects && selectedFilter === "all") {
      return projects.slice(0, 2);
    }

    return projects;
  }, [currentProjects, selectedFilter, showAllProjects]);

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

        {/* Read More Button for Projects */}
        {!showAllProjects && selectedFilter === "all" && currentProjects.length > 2 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllProjects(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full font-medium transition-all duration-300 hover:scale-105 professional-shadow"
            >
              {language === "en" ? "Show More Projects" : "Ver Más Proyectos"}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

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

export default EnhancedProjects;
