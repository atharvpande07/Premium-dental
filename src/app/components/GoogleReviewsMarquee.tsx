"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { clinicData } from "../data/clinicData";

interface SpatialReview {
  id: string;
  name: string;
  avatarColor: string;
  initial: string;
  treatment: string;
  rating: number;
  timeAgo: string;
  reviewText: string;
  gridArea: string; // e.g. "2 / 2 / 4 / 4" or "1/1", etc.
  range: [number, number]; // [startProgress, endProgress]
  isBackgroundInitial?: boolean; // True for the 2-3 cards already visible behind Centerpiece at start
  initialX?: number; // Initial X offset in px
  initialY?: number; // Initial Y offset in px
  initialRotate?: number; // Initial rotation angle in deg
  initialZ?: number; // Depth (e.g. -420)
  initialOpacity?: number; // Opacity at start (e.g. 0.85)
  initialBlur?: number; // Blur at start (e.g. 2.0)
}

const SPATIAL_REVIEWS: SpatialReview[] = [
  // -------------------------------------------------------------
  // INITIAL BACKGROUND CARDS: 3 cards already visible behind Centerpiece at start (progress = 0)
  // -------------------------------------------------------------
  {
    id: "rev-bg-1",
    name: "Sunanda Kadam",
    avatarColor: "bg-[#1a73e8]",
    initial: "S",
    treatment: "Root Canal & Zirconia Crown",
    rating: 5,
    timeAgo: "3 weeks ago",
    reviewText:
      "Doctor was so gentle and polite! Root canal treatment bilkul pain-free tha. Clinic is extremely clean and modern. Best dental clinic experience ever!",
    gridArea: "2 / 2 / 4 / 4",
    range: [0, 0.26],
    isBackgroundInitial: true,
    initialX: -330,
    initialY: -110,
    initialRotate: -6,
    initialZ: -400,
    initialOpacity: 0.92,
    initialBlur: 1.5,
  },
  {
    id: "rev-bg-2",
    name: "Rajesh Kulkarni",
    avatarColor: "bg-[#d93025]",
    initial: "R",
    treatment: "Painless Extraction & Capping",
    rating: 5,
    timeAgo: "a month ago",
    reviewText:
      "Extremely good experience. Daat nikaalne aur capping mein bilkul dard nahi hua. The entire team takes care of you like family. 10/10 service!",
    gridArea: "2 / 2 / 4 / 4",
    range: [0, 0.30],
    isBackgroundInitial: true,
    initialX: 330,
    initialY: -110,
    initialRotate: 6,
    initialZ: -440,
    initialOpacity: 0.90,
    initialBlur: 1.8,
  },
  {
    id: "rev-bg-3",
    name: "Anand Gokhale",
    avatarColor: "bg-[#188038]",
    initial: "A",
    treatment: "Digital 3D Dental Implant",
    rating: 5,
    timeAgo: "2 weeks ago",
    reviewText:
      "Superb digital 3D scanning technology! Explained every single step patiently before doing my dental implant. Bilkul tension-free treatment.",
    gridArea: "2 / 2 / 4 / 4",
    range: [0, 0.34],
    isBackgroundInitial: true,
    initialX: 0,
    initialY: 205,
    initialRotate: -1,
    initialZ: -340,
    initialOpacity: 0.92,
    initialBlur: 1.2,
  },

  // -------------------------------------------------------------
  // PERIPHERAL SWARM: Sequential Zooming Waves (0.12 - 1.00)
  // -------------------------------------------------------------
  {
    id: "rev-4",
    name: "Sachin Shinde",
    avatarColor: "bg-[#e37400]",
    initial: "S",
    treatment: "Invisalign Clear Aligners",
    rating: 5,
    timeAgo: "a week ago",
    reviewText:
      "Best dental clinic for teeth cleaning and braces! Doctor is very friendly and treatment painless tha. My smile looks so much brighter now.",
    gridArea: "3/4",
    range: [0.12, 0.32],
  },
  {
    id: "rev-5",
    name: "Vikas More",
    avatarColor: "bg-[#9334e6]",
    initial: "V",
    treatment: "Biomimetic Smile Design",
    rating: 5,
    timeAgo: "5 days ago",
    reviewText:
      "Very satisfying experience! Filling and smile designing was totally painless. Modern equipment aur clinic ka hygiene top-notch hai.",
    gridArea: "1/4",
    range: [0.16, 0.36],
  },
  {
    id: "rev-6",
    name: "Milind Jadhav",
    avatarColor: "bg-[#129eaf]",
    initial: "M",
    treatment: "Instant Pain Relief & Crown",
    rating: 5,
    timeAgo: "2 months ago",
    reviewText:
      "Top-notch treatment standard. Spotless hygiene and advanced machines. Daat ke dard se instant relief mil gaya. Highly recommended for all families.",
    gridArea: "4/1",
    range: [0.20, 0.40],
  },
  {
    id: "rev-7",
    name: "Kavita Gaikwad",
    avatarColor: "bg-[#c2185b]",
    initial: "K",
    treatment: "Precision Preventive Care",
    rating: 5,
    timeAgo: "3 weeks ago",
    reviewText:
      "Prompt relief and very accurate diagnosis. Staff is courteous and polite. Zero pain during treatment. Truly appreciate the doctor's patience!",
    gridArea: "1/3",
    range: [0.24, 0.44],
  },
  {
    id: "rev-8",
    name: "Pallavi Bapat",
    avatarColor: "bg-[#059669]",
    initial: "P",
    treatment: "Orthodontic Realignment",
    rating: 5,
    timeAgo: "4 days ago",
    reviewText:
      "Invisalign journey was so smooth! No cuts or metal discomfort. Seeing my straight teeth in just 6 months was like magic.",
    gridArea: "3/1",
    range: [0.28, 0.48],
  },
  {
    id: "rev-9",
    name: "Rohan Sawant",
    avatarColor: "bg-[#2563eb]",
    initial: "R",
    treatment: "Wisdom Tooth Surgery",
    rating: 5,
    timeAgo: "1 week ago",
    reviewText:
      "Had an impacted wisdom tooth that was throbbing with pain. Dr. Amol removed it in 15 minutes flat with zero after-swelling.",
    gridArea: "2/4",
    range: [0.32, 0.52],
  },
  {
    id: "rev-10",
    name: "Sneha Deshmukh",
    avatarColor: "bg-[#db2777]",
    initial: "S",
    treatment: "Pediatric Gentle Visit",
    rating: 5,
    timeAgo: "2 weeks ago",
    reviewText:
      "Brought my 7-year-old daughter for her first dental checkup. She loved the soft music and friendly team. No crying at all!",
    gridArea: "4/2",
    range: [0.36, 0.56],
  },
  {
    id: "rev-11",
    name: "Arun Ghodke",
    avatarColor: "bg-[#d97706]",
    initial: "A",
    treatment: "Same-Day Zirconia Bridge",
    rating: 5,
    timeAgo: "1 month ago",
    reviewText:
      "3D computer scanning matched my natural tooth shade perfectly. Walked out with my permanent crown in a single visit.",
    gridArea: "1/1",
    range: [0.40, 0.60],
  },
  {
    id: "rev-12",
    name: "Sunita Wagh",
    avatarColor: "bg-[#7c3aed]",
    initial: "S",
    treatment: "Full Mouth Rehabilitation",
    rating: 5,
    timeAgo: "3 weeks ago",
    reviewText:
      "Finally able to chew my favorite food without pain. The meticulous planning and care by the entire clinic gave me a new life.",
    gridArea: "4/4",
    range: [0.44, 0.64],
  },
  {
    id: "rev-13",
    name: "Kiran Salunkhe",
    avatarColor: "bg-[#0284c7]",
    initial: "K",
    treatment: "Laser Teeth Whitening",
    rating: 5,
    timeAgo: "6 days ago",
    reviewText:
      "Did teeth whitening before my wedding reception. 4 shades brighter in one 40-minute appointment with zero sensitivity!",
    gridArea: "2/1",
    range: [0.48, 0.68],
  },
  {
    id: "rev-14",
    name: "Rupali Thorat",
    avatarColor: "bg-[#e11d48]",
    initial: "R",
    treatment: "Sterilization & Deep Cleaning",
    rating: 5,
    timeAgo: "2 weeks ago",
    reviewText:
      "Highest hospital-grade sterilization protocols. Autoclaved packs opened right before your eyes. Cleanest dental studio ever.",
    gridArea: "1/2",
    range: [0.52, 0.72],
  },
  {
    id: "rev-15",
    name: "Ajay Chavan",
    avatarColor: "bg-[#4f46e5]",
    initial: "A",
    treatment: "Biomimetic Composite Bonding",
    rating: 5,
    timeAgo: "5 days ago",
    reviewText:
      "Chipped my front tooth playing football. The artistic tooth restoration was so flawless that even I can't spot the repair line.",
    gridArea: "3/4",
    range: [0.56, 0.76],
  },
  {
    id: "rev-16",
    name: "Pooja Mohite",
    avatarColor: "bg-[#0d9488]",
    initial: "P",
    treatment: "Porcelain Veneers Makeover",
    rating: 5,
    timeAgo: "1 month ago",
    reviewText:
      "Custom porcelain veneers look 100% natural, not fake white chiclets. I receive compliments every single day at work!",
    gridArea: "4/3",
    range: [0.60, 0.80],
  },
  {
    id: "rev-17",
    name: "Deepak Joshi",
    avatarColor: "bg-[#65a30d]",
    initial: "D",
    treatment: "Sinus Lift & Implant",
    rating: 5,
    timeAgo: "3 weeks ago",
    reviewText:
      "Complex bone graft and implant handled with complete surgical mastery. Recovery was rapid and completely manageable.",
    gridArea: "1/4",
    range: [0.64, 0.84],
  },
  {
    id: "rev-18",
    name: "Anjali Tambe",
    avatarColor: "bg-[#9333ea]",
    initial: "A",
    treatment: "TMJ Therapy & Nightguard",
    rating: 5,
    timeAgo: "2 weeks ago",
    reviewText:
      "Severe morning jaw clenching and headaches cured with custom digital 3D splint. Sleeping peacefully after 3 long years.",
    gridArea: "3/1",
    range: [0.68, 0.88],
  },
  {
    id: "rev-19",
    name: "Sameer Phadke",
    avatarColor: "bg-[#ea580c]",
    initial: "S",
    treatment: "Airflow Stain Polish",
    rating: 5,
    timeAgo: "4 days ago",
    reviewText:
      "Gentle warm-water airflow cleaning removed all stubborn coffee and tea stains comfortably without scraping metal sounds.",
    gridArea: "2/4",
    range: [0.72, 0.92],
  },
  {
    id: "rev-20",
    name: "Shalini Raut",
    avatarColor: "bg-[#0891b2]",
    initial: "S",
    treatment: "Laser Gum Contouring",
    rating: 5,
    timeAgo: "1 week ago",
    reviewText:
      "Corrected my gummy smile with quick diode laser. Zero bleeding, zero stitches, and healed in 48 hours. Phenomenal result!",
    gridArea: "4/1",
    range: [0.76, 0.94],
  },
  {
    id: "rev-21",
    name: "Neha Bhise",
    avatarColor: "bg-[#d97706]",
    initial: "N",
    treatment: "Clear Aligner Therapy",
    rating: 5,
    timeAgo: "5 days ago",
    reviewText:
      "Braces without anyone noticing! The aligners are feather-light and the clinic made my entire transformation effortlessly smooth.",
    gridArea: "1/3",
    range: [0.80, 0.96],
  },
  {
    id: "rev-22",
    name: "Devendra Patil",
    avatarColor: "bg-[#2563eb]",
    initial: "D",
    treatment: "Emergency Pain Relief",
    rating: 5,
    timeAgo: "1 week ago",
    reviewText:
      "Woke up on a Sunday with severe toothache. Called the clinic emergency line and was seated in the chair within 40 minutes. Lifesavers!",
    gridArea: "4/2",
    range: [0.84, 0.98],
  },
  {
    id: "rev-23",
    name: "Tanvi Sutar",
    avatarColor: "bg-[#c2185b]",
    initial: "T",
    treatment: "Custom Dental Veneers",
    rating: 5,
    timeAgo: "2 weeks ago",
    reviewText:
      "Gave me the exact natural smile I always dreamed of. No artificial chalky look, just pure radiance and glowing self-confidence.",
    gridArea: "1/1",
    range: [0.88, 0.99],
  },
  {
    id: "rev-24",
    name: "Manisha Joshi",
    avatarColor: "bg-[#059669]",
    initial: "M",
    treatment: "Preventive Care & Cleaning",
    rating: 5,
    timeAgo: "3 days ago",
    reviewText:
      "Best dental cleaning experience. Zero discomfort and no gum sensitivity. Highly professional, attentive, and gentle care.",
    gridArea: "4/4",
    range: [0.92, 1.00],
  },
];

