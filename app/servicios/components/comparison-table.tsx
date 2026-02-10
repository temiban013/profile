"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { servicesContentES } from "../data/services-content";

export function ComparisonTable() {
  const { comparison } = servicesContentES;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const comparisonData = [
    {
      feature: "Costo promedio",
      agencies: "$10,000 - $25,000",
      mario: "$2,500 - $8,000",
      highlight: true,
    },
    {
      feature: "Tecnología",
      agencies: "WordPress genérico",
      mario: "Next.js moderno",
      highlight: false,
    },
    {
      feature: "Velocidad de carga",
      agencies: "3-5 segundos",
      mario: "< 1 segundo",
      highlight: true,
    },
    {
      feature: "Comunicación",
      agencies: "Múltiples intermediarios",
      mario: "Directo con el desarrollador",
      highlight: false,
    },
    {
      feature: "Personalización",
      agencies: "Plantillas limitadas",
      mario: "100% personalizado",
      highlight: false,
    },
    {
      feature: "Soporte post-lanzamiento",
      agencies: "Contratos costosos",
      mario: "Flexible, accesible",
      highlight: false,
    },
  ];

  const trustBadges = [
    { label: "25+ años", sublabel: "Experiencia en software" },
    { label: "95+", sublabel: "Lighthouse Score" },
    { label: "Bilingüe", sublabel: "Español/Inglés" },
    { label: "Puerto Rico", sublabel: "Basado localmente" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-ocean-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {comparison.title}
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-center text-neutral-600 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Sin intermediarios, sin sobrecargos, solo resultados
        </motion.p>

        {/* Comparison Table */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-ocean-100">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-ocean-900 to-ocean-800 text-white">
              <div className="p-6 font-bold text-lg">Característica</div>
              <div className="p-6 font-bold text-lg text-center border-l border-white/10">
                Agencias Tradicionales
              </div>
              <div className="p-6 font-bold text-lg text-center bg-teal-500/20 border-l border-white/10">
                Nitaíno Digital
              </div>
            </div>

            {/* Table Rows */}
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                className={`grid grid-cols-3 ${
                  index !== comparisonData.length - 1 ? "border-b border-neutral-200" : ""
                } ${row.highlight ? "bg-gold-500/5" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="p-6 font-semibold text-ocean-900">{row.feature}</div>
                <div className="p-6 text-center text-neutral-600 border-l border-neutral-200">
                  {row.agencies}
                </div>
                <div className="p-6 text-center font-semibold text-teal-600 bg-teal-500/5 border-l border-neutral-200">
                  {row.mario}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center text-ocean-900 mb-8">
            Respaldado por Experiencia y Resultados
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                className="bg-gradient-to-br from-ocean-50 to-teal-50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-ocean-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl font-bold text-ocean-900 mb-2">
                  {badge.label}
                </div>
                <div className="text-sm text-neutral-600 font-medium">
                  {badge.sublabel}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Trust Signals */}
          <motion.div
            className="mt-12 bg-gradient-to-br from-ocean-900 to-ocean-800 rounded-3xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-lg sm:text-xl mb-4">
              Proyectos con <span className="font-bold text-teal-400">Disney Parks</span> y{" "}
              <span className="font-bold text-teal-400">Office Depot</span>
            </p>
            <p className="text-white/80">
              25+ años construyendo soluciones de software para empresas grandes y pequeñas
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
