"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { servicesContentES } from "../data/services-content";
import type { PricingTier } from "../types";

export function PricingCards() {
  const { pricing } = servicesContentES;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-ocean-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {pricing.title}
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-center text-neutral-600 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transparencia total, sin sorpresas
        </motion.p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {pricing.tiers.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Financing Note */}
        <motion.div
          className="max-w-2xl mx-auto text-center bg-gold-500/10 rounded-2xl p-6 border-2 border-gold-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <svg
            className="w-8 h-8 text-gold-500 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-semibold text-ocean-900 mb-2">
            {pricing.financing}
          </p>
          <p className="text-sm text-neutral-600">
            Pregunta por opciones de pago en cuotas
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  index,
  isInView,
}: {
  tier: PricingTier;
  index: number;
  isInView: boolean;
}) {
  const isPopular = tier.popular;

  return (
    <motion.div
      className={`relative bg-white rounded-3xl p-8 shadow-xl ${
        isPopular
          ? "border-4 border-teal-500 scale-105 md:scale-110"
          : "border-2 border-ocean-100"
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
            ⭐ Más Popular
          </div>
        </div>
      )}

      {/* Tier Name */}
      <h3 className="text-2xl font-bold text-ocean-900 mb-2 text-center">
        {tier.name}
      </h3>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-ocean-900">
          ${tier.price.toLocaleString()}
        </div>
        <div className="text-sm text-neutral-600 mt-1">pago único</div>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6">
        {tier.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <svg
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                isPopular ? "text-teal-500" : "text-ocean-600"
              }`}
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
            <span className="text-neutral-700">{feature}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t-2 border-neutral-100 my-6" />

      {/* Included Items */}
      <div className="space-y-2 mb-8">
        <div className="text-sm font-semibold text-ocean-900 mb-3">
          Incluye:
        </div>
        {tier.included.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-neutral-600">{item}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
          isPopular
            ? "bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white shadow-lg hover:shadow-xl"
            : "bg-ocean-900 hover:bg-ocean-800 text-white"
        }`}
        onClick={() => {
          const ctaSection = document.querySelector("#cta-form");
          ctaSection?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Comenzar Ahora
      </button>

      {/* Hover Gradient Effect */}
      {isPopular && (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-ocean-600/0 hover:from-teal-500/5 hover:to-ocean-600/5 rounded-3xl transition-all duration-300 pointer-events-none" />
      )}
    </motion.div>
  );
}
