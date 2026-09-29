"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface TreatmentItem {
  id: string;
  title: string;
  displayTitle: string;
  tags: string[];
  headline: string;
  typographyDesign: {
    scriptWordIndex: number; // which word contains the cursive script letter
    scriptChar: string;      // different letter for each card (S, R, M, O, P, A, L)
    starWordIndex: number;   // which word has the sparkle star
    starChar: string;        // letter that gets the floating 4-point star
  };
  image: string;
  imageAlt: string;
  description: string;
  duration: string;
  benefits: string[];
}

const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry.",
    displayTitle: "Cosmetic\nDentistry.",
    tags: ["AESTHETICS", "VENEERS"],
    headline: "Architectural Smile Design",
    typographyDesign: {
      scriptWordIndex: 1, // "Smile"
      scriptChar: "S",    // Calligraphic cursive 'S'
      starWordIndex: 2,   // "Design"
      starChar: "I",      // Sparkle star on 'I'
    },
    image: "/treatment-cosmetic.jpg",
    imageAlt: "Cosmetic dentistry porcelain veneer treatment",
    description:
      "Hand-layered porcelain veneers, aesthetic contouring, and bespoke smile design engineered to complement your unique facial architecture and lip line dynamics.",
    duration: "2 - 3 Visits",
    benefits: [
      "Ultra-thin ceramic veneers with conservative tooth preparation",
      "Digital 3D preview of your smile before treatment begins",
      "Lifelike translucency and natural light reflection",
    ],
  },
  {
    id: "dental-implants",
    title: "Dental Implants.",
    displayTitle: "Dental\nImplants.",
    tags: ["RESTORATIVE", "SURGICAL"],
    headline: "Permanent Structural Restoration",
    typographyDesign: {
      scriptWordIndex: 2, // "Restoration"
      scriptChar: "R",    // Calligraphic cursive 'R'
      starWordIndex: 1,   // "Structural"
      starChar: "T",      // Sparkle star on 'T'
    },
    image: "/treatment-implants.jpg",
    imageAlt: "Modern titanium dental implant with ceramic porcelain crown",
    description:
      "Medical-grade titanium and zirconia implants that restore tooth roots with permanent, natural-feeling stability and full bite power.",
    duration: "Single Tooth to Full Arch",
    benefits: [
      "3D CBCT computer-guided surgical precision",
      "Preserves adjacent healthy teeth and jawbone volume",
      "Lifelong biocompatibility with custom-milled zirconia crowns",
    ],
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening.",
    displayTitle: "Teeth\nWhitening.",
    tags: ["FAST AESTHETICS", "CARE"],
    headline: "Medical-Grade Luminosity",
    typographyDesign: {
      scriptWordIndex: 0, // "Medical-Grade"
      scriptChar: "M",    // Calligraphic cursive 'M'
      starWordIndex: 1,   // "Luminosity"
      starChar: "I",      // Sparkle star on 'I'
    },
    image: "/treatment-whitening.jpg",
    imageAlt: "Professional tooth whitening in modern dental studio",
    description:
      "Gentle in-office light-activated whitening that safely lifts deep stains by up to 8 shades in a single comfortable hour.",
    duration: "60 Minutes",
    benefits: [
      "Anti-sensitivity formulation with desensitizing agents",
      "Custom take-home touch-up trays included",
      "Safe for enamel with zero gum irritation",
    ],
  },
  {
    id: "invisalign-aligners",
    title: "Invisalign & Aligners.",
    displayTitle: "Invisalign &\nAligners.",
    tags: ["ORTHODONTICS", "CLEAR"],
    headline: "Discreet Orthodontic Realignment",
    typographyDesign: {
      scriptWordIndex: 1, // "Orthodontic"
      scriptChar: "O",    // Calligraphic cursive 'O'
      starWordIndex: 0,   // "Discreet"
      starChar: "T",      // Sparkle star on 'T'
    },
    image: "/treatment-invisalign.jpg",
    imageAlt: "Clear transparent orthodontic aligner tray",
    description:
      "Nearly invisible custom-scanned aligners that discreetly straighten your teeth without brackets, wires, or dietary restrictions.",
    duration: "6 - 18 Months",
    benefits: [
      "100% goop-free 60-second optical scan mapping",
      "Removable for effortless eating, brushing, and flossing",
      "Gentle, calibrated micro-movements for minimal discomfort",
    ],
  },
  {
    id: "root-canal-therapy",
    title: "Root Canal Therapy.",
    displayTitle: "Root Canal\nTherapy.",
    tags: ["ENDODONTICS", "RELIEF"],
    headline: "Pain-Free Tooth Preservation",
    typographyDesign: {
      scriptWordIndex: 2, // "Preservation"
      scriptChar: "P",    // Calligraphic cursive 'P'
      starWordIndex: 1,   // "Tooth"
      starChar: "T",      // Sparkle star on 'T'
    },
    image: "/treatment-rootcanal.jpg",
    imageAlt: "Microscopic endodontic dental therapy",
    description:
      "Comfort-focused microscopic therapy that relieves tooth pain immediately while saving your natural tooth structure for life.",
    duration: "Single Visit (60 - 90 min)",
    benefits: [
      "High-magnification surgical microscope for thorough cleaning",
      "Acoustic soothing suites with signal-to-pause anytime",
      "Hermetic biocompatible seal with ceramic crown protection",
    ],
  },
  {
    id: "oral-surgery",
    title: "Oral Surgery.",
    displayTitle: "Oral\nSurgery.",
    tags: ["SOLUTIONS", "SPECIALIST"],
    headline: "advanced Surgical Procedures",
    typographyDesign: {
      scriptWordIndex: 0, // "Advanced"
      scriptChar: "A",    // Calligraphic cursive 'A'
      starWordIndex: 1,   // "Surgical"
      starChar: "I",      // Sparkle star on 'I'
    },
    image: "/treatment-surgery.jpg",
    imageAlt: "Oral surgery operatory with modern surgical instruments",
    description:
      "Minimally invasive wisdom teeth removal, bone regeneration, and pre-implant surgical treatments performed with gentle sedation options.",
    duration: "Outpatient Care",
    benefits: [
      "Relaxing twilight sedation for anxiety-free procedures",
      "Micro-incisions for faster healing and minimal downtime",
      "Dedicated postoperative recovery guidance and check-ins",
    ],
  },
  {
    id: "preventive-checkups",
    title: "Preventive Checkups.",
    displayTitle: "Preventive\nCheckups.",
    tags: ["WELLNESS", "HYGIENE"],
    headline: "Proactive Oral Longevity",
    typographyDesign: {
      scriptWordIndex: 2, // "Longevity"
      scriptChar: "L",    // Calligraphic cursive 'L'
      starWordIndex: 0,   // "Proactive"
      starChar: "T",      // Sparkle star on 'T'
    },
    image: "/treatment-preventive.jpg",
    imageAlt: "Comprehensive dental hygiene checkup and diagnostic screening",
    description:
      "Comprehensive ultra-low-radiation digital diagnostics, painless ultrasonic cleanings, and proactive oral health screenings.",
    duration: "Every 6 Months",
    benefits: [
      "Gentle piezo-ultrasonic tartar removal with zero scraping pain",
      "Digital intraoral camera review so you see what the dentist sees",
      "Zero-judgment, unhurried consultations at your own pace",
    ],
  },
];

