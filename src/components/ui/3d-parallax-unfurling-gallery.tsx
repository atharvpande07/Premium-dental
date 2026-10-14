"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { getAssetPath } from "@/app/utils/assetPath";

export const DEFAULT_DENTAL_CASE_IMAGES = [
  "/cases/veneers-after.jpg",
  "/cases/implant-after.jpg",
  "/cases/aligner-after.jpg",
  "/cases/diastema-after.jpg",
  "/cases/whitening-after.jpg",
  "/cases/rehab-after.jpg",
  "/cases/veneers-before.jpg",
  "/cases/implant-before.jpg",
  "/cases/aligner-before.jpg",
  "/cases/diastema-before.jpg",
  "/cases/whitening-before.jpg",
  "/cases/rehab-before.jpg",
  "/treatment-cosmetic.jpg",
  "/treatment-implants.jpg",
  "/treatment-invisalign.jpg",
  "/treatment-whitening.jpg",
];

interface ImageCardProps {
  src: string;
  label?: string;
  onLoad?: () => void;
}

const ImageCard = ({ src, label, onLoad }: ImageCardProps) => {
  const resolvedSrc = getAssetPath(src);

  return (
    <div className="group w-full h-[220px] sm:h-[300px] md:h-[380px] flex-shrink-0 bg-white rounded-2xl p-2 sm:p-2.5 overflow-hidden transition-all duration-300 hover:scale-[1.03] cursor-pointer relative will-change-transform backface-hidden preserve-3d shadow-[0_12px_28px_rgba(22,51,35,0.08),0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(22,51,35,0.16)] border border-[#163323]/10 hover:border-[#163323]/25">
      <div className="w-full h-full rounded-xl overflow-hidden relative">
        <img
          src={resolvedSrc}
          alt={label || "Case Gallery Asset"}
          loading="lazy"
          onLoad={onLoad}
          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
        />
        {label && (
          <div className="absolute bottom-2.5 inset-x-2.5 z-10 transition-all duration-200">
            <span className="inline-block px-3 py-1 rounded-full bg-[#163323]/90 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-[#e5ece4] tracking-tight shadow-sm border border-white/15">
              {label}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#163323]/30 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export interface ParallaxGalleryProps {
  images?: string[];
  useWindowScroll?: boolean;
  className?: string;
}

export default function ParallaxUnfurlingGallery({
  images,
  useWindowScroll = true,
  className = "",
}: ParallaxGalleryProps) {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const galleryImages = useMemo(() => {
    if (images && images.length > 0) return images;
    return DEFAULT_DENTAL_CASE_IMAGES;
  }, [images]);

  const colMedia = useMemo(() => {
    const col1Base = galleryImages.filter((_, i) => i % 4 === 0);
    const col2Base = galleryImages.filter((_, i) => i % 4 === 1);
    const col3Base = galleryImages.filter((_, i) => i % 4 === 2);
    const col4Base = galleryImages.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, [galleryImages]);

  // SCROLL BINDING: Window scroll for seamless in-page integration, or custom container
  const { scrollYProgress } = useScroll(
    useWindowScroll
      ? {
          target: containerRef,
          offset: ["start start", "end end"],
        }
      : {
          target: containerRef,
          container: scrollWrapperRef,
          offset: ["start start", "end end"],
        }
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  // Banner unfurling animations
  const bannerWidth = useTransform(smoothProgress, [0, 0.18], ["90vw", "96vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.18], ["58vh", "72vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.18], ["32px", "24px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.18], ["2px", "1px"]);

  // 3D Matrix animations
  const rotateY = useTransform(smoothProgress, [0.15, 1], [-35, -4]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [20, 2]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [10, 0]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-500, 0]);

  // Track columns parallax animations
  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-35%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-35%", "5%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-35%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-25%", "15%"]);

  const content = (
    <div
      ref={containerRef}
      className={`relative w-full h-[280vh] sm:h-[320vh] bg-gradient-to-b from-white via-[#f3f7f2] to-[#edf3ec] text-[#09111e] font-sans selection:bg-[#163323] selection:text-[#e5ece4] ${className}`}
    >
      {/* Sticky Fullscreen 3D Showcase Chamber */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start items-center overflow-hidden pt-20 sm:pt-24 lg:pt-26 pb-4 sm:pb-6 pointer-events-auto">
        {/* 1. Nice Big Title: Case Gallery */}
        <div className="z-30 mb-3 sm:mb-4 md:mb-5 flex flex-col items-center justify-center text-center shrink-0">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
            {/* Reverted Circular Badge with White 4-Point Sparkle Icon matching Treatments Section */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#09111e] flex items-center justify-center text-white shadow-xs shrink-0">
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#09111e] uppercase tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Case Gallery
            </h2>
          </div>
        </div>

        {/* 2. 3D Parallax Showcase Banner Stage */}
        <div className="relative flex-1 w-full flex items-center justify-center min-h-0">
          <motion.div
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: bannerRadius,
              borderWidth: bannerBorderWidth,
              borderColor: "#c8d8c6",
            }}
            className="relative bg-[#e9f0e8] overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d shadow-[0_20px_50px_rgba(22,51,35,0.08),inset_0_1px_2px_rgba(255,255,255,0.8)]"
          >
            <div
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              style={{ perspective: "1000px" }}
            >
              {/* Soft Sage Ambient Edge Vignettes (Smooth card entrance & exit) */}
              <div className="absolute inset-x-0 top-0 h-24 sm:h-32 z-20 bg-gradient-to-b from-[#e9f0e8] via-[#e9f0e8]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 z-20 bg-gradient-to-t from-[#e9f0e8] via-[#e9f0e8]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-20 sm:w-32 z-20 bg-gradient-to-r from-[#e9f0e8] via-[#e9f0e8]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-20 sm:w-32 z-20 bg-gradient-to-l from-[#e9f0e8] via-[#e9f0e8]/70 to-transparent pointer-events-none" />

              {/* Parallax Image Grid Matrix */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  rotateZ,
                  z: translateZ,
                  transformStyle: "preserve-3d",
                }}
                className="flex gap-3 sm:gap-4 md:gap-6 justify-center items-center w-[120vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
              >
                <motion.div
                  style={{ y: yCol1 }}
                  className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[26vw] sm:w-[22vw] min-w-[170px] pointer-events-auto"
                >
                  {colMedia.col1.map((src, index) => (
                    <ImageCard
                      key={`col1-${index}`}
                      src={src}
                      label={index % 2 === 0 ? "Veneer Makeover" : "Implant Restoration"}
                      onLoad={handleItemLoad}
                    />
                  ))}
                </motion.div>

                <motion.div
                  style={{ y: yCol2 }}
                  className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[26vw] sm:w-[22vw] min-w-[170px] pointer-events-auto"
                >
                  {colMedia.col2.map((src, index) => (
                    <ImageCard
                      key={`col2-${index}`}
                      src={src}
                      label={index % 2 === 0 ? "Invisible Aligners" : "Laser Smile Design"}
                      onLoad={handleItemLoad}
                    />
                  ))}
                </motion.div>

                <motion.div
                  style={{ y: yCol3 }}
                  className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[26vw] sm:w-[22vw] min-w-[170px] pointer-events-auto"
                >
                  {colMedia.col3.map((src, index) => (
                    <ImageCard
                      key={`col3-${index}`}
                      src={src}
                      label={index % 2 === 0 ? "Diastema Closure" : "Enamel Whitening"}
                      onLoad={handleItemLoad}
                    />
                  ))}
                </motion.div>

                <motion.div
                  style={{ y: yCol4 }}
                  className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[26vw] sm:w-[22vw] min-w-[170px] pointer-events-auto"
                >
                  {colMedia.col4.map((src, index) => (
                    <ImageCard
                      key={`col4-${index}`}
                      src={src}
                      label={index % 2 === 0 ? "Full Mouth Rehab" : "Aesthetic Crowns"}
                      onLoad={handleItemLoad}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  if (useWindowScroll) {
    return content;
  }

  return (
    <div
      ref={scrollWrapperRef}
      className="w-full h-screen overflow-y-auto overflow-x-hidden bg-[#f4f7f4]"
    >
      {content}
    </div>
  );
}
