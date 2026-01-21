"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@/components/pdf-viewer";
import {
  Mail,
  MessageSquare,
  Send,
  Download,
  Calendar,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import Link from "next/link";

// Contact information constants
const contactInfo = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "marioayaladev@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1 (407) 476-7353",
  location: "Puerto Rico",
  github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "#",
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "#",
  youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "#",
  businessHours: "Monday - Friday, 9:00 AM - 6:00 PM EST",
  responseTime: "Within 24 hours for business inquiries",
  preferredContact: "LinkedIn for initial business discussions",
  timezone: "Eastern Time (EST/EDT)",
};

// Translations
const translations = {
  en: {
    contact: "Contact",
    getInTouch: "Let's Build Something Amazing Together",
    subtitle:
      "Ready to bring your ideas to life? Let's discuss your next project.",
    directContact: "Direct Contact",
    businessHours: "Business Hours",
    responseTime: "Response Time",
    preferredContact: "Preferred Contact",
    availability: "Professional Availability",
    scheduleCall: "Schedule a Call",
    downloadResume: "Download Resume",
    socialMedia: "Connect With Me",
    sendEmail: "Send Email",
    emailCta: "Get in Touch",
    emailCtaDescription:
      "Have a project in mind? Send me an email and I'll get back to you within 24 hours.",
    orSchedule: "Or schedule a call directly",
  },
  es: {
    contact: "Contacto",
    getInTouch: "Construyamos Algo Increíble Juntos",
    subtitle:
      "¿Listo para dar vida a tus ideas? Hablemos sobre tu próximo proyecto.",
    directContact: "Contacto Directo",
    businessHours: "Horario Comercial",
    responseTime: "Tiempo de Respuesta",
    preferredContact: "Contacto Preferido",
    availability: "Disponibilidad Profesional",
    scheduleCall: "Agendar Llamada",
    downloadResume: "Descargar CV",
    socialMedia: "Conéctate Conmigo",
    sendEmail: "Enviar Correo",
    emailCta: "Ponte en Contacto",
    emailCtaDescription:
      "¿Tienes un proyecto en mente? Envíame un correo y te responderé dentro de 24 horas.",
    orSchedule: "O agenda una llamada directamente",
  },
};

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="contact"
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
            <MessageSquare className="mr-2 h-4 w-4" />
            {t.contact}
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gradient">
            {t.getInTouch}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Email CTA Card */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="glass-effect rounded-2xl p-8 professional-shadow h-full flex flex-col justify-center">
              <div className="text-center max-w-lg mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{t.emailCta}</h3>
                <p className="text-muted-foreground mb-8">
                  {t.emailCtaDescription}
                </p>

                <div className="space-y-4">
                  <Button
                    className="w-full sm:w-auto rounded-full professional-shadow-lg px-8"
                    asChild
                  >
                    <Link href={`mailto:${contactInfo.email}`}>
                      <Send className="mr-2 h-4 w-4" />
                      {t.sendEmail}
                    </Link>
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    {t.orSchedule}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-full px-8"
                    asChild
                  >
                    <Link
                      href={
                        process.env.NEXT_PUBLIC_CALENDLY_URL ||
                        "https://calendly.com/temiban013"
                      }
                      target="_blank"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {t.scheduleCall}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Professional Availability */}
            <div className="glass-effect rounded-2xl p-6 professional-shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-3 h-5 w-5 text-primary" />
                {t.availability}
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-sm font-medium">
                        {t.businessHours}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 ml-5">
                    {contactInfo.businessHours}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-primary mr-2">
                      {t.responseTime}:
                    </span>
                    <span className="text-muted-foreground">
                      {contactInfo.responseTime}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-primary mr-2">
                      {t.preferredContact}:
                    </span>
                    <span className="text-muted-foreground">
                      {contactInfo.preferredContact}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="glass-effect rounded-2xl p-6 professional-shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                {t.directContact}
              </h3>
              <div className="space-y-3">
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary mr-3" />
                  <span className="text-sm">{contactInfo.email}</span>
                </Link>
                <Link
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary mr-3" />
                  <span className="text-sm">{contactInfo.phone}</span>
                </Link>
                <div className="flex items-center p-3 rounded-lg">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-3" />
                  <span className="text-sm">
                    {contactInfo.location} ({contactInfo.timezone})
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => setShowPDFViewer(true)}
              >
                <Download className="mr-2 h-4 w-4" />
                {t.downloadResume}
              </Button>
            </div>

            {/* Social Media */}
            <div className="glass-effect rounded-2xl p-6 professional-shadow">
              <h3 className="text-xl font-semibold mb-4">{t.socialMedia}</h3>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href={contactInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <Phone className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PDFViewer
        isOpen={showPDFViewer}
        onClose={() => setShowPDFViewer(false)}
        pdfUrl={
          language === "en"
            ? `/${
                process.env.NEXT_PUBLIC_ENGLISH_RESUME ||
                "Mario-R-Ayala-Resume-EN.pdf"
              }`
            : `/${
                process.env.NEXT_PUBLIC_SPANISH_RESUME ||
                "Mario-R-Ayala-Resume-ES.pdf"
              }`
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

export default Contact;
