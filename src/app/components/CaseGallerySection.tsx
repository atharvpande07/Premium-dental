"use client";

import ParallaxUnfurlingGallery, {
  DEFAULT_DENTAL_CASE_IMAGES,
} from "@/components/ui/3d-parallax-unfurling-gallery";

export default function CaseGallerySection() {
  return (
    <section
      id="case-gallery"
      className="relative w-full select-none scroll-mt-20 overflow-visible"
      aria-label="Clinical Case Gallery"
    >
      {/* Anchor targets to preserve navigation links */}
      <div id="gallery" className="absolute -top-24" aria-hidden="true" />
      <div id="cases" className="absolute -top-24" aria-hidden="true" />

      {/* 3D Parallax Unfurling Showcase with sticky title & viewport */}
      <ParallaxUnfurlingGallery
        images={DEFAULT_DENTAL_CASE_IMAGES}
        useWindowScroll={true}
      />
    </section>
  );
}
