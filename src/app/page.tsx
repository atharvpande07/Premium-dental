"use client";

import dynamic from "next/dynamic";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import GoogleReviewsSpatialZoom from "./components/GoogleReviewsMarquee";
import { StudioSection } from "./components/StudioSection";
import BentoGridSection from "./components/BentoGridSection";
import TreatmentsGridSection from "./components/TreatmentsGridSection";
import Footer from "./components/Footer";

const BentoShaderBackground = dynamic(
  () => import("./components/BentoShaderBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-[#09111e] overflow-x-clip">
      {/* 1. Navigation Header */}
      <Header />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Lower Section: Continuous WebGPU Shader with Reviews Marquee & Bento Grid */}
      <div className="relative w-full overflow-x-clip">
        {/* Full-bleed WebGPU Fluted Glass & ChromaFlow Background Shader (Sticky Viewport Bound) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            <BentoShaderBackground />
          </div>
          {/* Subtle top gradient to dissolve smoothly from the white bottom of the Hero */}
          <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none z-10" />
        </div>

        {/* 3. About Us / Studio Section (Typography & Philosophy) */}
        <StudioSection />

        {/* 4. Treatments Grid Section (Shifted up after studio typography section) */}
        <TreatmentsGridSection />

        {/* 5. 3D Spatial Google Reviews Zoom Section (Placed after treatments section) */}
        <GoogleReviewsSpatialZoom />

        {/* 6. Bento Grid Section (Modern Technology & Patient Care) */}
        <BentoGridSection />
      </div>

      {/* 7. Ultra-Premium Black Footer & Consultation Suite */}
      <Footer />
    </main>
  );
}

