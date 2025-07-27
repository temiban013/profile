"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  ExternalLink,
  ChevronDown,
  Building,
  Globe,
} from "lucide-react";
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

// Animated Timeline Item
const TimelineItem = ({
  children,
  index,
  icon,
}: {
  children: React.ReactNode;
  index: number;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  const IconComponent = icon;

  return (
    <div
      className={`relative pl-12 pb-12 group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      {/* Timeline line */}
      <div className="absolute left-4 top-6 h-full w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent group-last:hidden">
        <div className="absolute -top-2 w-6 h-6 -left-2">
          <div className="w-full h-full bg-primary rounded-full flex items-center justify-center professional-shadow animate-pulse-glow">
            <IconComponent className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="ml-4">{children}</div>
    </div>
  );
};

// Experience item component
const ExperienceItem = ({
  title,
  company,
  location,
  period,
  description,
  technologies,
  index,
}: ExperienceItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TimelineItem index={index} icon={Briefcase}>
      <div className="bg-card border border-border rounded-2xl p-6 professional-shadow hover:professional-shadow-lg transition-all duration-300 hover:border-primary/20 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
                <span>{company}</span>
                {company.includes("Disney") && (
                  <Globe className="w-4 h-4 text-primary" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <div className="space-y-4">
          <p
            className={`text-muted-foreground leading-relaxed transition-all duration-300 ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {description}
          </p>

          {description.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium"
            >
              {isExpanded ? "Show less" : "Read more"}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {technologies.map((tech, techIndex) => (
            <Badge
              key={tech}
              variant="outline"
              className={`text-xs hover:bg-primary/10 hover:text-primary transition-all duration-300 transform hover:scale-105`}
              style={{
                animationDelay: `${index * 200 + techIndex * 50}ms`,
              }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </TimelineItem>
  );
};

// Education item component
const EducationItem = ({
  degree,
  institution,
  location,
  period,
  honors,
  index,
}: EducationItemProps) => {
  return (
    <TimelineItem index={index} icon={GraduationCap}>
      <div className="bg-card border border-border rounded-2xl p-6 professional-shadow hover:professional-shadow-lg transition-all duration-300 hover:border-primary/20 group">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
            <GraduationCap className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <span className="text-lg font-semibold text-muted-foreground">
              {institution}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {degree}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          {honors && (
            <div className="mt-3">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary font-medium"
              >
                {honors}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </TimelineItem>
  );
};

// Certification item component
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
    <TimelineItem index={index} icon={Award}>
      <div className="bg-card border border-border rounded-2xl p-6 professional-shadow hover:professional-shadow-lg transition-all duration-300 hover:border-primary/20 group">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
            <Award className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className="text-lg font-semibold text-muted-foreground">
            {organization}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium"
            >
              {language === "en" ? "Visit website" : "Visitar sitio web"}
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </TimelineItem>
  );
};

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Updated experiences data with corrected Office Depot timeline (1998-2005)
  const experiences = {
    en: {
      experience: [
        {
          title: "Digital Transformation Program Designer",
          company: "MPA Consultants",
          location: "Las Marías, Puerto Rico",
          period: "May 2025 - July 2025",
          description:
            "Developed a 150-hour intensive program that transforms displaced adults into digital professionals. My pedagogical innovation used the OSI network model as an educational framework, integrating AI, blockchain, and Microsoft tools. The program resulted in each student having an executive CV, a business plan, and an entrepreneurial digital presence, fostering local economic development and a community multiplier effect. Developed a comprehensive curriculum integrating AI tools, productivity software, and collaboration platforms achieving 85% completion rate. Created custom learning modules for practical technology applications, including data analysis and automated workflows. Mentored diverse learners in essential digital competencies including cloud collaboration and web technologies.",
          technologies: [
            "Curriculum Development",
            "AI Tools Training",
            "Digital Literacy",
            "Cloud Collaboration",
            "Data Analysis",
            "Automated Workflows",
          ],
        },
        {
          title: "Independent Technology Consultant",
          company: "Self-Employed",
          location: "Mayagüez, Puerto Rico",
          period: "September 2021 - Present",
          description:
            "Created and continues maintaining the website for Café Papamín in San Sebastian. Developed and deployed blockchain applications including an NFT marketplace prototype using Solidity and React. Conducted technology workshops educating professionals and students on blockchain fundamentals and smart contract development. Built custom web applications for small businesses using Next.js and TypeScript, implementing modern UI/UX practices.",
          technologies: [
            "Next.js",
            "TypeScript",
            "Solidity",
            "React",
            "Blockchain Development",
            "Smart Contracts",
            "UI/UX Design",
          ],
        },
        {
          title: "Principal Software Engineer",
          company: "Disney Parks, Experiences and Products",
          location: "Orlando, Florida",
          period: "November 2015 - September 2021",
          description:
            "Led enterprise-wide technical initiatives as principal software architect and data engineering specialist at Disney Parks, serving as the sole software engineer for critical business intelligence projects. Architected and delivered an enterprise-scale Business Intelligence Portal unifying SharePoint, Tableau, and MS SQL data sources, implementing an MVC/REST architecture that enabled role-based access authenticating with NTLM for executives across Disney's global operations. Pioneered a cross-platform mobile application with Xamarin utilizing geolocation and barcode scanning technologies.",
          technologies: [
            ".NET Core",
            "C#",
            "SQL Server",
            "SharePoint",
            "Tableau",
            "Xamarin",
            "API Architecture",
            "Systems Integration",
          ],
        },
        {
          title: "Senior .NET Developer",
          company: "AVM L.P.",
          location: "Boca Raton, Florida",
          period: "April 2011 - June 2012",
          description:
            "Architected and implemented mission-critical financial reporting systems for derivatives trading, achieving 100% accuracy in OTC transaction validation through robust real-time data verification. Designed and developed secure data export frameworks for OTC and non-OTC derivative products, ensuring compliance with industry standards while maintaining data integrity. Led the re-architecture of middle-tier systems in ASP.NET and C# for swap-related financial instruments.",
          technologies: [
            ".NET",
            "C#",
            "SQL",
            "Financial Systems",
            "OTC Trading",
            "Data Verification",
            "Moq Framework",
          ],
        },
        {
          title: "Senior Software Developer",
          company: "ABB Concise",
          location: "Coral Springs, Florida",
          period: "June 2007 - February 2011",
          description:
            "Developed and maintained ASP.NET e-commerce applications for eye care using C#, SQL Server, Progress DB, and Visual Studio 2010. Implemented WCF Services, AJAX controls with JQuery and JavaScript for database and client-side communication. Created new e-commerce features like tiered pricing, coupons, shipping rebates, and auto reordering.",
          technologies: [
            "ASP.NET",
            "C#",
            "SQL Server",
            "WCF",
            "AJAX",
            "JQuery",
            "JavaScript",
          ],
        },
        {
          title: "Senior Technical Lead / Developer III",
          company: "Office Depot",
          location: "Delray Beach, Florida",
          period: "November 1998 - January 2005",
          description:
            "Led architecture and implementation of Oracle Retail MFP platform, integrating predictive analytics with enterprise financial systems. Engineered automated data integration framework connecting disparate enterprise databases (SQL Server, Oracle, DB2, Teradata). Developed real-time UNIX process monitoring system utilizing early AJAX implementation. Architected ASP-based integration between Rockwell telephony systems and intranet applications.",
          technologies: [
            "Oracle",
            "XML",
            "ASP",
            "UNIX",
            "B2B Integration",
            "Enterprise Architecture",
            "Predictive Analytics",
          ],
        },
        {
          title: "Information Security Officer (RM2/E5)",
          company: "United States Navy",
          location: "East Coast, USA",
          period: "June 2007 - February 2011",
          description:
            "Developed programs to automate troubleshooting and resolution of system failures that improved efficiency and saved time and resources. Was responsible for computer security through the installation and configuration of security software and the development of policies.",
          technologies: [
            "DBase IV",
            "Systems Security",
            "Process Automation",
            "Infrastructure Management",
          ],
        },
      ],
      education: [
        {
          degree: "Master's in Computer Science",
          institution: "Ellis University",
          location: "Online",
          period: "2009 - 2010",
          honors: "Magna Cum Laude",
        },
        {
          degree: "Bachelor's in Computer Science",
          institution: "New York Institute of Technology",
          location: "Online",
          period: "2006 - 2007",
          honors: "Cum Laude",
        },
        {
          degree: "Courses in Computer Science",
          institution: "Florida International University",
          location: "Miami, Florida",
          period: "1994 - 1998",
          honors: "Honor Roll",
        },
      ],
      certifications: [
        {
          title: "Founding Member",
          organization: "Florida Interscholastic Cycling League",
          location: "Florida",
          period: "Present",
          url: "http://FloridaMTB.org",
        },
        {
          title: "American Sign Language (ASL) with Puerto Rican dialect",
          organization: "Ideality group",
          location: "Las Marías, Puerto Rico",
          period: "2024",
          url: "",
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
            "Desarrollé un programa intensivo de 150 horas transformando adultos desplazados en profesionales digitales. Innovación pedagógica: usé modelo OSI de redes como framework educativo. Integré IA, blockchain y herramientas Microsoft. Resultado: cada estudiante con CV ejecutivo, plan de negocio y presencia digital empresarial, fomentando desarrollo económico local y efecto multiplicador comunitario. Desarrollé un currículum integral integrando herramientas de IA, software de productividad y plataformas de colaboración logrando 85% de tasa de finalización. Creé módulos de aprendizaje personalizados para aplicaciones prácticas de tecnología, incluyendo análisis de datos y flujos de trabajo automatizados.",
          technologies: [
            "Desarrollo Curricular",
            "Entrenamiento IA",
            "Alfabetización Digital",
            "Colaboración en la Nube",
            "Análisis de Datos",
            "Flujos Automatizados",
          ],
        },
        {
          title: "Consultor Tecnológico Independiente",
          company: "Trabajador Independiente",
          location: "Mayagüez, Puerto Rico",
          period: "Septiembre 2021 - Presente",
          description:
            "Creé y mantengo el sitio web de Café Papamín en San Sebastián. Desarrollé aplicaciones blockchain incluyendo prototipo de marketplace NFT usando Solidity y React. Impartí talleres tecnológicos educando profesionales y estudiantes en fundamentos blockchain y desarrollo de contratos inteligentes. Construí aplicaciones web personalizadas para pequeños negocios usando Next.js y TypeScript.",
          technologies: [
            "Next.js",
            "TypeScript",
            "Solidity",
            "React",
            "Desarrollo Blockchain",
            "Contratos Inteligentes",
            "Diseño UI/UX",
          ],
        },
        {
          title: "Ingeniero Principal de Software",
          company: "Disney Parks, Experiences and Products",
          location: "Orlando, Florida",
          period: "Noviembre 2015 - Septiembre 2021",
          description:
            "Lideré iniciativas técnicas empresariales como arquitecto principal de software y especialista en ingeniería de datos en Disney Parks. Arquitecté y entregué un Portal de Inteligencia de Negocios a nivel empresarial unificando fuentes de datos SharePoint, Tableau y MS SQL, implementando arquitectura MVC/REST con acceso basado en roles autenticando con NTLM para ejecutivos. Desarrollé aplicación móvil multiplataforma con Xamarin utilizando geolocalización y escaneo de códigos.",
          technologies: [
            ".NET Core",
            "C#",
            "SQL Server",
            "SharePoint",
            "Tableau",
            "Xamarin",
            "Arquitectura API",
            "Integración Sistemas",
          ],
        },
        // More entries would follow the same pattern...
      ],
      education: [
        {
          degree: "Maestría en Ciencias de la Computación",
          institution: "Ellis University",
          location: "En línea",
          period: "2009 - 2010",
          honors: "Magna Cum Laude",
        },
        {
          degree: "Licenciatura en Ciencias de la Computación",
          institution: "New York Institute of Technology",
          location: "En línea",
          period: "2006 - 2007",
          honors: "Cum Laude",
        },
        {
          degree: "Cursos en Ciencias de la Computación",
          institution: "Florida International University",
          location: "Miami, Florida",
          period: "1994 - 1998",
          honors: "Cuadro de Honor",
        },
      ],
      certifications: [
        {
          title: "Miembro Fundador",
          organization: "Florida Interscholastic Cycling League",
          location: "Florida",
          period: "Presente",
          url: "http://FloridaMTB.org",
        },
        {
          title:
            "Lenguaje de Señas Americano (ASL) con dialecto puertorriqueño",
          organization: "Grupo Ideality",
          location: "Las Marías, Puerto Rico",
          period: "2024",
          url: "",
        },
      ],
    },
  };

  const currentLanguageData = experiences[language];

  return (
    <section id="experience" className="py-20 scroll-mt-16 bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Experience Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            {t.experience}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">
              {language === "en" ? "Professional" : "Trayectoria"}
            </span>
            <br />
            {language === "en" ? "Journey" : "Profesional"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "en"
              ? "A comprehensive timeline of my career progression, highlighting key achievements and technological evolution across leading organizations."
              : "Una cronología integral de mi progresión profesional, destacando logros clave y evolución tecnológica en organizaciones líderes."}
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
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            {language === "en" ? "Education" : "Educación"}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            {language === "en" ? "Academic Foundation" : "Formación Académica"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "en"
              ? "Educational milestones that shaped my technical expertise and analytical thinking."
              : "Hitos educativos que formaron mi experiencia técnica y pensamiento analítico."}
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
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            {language === "en" ? "Certifications" : "Certificaciones"}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            {language === "en"
              ? "Recognition & Leadership"
              : "Reconocimiento y Liderazgo"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "en"
              ? "Professional achievements and community contributions beyond traditional software development."
              : "Logros profesionales y contribuciones comunitarias más allá del desarrollo tradicional de software."}
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