/* -------------------------------------------------------------
 * 3D Spatial Zoom Card Component
 * Keyframe spec:
 * 0%   -> translateZ(-1000px), opacity: 0, filter: blur(5px)
 * 50%  -> translateZ(0px),      opacity: 1, filter: blur(0px)
 * 100% -> translateZ(1000px),  opacity: 0, filter: blur(5px)
 * ------------------------------------------------------------*/
function SpatialReviewCard({
  review,
  progress,
  shouldReduceMotion,
  isMobile,
}: {
  review: SpatialReview;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean;
  isMobile: boolean;
}) {
  const isBg = !!review.isBackgroundInitial;
  const [start, end] = review.range;
  const mid = isBg ? end * 0.48 : (start + end) / 2;

  const initX = review.initialX ?? 0;
  const initY = review.initialY ?? 0;
  const initRotate = review.initialRotate ?? 0;
  const initZ = review.initialZ ?? -450;
  const initOpacity = review.initialOpacity ?? 0.85;
  const initBlur = review.initialBlur ?? 2.2;

  // Adapt initial offsets on mobile so background cards frame the centerpiece neatly without going offscreen
  const effectiveInitX = isMobile ? initX * 0.4 : initX;
  const effectiveInitY = isMobile ? (initY > 0 ? 150 : -125) : initY;
  const effectiveInitZ = isMobile ? Math.max(initZ, -360) : initZ;

  // Inward nudge for columns 1 and 4 on mobile to prevent edge clipping
  let mobileXOffset = 0;
  if (isMobile && !isBg) {
    if (review.gridArea.endsWith("/1") || review.gridArea.startsWith("1/1") || review.gridArea.includes("/1")) {
      mobileXOffset = 24;
    } else if (review.gridArea.endsWith("/4") || review.gridArea.includes("/4")) {
      mobileXOffset = -24;
    }
  }

  // 3D Depth Travel:
  // Desktop: [-850, 0, 600] for regular, [effectiveInitZ, 0, 600] for background
  // Mobile:  [-550, 0, 380] for regular, [effectiveInitZ, 0, 380] for background
  // Note: Capping foreground travel at +380px to +600px ensures cards zoom past the camera cleanly
  // without triggering division-by-zero projection spikes or GPU buffer thrashing!
  const z = useTransform(
    progress,
    isBg ? [0, mid, end] : [start, mid, end],
    shouldReduceMotion
      ? [0, 0, 0]
      : isBg
      ? [effectiveInitZ, 0, isMobile ? 380 : 600]
      : [isMobile ? -550 : -850, 0, isMobile ? 380 : 600],
    { clamp: true }
  );

  // X offset: background cards fan out slightly as they zoom past
  const x = useTransform(
    progress,
    isBg ? [0, mid, end] : [start, mid, end],
    isBg
      ? [effectiveInitX, effectiveInitX * 1.12, effectiveInitX * 1.25]
      : [mobileXOffset, mobileXOffset, mobileXOffset],
    { clamp: true }
  );

  // Y offset
  const y = useTransform(
    progress,
    isBg ? [0, mid, end] : [start, mid, end],
    isBg
      ? [effectiveInitY, effectiveInitY * 1.12, effectiveInitY * 1.25]
      : [0, 0, 0],
    { clamp: true }
  );

  // Rotation
  const rotate = useTransform(
    progress,
    isBg ? [0, mid, end] : [start, mid, end],
    isBg ? [initRotate, initRotate * 0.5, 0] : [0, 0, 0],
    { clamp: true }
  );

  // Smooth Opacity Envelope:
  // Background cards: already visible at start (initOpacity e.g. 0.88) -> 1.0 -> 0.0
  // Regular cards: 0.0 -> 1.0 -> 0.0
  const opacity = useTransform(
    progress,
    isBg ? [0, mid, end] : [start, mid, end],
    isBg ? [initOpacity, 1, 0] : [0, 1, 0],
    { clamp: true }
  );

  // Perspective Scale
  const scale = useTransform(
    progress,
    isBg ? [0, mid, end] : [start, mid, end],
    shouldReduceMotion
      ? [1, 1, 1]
      : isBg
      ? [0.85, 1, 1.2]
      : [isMobile ? 0.78 : 0.72, 1, isMobile ? 1.18 : 1.25],
    { clamp: true }
  );

  // Visibility culling: CRITICAL for silky-smooth mobile performance
  // Cards outside their active scroll range are set to visibility: hidden,
  // relieving the GPU compositor from having to track 24 complex 3D layers simultaneously.
  const visibility = useTransform(progress, (p) => {
    if (isBg) {
      return p <= end + 0.03 ? "visible" : "hidden";
    }
    return p >= start - 0.03 && p <= end + 0.03 ? "visible" : "hidden";
  });

  // Dynamic Depth Blur (Desktop only - mobile skips expensive CSS blur filter for locked 60/120fps)
  const blurVal = useTransform(
    progress,
    isBg ? [0, mid, end] : [start, mid, end],
    shouldReduceMotion || isMobile ? [0, 0, 0] : isBg ? [initBlur, 0, 5] : [5, 0, 5],
    { clamp: true }
  );

  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, ${z}px) rotate(${rotate}deg) scale(${scale})`;
  const dynamicFilter = useMotionTemplate`blur(${blurVal}px)`;

  return (
    <motion.div
      style={{
        gridArea: review.gridArea,
        transform,
        opacity,
        visibility,
        filter: isMobile ? "none" : dynamicFilter,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
      className={`flex items-center justify-center p-2 sm:p-3 pointer-events-none select-none touch-pan-y ${
        isBg ? "z-10" : "z-20"
      }`}
    >
      <div className="w-[245px] xs:w-[275px] sm:w-[315px] md:w-[335px] max-w-[86vw] rounded-2xl bg-white/98 sm:bg-white/95 md:backdrop-blur-xl border border-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.08),0_2px_6px_rgba(0,0,0,0.04)] p-3 xs:p-3.5 sm:p-4 flex flex-col justify-between transition-transform duration-200 pointer-events-auto">
        {/* Card Header: Avatar, Name, Rating, Google Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={`w-6 h-6 xs:w-7 xs:h-7 rounded-full ${review.avatarColor} text-white font-bold text-[11px] xs:text-xs flex items-center justify-center shadow-xs shrink-0`}
            >
              {review.initial}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11.5px] xs:text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                  {review.name}
                </span>
                <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-0.5 text-[#fbbc04] shrink-0">
            {[...Array(review.rating)].map((_, i) => (
              <svg key={i} className="w-3 h-3 xs:w-3.5 xs:h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Card Body: Quote Text */}
        <p className="text-slate-700 text-[11px] xs:text-xs sm:text-[12.5px] leading-relaxed font-normal line-clamp-3 italic">
          &ldquo;{review.reviewText}&rdquo;
        </p>

        {/* Card Footer: Verified Google Patient Badge */}
        <div className="mt-2 xs:mt-2.5 pt-1.5 xs:pt-2 border-t border-slate-100 flex items-center justify-between text-[9.5px] xs:text-[10px] text-slate-400">
          <span className="flex items-center gap-1 font-medium text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Verified Patient
          </span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="font-semibold text-slate-600">Google Review</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------
 * Main GoogleReviewsSpatialZoom Component
 * Placed between BentoGridSection and TreatmentsGridSection
 * ------------------------------------------------------------*/
export default function GoogleReviewsSpatialZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = !!useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Bind scroll progress directly to this sticky scroll track (360vh duration)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="relative w-full h-[360vh] font-sans select-none"
      aria-label="Real Patient Reviews 3D Spatial Showcase"
    >
      {/* Sticky Fullscreen 3D Spatial Chamber */}
      <div
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        className="sticky top-0 w-full h-screen min-h-[100dvh] overflow-hidden flex items-center justify-center pointer-events-auto"
      >
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vh] rounded-full bg-gradient-to-tr from-purple-100/40 via-pink-100/30 to-amber-50/30 blur-3xl pointer-events-none" />
        </div>

        {/* 4x4 3D SPATIAL GRID matching .stuck-grid demo spec */}
        <div
          style={{
            transformStyle: "preserve-3d",
            display: "grid",
            gridTemplateRows: "repeat(4, 25vh)",
            gridTemplateColumns: "repeat(4, 25vw)",
            placeItems: "center",
          }}
          className="w-full h-full relative"
        >
          {/* CENTERPIECE: Real Patient reviews (occupies row 2-3, col 2-3, floats in front at z=30px) */}
          <div
            style={{
              gridRow: "2 / span 2",
              gridColumn: isMobile ? "1 / span 4" : "2 / span 2",
              transformStyle: "preserve-3d",
              transform: "translate3d(0, 0, 30px)",
            }}
            className="z-30 flex flex-col items-center justify-center text-center p-3 sm:p-6 pointer-events-auto select-none relative max-w-[92vw] sm:max-w-none mx-auto"
          >
            {/* Luminous Ambient Halo so text is crystal clear while allowing background cards to show */}
            <div className="absolute inset-0 -inset-x-6 sm:-inset-x-8 rounded-full bg-radial from-white/85 via-white/55 to-transparent blur-xl pointer-events-none -z-10" />

            {/* Google 4.9 Rating Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] mb-2.5 sm:mb-4">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
              <div className="flex items-center gap-0.5 text-[#fbbc04]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase font-sans">
                {clinicData.reputation.rating.toFixed(1)} ★ • Verified Google Reviews
              </span>
            </div>

            {/* Main Headline: Real Patient Reviews */}
            <h2 className="tracking-tight text-[#09111e] flex flex-col items-center">
              <span className="font-great-vibes text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-slate-800 capitalize tracking-normal leading-none">
                Real Patient
              </span>
              <span className="-mt-1.5 sm:-mt-4 md:-mt-5 lg:-mt-6 font-anek-latin text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-black uppercase tracking-tight leading-none bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
                Reviews
              </span>
            </h2>

            {/* Sub-caption */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 max-w-xs sm:max-w-md mx-auto font-normal leading-relaxed">
              Authentic experiences from patients who found gentle care, clarity, and renewed smile confidence.
            </p>
          </div>

          {/* SURROUNDING SPATIAL REVIEW CARDS (Initial 3 cards in background + peripheral waves) */}
          {SPATIAL_REVIEWS.map((review) => (
            <SpatialReviewCard
              key={review.id}
              review={review}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Backwards-compatible export alias for previous references
export { GoogleReviewsSpatialZoom as GoogleReviewsMarquee };
