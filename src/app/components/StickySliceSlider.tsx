"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useScroll } from "framer-motion";
import { getAssetPath } from "../utils/assetPath";

interface SliceSlideData {
  id: "modern-tech" | "patient-care" | "personalized";
  num: string;
  categoryLabel: string;
  titleLines: string[];
  badge: string;
  subheading: string;
  narrative: string;
  image: string;
  imageAlt: string;
  floatingBadge: string;
  highlights: {
    icon: string;
    title: string;
    desc: string;
  }[];
  statQuote: string;
  ctaText: string;
  ctaHref: string;
}

const SLICE_SLIDES: SliceSlideData[] = [
  {
    id: "modern-tech",
    num: "01",
    categoryLabel: "Modern Technology",
    titleLines: ["MODERN", "TECHNOLOGY"],
    badge: "Digital Precision",
    floatingBadge: "⚡ 100% Goop-Free",
    subheading: "Painless 3D imaging and micro-precision with zero guesswork.",
    narrative:
      "Say goodbye to messy gag-inducing putty trays and intimidating machinery. Our ultra-quiet 3D intraoral wands map your smile in 60 seconds with microscopic diagnostic detail.",
    image: "/care-modern-tech.jpg",
    imageAlt: "Advanced digital dental scanner & luxury operatory",
    highlights: [
      {
        icon: "⚡",
        title: "60-Sec 3D Optical Scan",
        desc: "Fast, micro-accurate mapping with zero gagging.",
      },
      {
        icon: "🔬",
        title: "Low-Radiation Clarity",
        desc: "80% less radiation with microscopic detail.",
      },
      {
        icon: "🖥️",
        title: "Virtual Smile Simulation",
        desc: "Preview projected outcomes in high-definition.",
      },
    ],
    statQuote: "100% digital workflow from your initial scan to your final smile.",
    ctaText: "Explore 3D Digital Scan",
    ctaHref: "#book",
  },
  {
    id: "patient-care",
    num: "02",
    categoryLabel: "Patient Care",
    titleLines: ["PATIENT", "CARE"],
    badge: "Anxiety-Free Protocol",
    floatingBadge: "🌿 Gentle Touch Certified",
    subheading: "Gentle, compassionate dentistry centered on your peace of mind.",
    narrative:
      "We understand dental visits can carry unspoken fears and sensitivities. From warm neck pillows and noise-canceling headphones to unhurried check-ups where you're always in control, our team ensures every moment is gentle, dignified, and judgment-free.",
    image: "/care-patient-warm.jpg",
    imageAlt: "Compassionate dentist comforting patient in modern clinic",
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
    ctaHref: "#book",
  },
  {
    id: "personalized",
    num: "03",
    categoryLabel: "Personalized Treatment",
    titleLines: ["PERSONALIZED", "TREATMENT"],
    badge: "Bespoke Dentistry",
    floatingBadge: "💎 Bespoke Smile Design",
    subheading: "Custom smile blueprints designed for your biology and lifestyle.",
    narrative:
      "Your facial contours, enamel shade, and lifestyle rhythms are entirely unique. We co-create a personalized roadmap with transparent itemized pricing, staged appointments, and flexible financing that works with your life.",
    image: "/care-personalized.jpg",
    imageAlt: "Cosmetic dentist and patient reviewing personalized smile plan",
    highlights: [
      {
        icon: "💎",
        title: "Facial Harmony Design",
        desc: "Bespoke tooth contours crafted for natural beauty.",
      },
      {
        icon: "💳",
        title: "Transparent Staging",
        desc: "Clear upfront costs with flexible 0% interest financing.",
      },
      {
        icon: "⏱️",
        title: "Paced to Your Schedule",
        desc: "Timelines built around your lifestyle & calendar.",
      },
    ],
    statQuote: "Every treatment plan is 1-on-1 customized — never one-size-fits-all.",
    ctaText: "Design Your Custom Plan",
    ctaHref: "#book",
  },
];

