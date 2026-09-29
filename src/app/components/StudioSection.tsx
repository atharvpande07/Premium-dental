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

interface TextSegment {
  type: "text";
  text: string;
  className: string;
}

interface PillSegment {
  type: "pill-tech" | "pill-smile";
}

type Segment = TextSegment | PillSegment;

const HEADLINE_SEGMENTS: Segment[] = [
  {
    type: "text",
    text: "We combine modern technology with careful planning",
    className: "text-slate-900 font-extrabold",
  },
  {
    type: "pill-tech",
  },
  {
    type: "text",
    text: "and a personal approach —",
    className: "text-slate-900 font-extrabold",
  },
  {
    type: "text",
    text: "giving you clearer answers, considered treatment,",
    className: "text-slate-500 font-semibold",
  },
  {
    type: "pill-smile",
  },
  {
    type: "text",
    text: "and care built around your long-term oral health.",
    className: "text-slate-500 font-semibold",
  },
];

interface TokenWord {
  type: "word";
  id: string;
  word: string;
  className: string;
  index: number;
}

interface TokenPill {
  type: "pill-tech" | "pill-smile";
  id: string;
  index: number;
}

type HeadlineToken = TokenWord | TokenPill;

function buildHeadlineTokens(segments: Segment[]): HeadlineToken[] {
  const tokens: HeadlineToken[] = [];
  let counter = 0;

  for (const seg of segments) {
    if (seg.type === "text") {
      const words = seg.text.trim().split(/\s+/);
      for (const word of words) {
        tokens.push({
          type: "word",
          id: `w-${counter}-${word}`,
          word,
          className: seg.className,
          index: counter++,
        });
      }
    } else {
      tokens.push({
        type: seg.type,
        id: `pill-${counter}-${seg.type}`,
        index: counter++,
      });
    }
  }

  return tokens;
}

const SUBTITLE_TEXT =
  "Our technology helps you understand what's happening and helps us plan your treatment more precisely";

/* -------------------------------------------------------------
 * Easing Curve Constant
 * Smooth natural ease-in curve with graceful deceleration
 * ------------------------------------------------------------*/
const EASE_CURVE = [0.25, 0.1, 0.25, 1] as const;

/* -------------------------------------------------------------
 * Dual-Mode Typography Token Components
 * (Driven by effectiveProgress MotionValue: automated ease-in on scroll down,
 * scroll-scrubbed fade-out on scroll back up)
 * ------------------------------------------------------------*/

function ScrollBadge({
  progress,
  shouldReduceMotion,
}: {
  progress: MotionValue<number>;
  shouldReduceMotion: boolean;
}) {
  const opacity = useTransform(progress, [0.0, 0.2], shouldReduceMotion ? [1, 1] : [0, 1]);
  const y = useTransform(progress, [0.0, 0.2], shouldReduceMotion ? [0, 0] : [14, 0]);
  const scale = useTransform(progress, [0.0, 0.2], shouldReduceMotion ? [1, 1] : [0.94, 1]);

  return (
    <div className="flex justify-center mb-3.5 sm:mb-4">
      <motion.div
        style={{ opacity, y, scale }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
      >
        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-800 uppercase font-sans">
          About Us
        </span>
      </motion.div>
    </div>
  );
}

function ScrollStar({
  progress,
  shouldReduceMotion,
}: {
  progress: MotionValue<number>;
  shouldReduceMotion: boolean;
}) {
  const opacity = useTransform(progress, [0.04, 0.22], shouldReduceMotion ? [1, 1] : [0, 1]);
  const scale = useTransform(progress, [0.04, 0.22], shouldReduceMotion ? [1, 1] : [0, 1]);
  const rotate = useTransform(progress, [0.04, 0.22], shouldReduceMotion ? [0, 0] : [-35, 0]);

  return (
    <motion.span
      style={{ opacity, scale, rotate }}
      className="inline-flex items-center align-middle mr-2 sm:mr-3 text-orange-500 -translate-y-[2px]"
    >
      <svg
        className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse fill-current drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </motion.span>
  );
}

function ScrollWord({
  word,
  className,
  progress,
  range,
  shouldReduceMotion,
}: {
  word: string;
  className: string;
  progress: MotionValue<number>;
  range: [number, number];
  shouldReduceMotion: boolean;
}) {
  const opacity = useTransform(progress, range, shouldReduceMotion ? [1, 1] : [0, 1]);
  const y = useTransform(progress, range, shouldReduceMotion ? [0, 0] : [18, 0]);
  const blurVal = useTransform(progress, range, shouldReduceMotion ? [0, 0] : [4, 0]);
  const filter = useTransform(blurVal, (b) => (b <= 0.05 ? "none" : `blur(${b.toFixed(1)}px)`));

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className={`inline-block whitespace-nowrap mr-[0.24em] will-change-[transform,opacity,filter] ${className}`}
    >
      {word}
    </motion.span>
  );
}

