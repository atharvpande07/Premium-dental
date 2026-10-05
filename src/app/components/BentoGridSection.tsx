"use client";

import { motion } from "framer-motion";
import ModernDentalScan from "./ModernDentalScan";
import StickySliceSlider from "./StickySliceSlider";
import { clinicData } from "../data/clinicData";

export default function BentoGridSection() {
  return (
    <div className="relative w-full">
      {/* 1. CLINICAL EXCELLENCE & DIGITAL SCAN PROFILE (DOCTOR & STATS) */}
      <section
        id="team"
        className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-10 sm:pb-14 select-none font-sans scroll-mt-20 sm:scroll-mt-24"
        aria-label="Doctor Profile & Clinical Technology"
      >
        <div id="doctor" className="absolute -top-20" aria-hidden="true" />
        <div className="max-w-3xl mx-auto flex flex-col gap-3.5">
          {/* Modern Dental Care Card with Integrated Shifted Stamp & Synchronized Animations */}
          <ModernDentalScan />

          {/* Dual Stat Capsules */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Stat 1: 100% Safe & Hygienic Care */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[22px] p-3.5 sm:p-4 bg-white/70 hover:bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(168,85,247,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center gap-3 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-2xl bg-purple-100/90 border border-purple-200/60 flex items-center justify-center text-purple-700 shrink-0 shadow-xs">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1 leading-tight">
                  Safe &amp; Hygienic Care
                </div>
                <div className="text-[10px] font-medium text-slate-400 mt-0.5 leading-none">
                  Your Safety is Our Priority
                </div>
              </div>
            </motion.div>

            {/* Stat 2: Patient Satisfaction Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[22px] p-3.5 sm:p-4 bg-white/70 hover:bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(168,85,247,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center gap-3 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-2xl bg-purple-100/90 border border-purple-200/60 flex items-center justify-center text-purple-700 shrink-0 shadow-xs">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
                  {clinicData.reputation.rating.toFixed(1)}/5
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1 leading-tight">
                  Patient Satisfaction
                </div>
                <div className="text-[10px] font-medium text-slate-400 mt-0.5 leading-none">
                  Trusted by Families
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STICKY SLICE SLIDER SECTION */}
      {/* 1st Slide: Modern Technology | 2nd Slide: Patient Care | 3rd Slide: Personalized Treatment */}
      <StickySliceSlider />
    </div>
  );
}
