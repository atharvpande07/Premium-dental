"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroContent() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.85,
        delay: shouldReduceMotion ? 0 : customDelay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="w-full max-w-[min(100%,740px)] flex flex-col items-start text-left">
      {/* Primary Headline Container with Subtle Drop Shadow Background */}
      <div className="relative inline-block max-w-full">
        {/* Soft Ambient Drop Shadow Background */}
        <div
          className="absolute -inset-x-8 -inset-y-5 rounded-[32px] bg-slate-950/25 blur-2xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <motion.h1
          custom={0.12}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="relative z-10 tracking-[-0.03em] text-[clamp(2.1rem,3.6vw+0.25rem,3.85rem)] leading-[1.08] mb-[clamp(0.75rem,1.4vw,1.125rem)]"
          style={{
            filter:
              "drop-shadow(0 3px 12px rgba(0, 0, 0, 0.75)) drop-shadow(0 8px 30px rgba(0, 0, 0, 0.40)) drop-shadow(0 0 24px rgba(224, 210, 255, 0.35))",
          }}
        >
          <span className="block font-medium bg-gradient-to-r from-white via-[#faf7ff] to-[#d6c4f8] bg-clip-text text-transparent pb-0.5 whitespace-nowrap sm:whitespace-normal xl:whitespace-nowrap">
            Precision Dentistry.
          </span>
          <span className="block font-semibold bg-gradient-to-r from-white via-[#f4edff] to-[#cdbaf6] bg-clip-text text-transparent pb-1 whitespace-nowrap sm:whitespace-normal xl:whitespace-nowrap">
            Designed{" "}
            <span
              className="font-instrument-serif italic font-normal tracking-normal text-[1.18em] inline-block px-1"
              style={{ fontFamily: 'var(--font-instrument-serif), "Instrument Serif", Georgia, serif' }}
            >
              around
            </span>{" "}
            You
          </span>
        </motion.h1>
      </div>

      {/* Supporting Text - Continuously fluid, comfortable line-height */}
      <motion.p
        custom={0.24}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="font-normal text-[#172338] text-[clamp(0.875rem,0.55vw+0.65rem,1.0625rem)] leading-[1.58] max-w-[480px] mb-[clamp(1.125rem,2vw,1.75rem)] [text-shadow:0_1px_3px_rgba(255,255,255,0.8)]"
      >
        Advanced dental care, precise treatment, and a calmer experience — thoughtfully designed to help you smile with complete confidence.
      </motion.p>

      {/* Dual CTA Buttons - Rounded Glassmorphic Blurry Transparent */}
      <motion.div
        custom={0.34}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="flex flex-wrap items-center gap-[clamp(0.75rem,1.5vw,1rem)] w-full sm:w-auto"
      >
        {/* Primary CTA */}
        <a
          href="#book"
          className="btn-glass-primary"
          aria-label="Book an Appointment"
        >
          <span>Book an Appointment</span>
        </a>

        {/* Secondary CTA */}
        <a
          href="#about"
          className="btn-glass-secondary"
          aria-label="Learn About Our Clinic and Treatments"
        >
          <span>Learn More</span>
        </a>
      </motion.div>
    </div>
  );
}
