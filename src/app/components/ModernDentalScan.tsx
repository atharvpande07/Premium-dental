"use client";

import { useRef, useMemo, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  animate,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";

/* -------------------------------------------------------------
 * Easing Curve Constant
 * Smooth natural ease-in-out curve with graceful deceleration
 * ------------------------------------------------------------*/
const EASE_CURVE = [0.25, 0.1, 0.25, 1] as const;

/* -------------------------------------------------------------
 * Particle Definition for Dentist Reconstruction Effect
 * ------------------------------------------------------------*/
interface ParticleDef {
  id: number;
  x: number; // Percentage across width (15% to 85%)
  targetY: number; // Percentage across height (6% to 92%)
  riseDist: number; // Pixels to float upwards into position
  size: number; // Diameter in pixels
  color: string; // Vibrant glowing particle color
  delayNorm: number; // Trigger progress threshold (0.10 to 0.85)
  ambient?: boolean; // Persists as subtle aura sparkle when formed
}

const DENTIST_PARTICLES: ParticleDef[] = [
  // Lower torso & coat base (early formation: 0.12 - 0.30)
  { id: 1, x: 28, targetY: 88, riseDist: 45, size: 4, color: "#c084fc", delayNorm: 0.14 },
  { id: 2, x: 45, targetY: 85, riseDist: 50, size: 5, color: "#ffffff", delayNorm: 0.16 },
  { id: 3, x: 62, targetY: 89, riseDist: 40, size: 3.5, color: "#67e8f9", delayNorm: 0.15 },
  { id: 4, x: 75, targetY: 82, riseDist: 55, size: 4.5, color: "#e879f9", delayNorm: 0.19 },
  { id: 5, x: 35, targetY: 78, riseDist: 48, size: 3, color: "#ffffff", delayNorm: 0.22 },
  { id: 6, x: 55, targetY: 75, riseDist: 42, size: 5, color: "#c084fc", delayNorm: 0.25 },
  { id: 7, x: 20, targetY: 79, riseDist: 38, size: 4, color: "#67e8f9", delayNorm: 0.21 },
  { id: 8, x: 68, targetY: 72, riseDist: 50, size: 3.5, color: "#a855f7", delayNorm: 0.28 },
  { id: 9, x: 42, targetY: 70, riseDist: 44, size: 4, color: "#ffffff", delayNorm: 0.30 },

  // Mid torso, arms crossed & watch (mid formation: 0.30 - 0.54)
  { id: 10, x: 24, targetY: 64, riseDist: 52, size: 4.5, color: "#c084fc", delayNorm: 0.34 },
  { id: 11, x: 38, targetY: 60, riseDist: 46, size: 3.5, color: "#67e8f9", delayNorm: 0.37 },
  { id: 12, x: 52, targetY: 63, riseDist: 48, size: 5, color: "#ffffff", delayNorm: 0.36 },
  { id: 13, x: 66, targetY: 58, riseDist: 40, size: 4, color: "#e879f9", delayNorm: 0.40 },
  { id: 14, x: 80, targetY: 62, riseDist: 54, size: 3, color: "#c084fc", delayNorm: 0.38 },
  { id: 15, x: 32, targetY: 53, riseDist: 42, size: 4.5, color: "#ffffff", delayNorm: 0.44 },
  { id: 16, x: 48, targetY: 50, riseDist: 50, size: 5.5, color: "#67e8f9", delayNorm: 0.46 },
  { id: 17, x: 60, targetY: 52, riseDist: 46, size: 3.5, color: "#a855f7", delayNorm: 0.48 },
  { id: 18, x: 72, targetY: 48, riseDist: 38, size: 4, color: "#ffffff", delayNorm: 0.50 },
  { id: 19, x: 22, targetY: 46, riseDist: 48, size: 3.5, color: "#c084fc", delayNorm: 0.52 },
  { id: 20, x: 40, targetY: 44, riseDist: 44, size: 5, color: "#e879f9", delayNorm: 0.54 },

  // Upper chest, lapels, neck & loupes (upper-mid formation: 0.54 - 0.70)
  { id: 21, x: 35, targetY: 38, riseDist: 46, size: 4.5, color: "#ffffff", delayNorm: 0.58 },
  { id: 22, x: 50, targetY: 36, riseDist: 52, size: 5, color: "#67e8f9", delayNorm: 0.60 },
  { id: 23, x: 64, targetY: 39, riseDist: 42, size: 3.5, color: "#c084fc", delayNorm: 0.62 },
  { id: 24, x: 28, targetY: 34, riseDist: 40, size: 4, color: "#a855f7", delayNorm: 0.64 },
  { id: 25, x: 44, targetY: 32, riseDist: 48, size: 5.5, color: "#ffffff", delayNorm: 0.66 },
  { id: 26, x: 58, targetY: 33, riseDist: 44, size: 4, color: "#e879f9", delayNorm: 0.68 },
  { id: 27, x: 74, targetY: 35, riseDist: 38, size: 3.5, color: "#67e8f9", delayNorm: 0.65 },

  // Neck, chin, face, hair & smile (final formation: 0.68 - 0.85)
  { id: 28, x: 38, targetY: 26, riseDist: 44, size: 4.5, color: "#c084fc", delayNorm: 0.72 },
  { id: 29, x: 52, targetY: 24, riseDist: 50, size: 5, color: "#ffffff", delayNorm: 0.74 },
  { id: 30, x: 62, targetY: 27, riseDist: 42, size: 3.5, color: "#67e8f9", delayNorm: 0.73 },
  { id: 31, x: 42, targetY: 18, riseDist: 46, size: 5.5, color: "#ffffff", delayNorm: 0.77 },
  { id: 32, x: 54, targetY: 17, riseDist: 48, size: 4, color: "#e879f9", delayNorm: 0.79 },
  { id: 33, x: 36, targetY: 12, riseDist: 40, size: 4.5, color: "#c084fc", delayNorm: 0.82 },
  { id: 34, x: 48, targetY: 10, riseDist: 44, size: 5, color: "#67e8f9", delayNorm: 0.84 },
  { id: 35, x: 60, targetY: 13, riseDist: 38, size: 3.5, color: "#ffffff", delayNorm: 0.83 },

  // Ethereal ambient aura particles (float subtly around him when formed)
  { id: 36, x: 18, targetY: 28, riseDist: 35, size: 3.5, color: "#c084fc", delayNorm: 0.70, ambient: true },
  { id: 37, x: 78, targetY: 25, riseDist: 35, size: 4, color: "#67e8f9", delayNorm: 0.72, ambient: true },
  { id: 38, x: 30, targetY: 14, riseDist: 30, size: 3, color: "#ffffff", delayNorm: 0.80, ambient: true },
  { id: 39, x: 66, targetY: 15, riseDist: 30, size: 3.5, color: "#e879f9", delayNorm: 0.82, ambient: true },
  { id: 40, x: 48, targetY: 6, riseDist: 28, size: 3, color: "#ffffff", delayNorm: 0.86, ambient: true },
];

/* -------------------------------------------------------------
 * Individual Particle Component
 * ------------------------------------------------------------*/
function DentistParticle({
  def,
  progress,
  shouldReduceMotion,
}: {
  def: ParticleDef;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean;
}) {
  const start = Math.max(0, def.delayNorm - 0.14);
  const peak = def.delayNorm;
  const end = Math.min(1.0, def.delayNorm + 0.10);

  const opacity = useTransform(
    progress,
    [start, peak, end],
    shouldReduceMotion ? [0, 0, 0] : [0, 0.95, def.ambient ? 0.65 : 0]
  );
  const y = useTransform(
    progress,
    [start, peak],
    shouldReduceMotion ? [0, 0] : [def.riseDist, 0]
  );
  const scale = useTransform(
    progress,
    [start, peak, end],
    shouldReduceMotion ? [1, 1, 1] : [0.35, 1.35, def.ambient ? 1 : 0.2]
  );

  return (
    <motion.span
      style={{
        left: `${def.x}%`,
        top: `${def.targetY}%`,
        opacity,
        y,
        scale,
        width: `${def.size}px`,
        height: `${def.size}px`,
        backgroundColor: def.color,
        boxShadow: `0 0 ${def.size * 2.8}px ${def.color}`,
      }}
      className={`absolute rounded-full pointer-events-none will-change-[transform,opacity] ${
        def.ambient ? "animate-pulse" : ""
      }`}
    />
  );
}

/* -------------------------------------------------------------
 * Main ModernDentalScan Component
 * ------------------------------------------------------------*/
export default function ModernDentalScan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = !!useReducedMotion();

  // Unified animated progress value (0 = initial hidden/disassembled, 1 = fully reconstructed)
  const effectiveProgress = useMotionValue(0);
  const animationRef = useRef<{ stop: () => void } | null>(null);
  const lastScrollYRef = useRef(0);
  const isPlayingInAnimationRef = useRef(false);

  // Monitor scroll progress for this card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const { scrollY } = useScroll();

  // 1. STAMP ANIMATIONS (Shifted down and right)
  const stampOpacity = useTransform(effectiveProgress, [0.04, 0.24], shouldReduceMotion ? [1, 1] : [0, 1]);
  const stampScale = useTransform(effectiveProgress, [0.04, 0.24], shouldReduceMotion ? [1, 1] : [0.90, 1]);
  const stampX = useTransform(effectiveProgress, [0.04, 0.24], shouldReduceMotion ? [0, 0] : [-16, 0]);

  // 2. TYPOGRAPHY LEFT-TO-RIGHT ANIMATIONS
  // Badge 1 ("Lead Prosthodontist")
  const badge1Opacity = useTransform(effectiveProgress, [0.12, 0.30], shouldReduceMotion ? [1, 1] : [0, 1]);
  const badge1X = useTransform(effectiveProgress, [0.12, 0.30], shouldReduceMotion ? [0, 0] : [-24, 0]);
  const badge1Blur = useTransform(effectiveProgress, [0.12, 0.30], shouldReduceMotion ? [0, 0] : [4, 0]);
  const badge1Filter = useTransform(badge1Blur, (b) => (b <= 0.05 ? "none" : `blur(${b.toFixed(1)}px)`));

  // Badge 2 ("Board Certified")
  const badge2Opacity = useTransform(effectiveProgress, [0.18, 0.36], shouldReduceMotion ? [1, 1] : [0, 1]);
  const badge2X = useTransform(effectiveProgress, [0.18, 0.36], shouldReduceMotion ? [0, 0] : [-24, 0]);
  const badge2Blur = useTransform(effectiveProgress, [0.18, 0.36], shouldReduceMotion ? [0, 0] : [4, 0]);
  const badge2Filter = useTransform(badge2Blur, (b) => (b <= 0.05 ? "none" : `blur(${b.toFixed(1)}px)`));

  // Name Headline ("Dr. Julian Vance DDS, FACP")
  const nameOpacity = useTransform(effectiveProgress, [0.24, 0.46], shouldReduceMotion ? [1, 1] : [0, 1]);
  const nameX = useTransform(effectiveProgress, [0.24, 0.46], shouldReduceMotion ? [0, 0] : [-30, 0]);
  const nameBlur = useTransform(effectiveProgress, [0.24, 0.46], shouldReduceMotion ? [0, 0] : [5, 0]);
  const nameFilter = useTransform(nameBlur, (b) => (b <= 0.05 ? "none" : `blur(${b.toFixed(1)}px)`));

  // Subtext ("Digital Smile Architecture & Restorative Design")
  const subtextOpacity = useTransform(effectiveProgress, [0.34, 0.54], shouldReduceMotion ? [1, 1] : [0, 1]);
  const subtextX = useTransform(effectiveProgress, [0.34, 0.54], shouldReduceMotion ? [0, 0] : [-26, 0]);
  const subtextBlur = useTransform(effectiveProgress, [0.34, 0.54], shouldReduceMotion ? [0, 0] : [4, 0]);
  const subtextFilter = useTransform(subtextBlur, (b) => (b <= 0.05 ? "none" : `blur(${b.toFixed(1)}px)`));

  // Quote Description Block
  const quoteOpacity = useTransform(effectiveProgress, [0.44, 0.66], shouldReduceMotion ? [1, 1] : [0, 1]);
  const quoteX = useTransform(effectiveProgress, [0.44, 0.66], shouldReduceMotion ? [0, 0] : [-24, 0]);
  const quoteBlur = useTransform(effectiveProgress, [0.44, 0.66], shouldReduceMotion ? [0, 0] : [4, 0]);
  const quoteFilter = useTransform(quoteBlur, (b) => (b <= 0.05 ? "none" : `blur(${b.toFixed(1)}px)`));

  // 3. ACTION BUTTONS FADE UP IN ANIMATIONS
  // Primary Button ("BOOK CONSULTATION")
  const btn1Opacity = useTransform(effectiveProgress, [0.56, 0.76], shouldReduceMotion ? [1, 1] : [0, 1]);
  const btn1Y = useTransform(effectiveProgress, [0.56, 0.76], shouldReduceMotion ? [0, 0] : [22, 0]);

  // Secondary Button ("View Case Gallery")
  const btn2Opacity = useTransform(effectiveProgress, [0.62, 0.82], shouldReduceMotion ? [1, 1] : [0, 1]);
  const btn2Y = useTransform(effectiveProgress, [0.62, 0.82], shouldReduceMotion ? [0, 0] : [22, 0]);

  // 4. DENTIST PARTICLE RECONSTRUCTION ANIMATION
  const dentistProgress = useTransform(effectiveProgress, [0.08, 0.86], [0, 1]);
  const maskPercent = useTransform(dentistProgress, [0, 1], [0, 100]);
  const maskImage = useTransform(maskPercent, (p) => {
    if (shouldReduceMotion || p >= 99) return "none";
    if (p <= 0.5) return "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)";
    const lower = Math.max(0, p - 6);
    const upper = Math.min(100, p + 12);
    return `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${lower.toFixed(1)}%, rgba(0,0,0,0.7) ${p.toFixed(1)}%, rgba(0,0,0,0) ${upper.toFixed(1)}%)`;
  });

  const dentistImageOpacity = useTransform(dentistProgress, [0.0, 0.12], shouldReduceMotion ? [1, 1] : [0, 1]);
  const dentistImageY = useTransform(dentistProgress, [0.0, 1.0], shouldReduceMotion ? [0, 0] : [28, 0]);

  // Reconstruction Horizon Laser & Sparkle Line (sweeps from bottom to top)
  const horizonBottom = useTransform(dentistProgress, [0, 1], ["0%", "100%"]);
  const horizonOpacity = useTransform(dentistProgress, [0.04, 0.14, 0.84, 0.94], shouldReduceMotion ? [0, 0, 0, 0] : [0, 1, 1, 0]);

  // Initial load check
  useEffect(() => {
    if (shouldReduceMotion) {
      effectiveProgress.set(1);
      return;
    }

    lastScrollYRef.current = window.scrollY;
    const initialProgress = scrollYProgress.get();

    if (initialProgress >= 0.75) {
      effectiveProgress.set(1);
    } else if (initialProgress >= 0.32) {
      isPlayingInAnimationRef.current = true;
      animationRef.current = animate(effectiveProgress, 1, {
        duration: 1.5,
        delay: 0.2,
        ease: EASE_CURVE,
        onComplete: () => {
          isPlayingInAnimationRef.current = false;
          animationRef.current = null;
        },
      });
    }

    return () => {
      animationRef.current?.stop();
    };
  }, [shouldReduceMotion, scrollYProgress, effectiveProgress]);

  // Handle scroll events:
  // - Downwards: triggers automated reconstruction & typography entrance with smooth ease (not scroll-scrubbed)
  // - Upwards: reverses out in lockstep with the scroll (scroll-based out animation)
  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    if (shouldReduceMotion) return;

    const delta = latestScrollY - lastScrollYRef.current;
    lastScrollYRef.current = latestScrollY;
    const currentProgress = scrollYProgress.get();

    // UPWARD SCROLL: Out-animation is scroll based
    if (delta < -0.5) {
      if (currentProgress < 0.90) {
        if (animationRef.current) {
          animationRef.current.stop();
          animationRef.current = null;
          isPlayingInAnimationRef.current = false;
        }

        // Map scrollYProgress directly to effective progress (0.18 -> 0.86 maps to 0 -> 1)
        const scrollFraction = Math.min(1, Math.max(0, (currentProgress - 0.18) / 0.68));
        const currentVal = effectiveProgress.get();
        effectiveProgress.set(Math.min(currentVal, scrollFraction));
      }
    }
    // DOWNWARD SCROLL: In-animation triggers with smooth ease (automated, not scroll scrubbed)
    // Delayed & higher threshold so it triggers when the user actually arrives at the section
    else if (delta > 0.5) {
      if (
        currentProgress >= 0.28 &&
        !isPlayingInAnimationRef.current &&
        effectiveProgress.get() < 0.99
      ) {
        isPlayingInAnimationRef.current = true;
        const remaining = 1 - effectiveProgress.get();

        animationRef.current = animate(effectiveProgress, 1, {
          duration: Math.max(0.5, remaining * 1.5),
          delay: 0.18,
          ease: EASE_CURVE,
          onComplete: () => {
            isPlayingInAnimationRef.current = false;
            animationRef.current = null;
          },
        });
      }
    }
  });

  return (
    <div ref={containerRef} className="flex flex-col w-full">
      {/* 3. SHIFTED CIRCULAR STAMP & TAGLINE (Down and Right) */}
      <motion.div
        style={{ opacity: stampOpacity, scale: stampScale, x: stampX }}
        className="flex items-center gap-3.5 pl-5 sm:pl-7 pt-0 mb-2 sm:mb-2.5 select-none"
      >
        <div className="relative w-11 h-11 rounded-full border-2 border-dashed border-purple-400/60 bg-white/60 backdrop-blur-sm flex items-center justify-center text-purple-700 shadow-2xs">
          <svg className="w-4 h-4 text-purple-700 drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>

        <div className="text-[10px] font-mono tracking-[0.2em] font-bold text-[#6b21a8] leading-tight">
          BRIGHTER SMILES<br />
          BRIGHTER TOMORROWS
        </div>
      </motion.div>

      {/* MAIN CARD CONTAINER */}
      <div className="relative w-full rounded-[22px] bg-gradient-to-b from-white/85 to-purple-50/70 backdrop-blur-md border border-white/80 p-5 sm:p-6 lg:p-7 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] select-none flex flex-col justify-center overflow-visible">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[22px] z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-50/80 blur-3xl rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-50/60 blur-3xl rounded-full" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[15%] w-[380px] h-[380px] rounded-full border-[0.5px] border-dashed border-pink-200/60 animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[30%] w-[260px] h-[260px] rounded-full border-[0.5px] border-dashed border-purple-200/60 animate-[spin_40s_linear_infinite_reverse]" />
        </div>

        {/* 4. DENTIST IMAGE WITH PARTICLE FORMATION RECONSTRUCTION */}
        <div className="absolute right-[-35px] xs:right-[-40px] sm:right-[-45px] lg:right-[-25px] xl:right-[-35px] bottom-0 pointer-events-none z-[5] overflow-visible">
          <div className="relative w-[310px] xs:w-[350px] sm:w-[440px] lg:w-[355px] xl:w-[380px] h-[410px] xs:h-[450px] sm:h-[540px] lg:h-[425px] xl:h-[455px]">
            {/* The Solid Reconstructing Dentist Figure */}
            <motion.div
              style={{
                maskImage,
                WebkitMaskImage: maskImage,
                opacity: dentistImageOpacity,
                y: dentistImageY,
              }}
              className="relative w-full h-full will-change-[transform,opacity]"
            >
              <Image 
                src="/dentist-mock-image.png"
                alt="Dr. Julian Vance"
                fill
                sizes="(max-width: 640px) 350px, (max-width: 1024px) 440px, (max-width: 1280px) 360px, 390px"
                className="object-contain object-bottom drop-shadow-sm"
              />
            </motion.div>

            {/* Reconstruction Horizon Laser & Glow Wave */}
            <motion.div
              style={{
                bottom: horizonBottom,
                opacity: horizonOpacity,
              }}
              className="absolute inset-x-[-15%] h-5 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center overflow-visible will-change-[transform,opacity]"
            >
              {/* Intense energy laser line */}
              <div className="w-full h-[2.5px] bg-gradient-to-r from-transparent via-purple-300 via-white via-cyan-200 to-transparent blur-[0.8px] shadow-[0_0_18px_rgba(192,132,252,1)]" />
              {/* Soft plasma aura */}
              <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-transparent via-purple-500/35 via-cyan-400/25 to-transparent blur-md" />
              {/* Sparkle energy beads */}
              <div className="absolute left-[20%] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
              <div className="absolute right-[25%] w-1.5 h-1.5 rounded-full bg-cyan-200 shadow-[0_0_8px_#67e8f9]" />
              <div className="absolute left-[52%] w-2.5 h-2.5 rounded-full bg-purple-100 shadow-[0_0_12px_#c084fc]" />
            </motion.div>

            {/* Swarm of Ascending Reconstructing Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-visible z-30">
              {DENTIST_PARTICLES.map((particle) => (
                <DentistParticle
                  key={particle.id}
                  def={particle}
                  progress={effectiveProgress}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 1. LEFT-TO-RIGHT TYPOGRAPHY CONTENT */}
        <div className="relative z-10 w-full max-w-[58%] xs:max-w-[60%] sm:max-w-xl">
          {/* Top Badges (Lead Prosthodontist & Board Certified) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
            <motion.div
              style={{ opacity: badge1Opacity, x: badge1X, filter: badge1Filter }}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#f3e8ff] text-[9px] sm:text-[10px] font-bold tracking-[0.08em] text-[#6b21a8] uppercase will-change-[transform,opacity,filter]"
            >
              Lead Prosthodontist
            </motion.div>

            <motion.div
              style={{ opacity: badge2Opacity, x: badge2X, filter: badge2Filter }}
              className="flex items-center gap-1 sm:gap-1.5 text-slate-600 text-xs sm:text-sm font-medium will-change-[transform,opacity,filter]"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[11px] sm:text-[13px]">Board Certified</span>
            </motion.div>
          </div>

          {/* Name Headings ("Dr. Julian Vance DDS, FACP") */}
          <div className="mb-1.5 sm:mb-2">
            <motion.h2
              style={{ opacity: nameOpacity, x: nameX, filter: nameFilter }}
              className="font-serif text-[1.85rem] xs:text-[2.25rem] sm:text-[3.25rem] lg:text-[3.5rem] text-slate-900 leading-[0.95] tracking-tight will-change-[transform,opacity,filter]"
            >
              Dr. Julian<br />
              Vance <span className="font-sans text-base xs:text-lg sm:text-2xl lg:text-[2.25rem] font-semibold text-[#a855f7] tracking-normal inline-block align-baseline ml-0.5 sm:ml-1">DDS, FACP</span>
            </motion.h2>
          </div>

          {/* Subtext */}
          <motion.p
            style={{ opacity: subtextOpacity, x: subtextX, filter: subtextFilter }}
            className="text-slate-700 font-medium text-[11px] xs:text-[12px] sm:text-[14px] lg:text-[15px] mb-3 sm:mb-5 tracking-tight will-change-[transform,opacity,filter]"
          >
            Digital Smile Architecture & Restorative Design
          </motion.p>

          {/* Quote Description Block */}
          <motion.div
            style={{ opacity: quoteOpacity, x: quoteX, filter: quoteFilter }}
            className="border-l-[2.5px] sm:border-l-[3px] border-[#a855f7] pl-3 sm:pl-5 mb-3 sm:mb-4 py-0.5 sm:py-1 will-change-[transform,opacity,filter]"
          >
            <p className="font-serif italic text-slate-600 text-[11px] xs:text-[13px] sm:text-[1rem] lg:text-[1.1rem] leading-relaxed pr-1 sm:pr-4">
              &quot;We combine microscopic precision with organic facial harmony — ensuring your smile feels completely effortless and authentically you.&quot;
            </p>
          </motion.div>

          {/* 2. ACTION BUTTONS (Fade Up In Animation) */}
          <div className="flex flex-row items-center gap-2 sm:gap-3 flex-wrap">
            {/* Primary Button */}
            <motion.button
              style={{ opacity: btn1Opacity, y: btn1Y }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0a0a0a] hover:bg-black text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-[10px] sm:text-xs tracking-wide shadow-md whitespace-nowrap will-change-[transform,opacity]"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c084fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              BOOK CONSULTATION
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              style={{ opacity: btn2Opacity, y: btn2Y }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-1 sm:gap-1.5 bg-white/80 hover:bg-white text-slate-700 border border-slate-200 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-[11px] sm:text-[12px] shadow-sm whitespace-nowrap will-change-[transform,opacity]"
            >
              View Case Gallery
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