export default function StickySliceSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const lastActiveRef = useRef(0);

  // Monitor scroll progress through the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Switch slide handler with animation lock
  const goToSlide = useCallback((index: number) => {
    if (isTransitioningRef.current || index === lastActiveRef.current) return;
    if (index < 0 || index >= SLICE_SLIDES.length) return;

    isTransitioningRef.current = true;
    setIsSliding(true);
    setActiveSlide(index);
    lastActiveRef.current = index;

    setTimeout(() => {
      setIsSliding(false);
      isTransitioningRef.current = false;
    }, 700);
  }, []);

  const handlePrev = useCallback(() => {
    const nextIdx = (activeSlide - 1 + SLICE_SLIDES.length) % SLICE_SLIDES.length;
    goToSlide(nextIdx);
  }, [activeSlide, goToSlide]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeSlide + 1) % SLICE_SLIDES.length;
    goToSlide(nextIdx);
  }, [activeSlide, goToSlide]);

  // Sync scroll progress with active slide
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Divide 300vh into 3 zones
      let targetIndex = 0;
      if (latest < 0.33) {
        targetIndex = 0;
      } else if (latest < 0.67) {
        targetIndex = 1;
      } else {
        targetIndex = 2;
      }

      if (targetIndex !== lastActiveRef.current && !isTransitioningRef.current) {
        goToSlide(targetIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, goToSlide]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div
      ref={containerRef}
      id="technology"
      className="relative w-full h-[280vh] scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      <div id="care-pillars" className="absolute -top-24" aria-hidden="true" />
      <div id="innovation" className="absolute -top-24" aria-hidden="true" />

      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-slate-950/5 backdrop-blur-[2px]">
        {/* Main Slice Slider Root */}
        <div
          className={`slice-slider-wrapper relative w-full h-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 pt-20 sm:pt-24 pb-4 sm:pb-6 flex flex-col justify-center ${
            isSliding ? "is-sliding" : ""
          }`}
        >
          {/* Top Category Indicator Pills */}
          <div className="relative z-30 flex items-center justify-between gap-3 mb-2 px-2 sm:px-4">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden py-1">
              {SLICE_SLIDES.map((slide, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                        : "bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200/80 hover:scale-[1.01]"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono ${
                        isActive ? "text-pink-300" : "text-slate-400"
                      }`}
                    >
                      {slide.num}
                    </span>
                    <span>{slide.categoryLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Slide Index Progress Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-slate-500 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              <span className="text-slate-900">0{activeSlide + 1}</span>
              <span className="text-slate-300">/</span>
              <span>0{SLICE_SLIDES.length}</span>
            </div>
          </div>

          {/* Slides Viewport Box */}
          <div className="relative flex-1 w-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] bg-white">
            {/* The Rotated Vertical Navigation Track */}
            <div className="slides-nav">
              <nav className="slides-nav__nav">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="slides-nav__prev"
                  aria-label="Previous Slide"
                >
                  Prev
                </button>
                <div className="flex items-center gap-1">
                  {SLICE_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      className={activeSlide === idx ? "nav-active" : ""}
                      aria-label={`Slide ${slide.num}`}
                    >
                      {slide.num}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="slides-nav__next"
                  aria-label="Next Slide"
                >
                  Next
                </button>
              </nav>
            </div>

            {/* Slides Viewport Container */}
            <section className="slides">
              {SLICE_SLIDES.map((slide, index) => {
                const isActive = activeSlide === index;

                return (
                  <article
                    key={slide.id}
                    className={`slide ${isActive ? "is-active" : ""}`}
                    aria-hidden={!isActive}
                  >
                    <div className="slide__content">
                      {/* Image Figure Wrapper with Scale Animation */}
                      <figure className="slide__figure">
                        <div
                          className="slide__img"
                          style={{
                            backgroundImage: `url(${getAssetPath(slide.image)})`,
                          }}
                        />

                        {/* Ambient Deep Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-transparent to-slate-950/30 pointer-events-none" />
                      </figure>

                      {/* Header with Masked Slice Title Animation */}
                      <header className="slide__header">
                        <div className="max-w-2xl">
                          {/* Floating Top Category Pill */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-slate-900 text-xs font-bold tracking-tight mb-3">
                            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                            <span>{slide.badge}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-purple-700">{slide.floatingBadge}</span>
                          </div>

                          {/* Split Title with Overflow Hidden & Staggered Reveal */}
                          <h2 className="slide__title text-white">
                            {slide.titleLines.map((line, lIdx) => (
                              <span key={lIdx} className="title-line">
                                <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                                  {line}
                                </span>
                              </span>
                            ))}
                          </h2>
                        </div>
                      </header>

                      {/* Bottom-Right Floating Glassmorphic Details Card */}
                      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-16 z-20 w-[calc(100%-2rem)] sm:w-auto max-w-lg bg-white/90 hover:bg-white/95 backdrop-blur-2xl border border-white/85 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22),inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-300">
                        <div className="flex flex-col gap-3">
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight">
                              {slide.subheading}
                            </h3>
                            <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                              {slide.narrative}
                            </p>
                          </div>

                          {/* 3 Interactive Highlight Pills */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {slide.highlights.map((item, hIdx) => (
                              <div
                                key={hIdx}
                                className="rounded-xl p-2 bg-slate-50/90 border border-slate-200/70 flex flex-col justify-between"
                              >
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className="text-xs">{item.icon}</span>
                                  <span className="text-[11px] font-bold text-slate-900 truncate">
                                    {item.title}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-500 leading-tight">
                                  {item.desc}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Action CTA & Stat Reassurance */}
                          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
                            <span className="text-[11px] text-slate-500 font-medium italic">
                              "{slide.statQuote}"
                            </span>

                            <a
                              href={slide.ctaHref}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-purple-950 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 group cursor-pointer"
                            >
                              <span>{slide.ctaText}</span>
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
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
