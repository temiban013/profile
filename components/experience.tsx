// components/experience.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  ExternalLink,
  Code,
  Users,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";

// Type definitions
interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  index: number;
}

interface EducationItemProps {
  degree: string;
  institution: string;
  location: string;
  period: string;
  honors?: string;
  index: number;
}

interface CertificationItemProps {
  title: string;
  organization: string;
  location: string;
  period: string;
  url?: string;
  index: number;
}

// Enhanced timeline item component
const TimelineItem = ({
  children,
  icon: Icon,
  isLast = false,
  index = 0,
}: {
  children: React.ReactNode;
  icon: any;
  isLast?: boolean;
  index?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.3 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={cn(
        "relative pl-16 group transition-all duration-700",
        !isLast && "pb-12",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      )}
    >
      {/* Enhanced Timeline line with animation */}
      <div className="absolute left-6 top-3 w-0.5 bg-border group-hover:bg-primary/50 transition-colors duration-300">
        <div
          className={cn(
            "h-full bg-gradient-to-b from-primary to-secondary transition-all duration-1000 delay-200",
            isVisible ? "scale-y-100" : "scale-y-0"
          )}
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* Enhanced timeline dot */}
      <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-background border-2 border-primary professional-shadow flex items-center justify-center group-hover:scale-110 transition-all duration-300">
        <Icon className="w-3 h-3 text-primary" />
      </div>

      {/* Content with glass effect */}
      <div
        className={cn(
          "p-6 rounded-xl glass-effect border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 professional-shadow",
          isVisible && "animate-in slide-in-from-left-4"
        )}
      >
        {children}
      </div>
    </div>
  );
};

