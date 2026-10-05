"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useScroll } from "framer-motion";
import { getAssetPath } from "../utils/assetPath";

interface SliceSlideData {
  id: "modern-tech" | "patient-care" | "personalized";
  num: string;
  categoryLabel: string;
  shortLabel: string;
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
    shortLabel: "Modern Tech",
    titleLines: ["MODERN", "TECHNOLOGY"],
    badge: "Digital Precision",
    floatingBadge: "⚡ 100% Goop-Free",
    subheading: "Painless 3D imaging & micro-precision.",
    narrative:
      "Say goodbye to messy gag-inducing putty trays. Our ultra-quiet 3D intraoral wands map your smile in 60 seconds with microscopic diagnostic detail.",
    image: "/care-modern-tech.jpg",
    imageAlt: "Advanced digital dental scanner & luxury operatory",
    highlights: [
      {
        icon: "⚡",
        title: "60-Sec 3D Scan",
        desc: "Fast, micro-accurate mapping with zero gagging.",
      },
      {
        icon: "🔬",
        title: "Low Radiation",
        desc: "80% less radiation with microscopic detail.",
      },
      {
        icon: "🖥️",
        title: "Virtual Preview",
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
    shortLabel: "Patient Care",
    titleLines: ["PATIENT", "CARE"],
    badge: "Anxiety-Free Protocol",
    floatingBadge: "🌿 Gentle Touch Certified",
    subheading: "Gentle, compassionate dentistry centered on you.",
    narrative:
      "From warm neck pillows and noise-canceling headphones to unhurried check-ups where you're always in control, our team ensures every moment is calm and judgment-free.",
    image: "/care-patient-warm.jpg",
    imageAlt: "Compassionate dentist comforting patient in modern clinic",
    highlights: [
      {
        icon: "🌿",
        title: "Gentle Touch",
        desc: "Signal-to-pause anytime with unhurried pacing.",
      },
      {
        icon: "🎧",
        title: "Sensory Suite",
        desc: "Warm blankets, soothing audio & noise-canceling headsets.",
      },
      {
        icon: "🤍",
        title: "Zero Lecturing",
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
    shortLabel: "Personalized",
    titleLines: ["PERSONALIZED", "TREATMENT"],
    badge: "Bespoke Dentistry",
    floatingBadge: "💎 Bespoke Smile Design",
    subheading: "Custom blueprints for your biology & lifestyle.",
    narrative:
      "Your facial contours, enamel shade, and lifestyle rhythms are unique. We co-create a personalized roadmap with transparent itemized pricing and staged appointments.",
    image: "/care-personalized.jpg",
    imageAlt: "Cosmetic dentist and patient reviewing personalized smile plan",
    highlights: [
      {
        icon: "💎",
        title: "Facial Harmony",
        desc: "Bespoke tooth contours crafted for natural beauty.",
      },
      {
        icon: "💳",
        title: "Clear Pricing",
        desc: "Clear upfront costs with flexible 0% interest financing.",
      },
      {
        icon: "⏱️",
        title: "Your Schedule",
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
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeSlideRef = useRef(0);
  activeSlideRef.current = activeSlide;
  const lastActiveRef = useRef(0);

  // Wheel delta accumulator to prevent accidental hair-trigger misfires
  const wheelDeltaAccumulatorRef = useRef(0);
  const accumulatorResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch Swipe coordinates
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Monitor scroll progress through the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate target scroll position for a specific slide
  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const totalScrollRange = container.offsetHeight - window.innerHeight;
    if (totalScrollRange <= 0) return;

    const targetY = containerTop + (totalScrollRange * index) / (SLICE_SLIDES.length - 1);
    window.scrollTo({
      top: Math.round(targetY),
      behavior: "smooth",
    });
  }, []);

  // Switch slide handler with animation lock and optional window scroll sync
  const goToSlide = useCallback(
    (index: number, shouldScrollWindow = true) => {
      if (index < 0 || index >= SLICE_SLIDES.length) return;
      if (index === activeSlideRef.current && !isTransitioningRef.current) return;

      isTransitioningRef.current = true;
      setIsSliding(true);
      setActiveSlide(index);
      activeSlideRef.current = index;
      lastActiveRef.current = index;

      if (shouldScrollWindow) {
        scrollToSlide(index);
      }

      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        setIsSliding(false);
        isTransitioningRef.current = false;
      }, 750);
    },
    [scrollToSlide]
  );

  const handlePrev = useCallback(() => {
    const nextIdx = (activeSlideRef.current - 1 + SLICE_SLIDES.length) % SLICE_SLIDES.length;
    goToSlide(nextIdx, true);
  }, [goToSlide]);

  const handleNext = useCallback(() => {
    const nextIdx = (activeSlideRef.current + 1) % SLICE_SLIDES.length;
    goToSlide(nextIdx, true);
  }, [goToSlide]);

  // Non-passive wheel listener: forces strictly card-by-card snap and absorbs fast scrolls
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // The container is pinned when its top has reached viewport top and bottom hasn't exited
      const isPinned = rect.top <= 20 && rect.bottom >= windowHeight - 20;

      if (!isPinned) {
        // High-velocity catch: if user is scrolling down and approaching the container top
        if (e.deltaY > 0 && rect.top > 0 && rect.top <= 60 && activeSlideRef.current === 0) {
          e.preventDefault();
          const containerTop = window.scrollY + rect.top;
          window.scrollTo({ top: containerTop, behavior: "smooth" });
        }
        return;
      }

      const currentSlide = activeSlideRef.current;
      const delta = e.deltaY;

      // 1. User is scrolling DOWN
      if (delta > 0) {
        // If not yet on the last card, ALWAYS intercept to snap card by card!
        if (currentSlide < SLICE_SLIDES.length - 1) {
          e.preventDefault();

          // If a slide animation is currently running, absorb fast scroll flings completely
          if (isTransitioningRef.current) {
            return;
          }

          wheelDeltaAccumulatorRef.current += delta;
          if (accumulatorResetTimerRef.current) clearTimeout(accumulatorResetTimerRef.current);
          accumulatorResetTimerRef.current = setTimeout(() => {
            wheelDeltaAccumulatorRef.current = 0;
          }, 200);

          if (wheelDeltaAccumulatorRef.current >= 25) {
            wheelDeltaAccumulatorRef.current = 0;
            goToSlide(currentSlide + 1, true);
          }
          return;
        }

        // On the last card (Card 2):
        // If the window has not reached the bottom of the sticky container yet:
        if (rect.bottom > windowHeight + 20) {
          e.preventDefault();
          if (!isTransitioningRef.current) {
            wheelDeltaAccumulatorRef.current += delta;
            if (accumulatorResetTimerRef.current) clearTimeout(accumulatorResetTimerRef.current);
            accumulatorResetTimerRef.current = setTimeout(() => {
              wheelDeltaAccumulatorRef.current = 0;
            }, 200);

            if (wheelDeltaAccumulatorRef.current >= 25) {
              wheelDeltaAccumulatorRef.current = 0;
              scrollToSlide(SLICE_SLIDES.length - 1);
            }
          }
          return;
        }

        // Last card & bottom reached -> Natural scroll down to Treatments!
        return;
      }

      // 2. User is scrolling UP
      if (delta < 0) {
        // If not on the first card, ALWAYS intercept to snap card by card in reverse!
        if (currentSlide > 0) {
          e.preventDefault();

          if (isTransitioningRef.current) {
            return;
          }

          wheelDeltaAccumulatorRef.current += delta;
          if (accumulatorResetTimerRef.current) clearTimeout(accumulatorResetTimerRef.current);
          accumulatorResetTimerRef.current = setTimeout(() => {
            wheelDeltaAccumulatorRef.current = 0;
          }, 200);

          if (wheelDeltaAccumulatorRef.current <= -25) {
            wheelDeltaAccumulatorRef.current = 0;
            goToSlide(currentSlide - 1, true);
          }
          return;
        }

        // On the first card (Card 0):
        // If the window has not reached the top of the container yet:
        if (rect.top < -20) {
          e.preventDefault();
          if (!isTransitioningRef.current) {
            wheelDeltaAccumulatorRef.current += delta;
            if (accumulatorResetTimerRef.current) clearTimeout(accumulatorResetTimerRef.current);
            accumulatorResetTimerRef.current = setTimeout(() => {
              wheelDeltaAccumulatorRef.current = 0;
            }, 200);

            if (wheelDeltaAccumulatorRef.current <= -25) {
              wheelDeltaAccumulatorRef.current = 0;
              scrollToSlide(0);
            }
          }
          return;
        }

        // First card & top reached -> Natural scroll up to Doctor / Bento!
        return;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goToSlide, scrollToSlide]);

  // Touch gesture handlers: prevents skipping on mobile and allows card-by-card snap
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || touchStartYRef.current === null) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isPinned = rect.top <= 20 && rect.bottom >= windowHeight - 20;

