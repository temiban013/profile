"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { servicesContentES } from "../data/services-content";
import { analytics } from "./analytics";
import {
  clientContactSchema,
  type ClientContactFormInput,
} from "@/lib/validation/contact-schema";

// Extended type for form with honeypot
type FormData = ClientContactFormInput & { website_url?: string };

export function CTAForm() {
  const { cta } = servicesContentES;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(clientContactSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          setErrorMessage(result.error || "Demasiadas solicitudes. Por favor intenta de nuevo más tarde.");
          analytics.formError("rate_limited");
          setSubmitStatus("error");
          return;
        }

        // Handle validation errors
        if (response.status === 400) {
          setErrorMessage(result.error || "Por favor verifica los datos ingresados.");
          analytics.formError("validation_error");
          setSubmitStatus("error");
          return;
        }

        // Handle other errors
        throw new Error(result.error || "Error al enviar el formulario");
      }

      // Track successful form submission
      analytics.formSubmit({
        business_type: data.businessType,
        website_status: data.hasWebsite,
      });

      setSubmitStatus("success");
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      analytics.formError(error instanceof Error ? error.message : "Unknown error");
      setErrorMessage(null); // Use default error message
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Track form start on first field focus
  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      analytics.formStart();
    }
  };

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-700 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-teal-400) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* CTA Headline */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {cta.headline}
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-center text-teal-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {cta.subtext}
          </motion.p>

          {/* Form */}
          <motion.div
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field for spam protection - hidden from users */}
              <input
                {...register("website_url")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  width: 0,
                }}
                aria-hidden="true"
              />

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-ocean-900 mb-2">
                  Nombre *
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Tu nombre completo"
                  onFocus={handleFormStart}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-ocean-900 mb-2">
                  Email *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-ocean-900 mb-2">
                  Teléfono *
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="(787) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Business Type */}
              <div>
                <label
                  htmlFor="businessType"
                  className="block text-sm font-semibold text-ocean-900 mb-2"
                >
                  Tipo de negocio *
                </label>
                <select
                  {...register("businessType")}
                  id="businessType"
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-teal-500 focus:outline-none transition-colors"
                >
                  <option value="">Selecciona tu tipo de negocio</option>
                  <option value="restaurant">Restaurante</option>
                  <option value="cafeteria">Cafetería</option>
                  <option value="food-truck">Food Truck / Kiosco</option>
                  <option value="bakery">Panadería / Repostería</option>
                  <option value="bar">Bar / Cervecería</option>
                  <option value="other">Otro tipo de negocio</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
                )}
              </div>

              {/* Has Website */}
              <div>
                <label id="hasWebsite-label" className="block text-sm font-semibold text-ocean-900 mb-2">
                  ¿Tienes sitio web actualmente? *
                </label>
                <div className="flex gap-4" role="radiogroup" aria-labelledby="hasWebsite-label">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      {...register("hasWebsite")}
                      type="radio"
                      value="yes"
                      className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="text-neutral-700">Sí</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      {...register("hasWebsite")}
                      type="radio"
                      value="no"
                      className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="text-neutral-700">No</span>
                  </label>
                </div>
                {errors.hasWebsite && (
                  <p className="text-red-500 text-sm mt-1">{errors.hasWebsite.message}</p>
                )}
              </div>

              {/* Goals */}
              <div>
                <label htmlFor="goals" className="block text-sm font-semibold text-ocean-900 mb-2">
                  ¿Qué te gustaría lograr? *
                </label>
                <textarea
                  {...register("goals")}
                  id="goals"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-200 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                  placeholder="Cuéntame sobre tus objetivos y cómo puedo ayudarte..."
                />
                {errors.goals && (
                  <p className="text-red-500 text-sm mt-1">{errors.goals.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : cta.button}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  role="alert"
                  aria-live="polite"
                  className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ¡Gracias! Te contactaré pronto para agendar tu consulta.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  role="alert"
                  aria-live="assertive"
                  className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMessage || "Hubo un error. Por favor intenta de nuevo o escribe directamente al email."}
                </motion.div>
              )}
            </form>

            {/* Alternative Contact */}
            <div className="mt-6 text-center">
              <p className="text-neutral-600">{cta.alternative}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
