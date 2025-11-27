"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { servicesContentES } from "../data/services-content";

export function SolutionBento() {
  const { solution } = servicesContentES;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-neutral-50"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-ocean-900 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {solution.title}
        </motion.h2>

        {/* Bento Grid Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Google Maps Visibility - Large */}
          <motion.div
            className="md:col-span-1 bg-gradient-to-br from-teal-500 to-teal-400 rounded-3xl p-8 text-white shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Visibilidad en Google Maps</h3>
            </div>
            <p className="text-white/90 text-lg mb-6">
              Tu negocio aparece cuando los turistas buscan &ldquo;restaurante cerca de mí&rdquo;
            </p>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm">Google Local Pack</span>
              </div>
              <div className="text-sm text-white/80">
                Aparece en los primeros 3 resultados con foto, reseñas, y ubicación
              </div>
            </div>
          </motion.div>

          {/* When Tourists Search */}
          <motion.div
            className="md:col-span-1 bg-white rounded-3xl p-8 shadow-xl border-2 border-ocean-200"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-ocean-900 mb-4">
              Cuando Turistas Buscan...
            </h3>
            <div className="space-y-3">
              <SearchResultCard
                query="restaurante cerca de mí"
                isInView={isInView}
                delay={0.4}
              />
              <SearchResultCard
                query="mejor mofongo Old San Juan"
                isInView={isInView}
                delay={0.5}
              />
              <SearchResultCard
                query="where to eat in Puerto Rico"
                isInView={isInView}
                delay={0.6}
              />
            </div>
            <div className="mt-6 p-4 bg-gold-500/10 rounded-xl border border-gold-500/20">
              <p className="text-sm font-semibold text-ocean-900">
                → TÚ APARECES en los resultados
              </p>
            </div>
          </motion.div>

          {/* Before & After Comparison - Wide */}
          <motion.div
            className="md:col-span-2 bg-gradient-to-br from-ocean-900 to-ocean-800 rounded-3xl p-8 text-white shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              Antes vs. Después de Tener Tu Sitio Web
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg">Solo Facebook</h4>
                </div>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Invisible en Google</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Solo ven locales que te siguen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Dependes del algoritmo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>No profesional para turistas</span>
                  </li>
                </ul>
              </div>

              {/* After */}
              <div className="bg-teal-500/20 backdrop-blur rounded-2xl p-6 border border-teal-400/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-teal-500/30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg">Con Tu Sitio Web</h4>
                </div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span>Visible en Google 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span>Captura turistas buscando</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span>Tú controlas el contenido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">✓</span>
                    <span>Imagen profesional global</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Mobile Ready */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-ocean-200"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-ocean-700 to-ocean-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ocean-900">Mobile Ready</h3>
            </div>
            <p className="text-neutral-600 mb-4">
              85% de los turistas buscan en móvil
            </p>
            <div className="bg-ocean-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-ocean-900">
                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Perfecto en todos los dispositivos</span>
              </div>
            </div>
          </motion.div>

          {/* 24/7 Availability */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-ocean-200"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-400 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ocean-900">24/7 Disponible</h3>
            </div>
            <p className="text-neutral-600 mb-4">
              Tu menú, ubicación y horarios siempre accesibles
            </p>
            <div className="bg-gold-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-ocean-900">
                <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Nunca cierras para internet</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SearchResultCard({
  query,
  isInView,
  delay,
}: {
  query: string;
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="bg-ocean-50 rounded-lg p-3 border border-ocean-100"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-ocean-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-sm text-ocean-900 font-medium">&ldquo;{query}&rdquo;</span>
      </div>
    </motion.div>
  );
}
