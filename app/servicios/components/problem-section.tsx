"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { servicesContentES } from "../data/services-content";

export function ProblemSection() {
  const { problem } = servicesContentES;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problem"
      ref={ref}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-ocean-900 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {problem.title}
        </motion.h2>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {problem.painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-200"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mb-6 mx-auto bg-gradient-to-br from-ocean-700 to-ocean-600 rounded-2xl flex items-center justify-center">
                <PainPointIcon icon={point.icon} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-ocean-900 mb-4 text-center">
                {point.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 text-center leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated Stat */}
        <motion.div
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gold-500 to-gold-400 rounded-3xl p-8 sm:p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <AnimatedCounter
            value={problem.stat.value}
            isInView={isInView}
          />
          <p className="text-xl sm:text-2xl text-ocean-900 font-medium mt-4">
            {problem.stat.label}
          </p>
          <p className="text-lg text-ocean-800 mt-4 font-semibold">
            ¿Cuánto de esto llega a tu negocio?
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Pain point icon component
function PainPointIcon({ icon }: { icon: string }) {
  const iconPaths: Record<string, React.ReactElement> = {
    "eye-off": (
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
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
    ),
    lock: (
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
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    "home-question": (
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
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return iconPaths[icon] || iconPaths["eye-off"];
}

// Animated counter component
function AnimatedCounter({
  value,
  isInView,
}: {
  value: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState("$0");

  useEffect(() => {
    if (!isInView) return;

    // Animate from 0 to 4.6 billion
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = 4.6 / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(`$${current.toFixed(1)} mil millones`);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-ocean-900">
      {displayValue}
    </div>
  );
}
