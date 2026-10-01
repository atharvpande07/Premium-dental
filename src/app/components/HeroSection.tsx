"use client";

import { useRef, useState, useEffect } from "react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import TrustMarquee from "./TrustMarquee";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && window.matchMedia("(pointer: fine)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    // Keep local parallax offset for hero tooth artwork
    if (!isDesktop) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setPointerOffset({ x, y });
    });
  };

  const handlePointerLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setPointerOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onPointerMove={(e) => {
        handlePointerMove(e);
        e.stopPropagation();
      }}
      onMouseMove={(e) => e.stopPropagation()}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden pt-[clamp(4.25rem,6.5vh,5.75rem)] pb-3 sm:pb-4 transition-all duration-300 ease-out"
      aria-label="Vighnaharta Dental Clinic Pusad"
    >
      {/* 1. Cinematic Background Layer with Tooth Artwork */}
      <HeroBackground pointerOffset={pointerOffset} />

      {/* 2. Center-Left Content Zone: Headline, Supporting Text, Dual CTAs */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[clamp(1.25rem,4vw,4rem)] flex-1 flex flex-col justify-center my-auto py-1 sm:py-2 transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full">
          {/* Left Column: Typography & CTAs */}
          <div className="w-full max-w-[min(100%,740px)] flex flex-col justify-center">
            <HeroContent />
          </div>

          {/* Right Column: Kept open for the right-centered Tooth Hero Object */}
          <div className="hidden lg:block flex-1 min-h-[180px] pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* 3. Lower Deck: Trust Microcopy & Marquee cleanly anchored at bottom */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[clamp(1.25rem,4vw,4rem)] mt-auto mb-1 transition-all duration-300">
        <div className="w-full sm:w-auto max-w-[520px]">
          <TrustMarquee />
        </div>
      </div>
    </section>
  );
}