// 4-point concave sparkle star matching the reference screenshot exactly
const PortraitSparkleStar = ({ className = "w-full h-full fill-current" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 1C12 7.07 7.07 12 1 12C7.07 12 12 16.93 12 23C12 16.93 16.93 12 23 12C16.48 12 12 7.07 12 1Z" />
  </svg>
);

// Renders the existing headline with custom cursive script letter and floating sparkle star
function renderStylizedHeadline(treatment: TreatmentItem) {
  const { typographyDesign, headline } = treatment;
  const words = headline.split(" ");

  return (
    <span className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.28em] gap-y-1 sm:gap-y-2">
      {words.map((word, wIdx) => {
        const isScriptWord = wIdx === typographyDesign.scriptWordIndex;
        const isStarWord = wIdx === typographyDesign.starWordIndex;

        let scriptRendered = false;
        let starRendered = false;

        return (
          <span key={wIdx} className="inline-flex items-baseline whitespace-nowrap">
            {word.split("").map((char, cIdx) => {
              const upperChar = char.toUpperCase();

              // Check if this character is the designated cursive script letter
              if (
                isScriptWord &&
                !scriptRendered &&
                upperChar === typographyDesign.scriptChar.toUpperCase()
              ) {
                scriptRendered = true;
                return (
                  <span
                    key={cIdx}
                    className="font-great-vibes text-[1.34em] font-normal leading-none inline-block -mx-[0.035em] transform translate-y-[0.04em] text-[#09111e] select-none"
                    style={{ fontFamily: 'var(--font-great-vibes), "Great Vibes", cursive' }}
                  >
                    {upperChar}
                  </span>
                );
              }

              // Check if this character gets the floating 4-point sparkle star
              if (
                isStarWord &&
                !starRendered &&
                upperChar === typographyDesign.starChar.toUpperCase()
              ) {
                starRendered = true;
                return (
                  <span key={cIdx} className="relative inline-block">
                    {upperChar}
                    <span
                      className="absolute -top-[0.34em] left-1/2 -translate-x-1/2 w-[0.42em] h-[0.42em] pointer-events-none text-[#09111e]"
                      aria-hidden="true"
                    >
                      <PortraitSparkleStar />
                    </span>
                  </span>
                );
              }

              return <span key={cIdx}>{upperChar}</span>;
            })}
          </span>
        );
      })}
    </span>
  );
}