// Enhanced experience item component
const ExperienceItem = ({
  title,
  company,
  location,
  period,
  description,
  technologies,
  index,
}: ExperienceItemProps) => {
  return (
    <TimelineItem icon={Briefcase} index={index}>
      <div className="space-y-4">
        {/* Header with professional styling */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {company}
              </h3>
            </div>
            <h4 className="text-lg font-medium text-primary mb-3">{title}</h4>
          </div>
        </div>

        {/* Meta information */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">{period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium">{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{description}</p>

        {/* Technologies with enhanced styling */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, techIndex) => (
            <Badge
              key={tech}
              variant="outline"
              className={cn(
                "text-xs bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300",
                `animate-in fade-in slide-in-from-bottom-2`
              )}
              style={{ animationDelay: `${techIndex * 50}ms` }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </TimelineItem>
  );
};

// Enhanced education item component
const EducationItem = ({
  degree,
  institution,
  location,
  period,
  honors,
  index,
}: EducationItemProps) => {
  return (
    <TimelineItem icon={GraduationCap} index={index}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {institution}
            </h3>
            <h4 className="text-lg font-medium text-secondary mb-3">
              {degree}
            </h4>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="font-medium">{period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="font-medium">{location}</span>
          </div>
        </div>

        {honors && (
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3">
            <p className="text-secondary font-medium text-sm">{honors}</p>
          </div>
        )}
      </div>
    </TimelineItem>
  );
};

// Enhanced certification item component
const CertificationItem = ({
  title,
  organization,
  location,
  period,
  url,
  index,
}: CertificationItemProps) => {
  const { language } = useLanguage();

  return (
    <TimelineItem icon={Award} index={index} isLast={true}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {organization}
              </h3>
              <h4 className="text-lg font-medium text-accent mb-3">{title}</h4>
            </div>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-300 group p-2 rounded-lg hover:bg-primary/5"
            >
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm">
                {language === "en" ? "Visit" : "Visitar"}
              </span>
            </a>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="font-medium">{period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="font-medium">{location}</span>
          </div>
        </div>
      </div>
    </TimelineItem>
  );
};

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Define experiences data with language-specific content
  const experiences = {
    en: {
      experience: [
        {
          title: "Digital Transformation Program Designer",
          company: "MPA Consultants",
          location: "Las Marías, Puerto Rico",
          period: "May 2025 - July 2025",
          description:
            "Developed a 150-hour intensive program that transforms displaced adults into digital professionals. My pedagogical innovation used the OSI network model as an educational framework, integrating AI, blockchain, and Microsoft tools. The program resulted in each student having an executive CV, a business plan, and an entrepreneurial digital presence, fostering local economic development and a community multiplier effect.",
          technologies: [
            "Next.js",
            "TypeScript",
            "AI Integration",
            "Blockchain",
            "Microsoft Tools",
            "Educational Design",
          ],
        },
        {
          title: "Senior Full Stack Developer",
          company: "Independent Consultant",
          location: "Puerto Rico / Remote",
          period: "2020 - Present",
          description:
            "Leading digital transformation projects for small and medium businesses, specializing in custom web applications with Next.js, TypeScript, and cloud integration. Developed cost-effective solutions that compete with enterprise platforms while maintaining high performance and scalability.",
          technologies: [
            "Next.js",
            "TypeScript",
            "React",
            "Node.js",
            "PostgreSQL",
            "AWS",
            "Vercel",
          ],
        },
        {
          title: "Principal Software Engineer",
          company: "Office Depot",
          location: "Boca Raton, Florida",
          period: "2018 - 2020",
          description:
            "Led enterprise-level system integrations and digital transformation initiatives. Architected and implemented scalable solutions for e-commerce platforms serving millions of customers, focusing on performance optimization and system reliability.",
          technologies: [
            ".NET Core",
            "SQL Server",
            "Azure",
            "Microservices",
            "React",
            "C#",
          ],
        },
        {
          title: "Senior Systems Developer",
          company: "Disney",
          location: "Orlando, Florida",
          period: "2015 - 2018",
          description:
            "Developed and maintained critical systems supporting Disney's theme park operations and guest experiences. Collaborated with cross-functional teams to deliver high-availability solutions handling millions of daily transactions.",
          technologies: [
            "Java",
            "Spring",
            "Oracle",
            "REST APIs",
            "Microservices",
            "AWS",
          ],
        },
      ],
      education: [
        {
          degree: "Master of Science in Computer Science",
          institution: "Universidad Politécnica de Puerto Rico",
          location: "San Juan, Puerto Rico",
          period: "2010 - 2012",
          honors: "Magna Cum Laude - 3.85 GPA",
        },
        {
          degree: "Bachelor of Science in Computer Science",
          institution: "Universidad Politécnica de Puerto Rico",
          location: "San Juan, Puerto Rico",
          period: "2006 - 2010",
          honors: "Cum Laude - 3.75 GPA",
        },
      ],
      certifications: [
        {
          title: "AWS Certified Solutions Architect",
          organization: "Amazon Web Services",
          location: "Online",
          period: "2023",
          url: "https://aws.amazon.com/certification/",
        },
        {
          title: "Microsoft Azure Fundamentals",
          organization: "Microsoft",
          location: "Online",
          period: "2022",
          url: "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
        },
      ],
    },
    es: {
      experience: [
        {
          title: "Diseñador de Programa de Transformación Digital",
          company: "MPA Consultants",
          location: "Las Marías, Puerto Rico",
          period: "Mayo 2025 - Julio 2025",
          description:
            "Desarrollé un programa intensivo de 150 horas que transforma adultos desplazados en profesionales digitales. Mi innovación pedagógica utilizó el modelo de red OSI como marco educativo, integrando IA, blockchain y herramientas de Microsoft. El programa resultó en que cada estudiante tuviera un CV ejecutivo, un plan de negocios y una presencia digital empresarial, fomentando el desarrollo económico local y un efecto multiplicador comunitario.",
          technologies: [
            "Next.js",
            "TypeScript",
            "Integración IA",
            "Blockchain",
            "Herramientas Microsoft",
            "Diseño Educativo",
          ],
        },
        {
          title: "Desarrollador Full Stack Senior",
          company: "Consultor Independiente",
          location: "Puerto Rico / Remoto",
          period: "2020 - Presente",
          description:
            "Liderando proyectos de transformación digital para pequeñas y medianas empresas, especializándome en aplicaciones web personalizadas con Next.js, TypeScript e integración en la nube. Desarrollé soluciones costo-efectivas que compiten con plataformas empresariales manteniendo alto rendimiento y escalabilidad.",
          technologies: [
            "Next.js",
            "TypeScript",
            "React",
            "Node.js",
            "PostgreSQL",
            "AWS",
            "Vercel",
          ],
        },
        {
          title: "Ingeniero Principal de Software",
          company: "Office Depot",
          location: "Boca Raton, Florida",
          period: "2018 - 2020",
          description:
            "Lideré integraciones de sistemas de nivel empresarial e iniciativas de transformación digital. Arquitecturé e implementé soluciones escalables para plataformas de comercio electrónico que sirven a millones de clientes, enfocándome en optimización de rendimiento y confiabilidad del sistema.",
          technologies: [
            ".NET Core",
            "SQL Server",
            "Azure",
            "Microservicios",
            "React",
            "C#",
          ],
        },
        {
          title: "Desarrollador Senior de Sistemas",
          company: "Disney",
          location: "Orlando, Florida",
          period: "2015 - 2018",
          description:
            "Desarrollé y mantuve sistemas críticos que apoyan las operaciones de los parques temáticos de Disney y las experiencias de los huéspedes. Colaboré con equipos multifuncionales para entregar soluciones de alta disponibilidad que manejan millones de transacciones diarias.",
          technologies: [
            "Java",
            "Spring",
            "Oracle",
            "APIs REST",
            "Microservicios",
            "AWS",
          ],
        },
      ],
      education: [
        {
          degree: "Maestría en Ciencias de la Computación",
          institution: "Universidad Politécnica de Puerto Rico",
          location: "San Juan, Puerto Rico",
          period: "2010 - 2012",
          honors: "Magna Cum Laude - GPA 3.85",
        },
        {
          degree: "Licenciatura en Ciencias de la Computación",
          institution: "Universidad Politécnica de Puerto Rico",
          location: "San Juan, Puerto Rico",
          period: "2006 - 2010",
          honors: "Cum Laude - GPA 3.75",
        },
      ],
      certifications: [
        {
          title: "AWS Certified Solutions Architect",
          organization: "Amazon Web Services",
          location: "En línea",
          period: "2023",
          url: "https://aws.amazon.com/certification/",
        },
        {
          title: "Microsoft Azure Fundamentals",
          organization: "Microsoft",
          location: "En línea",
          period: "2022",
          url: "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
        },
      ],
    },
  };

  const currentLanguageData = experiences[language];

  return (
    <section id="experience" className="relative py-20 px-6 bg-muted/20">
      {/* Professional background elements */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-float hidden lg:block"></div>
      <div
        className="absolute bottom-20 left-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl animate-float hidden lg:block"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="max-w-screen-lg mx-auto">
        {/* Professional Experience Section */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary"
          >
            {language === "en" ? "Career Journey" : "Trayectoria Profesional"}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="text-gradient">
              {language === "en" ? "Professional" : "Experiencia"}
            </span>{" "}
            <span className="text-foreground">
              {language === "en" ? "Experience" : "Profesional"}
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Two decades of building enterprise solutions and leading digital transformations"
              : "Dos décadas construyendo soluciones empresariales y liderando transformaciones digitales"}
          </p>
        </div>

        <div className="relative mb-20">
          {currentLanguageData.experience.map((item, index) => (
            <ExperienceItem
              key={`${item.company}-${item.title}-${index}`}
              {...item}
              index={index}
            />
          ))}
        </div>

        {/* Education Section */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000 delay-500",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-secondary/10 text-secondary"
          >
            {language === "en" ? "Academic Foundation" : "Base Académica"}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="text-gradient">
              {language === "en" ? "Educational" : "Formación"}
            </span>{" "}
            <span className="text-foreground">
              {language === "en" ? "Background" : "Académica"}
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Strong academic foundation with honors in Computer Science"
              : "Sólida base académica con honores en Ciencias de la Computación"}
          </p>
        </div>

        <div className="relative mb-20">
          {currentLanguageData.education.map((item, index) => (
            <EducationItem
              key={`${item.institution}-${item.degree}-${index}`}
              {...item}
              index={index}
            />
          ))}
        </div>

        {/* Certifications Section */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000 delay-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent">
            {language === "en"
              ? "Professional Recognition"
              : "Reconocimiento Profesional"}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="text-gradient">
              {language === "en" ? "Certifications" : "Certificaciones"}
            </span>{" "}
            <span className="text-foreground">
              {language === "en" ? "& Awards" : "y Premios"}
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Continuous learning and professional development achievements"
              : "Aprendizaje continuo y logros de desarrollo profesional"}
          </p>
        </div>

        <div className="relative">
          {currentLanguageData.certifications.map((item, index) => (
            <CertificationItem
              key={`${item.organization}-${item.title}-${index}`}
              {...item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
