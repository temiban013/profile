"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Quote,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  companyLogo?: string;
  content: string;
  rating: number;
  project: string;
  results: string;
  location: string;
}

interface ClientLogos {
  name: string;
  logo: string;
  description: string;
}

const testimonials: Record<string, Testimonial[]> = {
  en: [
    {
      id: "1",
      name: "Café Papamín LLC",
      title: "Business Owner",
      company: "Café Papamín",
      content: "If I had to define your work in one word, it would be professionalism. The attention and work is worthy of 100% recommendation.",
      rating: 5,
      project: "E-commerce Platform with WhatsApp Integration",
      results: "Achieved 24/7 customer engagement at $620 total cost vs. $3,000+ from traditional platforms",
      location: "Puerto Rico"
    },
    {
      id: "2",
      name: "Dr. Michael Rodriguez",
      title: "Operations Manager",
      company: "Educational Technology Institute",
      content: "The ASL learning platform Mario developed exceeded all expectations. His attention to accessibility and user experience resulted in a 40% increase in student engagement.",
      rating: 5,
      project: "ASL Learning Platform",
      results: "40% increase in student engagement, 70% faster development cycle",
      location: "Puerto Rico"
    },
    {
      id: "3",
      name: "Jennifer Walsh",
      title: "IT Director",
      company: "Financial Services Corp",
      content: "Mario's experience with enterprise systems at Disney and Office Depot was evident throughout our project. He delivered a robust financial reporting system that handles millions of transactions daily.",
      rating: 5,
      project: "Financial Reporting System",
      results: "Processes 2M+ daily transactions with 99.9% uptime",
      location: "Florida, USA"
    },
  ],
  es: [
    {
      id: "1",
      name: "Café Papamín LLC",
      title: "Dueño del Negocio",
      company: "Café Papamín",
      content: "Si tuviera que definir su labor en una palabra, sería profesionalismo. La atención y el trabajo es digno de recomendar al 100%.",
      rating: 5,
      project: "Plataforma E-commerce con Integración WhatsApp",
      results: "Logró participación de clientes 24/7 con costo total de $620 vs. $3,000+ de plataformas tradicionales",
      location: "Puerto Rico"
    },
    {
      id: "2",
      name: "Dr. Michael Rodríguez",
      title: "Gerente de Operaciones",
      company: "Instituto de Tecnología Educativa",
      content: "La plataforma de aprendizaje ASL que desarrolló Mario superó todas las expectativas. Su atención a la accesibilidad y experiencia del usuario resultó en un aumento del 40% en la participación estudiantil.",
      rating: 5,
      project: "Plataforma de Aprendizaje ASL",
      results: "40% de aumento en participación estudiantil, 70% más rápido en desarrollo",
      location: "Puerto Rico"
    },
    {
      id: "3",
      name: "Jennifer Walsh",
      title: "Directora de TI",
      company: "Financial Services Corp",
      content: "La experiencia de Mario con sistemas empresariales en Disney y Office Depot fue evidente durante todo nuestro proyecto. Entregó un sistema robusto de reportes financieros que maneja millones de transacciones diarias.",
      rating: 5,
      project: "Sistema de Reportes Financieros",
      results: "Procesa más de 2M transacciones diarias con 99.9% de disponibilidad",
      location: "Florida, EE.UU."
    },
  ],
};

const clientLogos: ClientLogos[] = [
  {
    name: "Disney Parks",
    logo: "/logos/disney-logo.svg",
    description: "Enterprise Systems Engineering"
  },
  {
    name: "Office Depot",
    logo: "/logos/office-depot-logo.svg",
    description: "Financial Systems Development"
  },
  {
    name: "Healthcare Innovation",
    logo: "/logos/healthcare-logo.svg",
    description: "Healthcare Technology Solutions"
  },
  {
    name: "EdTech Institute",
    logo: "/logos/edtech-logo.svg",
    description: "Educational Platform Development"
  },
];

const translations = {
  en: {
    testimonials: "Client Testimonials",
    title: "What Clients Say About My Work",
    subtitle: "Real results from real projects - trusted by enterprise clients and growing businesses.",
    trustedBy: "Trusted By",
    yearsExperience: "25+ Years Experience",
    projectsCompleted: "50+ Projects Completed",
    clientSatisfaction: "100% Client Satisfaction",
    project: "Project",
    results: "Results",
    readMore: "Read More",
    readLess: "Read Less",
    nextTestimonial: "Next testimonial",
    prevTestimonial: "Previous testimonial",
  },
  es: {
    testimonials: "Testimonios de Clientes",
    title: "Lo Que Dicen Los Clientes Sobre Mi Trabajo",
    subtitle: "Resultados reales de proyectos reales - confiado por clientes empresariales y negocios en crecimiento.",
    trustedBy: "Confiado Por",
    yearsExperience: "25+ Años de Experiencia",
    projectsCompleted: "50+ Proyectos Completados",
    clientSatisfaction: "100% Satisfacción del Cliente",
    project: "Proyecto",
    results: "Resultados",
    readMore: "Leer Más",
    readLess: "Leer Menos",
    nextTestimonial: "Siguiente testimonio",
    prevTestimonial: "Testimonio anterior",
  },
};

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTestimonials = testimonials[language];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentTestimonials.length - 1 : prev - 1
    );
  };


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge variant="secondary" className="mb-4 professional-shadow">
            <Quote className="mr-2 h-4 w-4" />
            {t.testimonials}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gradient">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Trust Indicators */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">25+</div>
            <p className="text-muted-foreground">{t.yearsExperience}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">50+</div>
            <p className="text-muted-foreground">{t.projectsCompleted}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Star className="h-8 w-8 text-primary fill-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">100%</div>
            <p className="text-muted-foreground">{t.clientSatisfaction}</p>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {currentTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="glass-effect professional-shadow-lg rounded-2xl p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <Quote className="h-8 w-8 text-primary/50 mr-4" />
                          <div className="flex">{renderStars(testimonial.rating)}</div>
                        </div>

                        <blockquote className="text-lg mb-6 text-muted-foreground leading-relaxed">
                          &ldquo;{testimonial.content}&rdquo;
                        </blockquote>

                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <cite className="font-semibold text-foreground not-italic">
                              {testimonial.name}
                            </cite>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.title} at {testimonial.company}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-80 space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <h4 className="font-semibold text-primary mb-2">
                            {t.project}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.project}
                          </p>
                        </div>

                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                            {t.results}
                          </h4>
                          <p className="text-sm text-green-600 dark:text-green-300">
                            {testimonial.results}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevTestimonial}
            aria-label={t.prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 professional-shadow-lg border border-border/50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            aria-label={t.nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 professional-shadow-lg border border-border/50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {currentTestimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`${language === "en" ? "Go to testimonial" : "Ir al testimonio"} ${index + 1}: ${testimonial.name}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos Section */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <p className="text-muted-foreground font-medium">{t.trustedBy}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-muted/30 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors duration-300">
                  <Building2 className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-sm text-center mb-1">
                  {client.name}
                </h3>
                <p className="text-xs text-muted-foreground text-center">
                  {client.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;