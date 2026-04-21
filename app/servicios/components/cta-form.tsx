"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, Mail } from "lucide-react";
import { servicesContentES } from "../data/services-content";
import { analytics } from "./analytics";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/temiban013";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "marioayaladev@gmail.com";

export function CTAForm() {
  const { cta } = servicesContentES;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

          {/* CTA Card */}
          <motion.div
            className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.ctaClick("servicios_cta_calendly")}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              {cta.button}
            </a>

            <div className="mt-8 pt-8 border-t border-neutral-200">
              <p className="text-neutral-600 mb-4">
                O escríbeme directamente:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => analytics.ctaClick("servicios_cta_email")}
                className="inline-flex items-center gap-2 text-ocean-800 hover:text-teal-600 font-semibold underline underline-offset-4 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
