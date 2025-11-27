"use client";

import { motion } from "motion/react";
import { servicesContentES } from "../data/services-content";

export function HeroSection() {
  const { hero } = servicesContentES;

  const scrollToStats = () => {
    const problemSection = document.getElementById("problem");
    problemSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-teal-400) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 sm:py-20 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {hero.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-teal-400 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {hero.subheadline}
          </motion.p>

          {/* Google Search Mockup */}
          <motion.div
            className="relative max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-neutral-100 px-4 py-3 flex items-center gap-2 border-b border-neutral-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-sm text-neutral-600 font-mono">
                  google.com/search
                </div>
              </div>

              {/* Search Bar */}
              <div className="p-6 bg-white">
                <div className="relative">
                  <div className="flex items-center gap-3 px-4 py-3 border-2 border-ocean-600 rounded-full shadow-lg">
                    <svg
                      className="w-5 h-5 text-ocean-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <motion.span
                      className="flex-1 text-ocean-900 font-medium"
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{ duration: 2, delay: 0.8 }}
                    >
                      <TypewriterText text="best mofongo near me" delay={0.8} />
                    </motion.span>
                  </div>
                </div>

                {/* Empty Results Hint */}
                <motion.div
                  className="mt-6 text-center text-neutral-500 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <p className="font-medium text-gold-500">
                    ⚠️ Sin sitio web, tu negocio no aparece aquí
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToStats}
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {hero.cta}
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-teal-400 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-teal-400 rounded-full"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// Typewriter effect component
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
