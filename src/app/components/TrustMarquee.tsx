"use client";

import { motion } from "framer-motion";

interface TrustItem {
  name: string;
  badge: React.ReactNode;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    name: "Expert Diagnostics",
    badge: (
      <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M7 12h10" />
      </svg>
    ),
  },
  {
    name: "Digital Dentistry",
    badge: (
      <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: "Precision Care",
    badge: (
      <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    name: "Modern Sterilization",
    badge: (
      <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: "Patient First",
    badge: (
      <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    name: "Advanced Imaging",
    badge: (
      <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" />
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      </svg>
    ),
  },
];

export default function TrustMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[min(100%,500px)] flex flex-col gap-2 select-none"
    >
      {/* Supporting Trust Statement */}
      <p className="text-[clamp(0.65rem,0.6vw+0.45rem,0.75rem)] uppercase tracking-[0.14em] text-[#475569] font-medium [text-shadow:0_1px_2px_rgba(255,255,255,0.7)]">
        Trusted by patients who expect better care
      </p>

      {/* Edge-Faded Horizontal Marquee */}
      <div className="relative w-full overflow-hidden mask-marquee py-1.5 -ml-1">
        <div className="animate-marquee-scroll flex items-center gap-7 sm:gap-9 text-[#1e293b]">
          {/* Seamless continuous marquee loop */}
          {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, idx) => (
            <div
              key={`marquee-item-${idx}`}
              className="flex items-center gap-2 text-[clamp(0.75rem,0.4vw+0.65rem,0.8125rem)] font-medium tracking-tight text-[#334155] whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity"
            >
              <span className="text-[#09111e] flex items-center justify-center">{item.badge}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
