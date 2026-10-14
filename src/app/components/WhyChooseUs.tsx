"use client";

import { motion } from "framer-motion";

interface WhyChooseItem {
  id: string;
  isPrimary?: boolean;
  titleLines: string[];
  description: string;
  ctaText: string;
  ctaHref: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: "scheduling",
    isPrimary: true,
    titleLines: ["Flexible", "Scheduling"],
    description:
      "We offer flexible scheduling options to fit your busy lifestyle. Whether you prefer early morning visits, lunchtime appointments, or evening and urgent same-day care.",
    ctaText: "Book Now",
    ctaHref: "#book",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />
      </svg>
    ),
  },
  {
    id: "programs",
    isPrimary: false,
    titleLines: ["Personalized", "Programs"],
    description:
      "We understand that everyone's dental journey is unique. Our custom treatment plans and staged smile blueprints are tailored to your biology and individual goals.",
    ctaText: "Book Now",
    ctaHref: "#treatments",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Jump rope / caliper aesthetic matching reference */}
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "experts",
    isPrimary: false,
    titleLines: ["Expert", "Instructors"],
    description:
      "Our Man, the certified dental surgeon and experienced specialist is dedicated to helping you achieve lasting oral health with gentle, pain-free techniques.",
    ctaText: "Book Your Spot",
    ctaHref: "#team",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Strong arm / certified specialist aesthetic */}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "wellness",
    isPrimary: false,
    titleLines: ["Comprehensive", "Wellness", "Approach"],
    description:
      "Our services go beyond standard dental care. From preventive hygiene to restorative therapy, we provide comprehensive guidance for long-term health.",
    ctaText: "See Treatments",
    ctaHref: "#treatments",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Heart monitor / wellness icon */}
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M7 12h2.5l1.5-3 2 6 1.5-3H17" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#e5ece4] text-[#163323] select-none scroll-mt-20 sm:scroll-mt-24 transition-colors"
      aria-label="Why Choose Us"
    >
      {/* Anchor targets to keep legacy nav links working smoothly */}
      <div id="technology" className="absolute -top-24" aria-hidden="true" />
      <div id="why-us" className="absolute -top-24" aria-hidden="true" />
      <div id="care-pillars" className="absolute -top-24" aria-hidden="true" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Header Row: Heading + Subtext on Left, Pill Button on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-10 sm:pb-14">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#163323] leading-[1.08] font-dm-sans"
              style={{
                fontFamily: 'var(--font-dm-sans), "DM Sans", "DM Sans Local", sans-serif',
                letterSpacing: "-0.025em",
              }}
            >
              Why Choose Us?
            </h2>
            <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[15px] text-[#294a37] leading-relaxed font-sans max-w-xl">
              Our commitment to your wellness goes beyond just asking and consulting sessions.
              Discover the unique benefits that set us apart and ensure you have the best experience
              on your wellness journey.
            </p>
          </div>

          {/* Right Header Action Button */}
          <div className="shrink-0">
            <a
              href="#book"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#163323] hover:bg-[#0e2217] text-[#e5ece4] text-xs sm:text-sm font-semibold tracking-tight shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Join Now
            </a>
          </div>
        </div>

        {/* 4 Feature Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const isDark = item.isPrimary;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "80px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "bg-[#163323] text-[#e8f1ea] shadow-[0_12px_32px_rgba(22,51,35,0.24)]"
                    : "bg-[#d3e0d5] text-[#163323] hover:bg-[#ccdcd0] shadow-[0_4px_16px_rgba(22,51,35,0.06)]"
                }`}
                style={{
                  minHeight: "360px",
                }}
              >
                {/* Top Section: Icon Badge + Multi-line Title */}
                <div>
                  {/* Outline Squircle Icon Badge */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 transition-transform duration-200 group-hover:scale-105 ${
                      isDark
                        ? "bg-[#1c3f2c] text-[#e8f1ea] border border-[#2b563d]"
                        : "bg-[#c5d6c8] text-[#163323] border border-[#b4c8b8]"
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>

                  {/* Title (Rendered line-by-line matching screenshot typography) */}
                  <h3
                    className={`text-xl sm:text-2xl font-bold tracking-tight leading-[1.12] mb-3 sm:mb-4 ${
                      isDark ? "text-white" : "text-[#163323]"
                    }`}
                    style={{
                      fontFamily: 'var(--font-dm-sans), "DM Sans", "DM Sans Local", sans-serif',
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.titleLines.map((line, lIdx) => (
                      <span key={lIdx} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  {/* Description Paragraph */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed font-sans ${
                      isDark ? "text-[#b0ceb8]" : "text-[#2e4f3c]"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Section: Pill Button */}
                <div className="pt-6 sm:pt-8 mt-auto">
                  <a
                    href={item.ctaHref}
                    className={`inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold tracking-tight transition-all duration-200 active:scale-95 shadow-2xs ${
                      isDark
                        ? "bg-[#d3e0d5] hover:bg-white text-[#163323]"
                        : "bg-[#163323] hover:bg-[#0e2217] text-[#d3e0d5]"
                    }`}
                  >
                    {item.ctaText}
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
