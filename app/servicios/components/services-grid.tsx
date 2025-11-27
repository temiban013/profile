"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { servicesContentES } from "../data/services-content";
import type { ServiceOffering } from "../types";

export function ServicesGrid() {
  const { services } = servicesContentES;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          {services.title}
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-center text-neutral-600 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Soluciones diseñadas para el mercado puertorriqueño
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.offerings.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: ServiceOffering;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-neutral-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 hover:border-teal-400"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
    >
      {/* Price Badge */}
      <div className="absolute -top-4 -right-4 bg-gradient-to-br from-teal-500 to-teal-400 text-white rounded-full px-4 py-2 shadow-lg font-bold">
        ${service.price.toLocaleString()}
      </div>

      {/* Icon */}
      <div className="w-16 h-16 mb-6 bg-gradient-to-br from-ocean-700 to-ocean-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <ServiceIcon icon={service.icon} />
      </div>

      {/* Name */}
      <h3 className="text-2xl font-bold text-ocean-900 mb-3">
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-neutral-600 mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {service.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-neutral-700"
          >
            <svg
              className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5"
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
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-ocean-600/0 group-hover:from-teal-500/5 group-hover:to-ocean-600/5 rounded-3xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

function ServiceIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactElement> = {
    globe: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    "shopping-cart": (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    "qr-code": (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        />
      </svg>
    ),
    "map-pin": (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  };

  return icons[icon] || icons.globe;
}
