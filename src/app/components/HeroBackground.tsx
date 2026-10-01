"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getAssetPath } from "../utils/assetPath";

const HERO_BLUR_DATA_URL =
  "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQAwCdASoUAAsAPzmEuVOvKKWisAgB4CcJbACdAA+IM3nlAAD+kNEe+GW9cg03e956FuX842JSN34XKsvrHmajX2h1l1sSM8UOrjykiTEPwWabAzUKAn7NsO8YEAAA";

interface HeroBackgroundProps {
  pointerOffset?: { x: number; y: number };
}

export default function HeroBackground({ pointerOffset = { x: 0, y: 0 } }: HeroBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  // Subtle restrained parallax translation (4-8px max)
  const parallaxX = shouldReduceMotion ? 0 : pointerOffset.x * 6;
  const parallaxY = shouldReduceMotion ? 0 : pointerOffset.y * 5;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      {/* Parallax Container with Micro Floating Animation and Deep Feathered Bottom Mask */}
      <motion.div
        className="relative w-[103%] h-[103%] -left-[1.5%] -top-[1.5%] animate-tooth-float"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.7) 72%, rgba(0,0,0,0.2) 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.7) 72%, rgba(0,0,0,0.2) 88%, transparent 100%)",
        }}
        animate={{
          x: parallaxX,
          y: parallaxY,
        }}
        transition={{
          x: { duration: 0.8, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
      >
        <Image
          src={getAssetPath("/hero-artwork.webp")}
          alt="Floating sculptural tooth over soft clouds with glass orbital ring and clinical architecture"
          fill
          priority
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA_URL}
          className="object-cover object-[58%_center] sm:object-[60%_center] lg:object-[66%_center]"
          sizes="100vw"
        />
      </motion.div>
    </div>
  );
}
