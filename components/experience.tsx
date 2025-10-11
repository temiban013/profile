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
  Smartphone,
  Network,
  Store,
  Shield,
  Monitor,
  Wifi,
  MessageSquare,
  Lightbulb,
  Layout,
  TrendingUp,
  Search,
  ShieldCheck,
  FileText,
  User,
  CheckCircle,
  BarChart3,
  Database,
  Cpu,
  Presentation,
  Layers,
  Users,
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import { translations } from "@/lib/i18n";

// Helper function to get icon for presentation based on title
const getPresentationIcon = (title: string) => {
  const titleLower = title.toLowerCase();

  // Las Marías presentations
  if (titleLower.includes('revolución') || titleLower.includes('bolsillo')) return Smartphone;
  if (titleLower.includes('enlace de datos') || titleLower.includes('osi')) return Network;
  if (titleLower.includes('alfabetización') || titleLower.includes('negocio en línea')) return Store;
  if (titleLower.includes('datos') && titleLower.includes('tesoro')) return Shield;
  if (titleLower.includes('sistemas operativos') || titleLower.includes('windows')) return Monitor;
  if (titleLower.includes('conectividad')) return Wifi;
  if (titleLower.includes('información inteligente')) return Lightbulb;
  if (titleLower.includes('centro de comando')) return Layout;
  if (titleLower.includes('transformación digital') || titleLower.includes('principiantes')) return TrendingUp;
  if (titleLower.includes('detectives digitales')) return Search;
  if (titleLower.includes('guardianes')) return ShieldCheck;
  if (titleLower.includes('seguridad de redes') || titleLower.includes('identidad')) return Shield;
  if (titleLower.includes('consolidación') && titleLower.includes('seguridad')) return ShieldCheck;
  if (titleLower.includes('presentación osi') || titleLower.includes('documentación')) return FileText;
  if (titleLower.includes('cv ejecutivo') && titleLower.includes('parte 1')) return User;
  if (titleLower.includes('cv ejecutivo') && titleLower.includes('finalización')) return CheckCircle;
  if (titleLower.includes('análisis financiero')) return BarChart3;
  if (titleLower.includes('detectives de datos')) return Database;
  if (titleLower.includes('arquitectos') || titleLower.includes('sistemas inteligentes')) return Cpu;
  if (titleLower.includes('maestría') && titleLower.includes('presentaciones')) return Presentation;
  if (titleLower.includes('presentaciones empresariales avanzadas')) return Monitor;
  if (titleLower.includes('plan de negocio')) return Briefcase;
  if (titleLower.includes('liderando') || titleLower.includes('revolución')) return Users;

  // Santurce presentations
  if (titleLower.includes('gestión del tiempo') || titleLower.includes('planificación')) return Calendar;
  if (titleLower.includes('ética') || titleLower.includes('integridad')) return ShieldCheck;
  if (titleLower.includes('trabajo en equipo') || titleLower.includes('colaboración')) return Users;
  if (titleLower.includes('servicio al cliente') || titleLower.includes('conflictos')) return MessageSquare;
  if (titleLower.includes('toma de decisiones') || titleLower.includes('pensamiento crítico')) return Lightbulb;
  if (titleLower.includes('comunicación efectiva') || titleLower.includes('imagen profesional')) return MessageSquare;
  if (titleLower.includes('gestión de recursos') || titleLower.includes('éxito laboral')) return TrendingUp;
  if (titleLower.includes('curriculum') || titleLower.includes('vitae')) return FileText;
  if (titleLower.includes('búsqueda de empleo') || titleLower.includes('estrategias')) return Search;
  if (titleLower.includes('entrevista laboral') || titleLower.includes('preparación')) return User;
  if (titleLower.includes('inteligencia artificial')) return Cpu;

  return FileText; // Default icon
};

