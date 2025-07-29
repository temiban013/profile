"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";
import { useState, useEffect } from "react";

// Animated Statistics Component
const AnimatedStat = ({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) => {
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
};

// Skill Item Component
const SkillItem = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay?: number;
}) => {
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
};

// Technology Badge Component
const TechBadge = ({ tech, delay = 0 }: { tech: string; delay?: number }) => {
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
};

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

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
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Rust",
    "C#",
    ".NET",
    "SQL Server",
    "Azure",
    "Docker",
    "Blockchain",
    "Solidity",
    "Tailwind CSS",
    "Git",
  ];

  const currentSkills = skills[language];

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
              ? "With over 25 years of enterprise software development experience, I specialize in creating robust, scalable solutions that bridge business objectives with cutting-edge technology."
              : "Con más de 25 años de experiencia en desarrollo de software empresarial, me especializo en crear soluciones robustas y escalables que conectan objetivos de negocio con tecnología de vanguardia."}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <AnimatedStat
            value={25}
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
                  ? "My journey began in 1998 with dBASE IV programming, evolving through the Microsoft ecosystem at companies like Office Depot and Disney. From Visual Basic and ASP to modern Next.js and TypeScript, I've continuously adapted to emerging technologies while maintaining a focus on practical, business-driven solutions."
                  : "Mi viaje comenzó en 1998 con programación en dBASE IV, evolucionando a través del ecosistema Microsoft en empresas como Office Depot y Disney. Desde Visual Basic y ASP hasta Next.js y TypeScript modernos, me he adaptado continuamente a tecnologías emergentes manteniendo un enfoque en soluciones prácticas y orientadas al negocio."}
              </p>
              <p>
                {language === "en"
                  ? "Today, I'm passionate about functional programming paradigms and cutting-edge technologies like Rust and blockchain development. My approach combines decades of enterprise experience with modern development practices, ensuring solutions that are both innovative and reliable."
                  : "Hoy en día, me apasionan los paradigmas de programación funcional y tecnologías de vanguardia como Rust y desarrollo blockchain. Mi enfoque combina décadas de experiencia empresarial con prácticas de desarrollo modernas, asegurando soluciones que son innovadoras y confiables."}
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Button className="rounded-full professional-shadow hover:professional-shadow-lg transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                {language === "en" ? "Download Resume" : "Descargar CV"}
              </Button>
              <Button
                variant="outline"
                className="rounded-full professional-shadow hover:professional-shadow-lg transition-all duration-300"
              >
                <Target className="w-4 h-4 mr-2" />
                {language === "en" ? "View Projects" : "Ver Proyectos"}
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
          <h3 className="text-3xl font-bold text-center mb-12">
            {language === "en"
              ? "Core Competencies"
              : "Competencias Principales"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSkills.map((skill, index) => (
              <SkillItem
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8">
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
    </section>
  );
};

export default About;
