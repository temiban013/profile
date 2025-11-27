"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface IndustryColumn {
  id: string;
  title: string;
  icon: string;
  features: string[];
  color: "ocean" | "teal" | "gold";
}

const industryColumns: IndustryColumn[] = [
  {
    id: "restaurants",
    title: "Restaurantes",
    icon: "utensils",
    features: [
      "Menús digitales con fotos",
      "Reservaciones online",
      "Google Business optimizado",
      "Galerías de platos",
    ],
    color: "ocean",
  },
  {
    id: "cafeterias",
    title: "Cafeterías",
    icon: "coffee",
    features: [
      "Horarios destacados",
      "Sistema de órdenes online",
      "Puntos de lealtad",
      "Carrito de compra",
    ],
    color: "teal",
  },
  {
    id: "food-trucks",
    title: "Food Trucks & Kioscos",
    icon: "truck",
    features: [
      "Ubicación en tiempo real",
      "Menú actualizable",
      "Órdenes para llevar",
      "Notificaciones de horario",
    ],
    color: "gold",
  },
];

export function FoodIndustrySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-teal-400) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ocean-900 mb-4">
            Especialización en la Industria Gastronómica
          </h2>
        </motion.div>

        <motion.p
          className="text-center text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Soluciones web personalizadas para cada tipo de negocio gastronómico
        </motion.p>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 mb-16 max-w-6xl mx-auto">
          {industryColumns.map((column, index) => (
            <IndustryCard
              key={column.id}
              column={column}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Case Study Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="bg-gradient-to-br from-ocean-900 to-ocean-800 rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl border border-ocean-700 overflow-hidden relative">
            {/* Accent Pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                <motion.h3
                  className="text-2xl sm:text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Papamín Coffee
                </motion.h3>

                <motion.p
                  className="text-teal-300 text-lg font-semibold mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55 }}
                >
                  Cafetería Artesanal
                </motion.p>

                <motion.blockquote
                  className="text-lg text-white/90 mb-6 italic border-l-4 border-teal-400 pl-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  &ldquo;Mario nos ayudó a llevar nuestro café más allá de Puerto Rico. Su experiencia en e-commerce fue invaluable.&rdquo;
                </motion.blockquote>

                <motion.div
                  className="bg-teal-500/20 backdrop-blur rounded-xl p-4 border border-teal-400/30 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.65 }}
                >
                  <p className="text-teal-100 font-medium">
                    <span className="text-gold-400">Resultado:</span> Ventas en línea activas en 3 territorios
                  </p>
                </motion.div>

                <motion.a
                  href="/casos-de-exito/papamin"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Caso Completo
                  <svg
                    className="w-5 h-5"
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
                </motion.a>
              </div>

              {/* Right: Stats/Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:border-teal-400/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-3xl font-bold text-teal-400 mb-2">3</div>
                  <p className="text-white/80 text-sm font-medium">Territorios Activos</p>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:border-gold-400/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-3xl font-bold text-gold-400 mb-2">24/7</div>
                  <p className="text-white/80 text-sm font-medium">Ventas Online</p>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:border-teal-400/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-3xl font-bold text-teal-400 mb-2">+500</div>
                  <p className="text-white/80 text-sm font-medium">Clientes Mensuales</p>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:border-gold-400/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.75 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="text-3xl font-bold text-gold-400 mb-2">↑40%</div>
                  <p className="text-white/80 text-sm font-medium">Crecimiento de Ventas</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IndustryCard({
  column,
  index,
  isInView,
}: {
  column: IndustryColumn;
  index: number;
  isInView: boolean;
}) {
  const colorMap = {
    ocean: {
      bg: "bg-gradient-to-br from-ocean-50 to-ocean-100",
      border: "border-ocean-200 hover:border-ocean-400",
      iconBg: "bg-gradient-to-br from-ocean-700 to-ocean-600",
      accent: "text-ocean-900",
      accentLight: "text-ocean-600",
      featuresText: "text-neutral-700",
    },
    teal: {
      bg: "bg-gradient-to-br from-teal-50 to-teal-100",
      border: "border-teal-200 hover:border-teal-400",
      iconBg: "bg-gradient-to-br from-teal-600 to-teal-500",
      accent: "text-teal-900",
      accentLight: "text-teal-600",
      featuresText: "text-neutral-700",
    },
    gold: {
      bg: "bg-gradient-to-br from-gold-50 to-gold-100",
      border: "border-gold-200 hover:border-gold-400",
      iconBg: "bg-gradient-to-br from-gold-600 to-gold-500",
      accent: "text-gold-900",
      accentLight: "text-gold-600",
      featuresText: "text-neutral-700",
    },
  };

  const colors = colorMap[column.color];
  const icon = getIndustryIcon(column.icon);

  return (
    <motion.div
      className={`${colors.bg} rounded-3xl p-8 shadow-lg border ${colors.border} transition-all duration-300 h-full`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
    >
      {/* Icon */}
      <div className={`${colors.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className={`text-2xl font-bold ${colors.accent} mb-2`}>
        {column.title}
      </h3>

      <div className={`h-1 w-12 rounded-full bg-gradient-to-r from-${column.color === 'ocean' ? 'ocean-600' : column.color === 'teal' ? 'teal-500' : 'gold-500'} to-${column.color === 'ocean' ? 'teal-500' : column.color === 'teal' ? 'gold-500' : 'teal-400'} mb-6`} />

      {/* Features List */}
      <ul className="space-y-3">
        {column.features.map((feature, idx) => (
          <motion.li
            key={idx}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: (index * 0.15) + (idx * 0.08) }}
          >
            <svg
              className={`w-5 h-5 ${colors.accentLight} flex-shrink-0 mt-0.5`}
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
            <span className={`text-sm font-medium ${colors.featuresText}`}>
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Bottom Accent */}
      <div className={`mt-8 pt-6 border-t border-current/10`}>
        <p className={`text-xs font-semibold ${colors.accentLight} uppercase tracking-wider`}>
          Especializado para {column.title.toLowerCase()}
        </p>
      </div>
    </motion.div>
  );
}

function getIndustryIcon(iconName: string) {
  const iconClass = "w-6 h-6 text-white";

  const icons: Record<string, React.ReactElement> = {
    utensils: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
    coffee: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    truck: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return icons[iconName] || icons.utensils;
}
