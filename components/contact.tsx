"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  MessageSquare,
  Send,
  Download,
  Calendar,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import Link from "next/link";

// Type definitions for form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

// Contact information constants
const contactInfo = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "marioayaladev@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1 (407) 476-7353",
  location: "Puerto Rico",
  github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "#",
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "#",
  youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "#",
};

// Project type options
const projectTypes = {
  en: [
    { value: "web-app", label: "Web Application" },
    { value: "e-commerce", label: "E-commerce Platform" },
    { value: "portfolio", label: "Portfolio Website" },
    { value: "landing-page", label: "Landing Page" },
    { value: "consulting", label: "Technical Consulting" },
    { value: "other", label: "Other" },
  ],
  es: [
    { value: "web-app", label: "Aplicación Web" },
    { value: "e-commerce", label: "Plataforma E-commerce" },
    { value: "portfolio", label: "Sitio Web Portafolio" },
    { value: "landing-page", label: "Página de Aterrizaje" },
    { value: "consulting", label: "Consultoría Técnica" },
    { value: "other", label: "Otro" },
  ],
};

// Budget ranges
const budgetRanges = {
  en: [
    { value: "500 - 5K", label: "$500 - $5,000" },
    { value: "5k-15k", label: "$5,000 - $15,000" },
    { value: "15k-30k", label: "$15,000 - $30,000" },
    { value: "30k+", label: "$30,000+" },
    { value: "discuss", label: "Let's Discuss" },
  ],
  es: [
    { value: "500 - 5K", label: "$500 - $5,000" },
    { value: "5k-15k", label: "$5,000 - $15,000" },
    { value: "15k-30k", label: "$15,000 - $30,000" },
    { value: "30k+", label: "$30,000+" },
    { value: "discuss", label: "Hablemos" },
  ],
};

// Timeline options
const timelineOptions = {
  en: [
    { value: "asap", label: "ASAP" },
    { value: "1-3months", label: "1-3 Months" },
    { value: "3-6months", label: "3-6 Months" },
    { value: "6months+", label: "6+ Months" },
    { value: "flexible", label: "Flexible" },
  ],
  es: [
    { value: "asap", label: "Lo antes posible" },
    { value: "1-3months", label: "1-3 Meses" },
    { value: "3-6months", label: "3-6 Meses" },
    { value: "6months+", label: "6+ Meses" },
    { value: "flexible", label: "Flexible" },
  ],
};

// Translations
const translations = {
  en: {
    contact: "Contact",
    getInTouch: "Let's Build Something Amazing Together",
    subtitle:
      "Ready to bring your ideas to life? Let's discuss your next project.",
    contactForm: "Contact Form",
    name: "Full Name",
    email: "Email Address",
    subject: "Subject",
    projectType: "Project Type",
    budget: "Budget Range",
    timeline: "Timeline",
    message: "Project Details",
    namePlaceholder: "Your full name",
    emailPlaceholder: "your.email@example.com",
    subjectPlaceholder: "Brief project summary",
    messagePlaceholder:
      "Tell me about your project, goals, and any specific requirements...",
    send: "Send Message",
    sending: "Sending...",
    successMessage:
      "Message sent successfully! I'll get back to you within 24 hours.",
    errorMessage:
      "Failed to send message. Please try again or contact me directly.",
    directContact: "Direct Contact",
    scheduleCall: "Schedule a Call",
    downloadResume: "Download Resume",
    socialMedia: "Connect With Me",
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    messageMinLength: "Message must be at least 20 characters long",
  },
  es: {
    contact: "Contacto",
    getInTouch: "Construyamos Algo Increíble Juntos",
    subtitle:
      "¿Listo para dar vida a tus ideas? Hablemos sobre tu próximo proyecto.",
    contactForm: "Formulario de Contacto",
    name: "Nombre Completo",
    email: "Correo Electrónico",
    subject: "Asunto",
    projectType: "Tipo de Proyecto",
    budget: "Rango de Presupuesto",
    timeline: "Cronograma",
    message: "Detalles del Proyecto",
    namePlaceholder: "Tu nombre completo",
    emailPlaceholder: "tu.correo@ejemplo.com",
    subjectPlaceholder: "Resumen breve del proyecto",
    messagePlaceholder:
      "Cuéntame sobre tu proyecto, objetivos y requisitos específicos...",
    send: "Enviar Mensaje",
    sending: "Enviando...",
    successMessage:
      "¡Mensaje enviado exitosamente! Te responderé dentro de 24 horas.",
    errorMessage:
      "Error al enviar mensaje. Inténtalo de nuevo o contáctame directamente.",
    directContact: "Contacto Directo",
    scheduleCall: "Agendar Llamada",
    downloadResume: "Descargar CV",
    socialMedia: "Conéctate Conmigo",
    required: "Este campo es obligatorio",
    invalidEmail: "Por favor ingresa un correo válido",
    messageMinLength: "El mensaje debe tener al menos 20 caracteres",
  },
};

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

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

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.required;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.required;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = t.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      // Send form data to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: "success", message: t.successMessage });
        setFormData({
          name: "",
          email: "",
          subject: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
      } else {
        // Handle API errors
        const errorMessage = result.error || t.errorMessage;
        setStatus({ type: "error", message: errorMessage });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus({ type: "error", message: t.errorMessage });
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

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
          {/* Contact Form */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="glass-effect rounded-2xl p-8 professional-shadow">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Mail className="mr-3 h-6 w-6 text-primary" />
                {t.contactForm}
              </h3>

              {/* Status Messages */}
              {status.type === "success" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
                  <p className="text-green-700 dark:text-green-300">
                    {status.message}
                  </p>
                </div>
              )}

              {status.type === "error" && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-300">
                    {status.message}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name} *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`rounded-lg ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      disabled={status.type === "loading"}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`rounded-lg ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      disabled={status.type === "loading"}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">{t.subject} *</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder={t.subjectPlaceholder}
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    className={`rounded-lg ${
                      errors.subject ? "border-red-500" : ""
                    }`}
                    disabled={status.type === "loading"}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject}</p>
                  )}
                </div>

                {/* Project Details Row */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">{t.projectType}</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) =>
                        handleInputChange("projectType", value)
                      }
                      disabled={status.type === "loading"}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes[language].map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">{t.budget}</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) =>
                        handleInputChange("budget", value)
                      }
                      disabled={status.type === "loading"}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges[language].map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">{t.timeline}</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) =>
                        handleInputChange("timeline", value)
                      }
                      disabled={status.type === "loading"}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions[language].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">{t.message} *</Label>
                  <Textarea
                    id="message"
                    placeholder={t.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className={`rounded-lg min-h-[120px] resize-none ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    disabled={status.type === "loading"}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full rounded-full professional-shadow-lg"
                  disabled={status.type === "loading"}
                >
                  {status.type === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t.send}
                    </>
                  )}
                </Button>
              </form>
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
                  <span className="text-sm">{contactInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button variant="outline" className="w-full rounded-full" asChild>
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
              <Button variant="outline" className="w-full rounded-full" asChild>
                <Link
                  href={
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
                  target="_blank"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t.downloadResume}
                </Link>
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
    </section>
  );
};

export default Contact;
