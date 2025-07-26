// components/experience.tsx
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
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
}

interface EducationItemProps {
  degree: string;
  institution: string;
  location: string;
  period: string;
  honors?: string;
}

interface CertificationItemProps {
  title: string;
  organization: string;
  location: string;
  period: string;
  url?: string;
}

// Experience item component
const ExperienceItem = ({
  title,
  company,
  location,
  period,
  description,
  technologies,
}: ExperienceItemProps) => {
  return (
    <div className="relative pl-8 not-last:pb-12 group">
      {/* Timeline line */}
      <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-6">
        <div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary bg-background" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center">
            <Briefcase className="size-5 text-muted-foreground" />
          </div>
          <span className="text-lg font-semibold">{company}</span>
        </div>
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

// Education item component
const EducationItem = ({
  degree,
  institution,
  location,
  period,
  honors,
}: EducationItemProps) => {
  return (
    <div className="relative pl-8 not-last:pb-12 group">
      {/* Timeline line */}
      <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-6">
        <div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary bg-background" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center">
            <GraduationCap className="size-5 text-muted-foreground" />
          </div>
          <span className="text-lg font-semibold">{institution}</span>
        </div>
        <div>
          <h3 className="text-xl font-medium">{degree}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{location}</span>
            </div>
          </div>
          {honors && <p className="text-primary font-medium mt-1">{honors}</p>}
        </div>
      </div>
    </div>
  );
};

// Certification item component
const CertificationItem = ({
  title,
  organization,
  location,
  period,
  url,
}: CertificationItemProps) => {
  const { language } = useLanguage();

  return (
    <div className="relative pl-8 not-last:pb-12 group">
      {/* Timeline line */}
      <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-6">
        <div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary bg-background" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center">
            <Award className="size-5 text-muted-foreground" />
          </div>
          <span className="text-lg font-semibold">{organization}</span>
        </div>
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-primary hover:underline"
          >
            {language === "en" ? "Visit website" : "Visitar sitio web"}
          </a>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Define experiences data with language-specific content including new experiences
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
            "Educational Framework Design",
            "OSI Network Model",
            "AI Integration",
            "Blockchain Education",
            "Microsoft Tools",
            "Digital Transformation",
          ],
        },
        {
          title: "Leadership Instructor",
          company: "MPA Consultants",
          location: "Santurce, Puerto Rico",
          period: "March 2025 - May 2025",
          description:
            "Designed and taught a 70-hour intensive course on professional behavior and interviewing skills, enriching the original curriculum with modules on AI for job search. Created comprehensive course material including presentations, assessments and practical exercises that promoted active discussion and student participation. Implemented methodology based on progressive sequencing of knowledge, achieving a course completion rate above 90%.",
          technologies: [
            "Instructional Design",
            "AI for Recruitment",
            "Technical Presentations",
            "Competency Assessment",
            "Course Development",
            "Educational Methodology",
          ],
        },
        {
          title: "Digital Transformation Director",
          company: "Yukayeke Playa",
          location: "Añasco, Puerto Rico",
          period: "March 2024 - December 2024",
          description:
            "Led comprehensive digital modernization initiatives, architecting and implementing a multilingual (ES/EN) web platform using Next.js 14, TypeScript, and Tailwind CSS, resulting in enhanced user experience and improved online presence. Designed and currently implementing (as external consultant) a proprietary booking system architecture utilizing Rust and modern web technologies to streamline operations and enhance guest engagement. Spearheaded migration from legacy platform (Squarespace) to modern tech stack hosted on Vercel.",
          technologies: [
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "Rust",
            "Vercel",
            "Internationalization",
            "System Architecture",
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
            "Desarrollé un programa intensivo de 150 horas transformando adultos desplazados en profesionales digitales. Innovación pedagógica: usé modelo OSI de redes como framework educativo. Integré IA, blockchain y herramientas Microsoft. Resultados: CV ejecutivo, plan de negocio, presencia digital empresarial para cada estudiante. Impacto: desarrollo económico local + efecto multiplicador comunitario.",
          technologies: [
            "Diseño de Marco Educativo",
            "Modelo OSI de Redes",
            "Integración de IA",
            "Educación Blockchain",
            "Herramientas Microsoft",
            "Transformación Digital",
          ],
        },
        {
          title: "Instructor de Liderazgo",
          company: "MPA Consultants",
          location: "Santurce, Puerto Rico",
          period: "Marzo 2025 - Mayo 2025",
          description:
            "Diseñé e impartí curso intensivo de 70 horas sobre conducta profesional y habilidades para entrevistas, enriqueciendo el currículo original con módulos sobre IA para búsqueda de empleo. Creé material didáctico comprensible incluyendo presentaciones, evaluaciones y ejercicios prácticos que promovieron discusión activa y participación estudiantil. Implementé metodología basada en secuenciación progresiva del conocimiento, logrando una tasa de finalización del curso superior al 90%.",
          technologies: [
            "Diseño Instruccional",
            "IA para Reclutamiento",
            "Presentaciones Técnicas",
            "Evaluación de Competencias",
            "Desarrollo de Cursos",
            "Metodología Educativa",
          ],
        },
        {
          title: "Director de Transformación Digital",
          company: "Yukayeke Playa",
          location: "Añasco, Puerto Rico",
          period: "Marzo 2024 - Diciembre 2024",
          description:
            "Lideré iniciativas integrales de modernización digital, arquitectando e implementando una plataforma web multilingüe (ES/EN) utilizando Next.js 14, TypeScript y Tailwind CSS, resultando en una mejor experiencia de usuario y presencia en línea. Diseñé y actualmente implemento (como consultor externo) una arquitectura propietaria de sistema de reservas utilizando Rust y tecnologías web modernas para optimizar operaciones y mejorar la participación de huéspedes. Dirigí la migración desde plataforma heredada (Squarespace) a stack tecnológico moderno alojado en Vercel.",
          technologies: [
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "Rust",
            "Vercel",
            "Internacionalización",
            "Arquitectura de Sistemas",
          ],
        },
        {
          title: "Especialista en Tecnología Educativa",
          company: "WOTEC",
          location: "Las Marías, Puerto Rico",
          period: "Abril 2024 - Julio 2024",
          description:
            "Diseñé e implementé un programa de alfabetización técnica de 400 horas transformando novatos en profesionales digitalmente competentes. Desarrollé un currículo integral integrando herramientas de IA, software de productividad y plataformas de colaboración logrando una tasa de finalización del 85%. Creé módulos de aprendizaje personalizados para aplicaciones prácticas de tecnología, incluyendo análisis de datos y flujos de trabajo automatizados. Mentoré a estudiantes diversos en competencias digitales esenciales incluyendo colaboración en la nube y tecnologías web.",
          technologies: [
            "Desarrollo Curricular",
            "Entrenamiento en Herramientas IA",
            "Alfabetización Digital",
            "Colaboración en la Nube",
            "Análisis de Datos",
            "Flujos de Trabajo Automatizados",
          ],
        },
        {
          title: "Consultor Independiente de Tecnología",
          company: "Independiente",
          location: "Mayagüez, Puerto Rico",
          period: "Septiembre 2021 - Presente",
          description:
            "Creé y continúo manteniendo el sitio web para Café Papamín en San Sebastián. Desarrollé e implementé aplicaciones blockchain incluyendo un prototipo de mercado NFT usando Solidity y React. Conduje talleres de tecnología educando profesionales y estudiantes sobre fundamentos blockchain y desarrollo de contratos inteligentes. Construí aplicaciones web personalizadas para pequeñas empresas usando Next.js y TypeScript, implementando prácticas modernas de UI/UX.",
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
          title: "Ingeniero de Software Principal",
          company: "Disney Parks, Experiences and Products",
          location: "Orlando, Florida",
          period: "Noviembre 2015 - Septiembre 2021",
          description:
            "Lideré iniciativas técnicas empresariales como arquitecto principal de software y especialista en ingeniería de datos en Disney Parks, sirviendo como el único ingeniero de software para proyectos críticos de inteligencia empresarial. Arquitecté y entregué un Portal de Inteligencia Empresarial a escala empresarial unificando fuentes de datos de SharePoint, Tableau y MS SQL, implementando una arquitectura MVC/REST que habilitó acceso basado en roles autenticando con NTLM para ejecutivos a través de las operaciones globales de Disney. Fui pionero en una aplicación móvil multiplataforma con Xamarin utilizando geolocalización y tecnologías de escaneo de códigos de barras.",
          technologies: [
            ".NET Core",
            "C#",
            "SQL Server",
            "SharePoint",
            "Tableau",
            "Xamarin",
            "Arquitectura API",
            "Integración de Sistemas",
          ],
        },
        {
          title: "Desarrollador Senior .NET",
          company: "AVM L.P.",
          location: "Boca Raton, Florida",
          period: "Abril 2011 - Junio 2012",
          description:
            "Arquitecté e implementé sistemas de informes financieros críticos para el comercio de derivados, logrando 100% de precisión en la validación de transacciones OTC a través de verificación robusta de datos en tiempo real. Diseñé y desarrollé marcos de exportación de datos seguros para productos derivados OTC y no-OTC, asegurando el cumplimiento con estándares de la industria mientras mantenía la integridad de los datos. Lideré la re-arquitectura de sistemas de nivel medio en ASP.NET y C# para instrumentos financieros relacionados con swaps.",
          technologies: [
            ".NET",
            "C#",
            "SQL",
            "Sistemas Financieros",
            "Comercio OTC",
            "Verificación de Datos",
            "Framework Moq",
          ],
        },
        {
          title: "Desarrollador de Software Senior",
          company: "ABB Concise",
          location: "Coral Springs, Florida",
          period: "Junio 2007 - Febrero 2011",
          description:
            "Desarrollé y mantuve aplicaciones de comercio electrónico ASP.NET para cuidado ocular usando C#, SQL Server, Progress DB y Visual Studio 2010. Implementé Servicios WCF, controles AJAX con JQuery y JavaScript para comunicación de base de datos y del lado del cliente. Creé nuevas características de comercio electrónico como precios escalonados, cupones, reembolsos de envío y reordenamiento automático.",
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
          title: "Líder Técnico Senior / Desarrollador III",
          company: "Office Depot",
          location: "Delray Beach, Florida",
          period: "Noviembre 1998 - Enero 2005",
          description:
            "Lideré la arquitectura e implementación de la plataforma Oracle Retail MFP, integrando análisis predictivos con sistemas financieros empresariales. Diseñé un marco de integración de datos automatizado conectando bases de datos empresariales dispares (SQL Server, Oracle, DB2, Teradata). Desarrollé un sistema de monitoreo de procesos UNIX en tiempo real utilizando una implementación temprana de AJAX. Arquitecté la integración basada en ASP entre sistemas de telefonía Rockwell y aplicaciones de intranet.",
          technologies: [
            "Oracle",
            "XML",
            "ASP",
            "UNIX",
            "Integración B2B",
            "Arquitectura Empresarial",
            "Análisis Predictivos",
          ],
        },
        {
          title: "Oficial de Seguridad de la Información (RM2/E5)",
          company: "Armada Naval de los Estados Unidos",
          location: "Costa Este, EE.UU.",
          period: "Junio 2007 - Febrero 2011",
          description:
            "Desarrollé programas para automatizar el seguimiento y resolución de averías que mejoraron la eficiencia y ahorraron tiempo y recursos. Fui responsable de la seguridad de computadoras mediante la instalación y configuración de software de seguridad y el desarrollo de políticas.",
          technologies: [
            "DBase IV",
            "Seguridad de Sistemas",
            "Automatización de Procesos",
            "Gestión de Infraestructura",
          ],
        },
      ],
      education: [
        {
          degree: "Maestría en Informática",
          institution: "Ellis University",
          location: "Online",
          period: "2009 - 2010",
          honors: "Magna Cum Laude",
        },
        {
          degree: "Bachillerato en Informática",
          institution: "New York Institute of Technology",
          location: "Online",
          period: "2006 - 2007",
          honors: "Cum Laude",
        },
        {
          degree: "Cursos en Informática",
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
          organization: "Ideality group",
          location: "Las Marías, Puerto Rico",
          period: "2024",
          url: "",
        },
      ],
    },
  };

  // Select data based on current language
  const currentLanguageData = experiences[language];

  return (
    <section id="experience" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        {/* Experience Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {t.experience}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t.professionalCareer}
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            {t.careerTimeline}
          </p>
        </div>

        <div className="relative mb-16">
          {currentLanguageData.experience.map((item, index) => (
            <ExperienceItem
              key={`${item.company}-${item.title}-${index}`}
              {...item}
            />
          ))}
        </div>

        {/* Education Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {t.education}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {language === "en" ? "Academic Background" : "Formación Académica"}
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            {language === "en"
              ? "Educational foundation and achievements"
              : "Base educativa y logros académicos"}
          </p>
        </div>

        <div className="relative mb-16">
          {currentLanguageData.education.map((item, index) => (
            <EducationItem
              key={`${item.institution}-${item.degree}-${index}`}
              {...item}
            />
          ))}
        </div>

        {/* Certifications Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {language === "en" ? "Certifications" : "Certificaciones"}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {language === "en"
              ? "Professional Recognition"
              : "Reconocimiento Profesional"}
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            {language === "en"
              ? "Achievements and community involvement"
              : "Logros y participación comunitaria"}
          </p>
        </div>

        <div className="relative">
          {currentLanguageData.certifications.map((item, index) => (
            <CertificationItem
              key={`${item.organization}-${item.title}-${index}`}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
