"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "../utils/assetPath";

const NAV_LINKS = [
  { name: "Treatments", href: "#treatments" },
  { name: "About Us", href: "#about" },
  { name: "Technology", href: "#technology" },
  { name: "Our Team", href: "#team" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDarkSection = false;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent border-none pointer-events-none"
      >
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(1.25rem,4vw,4rem)] h-[clamp(4.25rem,6vw,5.25rem)] flex items-center justify-between transition-all duration-300 pointer-events-auto">
          {/* LEFT: Dental Clinic Wordmark + Clinic Logo (Liquid Glass) */}
          <Link
            href="#hero"
            className="liquid-glass-pill px-3 py-1.5 gap-2.5 group transition-all duration-300 focus:outline-none liquid-glass-light flex items-center"
            aria-label="Vighnaharta Dental Clinic Home"
          >
            {/* Crisp Vighnaharta Dental Clinic Logo Badge */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white shadow-xs border border-slate-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src={getAssetPath("/vighnaharta-logo.png")}
                alt="Vighnaharta Dental Clinic Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain p-0.5"
                priority
              />
            </div>

            <div className="flex items-baseline gap-1.5 ml-0.5">
              <span className="text-[0.9375rem] sm:text-[1rem] font-bold tracking-[-0.01em] text-[#09111e]">
                Vighnaharta Dental
              </span>
            </div>
          </Link>

          {/* CENTER: Liquid Glassmorphic Navigation Link Buttons */}
          <nav
            className="hidden md:flex items-center gap-2.5"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="liquid-glass-pill px-4 py-2 text-[0.8125rem] font-medium transition-all duration-300 focus:outline-none liquid-glass-light text-[#09111e] hover:text-purple-700"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT: Rounded Liquid Glassmorphic CTA Button (PC view) & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5">
            <a
              href="#book"
              className="hidden md:inline-flex items-center justify-center px-5 py-2 text-[0.8125rem] font-semibold transition-all duration-300 focus:outline-none rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white shadow-[0_4px_16px_rgba(236,72,153,0.35)] hover:opacity-95 hover:scale-105 active:scale-95 whitespace-nowrap"
              aria-label="Book an Appointment"
            >
              <span>Book Appointment</span>
            </a>

            {/* Mobile Hamburger Toggle (Strictly hidden on PC view) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:!hidden flex items-center justify-center p-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                isDarkSection ? "liquid-glass-dark" : "liquid-glass-light"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span
                  className={`h-[1.5px] transition-all duration-300 ${
                    isDarkSection ? "bg-white" : "bg-[#09111e]"
                  } ${mobileMenuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`}
                />
                <span
                  className={`h-[1.5px] transition-all duration-200 ${
                    isDarkSection ? "bg-white" : "bg-[#09111e]"
                  } ${mobileMenuOpen ? "opacity-0" : "w-3.5"}`}
                />
                <span
                  className={`h-[1.5px] transition-all duration-300 ${
                    isDarkSection ? "bg-white" : "bg-[#09111e]"
                  } ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-[7.5px]" : "w-4"}`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-40 pt-24 px-8 pb-10 flex flex-col justify-between md:hidden backdrop-blur-2xl transition-colors duration-300 ${isDarkSection ? "bg-[#070512]/95 text-white" : "bg-[#f3f7fb]/95 text-[#09111e]"
              }`}
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-light transition-colors ${isDarkSection
                      ? "text-white hover:text-purple-300"
                      : "text-[#09111e] hover:text-[#334155]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div
              className={`pt-8 border-t flex flex-col gap-4 ${isDarkSection ? "border-white/15" : "border-slate-300/80"
                }`}
            >
              <a
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-3.5 rounded-full font-medium transition-all ${isDarkSection
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_25px_rgba(216,180,254,0.4)]"
                    : "btn-glass-primary text-[#09111e]"
                  }`}
              >
                <span>Book Appointment</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