export default function TreatmentsGridSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<TreatmentItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Drag & Swipe gesture tracking
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const total = TREATMENTS_DATA.length;
  const activeTreatment = TREATMENTS_DATA[activeIndex];

  // Listen for external treatment selection requests (e.g. from footer buttons)
  useEffect(() => {
    const handleOpenTreatment = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string; name?: string }>;
      const targetId = customEvent.detail?.id?.toLowerCase().trim();
      const targetName = customEvent.detail?.name?.toLowerCase().trim();

      const foundIndex = TREATMENTS_DATA.findIndex((item) => {
        const itemId = item.id.toLowerCase();
        const itemTitle = item.title.toLowerCase().replace(/\.$/, "");

        if (targetId && itemId === targetId) return true;
        if (targetId && (itemId.includes(targetId) || targetId.includes(itemId))) return true;
        if (targetName && (itemTitle.includes(targetName) || targetName.includes(itemTitle))) return true;

        // Specialized alias mappings
        if (
          targetId === "cosmetic-veneers" ||
          targetId === "veneers" ||
          targetId === "biomimetic-restorations" ||
          targetId === "biomimetic"
        ) {
          return itemId === "cosmetic-dentistry";
        }
        if (targetId === "laser-teeth-whitening" || targetId === "whitening") {
          return itemId === "teeth-whitening";
        }
        if (targetId === "pain-free-root-canal" || targetId === "root-canal") {
          return itemId === "root-canal-therapy";
        }
        if (targetId === "advanced-oral-surgery" || targetId === "surgery") {
          return itemId === "oral-surgery";
        }
        if (
          targetId === "digital-3d-dental-implants" ||
          targetId === "dental-implants" ||
          targetId === "implants"
        ) {
          return itemId === "dental-implants";
        }
        if (
          targetId === "invisalign-clear-aligners" ||
          targetId === "aligners" ||
          targetId === "invisalign"
        ) {
          return itemId === "invisalign-aligners";
        }
        if (
          targetId === "preventive-checkups" ||
          targetId === "checkups" ||
          targetId === "preventive"
        ) {
          return itemId === "preventive-checkups";
        }

        return false;
      });

      if (foundIndex !== -1) {
        // 1. Immediately rotate the 3D card carousel to the target treatment
        setActiveIndex(foundIndex);

        // 2. Smoothly scroll to the treatments section
        const section = document.getElementById("treatments");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // 3. Open that treatment's detail modal after slight transition delay
        setTimeout(() => {
          setActiveModal(TREATMENTS_DATA[foundIndex]);
        }, 350);
      }
    };

    window.addEventListener("open-treatment", handleOpenTreatment);
    return () => window.removeEventListener("open-treatment", handleOpenTreatment);
  }, []);

  // Screen size detection for mobile-optimized fan spread
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        prevCard();
      } else if (e.key === "ArrowRight") {
        nextCard();
      } else if (e.key === "Escape" && activeModal) {
        setActiveModal(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard, activeModal]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -40) {
      nextCard();
    } else if (dragOffset > 40) {
      prevCard();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -35) {
      nextCard();
    } else if (dragOffset > 35) {
      prevCard();
    }
    setDragOffset(0);
  };

  // Calculate 3D transformation style for each card
  const getCardStyle = (index: number): React.CSSProperties => {
    let diff = index - activeIndex;

    // Handle circular wrapping for shortest path
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return {
        transform: "translateX(0px) rotateZ(0deg) scale(1.0)",
        zIndex: 20,
        opacity: 1,
        filter: "drop-shadow(0 22px 32px rgba(0, 0, 0, 0.35))",
        cursor: "pointer",
        pointerEvents: "auto",
        transformOrigin: "50% 85%",
      };
    }

    if (isMobile) {
      // Mobile-optimized fan spread: cards fit cleanly within mobile screen without clipping
      if (diff === 1) {
        return {
          transform: "translateX(46%) rotateZ(6deg) scale(0.90)",
          zIndex: 10,
          opacity: 0.88,
          filter: "drop-shadow(0 12px 20px rgba(0, 0, 0, 0.2))",
          cursor: "pointer",
          pointerEvents: "auto",
          transformOrigin: "50% 85%",
        };
      } else if (diff === 2) {
        return {
          transform: "translateX(84%) rotateZ(11deg) scale(0.76)",
          zIndex: 5,
          opacity: 0.35,
          filter: "drop-shadow(0 8px 14px rgba(0, 0, 0, 0.15))",
          cursor: "pointer",
          pointerEvents: "auto",
          transformOrigin: "50% 85%",
        };
      } else if (diff === -1) {
        return {
          transform: "translateX(-46%) rotateZ(-6deg) scale(0.90)",
          zIndex: 10,
          opacity: 0.88,
          filter: "drop-shadow(0 12px 20px rgba(0, 0, 0, 0.2))",
          cursor: "pointer",
          pointerEvents: "auto",
          transformOrigin: "50% 85%",
        };
      } else if (diff === -2) {
        return {
          transform: "translateX(-84%) rotateZ(-11deg) scale(0.76)",
          zIndex: 5,
          opacity: 0.35,
          filter: "drop-shadow(0 8px 14px rgba(0, 0, 0, 0.15))",
          cursor: "pointer",
          pointerEvents: "auto",
          transformOrigin: "50% 85%",
        };
      } else {
        const sign = diff > 0 ? 1 : -1;
        return {
          transform: `translateX(${sign * 120}%) rotateZ(${sign * 15}deg) scale(0.6)`,
          zIndex: 1,
          opacity: 0,
          pointerEvents: "none",
          transformOrigin: "50% 85%",
        };
      }
    }

    // Tablet & Desktop spread: relaxed 52% and 98%
    if (diff === 1) {
      return {
        transform: "translateX(52%) rotateZ(7deg) scale(0.92)",
        zIndex: 10,
        opacity: 0.9,
        filter: "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.22))",
        cursor: "pointer",
        pointerEvents: "auto",
        transformOrigin: "50% 85%",
      };
    } else if (diff === 2) {
      return {
        transform: "translateX(98%) rotateZ(13deg) scale(0.82)",
        zIndex: 5,
        opacity: 0.55,
        filter: "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.16))",
        cursor: "pointer",
        pointerEvents: "auto",
        transformOrigin: "50% 85%",
      };
    } else if (diff === -1) {
      return {
        transform: "translateX(-52%) rotateZ(-7deg) scale(0.92)",
        zIndex: 10,
        opacity: 0.9,
        filter: "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.22))",
        cursor: "pointer",
        pointerEvents: "auto",
        transformOrigin: "50% 85%",
      };
    } else if (diff === -2) {
      return {
        transform: "translateX(-98%) rotateZ(-13deg) scale(0.82)",
        zIndex: 5,
        opacity: 0.55,
        filter: "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.16))",
        cursor: "pointer",
        pointerEvents: "auto",
        transformOrigin: "50% 85%",
      };
    } else {
      const sign = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${sign * 140}%) rotateZ(${sign * 18}deg) scale(0.7)`,
        zIndex: 1,
        opacity: 0,
        pointerEvents: "none",
        transformOrigin: "50% 85%",
      };
    }
  };

  const handleCardClick = (index: number) => {
    if (Math.abs(dragOffset) > 8) return;

    if (index === activeIndex) {
      setActiveModal(TREATMENTS_DATA[index]);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="treatments"
      className="w-full max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:py-20 md:py-24 relative z-10 font-sans select-none overflow-x-clip scroll-mt-20 sm:scroll-mt-24"
      aria-label="Dental Clinic Treatments 3D Showcase"
    >
      {/* 1. Section Header: Restored Circular + Sparkle Badge + Vertically Elongated Title */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-3 sm:gap-3.5 mb-8 sm:mb-12"
      >
        {/* Reverted Circular Badge with White 4-Point Sparkle Icon */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#09111e] flex items-center justify-center text-white shadow-xs shrink-0">
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>

        {/* Vertically Enlarged Title: Tall, bold cap-height, condensed tracking, vertically prominent */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#09111e] uppercase inline-block origin-center transform scale-y-[1.18] sm:scale-y-[1.24]"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.015em",
            lineHeight: 1,
          }}
        >
          TREATMENTS
        </h2>
      </motion.div>

      {/* 2. 3D Perspective Stage */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[370px] xs:h-[400px] sm:h-[490px] md:h-[560px] lg:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: "1200px",
          WebkitPerspective: "1200px",
        }}
      >
        {/* Render 7 Cards in 3D Stacking Order */}
        {TREATMENTS_DATA.map((treatment, idx) => {
          const cardStyle = getCardStyle(idx);
          const isActive = idx === activeIndex;

          return (
            <div
              key={treatment.id}
              onClick={() => handleCardClick(idx)}
              style={{
                ...cardStyle,
                transition: isDragging
                  ? "none"
                  : "transform 600ms cubic-bezier(0.25, 1, 0.5, 1), opacity 500ms cubic-bezier(0.25, 1, 0.5, 1), filter 500ms ease",
                willChange: "transform, opacity",
              }}
              className="absolute w-[215px] xs:w-[235px] sm:w-[290px] md:w-[325px] lg:w-[340px] aspect-[9/15] sm:aspect-[9/15] md:aspect-[9/16] rounded-[24px] sm:rounded-[28px] overflow-hidden select-none bg-slate-900 border border-white/20 shadow-2xl transition-shadow duration-300"
              role="button"
              tabIndex={isActive ? 0 : -1}
              aria-label={`Treatment: ${treatment.title}`}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Full-bleed crisp background image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.imageAlt}
                  fill
                  priority={idx < 3}
                  quality={75}
                  sizes="(max-width: 640px) 235px, (max-width: 768px) 290px, 340px"
                  className="object-cover object-center pointer-events-none transition-transform duration-700 ease-out"
                />

                {/* Vertical gradient mask at the bottom for high text legibility */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 44%, transparent 72%)",
                  }}
                />
              </div>

              {/* Top-Left Mark: Small understated white clinic monogram/logo */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 flex items-center gap-1.5 pointer-events-none opacity-85">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xs">
                  <span className="text-[9px] sm:text-[10px] font-black text-white tracking-tighter">
                    A+
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-white tracking-widest uppercase opacity-90 drop-shadow-sm font-display">
                  AURA
                </span>
              </div>

              {/* Active Card "Details" Pill on top-right */}
              {isActive && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 pointer-events-none animate-pulse">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-[9px] sm:text-[10px] font-bold text-white tracking-wider uppercase">
                    Details ↗
                  </span>
                </div>
              )}

              {/* Card Bottom Content: Bold Title + Pill Badges */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-7 z-10 flex flex-col justify-end pointer-events-none">
                {/* Clean 2-line title */}
                <h3
                  className="font-display font-extrabold text-white tracking-tight mb-2 sm:mb-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] whitespace-pre-line leading-[1.06]"
                  style={{
                    fontSize: "clamp(1.35rem, 2.2vw, 2.25rem)",
                    letterSpacing: "-0.025em",
                    color: "#FFFFFF",
                  }}
                >
                  {treatment.displayTitle}
                </h3>

                {/* Compact frosted tag pills */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {treatment.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.35)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        borderRadius: "9999px",
                        letterSpacing: "0.06em",
                        color: "#FFFFFF",
                      }}
                      className="bg-white/10 shadow-xs uppercase font-semibold text-[9px] sm:text-[10px] md:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Signature Card Headline Below Carousel: Snug spacing directly beneath cards */}
      <div className="mt-1 sm:mt-2 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTreatment.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full flex flex-col items-center justify-center select-none"
          >
            {/* Main Headline: Bold Grotesque Sans + Different Cursive Script Letter per Card + Floating 4-Point Sparkle Star '✦' */}
            <div className="pt-0 pb-0.5 w-full flex justify-center">
              <h4
                className="font-syne font-black text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] text-[#09111e] tracking-[-0.03em] leading-[1.12] sm:leading-[1.16] uppercase select-none text-center max-w-3xl"
                style={{
                  fontFamily: 'var(--font-syne), "Syne", "Plus Jakarta Sans", sans-serif',
                }}
              >
                {renderStylizedHeadline(activeTreatment)}
              </h4>
            </div>

            {/* Treatment Contextual Badges: Full Treatment Title + Duration */}
            <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-slate-900/[0.05] border border-slate-900/10 text-xs sm:text-sm font-semibold text-slate-800 tracking-wide">
                {activeTreatment.title.replace(/\.$/, "")}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
                {activeTreatment.duration}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 4. Luxury Action Pills beneath lockup */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <a
            href="#book"
            className="px-4 py-2 rounded-full border border-slate-300/80 bg-white/80 hover:bg-white text-xs sm:text-sm font-medium text-slate-700 tracking-wide transition-all shadow-2xs hover:shadow-xs hover:border-slate-400"
          >
            @AURA.DENTALSTUDIO
          </a>
          <a
            href="tel:+18005550192"
            className="px-4 py-2 rounded-full border border-[#09111e] bg-[#09111e] hover:bg-[#1a2333] text-xs sm:text-sm font-semibold text-white tracking-wide transition-all shadow-xs"
          >
            BOOK CONSULTATION ↗
          </a>
          <button
            onClick={() => setActiveModal(activeTreatment)}
            className="px-4 py-2 rounded-full border border-slate-300/80 bg-white/80 hover:bg-white text-xs sm:text-sm font-medium text-slate-700 tracking-wide transition-all shadow-2xs hover:shadow-xs hover:border-slate-400 cursor-pointer"
          >
            TREATMENT DETAILS
          </button>
        </div>
      </div>

      {/* 5. In-Depth Treatment Details Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-[#09111e]/65 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white rounded-[28px] p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-200/80 z-10 overflow-hidden max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-treatment-title"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                aria-label="Close treatment details"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Treatment Photo Banner */}
              <div className="relative w-full h-44 sm:h-54 rounded-2xl overflow-hidden mb-4 bg-slate-100 shadow-inner">
                <Image
                  src={activeModal.image}
                  alt={activeModal.imageAlt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Pill Badges inside Modal Header */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  {activeModal.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 shadow-xs uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expected Duration Tag */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">
                  ⏱ Expected Duration:{" "}
                  <strong className="text-slate-700">{activeModal.duration}</strong>
                </span>
              </div>

              {/* Title */}
              <h3
                id="modal-treatment-title"
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#09111e] tracking-tight mb-1.5 font-display"
              >
                {activeModal.title}
              </h3>

              {/* Headline */}
              <p className="text-sm font-semibold text-purple-600 mb-3">
                {activeModal.headline}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5 font-normal">
                {activeModal.description}
              </p>

              {/* Clinical Benefits Checklist */}
              {activeModal.benefits && (
                <div className="mb-6 space-y-2 bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    What to Expect
                  </h4>
                  {activeModal.benefits.map((benefit, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                    >
                      <svg
                        className="w-4 h-4 text-purple-600 shrink-0 mt-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
                <a
                  href="#book"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:flex-1 py-3 px-5 rounded-full bg-[#09111e] hover:bg-[#172338] text-white text-center font-semibold text-sm transition-all duration-200 shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                >
                  Book This Treatment
                </a>
                <a
                  href="tel:+18005550192"
                  className="w-full sm:w-auto py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-center font-semibold text-sm transition-colors"
                >
                  Ask a Question
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