      if (!isPinned) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = touchStartYRef.current - currentY; // positive = swipe up = scroll down
      const deltaX = (touchStartXRef.current ?? currentX) - currentX;
      const currentSlide = activeSlideRef.current;

      // If predominantly horizontal swipe, let touchend handle it
      if (Math.abs(deltaX) > Math.abs(deltaY) + 10) return;

      // Vertical swipe UP (intent to scroll DOWN)
      if (deltaY > 0) {
        if (currentSlide < SLICE_SLIDES.length - 1) {
          if (e.cancelable) e.preventDefault();
          if (isTransitioningRef.current) return;
          if (deltaY > 35) {
            touchStartYRef.current = currentY;
            goToSlide(currentSlide + 1, true);
          }
          return;
        }
      }

      // Vertical swipe DOWN (intent to scroll UP)
      if (deltaY < 0) {
        if (currentSlide > 0) {
          if (e.cancelable) e.preventDefault();
          if (isTransitioningRef.current) return;
          if (deltaY < -35) {
            touchStartYRef.current = currentY;
            goToSlide(currentSlide - 1, true);
          }
          return;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

      // If horizontal swipe > 35px
      if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      touchStartXRef.current = null;
      touchStartYRef.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goToSlide, handleNext, handlePrev]);

  // Sync scroll progress with active slide for scrollbar drag or fast jumps
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (!isTransitioningRef.current) {
        let targetIndex = 0;
        if (latest < 0.33) {
          targetIndex = 0;
        } else if (latest < 0.67) {
          targetIndex = 1;
        } else {
          targetIndex = 2;
        }

        if (targetIndex !== activeSlideRef.current) {
          setActiveSlide(targetIndex);
          activeSlideRef.current = targetIndex;
          lastActiveRef.current = targetIndex;
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        if (activeSlideRef.current < SLICE_SLIDES.length - 1) {
          e.preventDefault();
          goToSlide(activeSlideRef.current + 1, true);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        if (activeSlideRef.current > 0) {
          e.preventDefault();
          goToSlide(activeSlideRef.current - 1, true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToSlide]);

  return (
    <div
      ref={containerRef}
      id="technology"
      className="relative w-full h-[300vh] scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      <div id="care-pillars" className="absolute -top-24" aria-hidden="true" />
      <div id="innovation" className="absolute -top-24" aria-hidden="true" />

      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center bg-slate-950/5 backdrop-blur-[2px]">
        {/* Main Slice Slider Root */}
        <div
          className={`slice-slider-wrapper relative w-full h-full max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-10 pt-16 sm:pt-24 pb-2.5 sm:pb-6 flex flex-col justify-center ${
            isSliding ? "is-sliding" : ""
          }`}
        >
          {/* Top Category Indicator Pills + Mobile Prev/Next */}
          <div className="relative z-30 flex items-center justify-between gap-1.5 sm:gap-3 mb-1.5 sm:mb-2 px-1 sm:px-4">
            {/* Pill Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 shrink">
              {SLICE_SLIDES.map((slide, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-tight transition-all duration-300 cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                        : "bg-white/85 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200/80 active:scale-95"
                    }`}
                  >
                    <span
                      className={`text-[9.5px] sm:text-[10px] font-mono font-bold ${
                        isActive ? "text-pink-300" : "text-slate-400"
                      }`}
                    >
                      {slide.num}
                    </span>
                    <span className="sm:inline hidden">{slide.categoryLabel}</span>
                    <span className="inline sm:hidden">{slide.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Controls (Quick Prev/Next Buttons + Index Counter) */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="flex sm:hidden items-center gap-0.5 bg-white/80 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-slate-200/70 text-[10px] font-mono font-bold text-slate-600">
                <span className="text-slate-950 font-bold">0{activeSlide + 1}</span>
                <span className="text-slate-300">/</span>
                <span>0{SLICE_SLIDES.length}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-slate-500 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
                <span className="text-slate-900">0{activeSlide + 1}</span>
                <span className="text-slate-300">/</span>
                <span>0{SLICE_SLIDES.length}</span>
              </div>
            </div>
          </div>

          {/* Slides Viewport Box */}
          <div className="relative flex-1 w-full rounded-[20px] sm:rounded-[36px] overflow-hidden border border-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] bg-white">
            {/* The Rotated Vertical Navigation Track (Desktop only) */}
            <div className="slides-nav hidden lg:flex">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/50 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-transparent to-slate-950/30 pointer-events-none" />
                      </figure>

                      {/* Header with Masked Slice Title Animation (Upper Half on Mobile) */}
                      <header className="slide__header">
                        <div className="max-w-2xl">
                          {/* Floating Top Category Pill */}
                          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/50 shadow-xs text-slate-900 text-[10px] sm:text-xs font-bold tracking-tight mb-1.5 sm:mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                            <span>{slide.badge}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-purple-700">{slide.floatingBadge}</span>
                          </div>

                          {/* Split Title with Overflow Hidden & Staggered Reveal */}
                          <h2
                            className="slide__title font-dm-sans font-bold text-white tracking-tight"
                            style={{
                              fontFamily: 'var(--font-dm-sans), "DM Sans", "DM Sans Local", sans-serif',
                              letterSpacing: "-0.025em",
                              lineHeight: 1.06,
                            }}
                          >
                            {slide.titleLines.map((line, lIdx) => (
                              <span key={lIdx} className="title-line">
                                <span
                                  className="text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
                                  style={{
                                    fontFamily: 'var(--font-dm-sans), "DM Sans", "DM Sans Local", sans-serif',
                                    letterSpacing: "-0.025em",
                                    color: "#FFFFFF",
                                  }}
                                >
                                  {line}
                                </span>
                              </span>
                            ))}
                          </h2>
                        </div>
                      </header>

                      {/* Bottom Floating Glassmorphic Details Card */}
                      <div className="absolute bottom-2.5 sm:bottom-6 inset-x-2.5 sm:inset-x-auto sm:right-16 z-20 max-w-lg bg-white/95 hover:bg-white backdrop-blur-2xl border border-white/90 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-[0_16px_44px_rgba(0,0,0,0.22),inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-300">
                        <div className="flex flex-col gap-2 sm:gap-3">
                          <div>
                            <h3 className="text-xs sm:text-base font-bold text-slate-900 tracking-tight leading-snug line-clamp-1 sm:line-clamp-none">
                              {slide.subheading}
                            </h3>
                            <p className="text-[11px] sm:text-[13px] text-slate-600 mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                              {slide.narrative}
                            </p>
                          </div>

                          {/* 3 Interactive Highlight Pills */}
                          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                            {slide.highlights.map((item, hIdx) => (
                              <div
                                key={hIdx}
                                className="rounded-xl p-1.5 sm:p-2 bg-slate-50/90 border border-slate-200/70 flex flex-col justify-between"
                              >
                                <div className="flex items-center gap-1 mb-0.5">
                                  <span className="text-xs shrink-0">{item.icon}</span>
                                  <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-900 truncate">
                                    {item.title}
                                  </span>
                                </div>
                                <p className="hidden sm:block text-[10px] text-slate-500 leading-tight">
                                  {item.desc}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Action CTA, Stat Reassurance & Mobile Arrow Buttons */}
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                            <span className="hidden sm:block text-[11px] text-slate-500 font-medium italic truncate">
                              "{slide.statQuote}"
                            </span>

                            <div className="flex items-center gap-1.5 w-full sm:w-auto">
                              <a
                                href={slide.ctaHref}
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-slate-900 hover:bg-purple-950 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 group cursor-pointer active:scale-95 text-center"
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

                              {/* Mobile Compact Arrow Navigation */}
                              <div className="flex sm:hidden items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={handlePrev}
                                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-800 text-xs font-bold active:scale-90"
                                  aria-label="Previous slide"
                                >
                                  ‹
                                </button>
                                <button
                                  type="button"
                                  onClick={handleNext}
                                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-800 text-xs font-bold active:scale-90"
                                  aria-label="Next slide"
                                >
                                  ›
                                </button>
                              </div>
                            </div>
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