// Type definitions
interface Presentation {
  title: string;
  url: string;
  program: 'lasMarias' | 'santurce';
}

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  presentations?: Presentation[];
  index: number;
  isNewlyAdded?: boolean;
  skipStagger?: boolean;
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
  skipStagger = false,
}: {
  children: React.ReactNode;
  index: number;
  icon: React.ComponentType<{ className?: string }>;
  skipStagger?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(skipStagger);

  useEffect(() => {
    if (skipStagger) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // Reduced from 200ms to 100ms for snappier feel

    return () => clearTimeout(timer);
  }, [index, skipStagger]);

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
  presentations,
  index,
  skipStagger = false,
}: ExperienceItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPresentations, setShowPresentations] = useState(false);
  const [showAllLasMarias, setShowAllLasMarias] = useState(false);
  const [showAllSanturce, setShowAllSanturce] = useState(false);
  const { language } = useLanguage();

  // Filter presentations by program
  const lasMariasPresents = presentations?.filter(p => p.program === 'lasMarias') || [];
  const santurcePresents = presentations?.filter(p => p.program === 'santurce') || [];

  // Parse description to extract bullet points
  const hasFormatting = description.includes('•');
  const descriptionParts = hasFormatting ? description.split('•').filter(part => part.trim()) : [];
  const mainDescription = hasFormatting ? descriptionParts[0] : description;
  const bulletPoints = hasFormatting ? descriptionParts.slice(1) : [];

  // Check if content needs expanding - more nuanced logic
  const hasLongDescription = !hasFormatting && description.length > 450;
  const hasManyBulletPoints = hasFormatting && bulletPoints.length > 1;
  const needsExpansion = hasLongDescription || hasManyBulletPoints;

  return (
    <TimelineItem index={index} icon={Briefcase} skipStagger={skipStagger}>
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
              {(isExpanded || bulletPoints.length <= 1) && (
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
              {!isExpanded && bulletPoints.length > 1 && (
                <ul className="space-y-3">
                  {bulletPoints.slice(0, 1).map((point, idx) => {
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

          {/* Read More button for presentations */}
          {presentations && presentations.length > 0 && (
            <button
              onClick={() => setShowPresentations(!showPresentations)}
              className="mt-4 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-semibold bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg border border-primary/20 hover:border-primary/40"
            >
              <Presentation className="w-4 h-4" />
              {showPresentations
                ? (language === "es" ? "Ocultar Presentaciones" : "Hide Presentations")
                : (language === "es" ? "Ver Presentaciones del Curso" : "View Course Presentations")
              }
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showPresentations ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Las Marías Presentations Gallery */}
        {showPresentations && lasMariasPresents.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              {language === "en" ? "Las Marías Course Presentations" : "Presentaciones del Curso Las Marías"}
              <span className="text-xs text-muted-foreground font-normal">({lasMariasPresents.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(showAllLasMarias ? lasMariasPresents : lasMariasPresents.slice(0, 6)).map((presentation, idx) => {
                const IconComponent = getPresentationIcon(presentation.title);
                return (
                  <a
                    key={idx}
                    href={presentation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {presentation.title}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                  </a>
                );
              })}
            </div>

            {lasMariasPresents.length > 6 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAllLasMarias(!showAllLasMarias)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  {showAllLasMarias
                    ? (language === "en" ? "Show Less" : "Ver Menos")
                    : (language === "en"
                        ? `View All ${lasMariasPresents.length} Presentations`
                        : `Ver las ${lasMariasPresents.length} Presentaciones`)
                  }
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllLasMarias ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Santurce Presentations Gallery */}
        {showPresentations && santurcePresents.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              {language === "en" ? "Santurce Course Presentations" : "Presentaciones del Curso Santurce"}
              <span className="text-xs text-muted-foreground font-normal">({santurcePresents.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(showAllSanturce ? santurcePresents : santurcePresents.slice(0, 6)).map((presentation, idx) => {
                const IconComponent = getPresentationIcon(presentation.title);
                return (
                  <a
                    key={idx}
                    href={presentation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {presentation.title}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                  </a>
                );
              })}
            </div>

            {santurcePresents.length > 6 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAllSanturce(!showAllSanturce)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  {showAllSanturce
                    ? (language === "en" ? "Show Less" : "Ver Menos")
                    : (language === "en"
                        ? `View All ${santurcePresents.length} Presentations`
                        : `Ver las ${santurcePresents.length} Presentaciones`)
                  }
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllSanturce ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </div>
        )}

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
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  // Inline expansion states for newly added experiences
  const [showAfterDisney, setShowAfterDisney] = useState(false); // Ibeza + Jíbaro
  const [showAfterAVM, setShowAfterAVM] = useState(false); // TradeStation
  const [showAfterABB, setShowAfterABB] = useState(false); // Primerica
  const [showAfterOfficeDepot, setShowAfterOfficeDepot] = useState(false); // Asurity, AmEx, Broker, JMH, VA

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
            "Leading digital transformation initiatives specializing in AI-assisted development and full-stack solutions. • **AI & Agentic Development**: Architected multi-agent orchestration system using Claude Code, managing 7 concurrent projects with autonomous agents for code review, security auditing, and operations. Implemented Portfolio Orchestrator with automated billable hours tracking, contract intelligence, and career management (resume generation, portfolio updates), reducing administrative overhead by 40-50%. • **Gespervis ASL/PRLS School**: Architected comprehensive online ASL learning platform using Next.js 15, TypeScript, and PostgreSQL, integrating AI for enrollment automation, predictive analytics, and intelligent reporting system. Implemented role-based authentication system, course management workflows, and real-time analytics serving 13+ active users. Achieved 70% reduction in development time and 65% in costs while accelerating delivery timeline by 7-8 weeks. • **Café Papamín LLC**: Developed full-stack e-commerce application using Next.js 15, TypeScript, and Tailwind CSS with WhatsApp Business integration and responsive catalog. Achieved total project cost of $620 vs. $3,000+ from traditional platforms, enabling 24/7 customer engagement for Puerto Rican artisanal coffee business. • **Pabellón de la Fama del Deporte Humacaeño**: Led full-stack development of web platform using Next.js 15, TypeScript, and Tailwind CSS, implementing SOLID principles and functional programming. Delivered MVP with 8 core sections including searchable inductee directory, museum showcase, and activity calendar. Provided pro bono leadership enabling digital transformation for sports heritage preservation. • **JAYEI Cultural Organization**: Developed bilingual website for Puerto Rican cultural organization using Next.js 15 and TypeScript, featuring interactive gallery, progressive loading, and responsive design. Implemented comprehensive SEO and accessibility features for improved community reach. • **Blockchain Development**: Developed blockchain applications including NFT marketplace prototype using Solidity and React. Conducted technology workshops educating professionals and students on blockchain fundamentals and smart contract development.",
          technologies: [
            "AI-Assisted Dev",
            "Multi-Agent Orchestration",
            "Claude Code",
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
          presentations: [
            // Las Marías Program Presentations
            { title: "La Revolución Que Llevamos en el Bolsillo", url: "https://gamma.app/docs/La-Revolucion-Que-Llevamos-en-el-Bolsillo-t3whf6odaxberc4", program: 'lasMarias' as const },
            { title: "Nivel de Enlace de Datos OSI", url: "https://gamma.app/docs/Nivel-de-Enlace-de-Datos-OSI-i9d0s21vbmme178", program: 'lasMarias' as const },
            { title: "Destrezas de Alfabetización Digital - Mi Negocio en Línea", url: "https://gamma.app/docs/Destrezas-de-Alfabetizacion-Digital-Mi-Negocio-en-Linea-951zhm9nyfaumd7", program: 'lasMarias' as const },
            { title: "Sus Datos Son Su Tesoro Empresarial", url: "https://gamma.app/docs/Sus-Datos-Son-Su-Tesoro-Empresarial-uv9ec19eko7qg9o", program: 'lasMarias' as const },
            { title: "Sistemas Operativos - La Fundación de Su Imperio Digital", url: "https://gamma.app/docs/Sistemas-Operativos-La-Fundacion-de-Su-Imperio-Digital-cjcoftu2ui7jlse", program: 'lasMarias' as const },
            { title: "Conectividad Avanzada - El Salto a la Profesionalización Digital", url: "https://gamma.app/docs/Conectividad-Avanzada-El-Salto-a-la-Profesionalizacion-Digital-3zar97r2naw4yh4", program: 'lasMarias' as const },
            { title: "Comunicación Digital Profesional - Tu Superpoder Empresarial", url: "https://gamma.app/docs/Comunicacion-Digital-Profesional-Tu-Superpoder-Empresarial-dbetll7j5n18g41", program: 'lasMarias' as const },
            { title: "La Era de la Información Inteligente", url: "https://gamma.app/docs/La-Era-de-la-Informacion-Inteligente-2vcr6071bfj2boe", program: 'lasMarias' as const },
            { title: "Windows - Tu Centro de Comando Empresarial", url: "https://gamma.app/docs/Windows-Tu-Centro-de-Comando-Empresarial-wcnsgnwp2er7hzw", program: 'lasMarias' as const },
            { title: "Transformación Digital - De Principiantes a Emprendedores", url: "https://gamma.app/docs/Transformacion-Digital-De-Principiantes-a-Emprendedores-yns4utog80ysphk", program: 'lasMarias' as const },
            { title: "Detectives Digitales - Protegiendo Nuestros Sueños Empresariales", url: "https://gamma.app/docs/DETECTIVES-DIGITALES-PROTEGIENDO-NUESTROS-SUENOS-EMPRESARIALES-c2iqzh2d6nf35ly", program: 'lasMarias' as const },
            { title: "Academia de Guardianes Digitales", url: "https://gamma.app/docs/Academia-de-Guardianes-Digitales-yx3rf9gnt1859ww", program: 'lasMarias' as const },
            { title: "Seguridad de Redes y Gestión de Identidad", url: "https://gamma.app/docs/SEGURIDAD-DE-REDES-Y-GESTION-DE-IDENTIDAD-mcehnbdhsoprq9n", program: 'lasMarias' as const },
            { title: "Consolidación de Seguridad Cibernética", url: "https://gamma.app/docs/Consolidacion-de-Seguridad-Cibernetica-Transformando-Empresarios--y95s0nsjcl3orib", program: 'lasMarias' as const },
            { title: "Nivel de Presentación OSI y Documentación Profesional", url: "https://gamma.app/docs/NIVEL-DE-PRESENTACION-OSI-Y-DOCUMENTACION-PROFESIONAL-jjwsqkf9t706sop", program: 'lasMarias' as const },
            { title: "Construcción de CV Ejecutivo - Parte 1", url: "https://gamma.app/docs/CONSTRUCCION-DE-CV-EJECUTIVO-PARTE-1-yo8vqokdfbtn46v", program: 'lasMarias' as const },
            { title: "Finalización de CV Ejecutivo y Aplicaciones Empresariales Avanzadas", url: "https://gamma.app/docs/FINALIZACION-DE-CV-EJECUTIVO-Y-APLICACIONES-EMPRESARIALES-AVANZAD-sp4tt4c5z3harz1", program: 'lasMarias' as const },
            { title: "Análisis Financiero Empresarial", url: "https://gamma.app/docs/ANALISIS-FINANCIERO-EMPRESARIAL-8bdryeejw2o5mk1", program: 'lasMarias' as const },
            { title: "Detectives de Datos Empresariales", url: "https://gamma.app/docs/Detectives-de-Datos-Empresariales-niga6ieeqrp8tms", program: 'lasMarias' as const },
            { title: "Arquitectos de Sistemas Inteligentes - Gestión de Datos y Automatización", url: "https://gamma.app/docs/Arquitectos-de-Sistemas-Inteligentes-Gestion-de-Datos-y-Automatiz-e7bjwhbl6zbju22", program: 'lasMarias' as const },
            { title: "Maestría en Presentaciones Empresariales", url: "https://gamma.app/docs/Maestria-en-Presentaciones-Empresariales-jz8dqdcgh5jlc9p", program: 'lasMarias' as const },
            { title: "Presentaciones Empresariales Avanzadas", url: "https://gamma.app/docs/Presentaciones-Empresariales-Avanzadas-y8gvl1nwekergmi", program: 'lasMarias' as const },
            { title: "Plan de Negocio - Estructura y Desarrollo Integral", url: "https://gamma.app/docs/PLAN-DE-NEGOCIO-ESTRUCTURA-Y-DESARROLLO-INTEGRAL-53fnie417hcorhq", program: 'lasMarias' as const },
            { title: "Liderando la Revolución Digital Empresarial", url: "https://gamma.app/docs/Liderando-la-Revolucion-Digital-Empresarial-43pbpoes8tdjv2u", program: 'lasMarias' as const },
            // Santurce Program Presentations
            { title: "Gestión del Tiempo y Planificación", url: "https://gamma.app/docs/Gestion-del-Tiempo-y-Planificacion-4hv1c68ym1rduai", program: 'santurce' as const },
            { title: "Ética laboral e Integridad", url: "https://gamma.app/docs/Etica-laboral-e-Integridad-m8grxwnrcw9uaph", program: 'santurce' as const },
            { title: "Trabajo en Equipo - Colaboración Efectiva en Entornos Laborales", url: "https://gamma.app/docs/Trabajo-en-Equipo-Colaboracion-Efectiva-en-Entornos-Laborales-mwxgq2ur6sdihtf", program: 'santurce' as const },
            { title: "Servicio al Cliente y Resolución de Conflictos", url: "https://gamma.app/docs/Servicio-al-Cliente-y-Resolucion-de-Conflictos-l3jkaahoanfi3k5", program: 'santurce' as const },
            { title: "Toma de Decisiones y Pensamiento Crítico", url: "https://gamma.app/docs/Toma-de-Decisiones-y-Pensamiento-Critico-229cdvuwwuu4swi", program: 'santurce' as const },
            { title: "Comunicación Efectiva e Imagen Profesional", url: "https://gamma.app/docs/Comunicacion-Efectiva-e-Imagen-Profesional-ujvi551t6tx2u6g", program: 'santurce' as const },
            { title: "Gestión de Recursos para el Éxito Laboral", url: "https://gamma.app/docs/Gestion-de-Recursos-para-el-Exito-Laboral-pyra04fwl95zmmq", program: 'santurce' as const },
            { title: "Elaboración del Curriculum Vitae Efectivo", url: "https://gamma.app/docs/Elaboracion-del-Curriculum-Vitae-Efectivo-ackia30xxnq7c3t", program: 'santurce' as const },
            { title: "Estrategias para búsqueda de empleo", url: "https://gamma.app/docs/Estrategias-para-busqueda-de-empleo-umpe4jlpmruf9jl", program: 'santurce' as const },
            { title: "Preparación para Entrevista Laboral", url: "https://gamma.app/docs/Preparacion-para-Entrevista-Laboral-duxvm6ne57oqz78", program: 'santurce' as const },
            { title: "Inteligencia Artificial", url: "https://gamma.app/docs/Inteligencia-Artificial-xy191kncjols7d2", program: 'santurce' as const },
          ] satisfies Presentation[],
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
          title: "Senior .NET Developer",
          company: "TradeStation Technologies",
          location: "Florida",
          period: "February 2011 - April 2011",
          description:
            "Delivered rapid-turnaround enhancements to trading strategy platform. • **Web Application Development**: Added functionality to .NET 4.0 web application for online trading strategies using Model-View-Presenter (MVP) pattern. • **UI/UX Enhancement**: Styled the View using CSS and removed all tables, replacing them with div tags for modern responsive design. • **Data Layer**: Used Entity Framework for the model, implementing LINQ and lambda expressions to create resulting data. • **Quality Assurance**: Developed unit tests using MSTest and Moq libraries for mocking objects and intercepting method calls. Began producing results within three days of gaining access to TFS source code.",
          technologies: [
            ".NET 4.0",
            "MVP Pattern",
            "Entity Framework",
            "LINQ",
            "CSS",
            "MSTest",
            "Moq",
            "TFS",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Senior Software Engineer",
          company: "Ibeza, LLC",
          location: "Coral Gables, Florida",
          period: "December 2013 - November 2015",
          description:
            "Led development initiatives for healthcare technology solutions. • **EHR Certification**: Key player in helping achieve Electronic Health Records (EHR) certification from the Office of the National Coordinator (ONC) for Health Information Technology (HIT) in 2014. Led the development and implementation of Clinical Quality Measures (CQM) reporting tools for ONC HIT Certification. • **Electronic Ophthalmology Forms**: Designed, developed, and implemented digital forms for use with tablets and stylus. Developed PDF service for creation, editing, and merging of digital forms using Aspose libraries. • **Laboratory Integration**: Implemented electronic communication of diagnostic laboratory results from third parties such as Aurora Diagnostics and Quest Diagnostics using Mirth Connect server. • **Performance Optimization**: Optimized application for speed-up, particularly in problem areas such as digital form creation and editing.",
          technologies: [
            "EHR Systems",
            "ONC HIT Certification",
            ".NET",
            "Aspose",
            "Mirth Connect",
            "Healthcare Technology",
            "Digital Forms",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Vice President",
          company: "Jíbaro Media Group",
          location: "Puerto Rico",
          period: "June 2012 - December 2013",
          description:
            "Led production of award-winning documentary combining technical expertise with creative direction. • **Executive Producer**: Executive Producer of the award-winning Spanish documentary 'La Gran Falacia' (The Great Lie), which won the 2013 Sunscreen Film Festival Award for Best Spanish Language Film. • **Technical Production**: Served as sound engineer, camera operator, and composer for the film. Co-edited the film using Adobe Premiere Pro CS5.5. • **Project Management**: Demonstrated proven ability to produce and manage film projects from conception to completion, with strong technical skills in sound engineering, camera operation, and editing.",
          technologies: [
            "Adobe Premiere Pro",
            "Sound Engineering",
            "Film Production",
            "Video Editing",
            "Project Management",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Personal Financial Analyst",
          company: "Primerica",
          location: "Miami/Fort Lauderdale Area",
          period: "July 2006 - June 2007",
          description:
            "Provided comprehensive financial planning and wealth management solutions. • **Financial Advisory Services**: Developed and implemented personalized financial strategies for families, focusing on debt elimination, wealth protection, and long-term investment planning. Provided licensed advisory services across multiple financial products including securities, mortgage solutions, and insurance products. • **Client Analysis**: Conducted detailed financial needs analyses to create tailored protection and investment recommendations. Built and maintained client relationships through ongoing financial education and portfolio reviews. • **Regulatory Qualifications**: FINRA Series 6 Investment Company Products/Variable Contracts Limited Representative, Florida State Life, Health, and Long-Term Care Insurance License, Florida State Mortgage Loan Originator License.",
          technologies: [
            "Financial Planning",
            "Investment Analysis",
            "FINRA Series 6",
            "Insurance Products",
            "Mortgage Solutions",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Team Lead",
          company: "Asurity (formerly MRG Document Technologies)",
          location: "Boca Raton, Florida",
          period: "January 2005 - July 2006",
          description:
            "Led technical team for mortgage processing application maintenance and enhancement. • **Technical Leadership**: Served as Technical Lead for a mortgage processing application during its maintenance phase using Web Services in .NET. • **Compliance Engineering**: Created a compliance rule engine for managers to generate warning flags during the processing of all loans in C#. • **Performance Optimization**: Successfully tuned and sped up many SQL Server stored procedures that were locking up the system, improving overall application performance.",
          technologies: [
            "Web Services",
            ".NET",
            "C#",
            "SQL Server",
            "Mortgage Processing",
            "Team Leadership",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Programmer/Analyst",
          company: "American Express",
          location: "Florida",
          period: "January 1998 - October 1998",
          description:
            "Developed critical data management systems for sensitive cardholder information. • **Sensitive Card Holder Data Provider**: Provided technical support for a variety of applications that processed sensitive card holder information. Resolved issues related to data entry, data validation, and printing of billing statements. Maintained a high level of confidentiality and security for all sensitive data. • **Data Loader**: Developed a VB 5 application that used ActiveX components to upload data from different sources to a SQL 6.5 server. The application was designed to be scalable and efficient, processing large amounts of data quickly from spreadsheets, text files, and legacy systems.",
          technologies: [
            "Visual Basic 5",
            "SQL Server 6.5",
            "ActiveX",
            "Data Security",
            "ETL",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Programmer/Analyst",
          company: "Broker Dealer Systems",
          location: "Margate, Florida",
          period: "March 1997 - January 1998",
          description:
            "Modernized financial application using object-oriented programming principles. • **System Re-architecture**: Upgraded an existing procedural financial application for a brokerage house using object-oriented programming in VB. • **OOP Implementation**: Used object-oriented programming (OOP) to make code more reusable, maintainable, and scalable. The upgraded application was more efficient and easier to use than the original application.",
          technologies: [
            "Visual Basic",
            "OOP",
            "Financial Systems",
            "Brokerage Applications",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Programmer/Analyst II",
          company: "JMH Health Plan (CSC's Managed Health Care)",
          location: "Florida",
          period: "January 1995 - March 1997",
          description:
            "Implemented enterprise healthcare management system and managed critical infrastructure. • **Healthcare Application Implementation**: Worked as part of a team to implement CSC's Managed Health Care application, a software application used by HMOs to store electronic medical member history. The application was implemented across a large enterprise with multiple sites and users. • **Unix Administration**: Installed, configured, and maintained AIX Unix systems and backup of all databases. Used sed, awk, and Cron to automate every aspect of system maintenance.",
          technologies: [
            "Healthcare IT",
            "HMO Systems",
            "AIX Unix",
            "sed/awk",
            "Cron",
            "Database Administration",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Radiology File Assistant",
          company: "VA Hospital",
          location: "Florida",
          period: "March 1993 - January 1995",
          description:
            "Balanced full-time healthcare administration with full-time academic workload. • **Time Management**: Demonstrated strong time management and organizational skills by balancing a full-time job with a full-time academic workload. • **Professional Development**: Developed strong work ethic and ability to work independently and as part of a team. Gained valuable experience in the workforce and learned how to apply classroom knowledge in a real-world setting. Developed strong communication and interpersonal skills by interacting with customers, co-workers, and supervisors.",
          technologies: [
            "Healthcare Administration",
            "Records Management",
            "Customer Service",
          ],
          isNewlyAdded: true,
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
          institution: "Ellis University (formerly affiliated with New York Tech)",
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
          title: "Blockchain Developer",
          organization: "Cryptomonedas Pal Pueblo",
          location: "Puerto Rico",
          period: "August 2021 - March 2022",
          url: "",
        },
        {
          title: "Founding Member",
          organization: "Florida Interscholastic Cycling League",
          location: "Florida",
          period: "March 2018 - January 2020",
          url: "http://FloridaMTB.org",
        },
        {
          title: "Program Development Volunteer",
          organization: "Boys & Girls Club",
          location: "Osceola County, Florida",
          period: "May 2017 - August 2017",
          url: "",
        },
        {
          title: "Aspire to Inspire STEAM Presenter",
          organization: "ALPFA, Inc - Association of Latino Professionals For America",
          location: "Florida",
          period: "April 2017",
          url: "",
        },
        {
          title: "Volunteer Videographer",
          organization: "Swamp Club",
          location: "Alafia State Park, Lithia, Florida",
          period: "January 2017 - March 2017",
          url: "https://www.youtube.com/playlist?list=PLEMQ9VFlh91rmIRl7VrJxduYUd6-W37CQ",
        },
        {
          title: "Tax Preparer",
          organization: "Volunteer Income Tax Assistance",
          location: "Florida",
          period: "July 2006 - July 2007",
          url: "",
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
            "Liderando iniciativas de transformación digital especializándome en desarrollo asistido por IA y soluciones full-stack. • **AI & Agentic Development**: Arquitecté sistema de orquestación multi-agente usando Claude Code, gestionando 7 proyectos concurrentes con agentes autónomos para revisión de código, auditoría de seguridad y operaciones. Implementé Orquestador de Portafolio con seguimiento automatizado de horas facturables, inteligencia de contratos y gestión profesional (generación de currículum, actualización de portafolio), reduciendo costos administrativos en 40-50%. • **Gespervis Escuela ASL/PRLS**: Arquitecté plataforma integral de aprendizaje ASL en línea usando Next.js 15, TypeScript y PostgreSQL, integrando IA para automatización de inscripciones, analíticas predictivas y sistema de reportes inteligente. Implementé sistema de autenticación basado en roles, flujos de gestión de cursos y analíticas en tiempo real sirviendo a 13+ usuarios activos. Logré 70% de reducción en tiempo de desarrollo y 65% en costos mientras aceleré cronograma de entrega en 7-8 semanas. • **Café Papamín LLC**: Desarrollé aplicación e-commerce full-stack usando Next.js 15, TypeScript y Tailwind CSS con integración WhatsApp Business y catálogo responsivo. Logré costo total de $620 vs. $3,000+ de plataformas tradicionales, habilitando participación 24/7 para negocio artesanal de café puertorriqueño. • **Pabellón de la Fama del Deporte Humacaeño**: Lideré el desarrollo full-stack de plataforma web usando Next.js 15, TypeScript y Tailwind CSS, implementando principios SOLID y programación funcional. Entregué MVP con 8 secciones incluyendo directorio de homenajeados con búsqueda, vitrina de museo y calendario. Proporcioné liderazgo pro bono habilitando transformación digital para preservación del patrimonio deportivo. • **Organización Cultural JAYEI**: Desarrollé sitio web bilingüe para organización cultural puertorriqueña con Next.js 15 y TypeScript, presentando galería interactiva, carga progresiva y diseño responsivo. Implementé optimización SEO y características de accesibilidad para mejor alcance comunitario. • **Desarrollo Blockchain**: Desarrollé aplicaciones blockchain incluyendo prototipo marketplace NFT usando Solidity y React. Impartí talleres educando profesionales y estudiantes en fundamentos blockchain y desarrollo de contratos inteligentes.",
          technologies: [
            "Desarrollo con IA",
            "Orquestación Multi-Agente",
            "Claude Code",
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
          presentations: [
            // Las Marías Program Presentations
            { title: "La Revolución Que Llevamos en el Bolsillo", url: "https://gamma.app/docs/La-Revolucion-Que-Llevamos-en-el-Bolsillo-t3whf6odaxberc4", program: 'lasMarias' as const },
            { title: "Nivel de Enlace de Datos OSI", url: "https://gamma.app/docs/Nivel-de-Enlace-de-Datos-OSI-i9d0s21vbmme178", program: 'lasMarias' as const },
            { title: "Destrezas de Alfabetización Digital - Mi Negocio en Línea", url: "https://gamma.app/docs/Destrezas-de-Alfabetizacion-Digital-Mi-Negocio-en-Linea-951zhm9nyfaumd7", program: 'lasMarias' as const },
            { title: "Sus Datos Son Su Tesoro Empresarial", url: "https://gamma.app/docs/Sus-Datos-Son-Su-Tesoro-Empresarial-uv9ec19eko7qg9o", program: 'lasMarias' as const },
            { title: "Sistemas Operativos - La Fundación de Su Imperio Digital", url: "https://gamma.app/docs/Sistemas-Operativos-La-Fundacion-de-Su-Imperio-Digital-cjcoftu2ui7jlse", program: 'lasMarias' as const },
            { title: "Conectividad Avanzada - El Salto a la Profesionalización Digital", url: "https://gamma.app/docs/Conectividad-Avanzada-El-Salto-a-la-Profesionalizacion-Digital-3zar97r2naw4yh4", program: 'lasMarias' as const },
            { title: "Comunicación Digital Profesional - Tu Superpoder Empresarial", url: "https://gamma.app/docs/Comunicacion-Digital-Profesional-Tu-Superpoder-Empresarial-dbetll7j5n18g41", program: 'lasMarias' as const },
            { title: "La Era de la Información Inteligente", url: "https://gamma.app/docs/La-Era-de-la-Informacion-Inteligente-2vcr6071bfj2boe", program: 'lasMarias' as const },
            { title: "Windows - Tu Centro de Comando Empresarial", url: "https://gamma.app/docs/Windows-Tu-Centro-de-Comando-Empresarial-wcnsgnwp2er7hzw", program: 'lasMarias' as const },
            { title: "Transformación Digital - De Principiantes a Emprendedores", url: "https://gamma.app/docs/Transformacion-Digital-De-Principiantes-a-Emprendedores-yns4utog80ysphk", program: 'lasMarias' as const },
            { title: "Detectives Digitales - Protegiendo Nuestros Sueños Empresariales", url: "https://gamma.app/docs/DETECTIVES-DIGITALES-PROTEGIENDO-NUESTROS-SUENOS-EMPRESARIALES-c2iqzh2d6nf35ly", program: 'lasMarias' as const },
            { title: "Academia de Guardianes Digitales", url: "https://gamma.app/docs/Academia-de-Guardianes-Digitales-yx3rf9gnt1859ww", program: 'lasMarias' as const },
            { title: "Seguridad de Redes y Gestión de Identidad", url: "https://gamma.app/docs/SEGURIDAD-DE-REDES-Y-GESTION-DE-IDENTIDAD-mcehnbdhsoprq9n", program: 'lasMarias' as const },
            { title: "Consolidación de Seguridad Cibernética", url: "https://gamma.app/docs/Consolidacion-de-Seguridad-Cibernetica-Transformando-Empresarios--y95s0nsjcl3orib", program: 'lasMarias' as const },
            { title: "Nivel de Presentación OSI y Documentación Profesional", url: "https://gamma.app/docs/NIVEL-DE-PRESENTACION-OSI-Y-DOCUMENTACION-PROFESIONAL-jjwsqkf9t706sop", program: 'lasMarias' as const },
            { title: "Construcción de CV Ejecutivo - Parte 1", url: "https://gamma.app/docs/CONSTRUCCION-DE-CV-EJECUTIVO-PARTE-1-yo8vqokdfbtn46v", program: 'lasMarias' as const },
            { title: "Finalización de CV Ejecutivo y Aplicaciones Empresariales Avanzadas", url: "https://gamma.app/docs/FINALIZACION-DE-CV-EJECUTIVO-Y-APLICACIONES-EMPRESARIALES-AVANZAD-sp4tt4c5z3harz1", program: 'lasMarias' as const },
            { title: "Análisis Financiero Empresarial", url: "https://gamma.app/docs/ANALISIS-FINANCIERO-EMPRESARIAL-8bdryeejw2o5mk1", program: 'lasMarias' as const },
            { title: "Detectives de Datos Empresariales", url: "https://gamma.app/docs/Detectives-de-Datos-Empresariales-niga6ieeqrp8tms", program: 'lasMarias' as const },
            { title: "Arquitectos de Sistemas Inteligentes - Gestión de Datos y Automatización", url: "https://gamma.app/docs/Arquitectos-de-Sistemas-Inteligentes-Gestion-de-Datos-y-Automatiz-e7bjwhbl6zbju22", program: 'lasMarias' as const },
            { title: "Maestría en Presentaciones Empresariales", url: "https://gamma.app/docs/Maestria-en-Presentaciones-Empresariales-jz8dqdcgh5jlc9p", program: 'lasMarias' as const },
            { title: "Presentaciones Empresariales Avanzadas", url: "https://gamma.app/docs/Presentaciones-Empresariales-Avanzadas-y8gvl1nwekergmi", program: 'lasMarias' as const },
            { title: "Plan de Negocio - Estructura y Desarrollo Integral", url: "https://gamma.app/docs/PLAN-DE-NEGOCIO-ESTRUCTURA-Y-DESARROLLO-INTEGRAL-53fnie417hcorhq", program: 'lasMarias' as const },
            { title: "Liderando la Revolución Digital Empresarial", url: "https://gamma.app/docs/Liderando-la-Revolucion-Digital-Empresarial-43pbpoes8tdjv2u", program: 'lasMarias' as const },

            // Santurce Program Presentations
            { title: "Gestión del Tiempo y Planificación", url: "https://gamma.app/docs/Gestion-del-Tiempo-y-Planificacion-4hv1c68ym1rduai", program: 'santurce' as const },
            { title: "Ética laboral e Integridad", url: "https://gamma.app/docs/Etica-laboral-e-Integridad-m8grxwnrcw9uaph", program: 'santurce' as const },
            { title: "Comunicación Efectiva", url: "https://gamma.app/docs/Comunicacion-Efectiva-zw5d5x7d0koxb8g", program: 'santurce' as const },
            { title: "Adaptabilidad y Resiliencia", url: "https://gamma.app/docs/Adaptabilidad-y-Resiliencia-j8pqo2jmhxz3l61", program: 'santurce' as const },
            { title: "Trabajo en Equipo y Colaboración", url: "https://gamma.app/docs/Trabajo-en-Equipo-y-Colaboracion-iucz81njjnwq45v", program: 'santurce' as const },
            { title: "Inteligencia Artificial Para Búsqueda de Empleo", url: "https://gamma.app/docs/Inteligencia-Artificial-Para-Busqueda-de-Empleo-o7m8fwj7d4fktmc", program: 'santurce' as const },
            { title: "Preparación de Currículum con IA", url: "https://gamma.app/docs/Preparacion-de-Curriculum-con-IA-ik6n0k2yy8hyfbv", program: 'santurce' as const },
            { title: "Preparación de Entrevistas con IA", url: "https://gamma.app/docs/Preparacion-de-Entrevistas-con-IA-yuw3ynm6dzlumny", program: 'santurce' as const },
            { title: "Marca Personal y Redes Profesionales con IA", url: "https://gamma.app/docs/Marca-Personal-y-Redes-Profesionales-con-IA-0gkyp14s1njnazl", program: 'santurce' as const },
            { title: "Preparación para Pruebas de Empleo con IA", url: "https://gamma.app/docs/Preparacion-para-Pruebas-de-Empleo-con-IA-vw93wrnpc0rlxqn", program: 'santurce' as const },
            { title: "Estrategias de Negociación Salarial con IA", url: "https://gamma.app/docs/Estrategias-de-Negociacion-Salarial-con-IA-83j7ywscv29t3zm", program: 'santurce' as const },
          ] satisfies Presentation[],
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
          title: "Desarrollador Senior .NET",
          company: "TradeStation Technologies",
          location: "Florida",
          period: "Febrero 2011 - Abril 2011",
          description:
            "Entregué mejoras de rápido desarrollo para plataforma de estrategias de trading. • **Desarrollo de Aplicación Web**: Agregué funcionalidad a aplicación web .NET 4.0 para estrategias de trading en línea usando patrón Model-View-Presenter (MVP). • **Mejora UI/UX**: Diseñé la Vista usando CSS y eliminé todas las tablas, reemplazándolas con etiquetas div para diseño responsivo moderno. • **Capa de Datos**: Utilicé Entity Framework para el modelo, implementando expresiones LINQ y lambda para crear los datos resultantes. • **Aseguramiento de Calidad**: Desarrollé pruebas unitarias usando MSTest y librerías Moq para simular objetos e interceptar llamadas de métodos. Comencé a producir resultados dentro de tres días de obtener acceso al código fuente TFS.",
          technologies: [
            ".NET 4.0",
            "Patrón MVP",
            "Entity Framework",
            "LINQ",
            "CSS",
            "MSTest",
            "Moq",
            "TFS",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Ingeniero de Software Senior",
          company: "Ibeza, LLC",
          location: "Coral Gables, Florida",
          period: "Diciembre 2013 - Noviembre 2015",
          description:
            "Lideré iniciativas de desarrollo para soluciones de tecnología de salud. • **Certificación EHR**: Jugador clave en lograr certificación de Registros Electrónicos de Salud (EHR) de la Oficina del Coordinador Nacional (ONC) para Tecnología de Información de Salud (HIT) en 2014. Lideré desarrollo e implementación de herramientas de reportes de Medidas de Calidad Clínica (CQM) para Certificación ONC HIT. • **Formularios Electrónicos de Oftalmología**: Diseñé, desarrollé e implementé formularios digitales para uso con tabletas y stylus. Desarrollé servicio PDF para creación, edición y fusión de formularios digitales usando librerías Aspose. • **Integración de Laboratorio**: Implementé comunicación electrónica de resultados de laboratorio diagnóstico de terceros como Aurora Diagnostics y Quest Diagnostics usando servidor Mirth Connect. • **Optimización de Rendimiento**: Optimicé aplicación para aceleración, particularmente en áreas problemáticas como creación y edición de formularios digitales.",
          technologies: [
            "Sistemas EHR",
            "Certificación ONC HIT",
            ".NET",
            "Aspose",
            "Mirth Connect",
            "Tecnología de Salud",
            "Formularios Digitales",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Vicepresidente",
          company: "Jíbaro Media Group",
          location: "Puerto Rico",
          period: "Junio 2012 - Diciembre 2013",
          description:
            "Lideré producción de documental premiado combinando experiencia técnica con dirección creativa. • **Productor Ejecutivo**: Productor Ejecutivo del documental en español premiado 'La Gran Falacia', que ganó el Premio del Festival de Cine Sunscreen 2013 a Mejor Película en Idioma Español. • **Producción Técnica**: Serví como ingeniero de sonido, operador de cámara y compositor para la película. Co-edité la película usando Adobe Premiere Pro CS5.5. • **Gestión de Proyectos**: Demostré capacidad comprobada para producir y gestionar proyectos de cine desde la concepción hasta la finalización, con sólidas habilidades técnicas en ingeniería de sonido, operación de cámara y edición.",
          technologies: [
            "Adobe Premiere Pro",
            "Ingeniería de Sonido",
            "Producción Cinematográfica",
            "Edición de Video",
            "Gestión de Proyectos",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Analista Financiero Personal",
          company: "Primerica",
          location: "Área Miami/Fort Lauderdale",
          period: "Julio 2006 - Junio 2007",
          description:
            "Proporcioné planificación financiera integral y soluciones de gestión de patrimonio. • **Servicios de Asesoría Financiera**: Desarrollé e implementé estrategias financieras personalizadas para familias, enfocándome en eliminación de deudas, protección de patrimonio y planificación de inversiones a largo plazo. Proporcioné servicios de asesoría con licencia en múltiples productos financieros incluyendo valores, soluciones hipotecarias y productos de seguros. • **Análisis de Clientes**: Realicé análisis detallados de necesidades financieras para crear recomendaciones de protección e inversión personalizadas. Construí y mantuve relaciones con clientes a través de educación financiera continua y revisiones de portafolios. • **Calificaciones Regulatorias**: Representante Limitado de Productos de Compañías de Inversión/Contratos Variables FINRA Serie 6, Licencia de Seguros de Vida, Salud y Cuidado a Largo Plazo del Estado de Florida, Licencia de Originador de Préstamos Hipotecarios del Estado de Florida.",
          technologies: [
            "Planificación Financiera",
            "Análisis de Inversiones",
            "FINRA Serie 6",
            "Productos de Seguros",
            "Soluciones Hipotecarias",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Líder de Equipo",
          company: "Asurity (anteriormente MRG Document Technologies)",
          location: "Boca Raton, Florida",
          period: "Enero 2005 - Julio 2006",
          description:
            "Lideré equipo técnico para mantenimiento y mejora de aplicación de procesamiento hipotecario. • **Liderazgo Técnico**: Serví como Líder Técnico para aplicación de procesamiento hipotecario durante su fase de mantenimiento usando Servicios Web en .NET. • **Ingeniería de Cumplimiento**: Creé motor de reglas de cumplimiento para que gerentes generen señales de advertencia durante el procesamiento de todos los préstamos en C#. • **Optimización de Rendimiento**: Ajusté exitosamente y aceleré muchos procedimientos almacenados de SQL Server que estaban bloqueando el sistema, mejorando el rendimiento general de la aplicación.",
          technologies: [
            "Servicios Web",
            ".NET",
            "C#",
            "SQL Server",
            "Procesamiento Hipotecario",
            "Liderazgo de Equipo",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Programador/Analista",
          company: "American Express",
          location: "Florida",
          period: "Enero 1998 - Octubre 1998",
          description:
            "Desarrollé sistemas críticos de gestión de datos para información sensible de tarjetahabientes. • **Proveedor de Datos Sensibles de Tarjetahabientes**: Proporcioné soporte técnico para variedad de aplicaciones que procesaban información sensible de tarjetahabientes. Resolví problemas relacionados con entrada de datos, validación de datos e impresión de estados de facturación. Mantuve alto nivel de confidencialidad y seguridad para todos los datos sensibles. • **Cargador de Datos**: Desarrollé aplicación VB 5 que usaba componentes ActiveX para cargar datos desde diferentes fuentes a servidor SQL 6.5. La aplicación fue diseñada para ser escalable y eficiente, procesando grandes cantidades de datos rápidamente desde hojas de cálculo, archivos de texto y sistemas heredados.",
          technologies: [
            "Visual Basic 5",
            "SQL Server 6.5",
            "ActiveX",
            "Seguridad de Datos",
            "ETL",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Programador/Analista",
          company: "Broker Dealer Systems",
          location: "Margate, Florida",
          period: "Marzo 1997 - Enero 1998",
          description:
            "Modernicé aplicación financiera usando principios de programación orientada a objetos. • **Re-arquitectura de Sistema**: Actualicé aplicación financiera procedural existente para casa de corretaje usando programación orientada a objetos en VB. • **Implementación OOP**: Usé programación orientada a objetos (OOP) para hacer código más reutilizable, mantenible y escalable. La aplicación actualizada fue más eficiente y más fácil de usar que la aplicación original.",
          technologies: [
            "Visual Basic",
            "OOP",
            "Sistemas Financieros",
            "Aplicaciones de Corretaje",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Programador/Analista II",
          company: "JMH Health Plan (CSC's Managed Health Care)",
          location: "Florida",
          period: "Enero 1995 - Marzo 1997",
          description:
            "Implementé sistema empresarial de gestión de salud y gestioné infraestructura crítica. • **Implementación de Aplicación de Salud**: Trabajé como parte de equipo para implementar aplicación de Cuidado de Salud Gestionado de CSC, una aplicación de software usada por HMOs para almacenar historial médico electrónico de miembros. La aplicación fue implementada en una gran empresa con múltiples sitios y usuarios. • **Administración Unix**: Instalé, configuré y mantuve sistemas AIX Unix y respaldo de todas las bases de datos. Usé sed, awk y Cron para automatizar cada aspecto del mantenimiento del sistema.",
          technologies: [
            "TI de Salud",
            "Sistemas HMO",
            "AIX Unix",
            "sed/awk",
            "Cron",
            "Administración de Bases de Datos",
          ],
          isNewlyAdded: true,
        },
        {
          title: "Asistente de Archivo de Radiología",
          company: "Hospital VA",
          location: "Florida",
          period: "Marzo 1993 - Enero 1995",
          description:
            "Balanceé administración de salud a tiempo completo con carga académica a tiempo completo. • **Gestión del Tiempo**: Demostré sólidas habilidades de gestión del tiempo y organización al balancear trabajo a tiempo completo con carga académica a tiempo completo. • **Desarrollo Profesional**: Desarrollé fuerte ética de trabajo y capacidad para trabajar independientemente y como parte de un equipo. Obtuve experiencia valiosa en la fuerza laboral y aprendí cómo aplicar conocimientos del aula en un entorno del mundo real. Desarrollé sólidas habilidades de comunicación e interpersonales al interactuar con clientes, compañeros de trabajo y supervisores.",
          technologies: [
            "Administración de Salud",
            "Gestión de Registros",
            "Servicio al Cliente",
          ],
          isNewlyAdded: true,
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
          institution: "Ellis University (anteriormente afiliada a New York Tech)",
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
          title: "Desarrollador Blockchain",
          organization: "Cryptomonedas Pal Pueblo",
          location: "Puerto Rico",
          period: "Agosto 2021 - Marzo 2022",
          url: "",
        },
        {
          title: "Miembro Fundador",
          organization: "Florida Interscholastic Cycling League",
          location: "Florida",
          period: "Marzo 2018 - Enero 2020",
          url: "http://FloridaMTB.org",
        },
        {
          title: "Voluntario de Desarrollo de Programas",
          organization: "Boys & Girls Club",
          location: "Condado de Osceola, Florida",
          period: "Mayo 2017 - Agosto 2017",
          url: "",
        },
        {
          title: "Presentador STEAM Aspire to Inspire",
          organization: "ALPFA, Inc - Asociación de Profesionales Latinos Para América",
          location: "Florida",
          period: "Abril 2017",
          url: "",
        },
        {
          title: "Videógrafo Voluntario",
          organization: "Swamp Club",
          location: "Parque Estatal Alafia, Lithia, Florida",
          period: "Enero 2017 - Marzo 2017",
          url: "https://www.youtube.com/playlist?list=PLEMQ9VFlh91rmIRl7VrJxduYUd6-W37CQ",
        },
        {
          title: "Preparador de Impuestos",
          organization: "Asistencia Voluntaria de Impuestos sobre la Renta",
          location: "Florida",
          period: "Julio 2006 - Julio 2007",
          url: "",
        },
      ],
    },
  };

  const currentLanguageData = experiences[language];

  // Get original experiences (without isNewlyAdded flag)
  const originalExperiences = currentLanguageData.experience.filter(item => !item.isNewlyAdded);

  // Map newly added experiences to their insertion points
  const newExperiencesByPosition = {
    afterDisney: currentLanguageData.experience.filter(exp =>
      exp.isNewlyAdded && (exp.company === "Ibeza, LLC" || exp.company === "Jíbaro Media Group")
    ),
    afterAVM: currentLanguageData.experience.filter(exp =>
      exp.isNewlyAdded && exp.company === "TradeStation Technologies"
    ),
    afterABB: currentLanguageData.experience.filter(exp =>
      exp.isNewlyAdded && exp.company === "Primerica"
    ),
    afterOfficeDepot: currentLanguageData.experience.filter(exp =>
      exp.isNewlyAdded && [
        "Asurity (formerly MRG Document Technologies)",
        "American Express",
        "Broker Dealer Systems",
        "JMH Health Plan (CSC's Managed Health Care)",
        "VA Hospital"
      ].includes(exp.company)
    ),
  };

  // Check if there are hidden experiences to show the button
  const hasHiddenExperiences = currentLanguageData.experience.some(item => item.isNewlyAdded);

  // Show top 3 certifications initially
  const certificationsToShow = showAllCertifications
    ? currentLanguageData.certifications
    : currentLanguageData.certifications.slice(0, 3);

  // Helper component for inline "Show More" buttons
  const InlineShowMoreButton = ({
    onClick,
    label
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <div className="text-center my-8">
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 hover:border-primary/30 rounded-full font-medium transition-all duration-300 hover:scale-105 text-sm"
      >
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );

  // Build the experience list with inline expansion buttons
  const renderExperiences = () => {
    const experiences: React.ReactElement[] = [];
    let currentIndex = 0;

    // Stage 1: Show first 5 original experiences (up to Disney)
    const initialCount = showAllExperiences ? originalExperiences.length : 5;

    for (let i = 0; i < initialCount; i++) {
      const exp = originalExperiences[i];

      // Skip stagger for experiences revealed after clicking "Show More" (indices 5+)
      const skipStagger = showAllExperiences && i >= 5;

      experiences.push(
        <ExperienceItem
          key={`${exp.company}-${exp.title}-${i}`}
          {...exp}
          index={currentIndex++}
          skipStagger={skipStagger}
        />
      );

      // After Disney (index 4), add inline button for Ibeza + Jíbaro
      if (i === 4 && showAllExperiences) {
        if (!showAfterDisney && newExperiencesByPosition.afterDisney.length > 0) {
          experiences.push(
            <InlineShowMoreButton
              key="btn-after-disney"
              onClick={() => setShowAfterDisney(true)}
              label={language === "en" ? "Show More Experiences" : "Ver Más Experiencias"}
            />
          );
        } else if (showAfterDisney) {
          newExperiencesByPosition.afterDisney.forEach((exp, idx) => {
            experiences.push(
              <ExperienceItem
                key={`${exp.company}-${exp.title}-${idx}`}
                {...exp}
                index={currentIndex++}
                skipStagger={true}
              />
            );
          });
        }
      }

      // After AVM (index 5), add inline button for TradeStation
      if (i === 5 && showAllExperiences) {
        if (!showAfterAVM && newExperiencesByPosition.afterAVM.length > 0) {
          experiences.push(
            <InlineShowMoreButton
              key="btn-after-avm"
              onClick={() => setShowAfterAVM(true)}
              label={language === "en" ? "Show More Experiences" : "Ver Más Experiencias"}
            />
          );
        } else if (showAfterAVM) {
          newExperiencesByPosition.afterAVM.forEach((exp, idx) => {
            experiences.push(
              <ExperienceItem
                key={`${exp.company}-${exp.title}-${idx}`}
                {...exp}
                index={currentIndex++}
                skipStagger={true}
              />
            );
          });
        }
      }

      // After ABB (index 6), add inline button for Primerica
      if (i === 6 && showAllExperiences) {
        if (!showAfterABB && newExperiencesByPosition.afterABB.length > 0) {
          experiences.push(
            <InlineShowMoreButton
              key="btn-after-abb"
              onClick={() => setShowAfterABB(true)}
              label={language === "en" ? "Show More Experiences" : "Ver Más Experiencias"}
            />
          );
        } else if (showAfterABB) {
          newExperiencesByPosition.afterABB.forEach((exp, idx) => {
            experiences.push(
              <ExperienceItem
                key={`${exp.company}-${exp.title}-${idx}`}
                {...exp}
                index={currentIndex++}
                skipStagger={true}
              />
            );
          });
        }
      }

      // After Office Depot (index 7), add inline button for remaining experiences
      if (i === 7 && showAllExperiences) {
        if (!showAfterOfficeDepot && newExperiencesByPosition.afterOfficeDepot.length > 0) {
          experiences.push(
            <InlineShowMoreButton
              key="btn-after-office-depot"
              onClick={() => setShowAfterOfficeDepot(true)}
              label={language === "en" ? "Show More Experiences" : "Ver Más Experiencias"}
            />
          );
        } else if (showAfterOfficeDepot) {
          newExperiencesByPosition.afterOfficeDepot.forEach((exp, idx) => {
            experiences.push(
              <ExperienceItem
                key={`${exp.company}-${exp.title}-${idx}`}
                {...exp}
                index={currentIndex++}
                skipStagger={true}
              />
            );
          });
        }
      }
    }

    return experiences;
  };

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
          {renderExperiences()}

          {/* Main "Show More" Button - shows first time to reveal all 9 original experiences */}
          {!showAllExperiences && hasHiddenExperiences && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllExperiences(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full font-medium transition-all duration-300 hover:scale-105 professional-shadow"
              >
                {language === "en" ? "Show More Experiences" : "Ver Más Experiencias"}
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
          {certificationsToShow.map((item, index) => (
            <CertificationItem
              key={`${item.organization}-${item.title}-${index}`}
              {...item}
              index={index}
            />
          ))}

          {/* Show More Button for Certifications */}
          {!showAllCertifications && currentLanguageData.certifications.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllCertifications(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 rounded-full font-medium transition-all duration-300 hover:scale-105 professional-shadow"
              >
                {language === "en" ? "Show More Recognition" : "Ver Más Reconocimientos"}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
