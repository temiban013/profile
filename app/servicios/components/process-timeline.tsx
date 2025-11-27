"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface TimelineWeek {
  week: number;
  title: string;
  description: string;
  tasks: string[];
}

const timelineWeeks: TimelineWeek[] = [
  {
    week: 1,
    title: "Consulta & Estrategia",
    description: "Entender tu visión",
    tasks: ["Análisis de competencia", "Definir objetivos", "Estrategia SEO"],
  },
  {
    week: 2,
    title: "Diseño & Aprobación",
    description: "Crear la experiencia",
    tasks: ["Wireframes", "Diseño visual", "Tu aprobación"],
  },
  {
    week: 3,
    title: "Desarrollo & Revisiones",
    description: "Construir tu sitio",
    tasks: ["Codificación", "Funcionalidades", "Pruebas"],
  },
  {
    week: 4,
    title: "Lanzamiento & Training",
    description: "¡Lanzar al mundo!",
    tasks: ["Lanzamiento en vivo", "Capacitación", "Soporte inicial"],
  },
];

export function ProcessTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-900 mb-4">
            Tu Camino Hacia El Éxito
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            Un proceso claro y transparente en 4 semanas
          </p>
        </motion.div>

        {/* Mobile Timeline (Vertical) */}
        <div className="block md:hidden max-w-xl mx-auto">
          {timelineWeeks.map((week, index) => (
            <motion.div
              key={week.week}
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Vertical Line */}
              {index < timelineWeeks.length - 1 && (
                <div className="absolute left-6 top-20 w-1 h-12 bg-gradient-to-b from-teal-500 to-ocean-600" />
              )}

              {/* Week Card */}
              <div className="flex gap-6">
                {/* Circle */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                    {week.week}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-ocean-900 mb-1">
                    {week.title}
                  </h3>
                  <p className="text-sm text-teal-600 font-medium mb-3">
                    {week.description}
                  </p>
                  <ul className="space-y-2">
                    {week.tasks.map((task, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <svg
                          className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Timeline (Horizontal) */}
        <div className="hidden md:block max-w-7xl mx-auto">
          {/* Timeline Container */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-ocean-600 via-teal-500 to-gold-500 hidden lg:block" />

            {/* Timeline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
              {timelineWeeks.map((week, index) => (
                <motion.div
                  key={week.week}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  {/* Week Card */}
                  <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 shadow-lg border border-neutral-200 hover:border-teal-400 transition-all duration-300 h-full">
                    {/* Circle Badge */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {week.week}
                      </div>
                    </div>

                    {/* Week Title */}
                    <h3 className="text-lg font-bold text-ocean-900 text-center mb-2">
                      {week.title}
                    </h3>

                    {/* Week Description */}
                    <p className="text-sm text-teal-600 font-medium text-center mb-4 italic">
                      {week.description}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-ocean-200 to-transparent mb-4" />

                    {/* Tasks List */}
                    <ul className="space-y-3">
                      {week.tasks.map((task, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-neutral-700"
                        >
                          <svg
                            className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Color Accent Bar */}
                    <div className="mt-6 h-1 w-full rounded-full bg-gradient-to-r from-ocean-600 via-teal-500 to-gold-500" />
                  </div>

                  {/* Arrow (visible between cards on desktop) */}
                  {index < timelineWeeks.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-24 text-gold-500 z-20">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline Footer */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-ocean-50 to-teal-50 rounded-2xl p-6 border border-ocean-200">
              <p className="text-neutral-700 font-medium mb-2">
                Estimado: Semanas 1-4
              </p>
              <p className="text-sm text-neutral-600">
                Empezamos tan pronto como firmes. Tu sitio web estará listo en un mes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Footer */}
        <motion.div
          className="block md:hidden mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-ocean-50 to-teal-50 rounded-2xl p-6 border border-ocean-200">
            <p className="text-neutral-700 font-medium mb-2">
              Estimado: 4 Semanas
            </p>
            <p className="text-sm text-neutral-600">
              Empezamos tan pronto como firmes. Tu sitio web estará listo en un mes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
