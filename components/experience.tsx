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
      <div className="absolute left-4 top-6 h-full w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent">
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
  const { language } = useLanguage();

  // Parse description to extract bullet points
  const hasFormatting = description.includes('•');
  const descriptionParts = hasFormatting ? description.split('•').filter(part => part.trim()) : [];
  const mainDescription = hasFormatting ? descriptionParts[0] : description;
  const bulletPoints = hasFormatting ? descriptionParts.slice(1) : [];

  // Check if content needs expanding - more nuanced logic
  const hasLongDescription = !hasFormatting && description.length > 400;
  const hasManyBulletPoints = hasFormatting && bulletPoints.length > 2;
  const needsExpansion = hasLongDescription || hasManyBulletPoints;

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
          {hasFormatting ? (
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                {mainDescription.trim()}
              </p>
              {(isExpanded || bulletPoints.length <= 2) && (
                <ul className="space-y-3">
                  {bulletPoints.map((point, idx) => {
                    // Extract bold text patterns (text between **)
                    const formattedPoint = point.trim();
                    const parts = formattedPoint.split(/\*\*(.*?)\*\*/g);

                    return (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>
                          {parts.map((part, partIdx) =>
                            partIdx % 2 === 1 ? (
                              <strong key={partIdx} className="font-semibold text-foreground">
                                {part}
                              </strong>
                            ) : (
                              <span key={partIdx}>{part}</span>
                            )
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {!isExpanded && bulletPoints.length > 2 && (
                <ul className="space-y-3">
                  {bulletPoints.slice(0, 2).map((point, idx) => {
                    const formattedPoint = point.trim();
                    const parts = formattedPoint.split(/\*\*(.*?)\*\*/g);

                    return (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>
                          {parts.map((part, partIdx) =>
                            partIdx % 2 === 1 ? (
                              <strong key={partIdx} className="font-semibold text-foreground">
                                {part}
                              </strong>
                            ) : (
                              <span key={partIdx}>{part}</span>
                            )
                          )}
                        </span>
                      </li>
                    );
                  })}
                  <li className="text-muted-foreground/60 italic pl-6">...</li>
                </ul>
              )}
            </div>
          ) : (
            <p
              className={`text-muted-foreground leading-relaxed transition-all duration-300 ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {description}
            </p>
          )}

          {needsExpansion && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium"
            >
              {isExpanded
                ? (language === "es" ? "Ver menos" : "Show less")
                : (language === "es" ? "Ver más" : "Read more")
              }
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
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);

  // Updated experiences data from latest resumes
  const experiences = {
    en: {
      experience: [
        {
          title: "Independent Technology Consultant",
          company: "Self-Employed",
          location: "Mayagüez, Puerto Rico",
          period: "September 2021 - Present",
          description:
            "Leading digital transformation initiatives for organizations across Puerto Rico, specializing in full-stack web development with Next.js, TypeScript, and modern cloud technologies. • **Gespervis ASL School (2025)**: Architected comprehensive online ASL learning platform using Next.js 15, TypeScript, and PostgreSQL. Achieved 70% development time reduction through strategic database integration. Built role-based authentication system, course management workflows, and real-time analytics serving 13+ active users. Reduced project costs by 65% while accelerating delivery timeline by 7-8 weeks. • **Café Papamín LLC (2024)**: Developed full-stack e-commerce application with comprehensive shopping cart functionality, WhatsApp Business integration, and responsive product catalog. Achieved $620 total project cost vs. $3,000+ traditional platforms, enabling 24/7 customer engagement. • **Pabellón de la Fama del Deporte Humacaeño (2025)**: Architected web platform for Puerto Rico's Humacao Sports Hall of Fame. Led full-stack development implementing SOLID principles and functional programming. Delivered MVP with 8 core sections including searchable inductee directory, museum showcase, and activity calendar. • **JAYEI Cultural Organization (2024)**: Developed bilingual website for Puerto Rican cultural organization connecting international poets and artists. Built with Next.js 15 and TypeScript, featuring interactive photo gallery, progressive loading, and mobile-responsive design. • **Blockchain Development (2021-2023)**: Developed and deployed blockchain applications including NFT marketplace prototype using Solidity and React. Conducted technology workshops educating professionals and students on blockchain fundamentals.",
          technologies: [
            "Next.js 15",
            "TypeScript",
            "React 19",
            "PostgreSQL",
            "Tailwind CSS",
            "Solidity",
            "Blockchain",
            "Vercel",
            "SEO",
          ],
        },
        {
          title: "Digital Transformation Program Designer / Leadership Instructor",
          company: "MPA Consultants",
          location: "Las Marías & Santurce, Puerto Rico",
          period: "March 2025 - July 2025",
          description:
            "Designed and delivered transformative educational programs for professional development in Puerto Rico. • **Las Marías Program (May-July 2025)**: Developed a 150-hour intensive program transforming displaced adults into digital professionals. Pedagogical innovation used the OSI network model as educational framework, integrating AI, blockchain, and Microsoft tools. Results: executive CV, business plan, and entrepreneurial digital presence for each student, fostering local economic development and community multiplier effect. • **Santurce Leadership Program (March-May 2025)**: Designed and taught 70-hour intensive course on professional behavior and interviewing skills, enriching original curriculum with AI modules for job search. Created comprehensive course material including presentations, assessments, and practical exercises that promoted active discussion and student participation. Implemented methodology based on progressive knowledge sequencing, achieving 90%+ course completion rate.",
          technologies: [
            "Curriculum Development",
            "AI Tools Training",
            "Digital Literacy",
            "Microsoft Tools",
            "Blockchain Education",
            "Professional Development",
          ],
        },
        {
          title: "Digital Transformation Director",
          company: "Yukayeke Playa",
          location: "Añasco, Puerto Rico",
          period: "March 2024 - December 2024",
          description:
            "Led comprehensive digital modernization initiatives, architecting and implementing a multilingual (ES/EN) web platform using Next.js 14, TypeScript, and Tailwind CSS, resulting in enhanced user experience and improved online presence. Spearheaded migration from legacy platform (Squarespace) to modern tech stack hosted on Vercel, implementing internationalization and responsive design principles.",
          technologies: [
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "i18n",
            "Vercel",
            "Migration Strategy",
          ],
        },
        {
          title: "Educational Technology Specialist",
          company: "WOTEC",
          location: "Las Marías, Puerto Rico",
          period: "April 2024 - July 2024",
          description:
            "Designed and implemented a 400-hour technical literacy program transforming novices into digitally competent professionals. Developed a comprehensive curriculum integrating AI tools, productivity software, and collaboration platforms achieving 85% completion rate. Created custom learning modules for practical technology applications, including data analysis and automated workflows. Mentored diverse learners in essential digital competencies including cloud collaboration and web technologies.",
          technologies: [
            "Educational Technology",
            "AI Tools",
            "Data Analysis",
            "Cloud Collaboration",
            "Web Technologies",
            "Curriculum Design",
          ],
        },
        {
          title: "Principal Software Engineer / Data Engineering Specialist",
          company: "Disney Parks, Experiences and Products",
          location: "Orlando, Florida",
          period: "November 2015 - September 2021",
          description:
            "Led enterprise-wide technical initiatives as principal software architect and data engineering specialist, serving as sole software engineer for critical business intelligence projects across Disney's global operations. • **Enterprise Architecture Leadership**: Architected and delivered enterprise-scale Business Intelligence Portal unifying SharePoint, Tableau, and MS SQL data sources, implementing MVC/REST architecture with role-based access and NTLM authentication for executives worldwide. • **Mobile Innovation**: Pioneered cross-platform mobile application with Xamarin utilizing geolocation and barcode scanning technologies, integrating with Tableau dashboards for real-time store analytics and product information retrieval. • **Project Management Solutions**: Designed and implemented comprehensive project portfolio management solution featuring custom Gantt visualizations for financial quarter comparison and gap analysis.",
          technologies: [
            ".NET Core",
            "C#",
            "SQL Server",
            "SharePoint",
            "Tableau",
            "Xamarin",
            "MVC/REST",
            "Business Intelligence",
          ],
        },
        {
          title: "Senior .NET Developer",
          company: "AVM L.P.",
          location: "Boca Raton, Florida",
          period: "April 2011 - June 2012",
          description:
            "Architected and implemented mission-critical financial reporting systems for derivatives trading. • **Financial Systems Architecture**: Achieved 100% accuracy in OTC transaction validation through robust real-time data verification. • **Compliance & Security**: Designed and developed secure data export frameworks for OTC and non-OTC derivative products, ensuring compliance with industry standards while maintaining data integrity. • **System Re-architecture**: Led re-architecture of middle-tier systems in ASP.NET and C# for swap-related financial instruments, implementing test-driven development practices with the Moq framework that significantly enhanced platform reliability.",
          technologies: [
            "ASP.NET",
            "C#",
            "SQL Server",
            "Financial Systems",
            "OTC Trading",
            "Moq Framework",
            "TDD",
          ],
        },
        {
          title: "Senior Software Developer",
          company: "ABB Concise",
          location: "Coral Springs, Florida",
          period: "June 2007 - February 2011",
          description:
            "Developed and maintained enterprise e-commerce applications for eye care industry. • **E-commerce Development**: Built ASP.NET applications using C#, SQL Server, Progress DB, and Visual Studio 2010. • **Integration Solutions**: Implemented WCF Services, AJAX controls with jQuery and JavaScript for seamless database and client-side communication. • **Feature Enhancement**: Created new e-commerce features including tiered pricing, coupons, shipping rebates, and auto-reordering systems.",
          technologies: [
            "ASP.NET",
            "C#",
            "SQL Server",
            "WCF Services",
            "AJAX",
            "jQuery",
            "JavaScript",
          ],
        },
        {
          title: "Senior Technical Lead / Developer III",
          company: "Office Depot",
          location: "Delray Beach, Florida",
          period: "November 1998 - January 2005",
          description:
            "Led enterprise systems architecture and e-commerce development for Fortune 500 retailer. • **Enterprise Systems Architecture**: Led architecture and implementation of Oracle Retail MFP platform, integrating predictive analytics with enterprise financial systems. Engineered automated data integration framework connecting disparate enterprise databases (SQL Server, Oracle, DB2, Teradata). Developed comprehensive UNIX process monitoring system utilizing early AJAX implementation for real-time system status. • **Customer Experience Solutions**: Architected ASP-based integration between Rockwell telephony systems and intranet applications. Implemented Genesys libraries in Visual Basic 6.0 for CTI functionality. Developed XML/XSLT document management system for enterprise communications. • **E-commerce & Order Management**: Led full lifecycle development of XML-based order entry intranet application with COM+/ActiveX shopping cart and JavaScript frontend. • **International E-commerce**: Served as Technical Consultant for Viking Direct UK e-commerce implementation, engineering integration between frontend ASP applications and AS/400 business rules through distributed Visual Basic 6.0 middleware.",
          technologies: [
            "Oracle Retail MFP",
            "XML/XSLT",
            "ASP",
            "Visual Basic 6.0",
            "UNIX",
            "COM+/ActiveX",
            "B2B Integration",
          ],
        },
        {
          title: "Information Systems Specialist (RM2/E5)",
          company: "United States Navy",
          location: "East Coast, USA",
          period: "November 1987 - March 1993",
          description:
            "Served during Operation Desert Shield/Desert Storm, developing critical automation and security systems for naval operations. • **Process Automation**: Developed DBase IV program to automate equipment failure tracking and resolution, improving efficiency and saving time and resources. • **Systems Management**: Program tracked failures, parts orders, repair reports, and generated automated reporting across fleet operations. • **Security Leadership**: Responsible for standalone computer security through installation and configuration of security software and policy development.",
          technologies: [
            "DBase IV",
            "Systems Security",
            "Process Automation",
            "Fleet Operations",
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
          title: "American Sign Language (ASL) with Puerto Rican dialect",
          organization: "Ideality group",
          location: "Las Marías, Puerto Rico",
          period: "2024",
          url: "",
        },
        {
          title: "Founding Member",
          organization: "Florida Interscholastic Cycling League",
          location: "Florida",
          period: "March 2018 - January 2020",
          url: "http://FloridaMTB.org",
        },
      ],
    },
    es: {
      experience: [
        {
          title: "Consultor Tecnológico Independiente",
          company: "Trabajo Independiente",
          location: "Mayagüez, Puerto Rico",
          period: "Septiembre 2021 - Presente",
          description:
            "Liderando iniciativas de transformación digital para organizaciones en Puerto Rico, especializado en desarrollo web full-stack con Next.js, TypeScript y tecnologías cloud modernas. • **Gespervis Escuela ASL (2025)**: Arquitecté plataforma integral de aprendizaje ASL en línea usando Next.js 15, TypeScript y PostgreSQL. Logré 70% de reducción en tiempo de desarrollo mediante integración estratégica de base de datos. Construí sistema de autenticación basado en roles, flujos de gestión de cursos y analíticas en tiempo real sirviendo a 13+ usuarios activos. Reduje costos de proyecto en 65% mientras aceleré el cronograma de entrega en 7-8 semanas. • **Café Papamín LLC (2024)**: Desarrollé aplicación e-commerce full-stack con funcionalidad integral de carrito de compras, integración con WhatsApp Business y catálogo de productos responsivo. Logré costo total de proyecto de $620 vs. $3,000+ de plataformas tradicionales, habilitando participación de clientes 24/7. • **Pabellón de la Fama del Deporte Humacaeño (2025)**: Arquitecté plataforma web integral para el Salón de la Fama Deportiva de Humacao. Lideré desarrollo full-stack implementando principios SOLID y programación funcional. Entregué MVP con 8 secciones principales incluyendo directorio de homenajeados con búsqueda, vitrina de museo y calendario de actividades. • **Organización Cultural JAYEI (2024)**: Desarrollé sitio web bilingüe para organización cultural puertorriqueña conectando poetas y artistas internacionales. Construido con Next.js 15 y TypeScript, con galería fotográfica interactiva, carga progresiva y diseño responsivo móvil. • **Desarrollo Blockchain (2021-2023)**: Desarrollé y desplegué aplicaciones blockchain incluyendo prototipo de marketplace NFT usando Solidity y React. Impartí talleres tecnológicos educando profesionales y estudiantes.",
          technologies: [
            "Next.js 15",
            "TypeScript",
            "React 19",
            "PostgreSQL",
            "Tailwind CSS",
            "Solidity",
            "Blockchain",
            "Vercel",
            "SEO",
          ],
        },
        {
          title: "Diseñador de Programa de Transformación Digital / Instructor de Liderazgo",
          company: "MPA Consultants",
          location: "Las Marías y Santurce, Puerto Rico",
          period: "Marzo 2025 - Julio 2025",
          description:
            "Diseñé y entregué programas educativos transformadores para desarrollo profesional en Puerto Rico. • **Programa Las Marías (Mayo-Julio 2025)**: Desarrollé programa intensivo de 150 horas transformando adultos desplazados en profesionales digitales. Innovación pedagógica usó modelo OSI de redes como framework educativo, integrando IA, blockchain y herramientas Microsoft. Resultados: CV ejecutivo, plan de negocio y presencia digital empresarial para cada estudiante, fomentando desarrollo económico local y efecto multiplicador comunitario. • **Programa Liderazgo Santurce (Marzo-Mayo 2025)**: Diseñé e impartí curso intensivo de 70 horas sobre conducta profesional y habilidades para entrevistas, enriqueciendo currículo original con módulos de IA para búsqueda de empleo. Creé material de curso comprensivo incluyendo presentaciones, evaluaciones y ejercicios prácticos. Implementé metodología basada en secuenciación progresiva de conocimiento, logrando tasa de finalización superior al 90%.",
          technologies: [
            "Desarrollo Curricular",
            "Entrenamiento IA",
            "Alfabetización Digital",
            "Herramientas Microsoft",
            "Educación Blockchain",
            "Desarrollo Profesional",
          ],
        },
        {
          title: "Director de Transformación Digital",
          company: "Yukayeke Playa",
          location: "Añasco, Puerto Rico",
          period: "Marzo 2024 - Diciembre 2024",
          description:
            "Lideré iniciativas integrales de modernización digital, arquitectando e implementando una plataforma web multilingüe (ES/EN) utilizando Next.js 14, TypeScript y Tailwind CSS, resultando en mejor experiencia de usuario y presencia en línea. Dirigí la migración desde plataforma heredada (Squarespace) a stack tecnológico moderno alojado en Vercel, implementando principios de internacionalización y diseño responsivo.",
          technologies: [
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "i18n",
            "Vercel",
            "Estrategia de Migración",
          ],
        },
        {
          title: "Especialista en Tecnología Educativa",
          company: "WOTEC",
          location: "Las Marías, Puerto Rico",
          period: "Abril 2024 - Julio 2024",
          description:
            "Diseñé e implementé un curso de destrezas técnicas de 400 horas transformando novatos en profesionales digitales competentes. Desarrollé un curriculum detallado integrando herramientas de IA, programas de productividad y plataformas de colaboración logrando una tasa de finalización del 85%. Creé módulos de aprendizaje personalizados para aplicaciones tecnológicas prácticas, incluyendo análisis de datos y flujos de trabajo automatizados. Asesoré a diversos estudiantes en competencias digitales esenciales.",
          technologies: [
            "Tecnología Educativa",
            "Herramientas IA",
            "Análisis de Datos",
            "Colaboración en la Nube",
            "Tecnologías Web",
            "Diseño Curricular",
          ],
        },
        {
          title: "Arquitecto de Software / Ingeniero de Datos",
          company: "Disney Parks, Experiences and Products",
          location: "Orlando, Florida",
          period: "Noviembre 2015 - Septiembre 2021",
          description:
            "Lideré iniciativas técnicas empresariales como arquitecto principal de software y especialista en ingeniería de datos en operaciones globales de Disney. • **Liderazgo en Arquitectura Empresarial**: Arquitecté y entregué Portal de Inteligencia Empresarial que unificó fuentes de datos de SharePoint, Tableau y MS SQL, permitiendo a ejecutivos acceder a análisis y reportes específicos a través de una única plataforma segura con arquitectura MVC/REST y autenticación NTLM. • **Innovación Móvil**: Desarrollé aplicación móvil piloto que utiliza geolocalización para encontrar la tienda más cercana y escanea códigos UPC para recuperar información de productos en tablero de Tableau. • **Soluciones de Gestión de Proyectos**: Diseñé e implementé solución integral de gestión de portafolio de proyectos con visualizaciones Gantt personalizadas para comparación de trimestres financieros.",
          technologies: [
            ".NET Core",
            "C#",
            "SQL Server",
            "SharePoint",
            "Tableau",
            "Xamarin",
            "MVC/REST",
            "Business Intelligence",
          ],
        },
        {
          title: "Desarrollador Senior .NET",
          company: "AVM L.P.",
          location: "Boca Raton, Florida",
          period: "Abril 2011 - Junio 2012",
          description:
            "Arquitecté e implementé sistemas críticos de reportes financieros para comercio de derivados. • **Arquitectura de Sistemas Financieros**: Logré 100% de precisión en validación de transacciones OTC mediante verificación robusta de datos en tiempo real. • **Cumplimiento y Seguridad**: Diseñé y desarrollé frameworks seguros de exportación de datos para productos derivados OTC y no-OTC, asegurando cumplimiento con estándares de la industria. • **Re-arquitectura del Sistema**: Lideré re-arquitectura de sistemas de nivel medio en ASP.NET y C# para instrumentos financieros relacionados con swaps, implementando prácticas de desarrollo dirigido por pruebas con Moq framework.",
          technologies: [
            "ASP.NET",
            "C#",
            "SQL Server",
            "Sistemas Financieros",
            "Trading OTC",
            "Moq Framework",
            "TDD",
          ],
        },
        {
          title: "Desarrollador de Software Senior",
          company: "ABB Concise",
          location: "Coral Springs, Florida",
          period: "Junio 2007 - Febrero 2011",
          description:
            "Desarrollé y mantuve aplicaciones de comercio electrónico empresariales para la industria del cuidado de la vista. • **Desarrollo E-commerce**: Construí aplicaciones ASP.NET usando C#, SQL Server, Progress DB y Visual Studio 2010. • **Soluciones de Integración**: Implementé Servicios WCF, controles AJAX con jQuery y JavaScript para comunicación fluida entre base de datos y cliente. • **Mejora de Características**: Creé nuevas funciones de comercio electrónico incluyendo precios por niveles, cupones, reembolsos de envío y sistemas de reordenamiento automático.",
          technologies: [
            "ASP.NET",
            "C#",
            "SQL Server",
            "WCF Services",
            "AJAX",
            "jQuery",
            "JavaScript",
          ],
        },
        {
          title: "Desarrollador III / Líder Técnico Senior",
          company: "Office Depot",
          location: "Delray Beach, Florida",
          period: "Noviembre 1998 - Enero 2005",
          description:
            "Lideré arquitectura de sistemas empresariales y desarrollo e-commerce para minorista Fortune 500. • **Arquitectura de Sistemas Empresariales**: Lideré arquitectura e implementación de plataforma Oracle Retail MFP, integrando analíticas predictivas con sistemas financieros empresariales. Diseñé framework de integración automatizada de datos conectando bases de datos empresariales dispares (SQL Server, Oracle, DB2, Teradata). Desarrollé sistema integral de monitoreo de procesos UNIX utilizando implementación temprana de AJAX. • **Soluciones de Experiencia del Cliente**: Arquitecté integración basada en ASP entre sistemas de telefonía Rockwell y aplicaciones intranet. Implementé librerías Genesys en Visual Basic 6.0 para funcionalidad CTI. Desarrollé sistema de gestión de documentos XML/XSLT. • **E-commerce y Gestión de Pedidos**: Lideré desarrollo de ciclo completo de aplicación intranet de entrada de pedidos basada en XML con carrito de compras COM+/ActiveX. • **E-commerce Internacional**: Serví como Consultor Técnico para implementación e-commerce Viking Direct UK, diseñando integración entre aplicaciones ASP frontend y reglas de negocio AS/400.",
          technologies: [
            "Oracle Retail MFP",
            "XML/XSLT",
            "ASP",
            "Visual Basic 6.0",
            "UNIX",
            "COM+/ActiveX",
            "Integración B2B",
          ],
        },
        {
          title: "Oficial de Seguridad de la Información (RM2/E5)",
          company: "Armada Naval de los Estados Unidos",
          location: "Costa Este, USA",
          period: "Noviembre 1987 - Marzo 1993",
          description:
            "Serví durante Operación Escudo del Desierto/Tormenta del Desierto, desarrollando sistemas críticos de automatización y seguridad para operaciones navales. • **Automatización de Procesos**: Desarrollé programa en DBase IV para automatizar seguimiento y resolución de fallas de equipos, mejorando eficiencia y ahorrando tiempo y recursos. • **Gestión de Sistemas**: El programa rastreaba fallas, pedidos de repuestos, informes de reparación y generaba reportes automatizados a través de operaciones de flota. • **Liderazgo en Seguridad**: Responsable de seguridad de computadoras independientes mediante instalación y configuración de software de seguridad y desarrollo de políticas.",
          technologies: [
            "DBase IV",
            "Seguridad de Sistemas",
            "Automatización de Procesos",
            "Operaciones de Flota",
          ],
        },
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
          title:
            "Lenguaje de Señas Americano (ASL) con dialecto puertorriqueño",
          organization: "Grupo Ideality",
          location: "Las Marías, Puerto Rico",
          period: "2024",
          url: "",
        },
        {
          title: "Miembro Fundador",
          organization: "Florida Interscholastic Cycling League",
          location: "Florida",
          period: "Marzo 2018 - Enero 2020",
          url: "http://FloridaMTB.org",
        },
      ],
    },
  };

  const currentLanguageData = experiences[language];

  // Disney is at index 4 (5th position), so we'll show up to Disney (inclusive) initially
  const disneyIndex = currentLanguageData.experience.findIndex(item =>
    item.company.toLowerCase().includes("disney")
  );
  const experiencesToShow = showAllExperiences
    ? currentLanguageData.experience
    : currentLanguageData.experience.slice(0, disneyIndex + 1);

  // Show only Ellis University degree initially for education
  const educationToShow = showAllEducation
    ? currentLanguageData.education
    : currentLanguageData.education.slice(0, 1);

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
              {language === "en" ? "Professional Journey" : "Trayectoria Profesional"}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "en"
              ? "A comprehensive timeline of my career progression, highlighting key achievements and technological evolution across leading organizations."
              : "Una cronología integral de mi progresión profesional, destacando logros clave y evolución tecnológica en organizaciones líderes."}
          </p>
        </div>

        <div className="relative mb-20">
          {experiencesToShow.map((item, index) => (
            <ExperienceItem
              key={`${item.company}-${item.title}-${index}`}
              {...item}
              index={index}
            />
          ))}

          {/* Read More Button for Experience List */}
          {!showAllExperiences && disneyIndex !== -1 && disneyIndex < currentLanguageData.experience.length - 1 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllExperiences(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full font-medium transition-all duration-300 hover:scale-105 professional-shadow"
              >
                {language === "en" ? "Read More Experiences" : "Ver Más Experiencias"}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            {language === "en" ? "Education" : "Educación"}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-gradient block">
            {language === "en" ? "Academic Foundation" : "Formación Académica"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "en"
              ? "Educational milestones that shaped my technical expertise and analytical thinking."
              : "Hitos educativos que formaron mi experiencia técnica y pensamiento analítico."}
          </p>
        </div>

        <div className="relative mb-20">
          {educationToShow.map((item, index) => (
            <EducationItem
              key={`${item.institution}-${item.degree}-${index}`}
              {...item}
              index={index}
            />
          ))}

          {/* Read More Button for Education */}
          {!showAllEducation && currentLanguageData.education.length > 1 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllEducation(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full font-medium transition-all duration-300 hover:scale-105 professional-shadow"
              >
                {language === "en" ? "Read More Education" : "Ver Más Educación"}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            {language === "en" ? "Certifications" : "Certificaciones"}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-gradient block">
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