function ScrollPillTech({
  progress,
  range,
  shouldReduceMotion,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  shouldReduceMotion: boolean;
}) {
  const opacity = useTransform(progress, range, shouldReduceMotion ? [1, 1] : [0, 1]);
  const scale = useTransform(progress, range, shouldReduceMotion ? [1, 1] : [0.78, 1]);
  const y = useTransform(progress, range, shouldReduceMotion ? [-2, -2] : [14, -2]);

  return (
    <motion.span
      style={{ opacity, scale, y }}
      whileHover={{ scale: 1.08, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex items-center align-middle mx-1.5 sm:mx-2 px-1 py-0.5"
    >
      <span className="relative inline-block w-16 sm:w-24 md:w-28 h-8 sm:h-10 md:h-11 rounded-full overflow-hidden border border-orange-400/60 shadow-[0_0_20px_rgba(255,85,0,0.4)] bg-slate-900 group cursor-pointer">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80"
          alt="Modern aesthetic dental clinic technology"
          fill
          sizes="(max-width: 640px) 4rem, (max-width: 768px) 6rem, 7rem"
          className="object-cover object-center brightness-110 contrast-105 group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30 pointer-events-none" />
        <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-blue-500/20 pointer-events-none" />
      </span>
    </motion.span>
  );
}

function ScrollPillSmile({
  progress,
  range,
  shouldReduceMotion,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  shouldReduceMotion: boolean;
}) {
  const opacity = useTransform(progress, range, shouldReduceMotion ? [1, 1] : [0, 1]);
  const scale = useTransform(progress, range, shouldReduceMotion ? [1, 1] : [0.78, 1]);
  const y = useTransform(progress, range, shouldReduceMotion ? [-2, -2] : [14, -2]);

  return (
    <motion.span
      style={{ opacity, scale, y }}
      whileHover={{ scale: 1.08, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex items-center align-middle mx-1.5 sm:mx-2 px-1 py-0.5"
    >
      <span className="relative inline-block w-16 sm:w-24 md:w-28 h-8 sm:h-10 md:h-11 rounded-full overflow-hidden border border-orange-400/60 shadow-[0_0_20px_rgba(255,85,0,0.4)] bg-slate-900 group cursor-pointer">
        <Image
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80"
          alt="Aesthetic precision smile care"
          fill
          sizes="(max-width: 640px) 4rem, (max-width: 768px) 6rem, 7rem"
          className="object-cover object-center brightness-105 contrast-100 group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30 pointer-events-none" />
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-orange-500/20 pointer-events-none" />
      </span>
    </motion.span>
  );
}

function ScrollSubtitleWord({
  word,
  progress,
  range,
  shouldReduceMotion,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  shouldReduceMotion: boolean;
}) {
  const opacity = useTransform(progress, range, shouldReduceMotion ? [1, 1] : [0, 1]);
  const y = useTransform(progress, range, shouldReduceMotion ? [0, 0] : [10, 0]);
  const blurVal = useTransform(progress, range, shouldReduceMotion ? [0, 0] : [3, 0]);
  const filter = useTransform(blurVal, (b) => (b <= 0.05 ? "none" : `blur(${b.toFixed(1)}px)`));

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className="inline-block whitespace-nowrap mr-[0.24em] will-change-[transform,opacity,filter]"
    >
      {word}
    </motion.span>
  );
}

/* -------------------------------------------------------------
 * Main StudioSection Component
 * ------------------------------------------------------------*/

export function StudioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = !!useReducedMotion();

  // Internal animated progress value that drives all typography tokens
  const effectiveProgress = useMotionValue(0);
  const animationRef = useRef<{ stop: () => void } | null>(null);
  const lastScrollYRef = useRef(0);
  const isPlayingInAnimationRef = useRef(false);

  // Monitor scroll for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const { scrollY } = useScroll();

  const headlineTokens = useMemo(() => buildHeadlineTokens(HEADLINE_SEGMENTS), []);
  const subtitleWords = useMemo(() => SUBTITLE_TEXT.split(" "), []);

  // Compute token animation windows within progress [0, 1]
  const headlineRanges = useMemo(() => {
    const total = headlineTokens.length;
    const startProgress = 0.08;
    const endProgress = 0.82;
    const step = (endProgress - startProgress) / Math.max(1, total - 1);

    return headlineTokens.map((_, i) => {
      const start = Math.max(0, startProgress + i * step - 0.03);
      const end = Math.min(1.0, start + 0.18);
      return [start, end] as [number, number];
    });
  }, [headlineTokens]);

  const subtitleRanges = useMemo(() => {
    const total = subtitleWords.length;
    const startProgress = 0.70;
    const endProgress = 0.98;
    const step = (endProgress - startProgress) / Math.max(1, total - 1);

    return subtitleWords.map((_, i) => {
      const start = startProgress + i * step;
      const end = Math.min(1.0, start + 0.12);
      return [start, end] as [number, number];
    });
  }, [subtitleWords]);

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
    } else if (initialProgress >= 0.15) {
      isPlayingInAnimationRef.current = true;
      animationRef.current = animate(effectiveProgress, 1, {
        duration: 0.95,
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
  // - Downwards: triggers automated typography entrance with ease-in effect (not scroll-scrubbed)
  // - Upwards: fades out in reverse tied directly to scroll position (scroll-based out animation)
  useMotionValueEvent(scrollY, "change", (latestScrollY) => {
    if (shouldReduceMotion) return;

    const delta = latestScrollY - lastScrollYRef.current;
    lastScrollYRef.current = latestScrollY;
    const currentProgress = scrollYProgress.get();

    // UPWARD SCROLL: Out-animation is scroll based
    if (delta < -0.5) {
      // If we are moving back upwards towards the top of the page
      if (currentProgress < 0.90) {
        if (animationRef.current) {
          animationRef.current.stop();
          animationRef.current = null;
          isPlayingInAnimationRef.current = false;
        }

        // Map scrollYProgress directly to effective progress (0.10 -> 0.85 maps to 0 -> 1)
        const scrollFraction = Math.min(1, Math.max(0, (currentProgress - 0.10) / 0.75));
        const currentVal = effectiveProgress.get();
        effectiveProgress.set(Math.min(currentVal, scrollFraction));
      }
    }
    // DOWNWARD SCROLL: In-animation triggers with smooth ease-in effect (automated, not scroll scrubbed)
    else if (delta > 0.5) {
      if (
        currentProgress >= 0.10 &&
        !isPlayingInAnimationRef.current &&
        effectiveProgress.get() < 0.99
      ) {
        isPlayingInAnimationRef.current = true;
        const remaining = 1 - effectiveProgress.get();

        animationRef.current = animate(effectiveProgress, 1, {
          duration: Math.max(0.35, remaining * 0.95),
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
    <section
      ref={containerRef}
      id="about"
      className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-2 sm:pb-4 relative z-10 font-sans scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Top Eyebrow Tag */}
      <ScrollBadge progress={effectiveProgress} shouldReduceMotion={shouldReduceMotion} />

      {/* Main Big Headline with Inline Aesthetic Imagery Pills */}
      <div className="max-w-6xl mx-auto text-center relative mb-5 sm:mb-6">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-bold tracking-tight leading-[1.28] sm:leading-[1.23] text-left sm:text-center select-none">
          {/* Star Icon Badge */}
          <ScrollStar progress={effectiveProgress} shouldReduceMotion={shouldReduceMotion} />

          {/* Sequential Word & Pill Tokens */}
          {headlineTokens.map((token, i) => {
            const range = headlineRanges[i];

            if (token.type === "word") {
              return (
                <ScrollWord
                  key={token.id}
                  word={token.word}
                  className={token.className}
                  progress={effectiveProgress}
                  range={range}
                  shouldReduceMotion={shouldReduceMotion}
                />
              );
            }

            if (token.type === "pill-tech") {
              return (
                <ScrollPillTech
                  key={token.id}
                  progress={effectiveProgress}
                  range={range}
                  shouldReduceMotion={shouldReduceMotion}
                />
              );
            }

            if (token.type === "pill-smile") {
              return (
                <ScrollPillSmile
                  key={token.id}
                  progress={effectiveProgress}
                  range={range}
                  shouldReduceMotion={shouldReduceMotion}
                />
              );
            }

            return null;
          })}
        </h2>

        {/* Small descriptive caption underneath */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed tracking-normal font-normal select-none">
          {subtitleWords.map((word, i) => (
            <ScrollSubtitleWord
              key={`sub-${i}-${word}`}
              word={word}
              progress={effectiveProgress}
              range={subtitleRanges[i]}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
