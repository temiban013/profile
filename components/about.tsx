"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, Award, Code, Users, Target, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { GithubLogo } from "./icons";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import { useEffect, useState } from "react";

// Stats/achievements component
const StatItem = ({
  number,
  label,
  icon: Icon,
  delay = 0,
}: {
  number: string;
  label: string;
  icon: any;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "text-center p-6 rounded-xl bg-muted/30 backdrop-blur-sm border border-border/50 transition-all duration-700 hover:scale-105 hover:bg-primary/5 hover:border-primary/20",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
      <div className="text-2xl font-bold text-foreground mb-1">{number}</div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
};

// Profile image component with enhanced styling
const ProfileImage = ({ className }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative group", className)}>
    <div className="relative w-64 h-64 mx-auto">
      {/* Professional background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>

      {/* Main image container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden professional-shadow-lg group-hover:scale-105 transition-all duration-500 border-2 border-primary/10 group-hover:border-primary/20">
        <Image
          src="/mra-profile.jpg"
          alt="Mario Rafael Ayala - Professional Software Engineer"
          fill
          className="object-cover"
          priority
        />

        {/* Professional overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-3 py-2 rounded-full text-sm font-medium professional-shadow animate-pulse-glow">
        25+ Years
      </div>
    </div>
  </div>
);

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats =
    language === "en"
      ? [
          { number: "25+", label: "Years Experience", icon: Award },
          { number: "50+", label: "Projects Completed", icon: Code },
          { number: "15+", label: "Teams Led", icon: Users },
          { number: "100%", label: "Client Satisfaction", icon: Target },
        ]
      : [
          { number: "25+", label: "Años de Experiencia", icon: Award },
          { number: "50+", label: "Proyectos Completados", icon: Code },
          { number: "15+", label: "Equipos Dirigidos", icon: Users },
          { number: "100%", label: "Satisfacción Cliente", icon: Target },
        ];

  return (
    <section id="about" className="relative py-20 px-6 overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-float hidden lg:block"></div>
      <div
        className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl animate-float hidden lg:block"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-screen-lg mx-auto">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary hover:bg-primary/20"
          >
            {t.about}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            <span className="text-gradient">
              {language === "en"
                ? "Transforming Complex Ideas"
                : "Transformando Ideas Complejas"}
            </span>
            <br />
            <span className="text-foreground">
              {language === "en"
                ? "into Elegant Digital Solutions"
                : "en Soluciones Digitales Elegantes"}
            </span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center mb-16">
          {/* Profile Image */}
          <div
            className={cn(
              "lg:flex-shrink-0 transition-all duration-1000 delay-300",
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            <ProfileImage />
          </div>

          {/* Content */}
          <div
            className={cn(
              "flex-1 lg:text-left transition-all duration-1000 delay-500",
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            )}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {language === "en"
                  ? "With over 20 years of experience in software development, I've specialized in enterprise architectures and high-performance web applications. My professional career includes key roles at companies like Disney and Office Depot, where I led digital transformation and systems integration projects."
                  : "Con más de 20 años de experiencia en el desarrollo de software, me he especializado en arquitecturas empresariales y aplicaciones web de alto rendimiento. Mi trayectoria profesional incluye roles clave en compañías como Disney y Office Depot, donde lideré proyectos de transformación digital e integración de sistemas."}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {language === "en"
                  ? "My academic background in Computer Science (obtained with honors) and my military experience have provided me with a solid foundation of discipline and methodology that I apply to every project. I'm passionate about finding elegant solutions to complex problems using modern technologies like Next.js, TypeScript, and .NET Core."
                  : "Mi formación académica en Ciencias de la Computación (obtenida con honores) y mi experiencia militar me han proporcionado una base sólida de disciplina y metodología que aplico en cada proyecto. Me apasiona encontrar soluciones elegantes a problemas complejos utilizando tecnologías modernas como Next.js, TypeScript y .NET Core."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="group rounded-full font-medium professional-shadow-lg hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                <Link
                  href={language === "en" ? "/resume-en.pdf" : "/resume-es.pdf"}
                  target="_blank"
                >
                  {language === "en" ? "Download Resume" : "Descargar CV"}
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group rounded-full font-medium professional-shadow hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                <GithubLogo className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                <Link
                  href="https://github.com/marioayala"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === "en" ? "View GitHub" : "Ver GitHub"}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Professional Stats */}
        <div
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} delay={800 + index * 100} />
          ))}
        </div>

        {/* Continue to Experience CTA */}
        <div
          className={cn(
            "text-center mt-16 transition-all duration-1000 delay-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Link
            href="#experience"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-300 group"
          >
            {language === "en"
              ? "Explore My Journey"
              : "Explora Mi Trayectoria"}
            <TrendingUp className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
