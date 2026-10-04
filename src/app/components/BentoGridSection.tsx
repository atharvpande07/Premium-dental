"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAssetPath } from "../utils/assetPath";
import ModernDentalScan from "./ModernDentalScan";
import { clinicData } from "../data/clinicData";

const CARE_CATEGORIES = [
  {
    id: "patient-care" as const,
    label: "Patient Care",
    badge: "Anxiety-Free Protocol",
    subheading: "Gentle, compassionate dentistry centered on your peace of mind.",
    narrative:
      "We understand dental visits can carry unspoken fears and sensitivities. From warm neck pillows and noise-canceling headphones to unhurried check-ups where you're always in control, our team ensures every moment is gentle, dignified, and judgment-free.",
    image: "/care-patient-warm.jpg",
    imageAlt: "Compassionate dentist comforting patient in modern clinic",
    floatingBadge: "🌿 Gentle Touch Certified",
    doodleText: {
      line1: "A",
      line2: "Healthier,",
      line3: "Happier You",
      symbol: "♡",
    },
    highlights: [
      {
        icon: "🌿",
        title: "Gentle Touch Guarantee",
        desc: "Signal-to-pause anytime with unhurried pacing.",
      },
      {
        icon: "🎧",
        title: "Sensory Comfort Suite",
        desc: "Warm blankets, soothing audio & noise-canceling headsets.",
      },
      {
        icon: "🤍",
        title: "Zero-Lecturing Promise",
        desc: "No matter how long it's been, you're warmly welcomed.",
      },
    ],
    statQuote: "99.4% of anxious patients report feeling completely relaxed & at ease.",
    ctaText: "Book Your Comfort Visit",
  },
  {
    id: "modern-tech" as const,
    label: "Modern Technology",
    badge: "Digital Precision",
    subheading: "Painless 3D imaging and micro-precision with zero guesswork.",
    narrative:
      "Say goodbye to messy gag-inducing putty trays and intimidating machinery. Our ultra-quiet 3D intraoral wands and low-radiation diagnostics map your smile in 60 seconds, giving you crystal-clear answers before any treatment begins.",
    image: "/care-modern-tech.jpg",
    imageAlt: "Advanced digital dental scanner & luxury operatory",
    floatingBadge: "⚡ 100% Goop-Free",
    doodleText: {
      line1: "Precision",
      line2: "Meets",
      line3: "Comfort",
      symbol: "✨",
    },
    highlights: [
      {
        icon: "⚡",
        title: "60-Sec 3D Optical Scan",
        desc: "Fast, micro-accurate mapping with zero gagging or mess.",
      },
      {
        icon: "🔬",
        title: "Low-Radiation Clarity",
        desc: "80% less radiation with microscopic diagnostic detail.",
      },
      {
        icon: "🖥️",
        title: "Virtual Smile Simulation",
        desc: "Preview your projected smile in high definition beforehand.",
      },
    ],
    statQuote: "100% digital workflow from your initial scan to your final smile.",
    ctaText: "Explore 3D Digital Scan",
  },
  {
    id: "personalized" as const,
    label: "Personalized Treatment",
    badge: "Bespoke Dentistry",
    subheading: "Custom smile blueprints designed for your biology and lifestyle.",
    narrative:
      "Your facial contours, enamel shade, and lifestyle rhythms are entirely unique. We co-create a personalized roadmap with transparent itemized pricing, staged appointments, and flexible financing that works with your life.",
    image: "/care-personalized.jpg",
    imageAlt: "Cosmetic dentist and patient reviewing personalized smile plan",
    floatingBadge: "💎 Bespoke Smile Design",
    doodleText: {
      line1: "Crafted",
      line2: "Just For",
      line3: "You",
      symbol: "♡",
    },
    highlights: [
      {
        icon: "💎",
        title: "Facial Harmony Design",
        desc: "Bespoke tooth contours crafted for natural organic beauty.",
      },
      {
        icon: "💳",
        title: "Transparent Staging",
        desc: "Clear upfront costs with flexible 0% interest financing.",
      },
      {
        icon: "⏱️",
        title: "Paced to Your Schedule",
        desc: "Treatment timelines built around your lifestyle & calendar.",
      },
    ],
    statQuote: "Every treatment plan is 1-on-1 customized — never one-size-fits-all.",
    ctaText: "Design Your Custom Plan",
  },
];

