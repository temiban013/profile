import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, MapPin, BookOpen, Award } from "lucide-react";

// Define types for each section
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
  honors: string;
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
            <Building2 className="size-5 text-muted-foreground" />
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
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
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
            <BookOpen className="size-5 text-muted-foreground" />
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
        </div>
        {honors && (
          <div className="flex items-center gap-2">
            <Award className="size-4 text-amber-500" />
            <p className="text-muted-foreground font-medium">{honors}</p>
          </div>
        )}
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
            Visitar sitio web
          </a>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      section: "experience",
      items: [
        {
          title: "Instructor de Liderazgo",
          company: "MPA Consultants",
          location: "Lares, Puerto Rico",
          period: "Marzo 2025 - Mayo 2025",
          description:
            "Diseñé e impartí curso intensivo de 70 horas sobre conducta profesional y habilidades para entrevistas, enriqueciendo el currículo original con módulos sobre IA para búsqueda de empleo. Implementé metodología basada en secuenciación progresiva del conocimiento, logrando una tasa de finalización superior al 90%.",
          technologies: [
            "Diseño Instruccional",
            "IA para Reclutamiento",
            "Presentaciones Técnicas",
            "Evaluación de Competencias",
          ],
        },
        {
          title: "Director de Transformación Digital",
          company: "Yukayeke Playa",
          location: "Añasco, Puerto Rico",
          period: "Marzo 2024 - Diciembre 2024",
          description:
            "Lideré la renovación digital completa de Yukayeke Playa Resort, arquitectando e implementando una plataforma web bilingüe (ES/EN) utilizando Next.js 14, TypeScript y CSS modular con internacionalización dinámica. Diseñé e implementé un sistema de enrutamiento inteligente con detección automática de idioma basado en preferencias del navegador.",
          technologies: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Vercel",
            "Internacionalización",
          ],
        },
        {
          title: "Arquitecto de Software / Ingeniero de Datos",
          company: "Disney Parks, Experiences and Products",
          location: "Orlando, Florida",
          period: "Noviembre 2015 - Septiembre 2021",
          description:
            "Arquitecté y entregué un Portal de Inteligencia Empresarial que unificó fuentes de datos de SharePoint, Tableau y MS SQL, permitiendo a ejecutivos acceder a análisis y reportes específicos a través de una única plataforma segura. Desarrollé aplicaciones móviles utilizando geolocalización e integración con sistemas de análisis de datos.",
          technologies: [
            ".NET Core",
            "C#",
            "SQL Server",
            "SharePoint",
            "Tableau",
            "Arquitectura de APIs",
            "Integración de Sistemas",
          ],
        },
        {
          title: "Desarrollador Senior .NET",
          company: "AVM L.P.",
          location: "Boca Raton, Florida",
          period: "Abril 2011 - Junio 2012",
          description:
            "Mantuve aplicaciones .NET para reportes financieros utilizando grillas de datos avanzadas. Participé en la exportación a terceros de datos financieros representando productos derivados y colaboré en la re-arquitectura del nivel intermedio para la valoración de instrumentos financieros.",
          technologies: [
            ".NET",
            "C#",
            "SQL",
            "Integración Financiera",
            "Janus UI Controls",
          ],
        },
        {
          title: "Desarrollador de Software Senior",
          company: "ABB Concise",
          location: "Coral Springs, Florida",
          period: "Junio 2007 - Febrero 2011",
          description:
            "Desarrollé y mantuve aplicaciones de comercio electrónico ASP.NET para el cuidado de la vista utilizando tecnologías Microsoft. Implementé Servicios WCF, controles AJAX con JQuery y creé nuevas funciones de comercio electrónico como precios por niveles y reordenamiento automático.",
          technologies: [
            "ASP.NET",
            "C#",
            "SQL Server",
            "Progress DB",
            "WCF",
            "jQuery",
            "JavaScript",
          ],
        },
        {
          title: "Desarrollador III",
          company: "Office Depot",
          location: "Delray Beach, Florida",
          period: "Noviembre 1998 - Enero 2005",
          description:
            "Lideré la implementación de la aplicación Oracle Retail MFP para planificación financiera de mercadería. Dirigí la integración de tecnología CTI con aplicaciones intranet y lideré el ciclo completo de desarrollo de aplicaciones de ingreso de pedidos basadas en XML.",
          technologies: [
            "Oracle",
            "XML",
            "ASP",
            "Integración B2B",
            "Arquitectura de Sistemas",
          ],
        },
        {
          title: "Oficial de Seguridad de la Información (RM2/E5)",
          company: "Armada Naval de los Estados Unidos (NAVY)",
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
    },
    {
      section: "education",
      items: [
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
    },
    {
      section: "certifications",
      items: [
        {
          title: "Miembro Fundador",
          organization: "Florida Interscholastic Cycling League",
          location: "Florida",
          period: "Presente",
          url: "http://FloridaMTB.org",
        },
        {
          title:
            "Lenguage de Señas Americano (ASL) con dialecto puertorriqueño",
          organization: "Ideality group",
          location: "Las Marías, Puerto Rico",
          period: "2024",
          url: "",
        },
      ],
    },
  ];

  // Find each section for rendering with explicit type assertions
  const experienceItems = (experiences.find(
    (section) => section.section === "experience"
  )?.items || []) as ExperienceItemProps[];

  const educationItems = (experiences.find(
    (section) => section.section === "education"
  )?.items || []) as EducationItemProps[];

  const certificationItems = (experiences.find(
    (section) => section.section === "certifications"
  )?.items || []) as CertificationItemProps[];

  return (
    <section id="experience" className="relative py-20 px-6">
      <div className="max-w-screen-md mx-auto">
        {/* Experience Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Experiencia
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Carrera Profesional
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            Cronología de mi crecimiento profesional y logros
          </p>
        </div>

        <div className="relative mb-16">
          {experienceItems.map((item) => (
            <ExperienceItem
              key={`${item.company}-${item.title}-${item.period}`}
              {...item}
            />
          ))}
        </div>

        {/* Education Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Educación
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Formación Académica
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            Bases sólidas para un desarrollo profesional continuo
          </p>
        </div>

        <div className="relative mb-16">
          {educationItems.map((item) => (
            <EducationItem
              key={`${item.degree}-${item.institution}`}
              {...item}
            />
          ))}
        </div>

        {/* Certifications Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Certificaciones y Afiliaciones
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Reconocimientos y Participación
          </h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            Desarrollo continuo y contribuciones a la comunidad
          </p>
        </div>

        <div className="relative">
          {certificationItems.map((item) => (
            <CertificationItem
              key={`${item.title}-${item.organization}`}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
