"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import('@/components/pdf-viewer').then(mod => ({ default: mod.PDFViewer })),
  { ssr: false }
);
import {
  Code,
  Database,
  Globe,
  Lightbulb,
  Rocket,
  Users,
  Download,
  Coffee,
  Target,
  Brain,
  Award,
  GraduationCap,
  Medal,
  Star,
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import { useState, useEffect, memo } from "react";
import { ChevronDown } from "lucide-react";

// Animated Statistics Component
const AnimatedStat = memo(function AnimatedStat({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      className={`text-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="text-3xl font-bold text-primary">
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
});

// Skill Item Component
const SkillItem = memo(function SkillItem({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

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
    >
      <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:professional-shadow-lg">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
});

// Technology Badge Component
const TechBadge = memo(function TechBadge({ tech, delay = 0 }: { tech: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Badge
      variant="secondary"
      className={`px-4 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {tech}
    </Badge>
  );
});

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllCredentials, setShowAllCredentials] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const skills = {
    en: [
      {
        icon: Code,
        title: "Full-Stack Development",
        description:
          "Expert in modern web technologies including Next.js, TypeScript, React, and Node.js. Building scalable applications from conception to deployment.",
      },
      {
        icon: Database,
        title: "Enterprise Systems",
        description:
          "25+ years architecting enterprise-grade solutions with SQL Server, Oracle, and PostgreSQL. Expertise in system integration and data architecture.",
      },
      {
        icon: Rocket,
        title: "Performance Optimization",
        description:
          "Specialized in creating high-performance applications with advanced caching strategies, code splitting, and modern optimization techniques.",
      },
      {
        icon: Users,
        title: "Team Leadership",
        description:
          "Proven track record leading technical teams at Disney and other enterprises. Mentoring developers and driving architectural decisions.",
      },
      {
        icon: Globe,
        title: "Modern Web Technologies",
        description:
          "Passionate about cutting-edge technologies including Rust, blockchain development, and progressive web applications.",
      },
      {
        icon: Lightbulb,
        title: "Innovation & Strategy",
        description:
          "Bridging business requirements with technical solutions. Expert in translating complex business needs into scalable software architectures.",
      },
    ],
    es: [
      {
        icon: Code,
        title: "Desarrollo Full-Stack",
        description:
          "Experto en tecnologías web modernas incluyendo Next.js, TypeScript, React y Node.js. Construyendo aplicaciones escalables desde la concepción hasta el despliegue.",
      },
      {
        icon: Database,
        title: "Sistemas Empresariales",
        description:
          "25+ años arquitectando soluciones de nivel empresarial con SQL Server, Oracle y PostgreSQL. Expertise en integración de sistemas y arquitectura de datos.",
      },
      {
        icon: Rocket,
        title: "Optimización de Rendimiento",
        description:
          "Especializado en crear aplicaciones de alto rendimiento con estrategias de cache avanzadas, división de código y técnicas de optimización modernas.",
      },
      {
        icon: Users,
        title: "Liderazgo de Equipos",
        description:
          "Historial comprobado liderando equipos técnicos en Disney y otras empresas. Mentoreo de desarrolladores y dirección de decisiones arquitectónicas.",
      },
      {
        icon: Globe,
        title: "Tecnologías Web Modernas",
        description:
          "Apasionado por tecnologías de vanguardia incluyendo Rust, desarrollo blockchain y aplicaciones web progresivas.",
      },
      {
        icon: Lightbulb,
        title: "Innovación y Estrategia",
        description:
          "Conectando requerimientos de negocio con soluciones técnicas. Experto en traducir necesidades complejas de negocio en arquitecturas de software escalables.",
      },
    ],
  };

  const technologies = [
    "Claude Code",
    "AI-Assisted Dev",
    "Multi-Agent",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "C#",
    ".NET",
    "SQL Server",
    "Blockchain",
    "Solidity",
    "Tailwind CSS",
    "Vercel",
  ];

  const certifications = {
    en: [
      {
        icon: GraduationCap,
        title: "MS Computer Science",
        issuer: "Ellis University",
        year: "Magna Cum Laude",
        description: "Advanced studies in software engineering, algorithms, and system architecture",
      },
      {
        icon: Medal,
        title: "Enterprise Architecture",
        issuer: "Disney Parks & Resorts",
        year: "2010-2018",
        description: "Led enterprise-level system architecture and integration projects",
      },
      {
        icon: GraduationCap,
        title: "BS Computer Science",
        issuer: "NY Institute of Technology",
        year: "Cum Laude",
        description: "Foundation in computer science with focus on software development",
      },
      {
        icon: Award,
        title: "Enterprise Software Development",
        issuer: "Office Depot Corporate",
        year: "2005-2015",
        description: "Led enterprise-level .NET Framework and SQL Server development projects",
      },
    ],
    es: [
      {
        icon: GraduationCap,
        title: "MS Ciencias de la Computación",
        issuer: "Ellis University",
        year: "Magna Cum Laude",
        description: "Estudios avanzados en ingeniería de software, algoritmos y arquitectura de sistemas",
      },
      {
        icon: Medal,
        title: "Arquitectura Empresarial",
        issuer: "Disney Parks & Resorts",
        year: "2010-2018",
        description: "Lideré proyectos de arquitectura de sistemas e integración de nivel empresarial",
      },
      {
        icon: GraduationCap,
        title: "BS Ciencias de la Computación",
        issuer: "NY Institute of Technology",
        year: "Cum Laude",
        description: "Base en ciencias de la computación con enfoque en desarrollo de software",
      },
      {
        icon: Award,
        title: "Desarrollo de Software Empresarial",
        issuer: "Office Depot Corporate",
        year: "2005-2015",
        description: "Lideré proyectos de desarrollo empresarial con .NET Framework y SQL Server",
      },
    ],
  };

  const achievements = {
    en: [
      {
        icon: Medal,
        title: "Office Depot Financial Systems",
        metric: "Cross-Platform Architecture Leadership",
        description: "Delivered solutions spanning Oracle, XML/XSLT, UNIX, telephony integration, and e-commerce platforms",
      },
      {
        icon: Star,
        title: "Modern Web Development Excellence",
        metric: "Next.js 15 + TypeScript Mastery",
        description: "Leading digital transformation with cutting-edge web technologies and modern development practices",
      },
      {
        icon: Award,
        title: "Disney Enterprise Systems",
        metric: "Global Executive BI Portal",
        description: "Architected comprehensive Business Intelligence platform unifying SharePoint, Tableau, and SQL Server for Disney executives worldwide",
      },
      {
        icon: Star,
        title: "Modern Stack Transition",
        metric: "Legacy to Modern Migration",
        description: "Successfully transitioned from Microsoft ecosystem to cutting-edge web technologies",
      },
    ],
    es: [
      {
        icon: Medal,
        title: "Sistemas Financieros Office Depot",
        metric: "Liderazgo Arquitectura Multi-Plataforma",
        description: "Entregué soluciones abarcando Oracle, XML/XSLT, UNIX, integración telefónica y plataformas e-commerce",
      },
      {
        icon: Star,
        title: "Excelencia Desarrollo Web Moderno",
        metric: "Maestría Next.js 15 + TypeScript",
        description: "Liderando transformación digital con tecnologías web de vanguardia y prácticas de desarrollo modernas",
      },
      {
        icon: Award,
        title: "Sistemas Empresariales Disney",
        metric: "Portal BI Ejecutivo Global",
        description: "Arquitecté plataforma integral de Business Intelligence unificando SharePoint, Tableau y SQL Server para ejecutivos Disney mundialmente",
      },
      {
        icon: Star,
        title: "Transición Stack Moderno",
        metric: "Migración Legacy a Moderno",
        description: "Transicioné exitosamente del ecosistema Microsoft a tecnologías web de vanguardia",
      },
    ],
  };

  const currentSkills = skills[language];
  const skillsToShow = showAllSkills ? currentSkills : currentSkills.slice(0, 3);
  const credentialsToShow = showAllCredentials ? certifications[language] : certifications[language].slice(0, 2);
  const achievementsToShow = showAllAchievements ? achievements[language] : achievements[language].slice(0, 2);

  return (
    <section id="about" className="py-20 scroll-mt-16">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            {t.about}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="text-gradient">
              {language === "en" ? "Crafting Digital" : "Creando Soluciones"}
            </span>
            <br />
            {language === "en" ? "Excellence" : "Digitales Excepcionales"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "en"
              ? "With over 20 years of software engineering experience, I specialize in AI-assisted development and full-stack solutions. Architected multi-agent orchestration systems with Claude Code, managing concurrent projects while delivering innovative educational technology and digital transformation solutions."
              : "Con más de 20 años de experiencia en ingeniería de software, me especializo en desarrollo asistido por IA y soluciones full-stack. Arquitecté sistemas de orquestación multi-agente con Claude Code, gestionando proyectos concurrentes mientras entrego soluciones innovadoras de tecnología educativa y transformación digital."}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <AnimatedStat
            value={20}
            label={
              language === "en" ? "Years Experience" : "Años de Experiencia"
            }
            suffix="+"
            delay={0}
          />
          <AnimatedStat
            value={50}
            label={
              language === "en" ? "Projects Delivered" : "Proyectos Entregados"
            }
            suffix="+"
            delay={200}
          />
          <AnimatedStat
            value={15}
            label={
              language === "en"
                ? "Technologies Mastered"
                : "Tecnologías Dominadas"
            }
            suffix="+"
            delay={400}
          />
          <AnimatedStat
            value={100}
            label={language === "en" ? "Success Rate" : "Tasa de Éxito"}
            suffix="%"
            delay={600}
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Story */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Coffee className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">
                {language === "en" ? "My Journey" : "Mi Trayectoria"}
              </h3>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
              <p>
                {language === "en"
                  ? "My journey began in 1987 when I taught myself dBASE IV programming while serving in the U.S. Navy. After my service, I transitioned into Unix system administration at JMH Health Plan while pursuing my computer science education. This dual path of hands-on experience and formal study laid the foundation for two decades in the Microsoft ecosystem—from Visual Basic 6.0 and classic ASP at Office Depot to enterprise C# and .NET architecture at Disney."
                  : "Mi viaje comenzó en 1987 cuando aprendí programación en dBASE IV de manera autodidacta mientras servía en la Marina de EE.UU. Después de mi servicio, transicioné a administración de sistemas Unix en JMH Health Plan mientras cursaba mi educación en ciencias de la computación. Este camino dual de experiencia práctica y estudios formales sentó las bases para dos décadas en el ecosistema Microsoft—desde Visual Basic 6.0 y ASP clásico en Office Depot hasta arquitectura empresarial C# y .NET en Disney."}
              </p>
              <p>
                {language === "en"
                  ? "Today, as an independent consultant, I leverage Claude Code and agentic programming to deliver solutions that traditionally require entire development teams. Using Next.js, TypeScript, and multi-agent orchestration, I manage multiple concurrent projects while maintaining the quality and reliability that enterprise clients expect."
                  : "Hoy, como consultor independiente, aprovecho Claude Code y programación agéntica para entregar soluciones que tradicionalmente requieren equipos de desarrollo completos. Usando Next.js, TypeScript y orquestación multi-agente, gestiono múltiples proyectos concurrentes manteniendo la calidad y confiabilidad que los clientes empresariales esperan."}
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Button
                className="rounded-full professional-shadow hover:professional-shadow-lg transition-all duration-300"
                onClick={() => setShowPDFViewer(true)}
              >
                <Download className="w-4 h-4 mr-2" />
                {language === "en" ? "Download Resume" : "Descargar CV"}
              </Button>
              <Button
                variant="outline"
                className="rounded-full professional-shadow hover:professional-shadow-lg transition-all duration-300"
                asChild
              >
                <a href="#projects">
                  <Target className="w-4 h-4 mr-2" />
                  {language === "en" ? "View Projects" : "Ver Proyectos"}
                </a>
              </Button>
            </div>
          </div>

          {/* Philosophy */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">
                {language === "en"
                  ? "Development Philosophy"
                  : "Filosofía de Desarrollo"}
              </h3>
            </div>
            <div className="glass-effect rounded-2xl p-8">
              <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "Technology should serve business goals, not the other way around. My approach focuses on creating solutions that are not just technically excellent, but also practical, maintainable, and aligned with real-world business needs."
                  : "La tecnología debe servir a los objetivos de negocio, no al revés. Mi enfoque se centra en crear soluciones que no son solo técnicamente excelentes, sino también prácticas, mantenibles y alineadas con necesidades reales de negocio."}
              </blockquote>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">MA</span>
                </div>
                <div>
                  <div className="font-semibold">Mario Rafael Ayala</div>
                  <div className="text-sm text-muted-foreground">
                    {language === "en"
                      ? "Senior Software Engineer"
                      : "Ingeniero de Software Senior"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gradient block">
            {language === "en"
              ? "Core Competencies"
              : "Competencias Principales"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsToShow.map((skill, index) => (
              <SkillItem
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Read More Button for Skills */}
          {!showAllSkills && currentSkills.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllSkills(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full font-medium transition-all duration-300 hover:scale-105 professional-shadow"
                aria-expanded={false}
                aria-label={language === "en" ? "Show all competencies" : "Mostrar todas las competencias"}
              >
                {language === "en" ? "Show More Competencies" : "Ver Más Competencias"}
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Professional Certifications */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gradient block">
            {language === "en"
              ? "Professional Credentials"
              : "Credenciales Profesionales"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {credentialsToShow.map((cert) => (
              <div
                key={cert.title}
                className="group relative transition-all duration-700 opacity-100 translate-y-0"
              >
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:professional-shadow-lg">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <cert.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                        {cert.title}
                      </h4>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {cert.year}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium text-sm mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Read More Button for Credentials */}
          {!showAllCredentials && certifications[language].length > 2 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllCredentials(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full font-medium transition-all duration-300 hover:scale-105 professional-shadow"
                aria-expanded={false}
                aria-label={language === "en" ? "Show all credentials" : "Mostrar todas las credenciales"}
              >
                {language === "en" ? "Show More Credentials" : "Ver Más Credenciales"}
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Key Achievements */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gradient block">
            {language === "en"
              ? "Notable Achievements"
              : "Logros Destacados"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievementsToShow.map((achievement) => (
              <div
                key={achievement.title}
                className="group relative transition-all duration-700 opacity-100 translate-y-0"
              >
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:professional-shadow-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                        {achievement.title}
                      </h4>
                      <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
                        {achievement.metric}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Read More Button for Achievements */}
          {!showAllAchievements && achievements[language].length > 2 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllAchievements(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full font-medium transition-all duration-300 hover:scale-105 professional-shadow"
                aria-expanded={false}
                aria-label={language === "en" ? "Show all achievements" : "Mostrar todos los logros"}
              >
                {language === "en" ? "Show More Achievements" : "Ver Más Logros"}
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Technologies */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-gradient block">
            {language === "en"
              ? "Technologies & Tools"
              : "Tecnologías y Herramientas"}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <TechBadge key={tech} tech={tech} delay={index * 50} />
            ))}
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PDFViewer
        isOpen={showPDFViewer}
        onClose={() => setShowPDFViewer(false)}
        pdfUrl={
          language === "en"
            ? "/Mario-R-Ayala-Resume-EN.pdf"
            : "/Mario-R-Ayala-Resume-ES.pdf"
        }
        title={
          language === "en"
            ? "Mario R. Ayala - Resume"
            : "Mario R. Ayala - Curriculum Vitae"
        }
      />
    </section>
  );
};

export default About;