export default function BentoGridSection() {
  const [activeCategory, setActiveCategory] = useState<
    "patient-care" | "modern-tech" | "personalized"
  >("patient-care");

  const currentCategory =
    CARE_CATEGORIES.find((c) => c.id === activeCategory) || CARE_CATEGORIES[0];

  return (
    <section
      id="technology"
      className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-3 pb-12 sm:pb-16 select-none font-sans scroll-mt-20 sm:scroll-mt-24"
      aria-label="Modern Dental Care Bento Grid"
    >
      <div id="team" className="absolute -top-20" aria-hidden="true" />
      <div id="innovation" className="absolute -top-20" aria-hidden="true" />
      {/* REST OF BENTO GRID: Scan Bay + Dual Stats (Left) & Care That Fits You Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* LEFT 5 COLUMNS: Stamp + 3-Bay Digital Scan Card + Dual Stat Capsules */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3.5">
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
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

                {/* Stat 2: 10,000+ Happy Patients */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[22px] p-3.5 sm:p-4 bg-white/70 hover:bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_8px_24px_rgba(168,85,247,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center gap-3 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-2xl bg-purple-100/90 border border-purple-200/60 flex items-center justify-center text-purple-700 shrink-0 shadow-xs">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

            {/* RIGHT 6 COLUMNS: Large Featured "Care That Fits You" Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative rounded-[32px] p-6 sm:p-7 lg:p-8 bg-white/65 hover:bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_16px_44px_rgba(168,85,247,0.14),inset_0_1px_2px_rgba(255,255,255,0.85)] flex flex-col justify-between overflow-hidden group transition-all duration-300 min-h-[540px] sm:min-h-[580px]"
            >
              {/* Ambient Background Glow */}
              <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-pink-300/25 blur-3xl pointer-events-none" />
              <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />

              <div>
                {/* Category Pills Header with Interactive Tabs */}
                <div
                  className="relative z-10 flex flex-wrap items-center gap-2 mb-3.5 sm:mb-4"
                  role="tablist"
                  aria-label="Care Categories"
                >
                  {CARE_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        id={`tab-${cat.id}`}
                        aria-selected={isActive}
                        aria-controls={`panel-${cat.id}`}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-250 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white shadow-[0_4px_14px_rgba(219,39,119,0.35)] scale-[1.02]"
                            : "bg-white/80 hover:bg-white text-slate-700 hover:text-purple-900 border border-purple-200/70 hover:border-purple-300 hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Display Headline with Active Tag */}
                <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-3xl sm:text-4xl lg:text-[2.9rem] font-bold text-slate-900 tracking-tight leading-none">
                    Care That Fits{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c026d3] via-[#ec4899] to-[#f43f5e]">
                      You
                    </span>
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-700 bg-purple-100/80 border border-purple-200/70 px-2.5 py-1 rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                    {currentCategory.badge}
                  </span>
                </div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-gradient-to-r from-purple-200/80 via-pink-200/50 to-transparent my-3.5 sm:my-4" />
              </div>

              {/* Dynamic Content Panel for Active Tab */}
              <div
                key={activeCategory}
                id={`panel-${currentCategory.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${currentCategory.id}`}
                className="relative z-10 flex flex-col justify-between flex-1 gap-3.5 sm:gap-4 transition-all duration-300"
              >
                {/* Thoughtful Narrative & Subheading */}
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-[15px] font-semibold text-slate-900 tracking-tight">
                    {currentCategory.subheading}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed max-w-xl">
                    {currentCategory.narrative}
                  </p>
                </div>

                {/* 3 Thoughtful Highlight Cards - eliminating dead space */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {currentCategory.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl p-2.5 bg-white/75 border border-purple-100/90 hover:border-purple-200/90 hover:bg-white/95 transition-all duration-200 shadow-[0_2px_10px_rgba(168,85,247,0.04)] flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm shrink-0">{item.icon}</span>
                        <div className="text-[11.5px] sm:text-xs font-bold text-slate-800 tracking-tight leading-tight line-clamp-1">
                          {item.title}
                        </div>
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] text-slate-500 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Lower Section: Reassurance Stat, CTA & Photo Showcase */}
                <div className="relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 pt-1">
                  {/* Left Side: Stat quote & CTA button */}
                  <div className="flex flex-col justify-between gap-2.5 max-w-[270px]">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/80 shadow-2xs">
                      <svg className="w-4 h-4 text-purple-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-[11px] leading-tight text-slate-700">
                        {currentCategory.statQuote}
                      </span>
                    </div>

                    <a
                      href="#book"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-purple-950 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 group w-fit cursor-pointer"
                    >
                      <span>{currentCategory.ctaText}</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>

                  {/* Right Side: Photo Container with Generated Images + Badges + Script Doodle */}
                  <div className="relative flex items-end gap-2.5 shrink-0 w-full sm:w-auto">
                    <div className="relative w-full sm:w-[220px] lg:w-[245px] h-[135px] sm:h-[150px] lg:h-[155px] rounded-2xl overflow-hidden border border-white/90 shadow-md group/img">
                      <Image
                        src={getAssetPath(currentCategory.image)}
                        alt={currentCategory.imageAlt}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                      />

                      {/* Subtle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-2 left-2 z-20 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-md bg-black/45 backdrop-blur-md text-white text-[10px] font-semibold tracking-tight border border-white/20 shadow-xs">
                          {currentCategory.floatingBadge}
                        </span>
                      </div>

                      {/* Handwritten Script Doodle */}
                      <div className="absolute bottom-2 right-2.5 z-20 pointer-events-none text-right font-serif italic text-white font-bold text-[11px] sm:text-xs leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] rotate-[-3deg]">
                        {currentCategory.doodleText.line1}<br />
                        {currentCategory.doodleText.line2}<br />
                        {currentCategory.doodleText.line3}{" "}
                        {currentCategory.doodleText.symbol && (
                          <span className="inline-block text-pink-300 not-italic">
                            {currentCategory.doodleText.symbol}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Circular Action Arrow Button */}
                    <a
                      href="#book"
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-purple-200/60 flex items-center justify-center text-slate-800 transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 group focus:outline-none cursor-pointer"
                      aria-label={currentCategory.ctaText}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-700 group-hover:text-purple-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
    </section>
  );
}
