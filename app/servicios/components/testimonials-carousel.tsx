"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { servicesContentES } from "../data/services-content";

export function TestimonialsCarousel() {
  const { testimonials } = servicesContentES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Ensure component is mounted to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Autoplay carousel every 5 seconds
  useEffect(() => {
    if (!autoplay || !mounted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, mounted, testimonials.items.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + testimonials.items.length) % testimonials.items.length
    );
    setAutoplay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.items.length);
    setAutoplay(false);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
  };

  if (!mounted) {
    return null;
  }

  const currentTestimonial = testimonials.items[currentIndex];

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-ocean-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {testimonials.title}
        </motion.h2>

        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-teal-500 to-gold-500 mx-auto mb-12"
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: 96 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 md:p-16 border border-neutral-200 min-h-[400px] sm:min-h-[450px] flex flex-col justify-between"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="flex flex-col h-full justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Quote */}
                <div className="mb-8">
                  <svg
                    className="w-12 h-12 text-teal-500 mb-4 opacity-60"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5C2.03 0 0 2.485 0 5c0 1.104.333 2.019 1 2.607V20c0 1.657 1.343 3 3 3zm13-1c0 1.657 1.343 3 3 3s3-1.343 3-3V8c0-1.1.667-2.333 1-3s1.333-2.667 1-4c0-2.485-1.971-5-4-5-2.284 0-7 3.75-7 5v13c0 1.104.333 2.019 1 2.607V20c0 1.657 1.343 3 3 3z" />
                  </svg>
                  <p className="text-lg sm:text-xl md:text-2xl text-neutral-800 font-serif italic leading-relaxed">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-neutral-200 pt-8">
                  {/* Avatar Placeholder */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-ocean-600 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-2xl">
                      {currentTestimonial.name.charAt(0)}
                    </span>
                  </div>

                  {/* Name and Business */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-ocean-900">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-base sm:text-lg text-neutral-600 mb-2">
                      {currentTestimonial.business}
                    </p>
                    {currentTestimonial.result && (
                      <p className="text-sm sm:text-base text-teal-600 font-semibold flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-gold-500 rounded-full" />
                        {currentTestimonial.result}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-center gap-6 mt-10">
            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-6">
              <motion.button
                onClick={goToPrevious}
                className="group relative w-12 h-12 rounded-full border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              {/* Dot Indicators */}
              <div className="flex gap-3">
                {testimonials.items.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-ocean-600 w-8"
                        : "bg-neutral-300 hover:bg-neutral-400 w-2"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={goToNext}
                className="group relative w-12 h-12 rounded-full border-2 border-ocean-600 text-ocean-600 hover:bg-ocean-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
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
              </motion.button>
            </div>

            {/* Slide Counter */}
            <p className="text-sm sm:text-base text-neutral-600">
              <span className="font-semibold text-ocean-900">
                {currentIndex + 1}
              </span>
              <span className="mx-1">/</span>
              <span>{testimonials.items.length}</span>
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <AnimatedStats />
      </div>
    </section>
  );
}

/**
 * Animated stats bar component with counter animations
 */
function AnimatedStats() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const stats = [
    {
      value: 25,
      label: "Años de Experiencia",
      suffix: "+",
    },
    {
      value: 95,
      label: "Lighthouse Score",
      suffix: "+",
    },
    {
      value: 6,
      label: "Proyectos Activos",
      suffix: "",
    },
    {
      value: 100,
      label: "Clientes Satisfechos",
      suffix: "%",
    },
  ];

  return (
    <motion.div
      ref={statsRef}
      className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={statsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          stat={stat}
          index={index}
          isInView={statsInView}
        />
      ))}
    </motion.div>
  );
}

function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: { value: number; label: string; suffix: string };
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="bg-gradient-to-br from-ocean-700 to-ocean-600 rounded-xl p-6 sm:p-8 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <motion.div className="mb-3">
        <CounterAnimation
          end={stat.value}
          isInView={isInView}
          suffix={stat.suffix}
        />
      </motion.div>
      <p className="text-sm sm:text-base font-medium text-teal-100">
        {stat.label}
      </p>
    </motion.div>
  );
}

/**
 * Counter animation component that counts from 0 to target value
 */
function CounterAnimation({
  end,
  isInView,
  suffix,
}: {
  end: number;
  isInView: boolean;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isInView || !mounted) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = end / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newCount = Math.min(Math.floor(increment * currentStep), end);
      setCount(newCount);

      if (newCount >= end) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, end]);

  return (
    <motion.div
      className="text-3xl sm:text-4xl md:text-5xl font-bold"
      key={count}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {count}
      <span className="text-teal-300">{suffix}</span>
    </motion.div>
  );
}
