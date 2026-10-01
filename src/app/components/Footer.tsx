"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const TREATMENTS_LIST = [
  { id: "cosmetic-dentistry", name: "Cosmetic Dentistry & Veneers" },
  { id: "dental-implants", name: "Digital 3D Dental Implants" },
  { id: "invisalign-aligners", name: "Invisalign Clear Aligners" },
  { id: "teeth-whitening", name: "Laser Teeth Whitening" },
  { id: "root-canal-therapy", name: "Pain-Free Root Canal" },
  { id: "oral-surgery", name: "Advanced Oral Surgery" },
  { id: "preventive-checkups", name: "Preventive Checkups & Care" },
];

export default function Footer() {
  // Booking Form State
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [treatment, setTreatment] = useState("Invisalign Clear Aligners");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (09:00 - 12:00)");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState("");


  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Legal Modal State
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | "compliance" | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleCopy = (text: string, label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`Copied ${label} to clipboard!`);
    } else {
      showToast(`Selected: ${text}`);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      showToast("Please provide your name and contact number.");
      return;
    }

    setBookingLoading(true);
    // Simulate high-performance API confirmation
    setTimeout(() => {
      const code = "VDC-" + Math.floor(1000 + Math.random() * 9000);
      setBookingCode(code);
      setBookingLoading(false);
      setBookingSuccess(true);
      showToast("Consultation requested! Check your reference code below.");
    }, 850);
  };

  const handleTreatmentClick = (
    e: React.MouseEvent,
    treatmentId: string,
    treatmentName: string
  ) => {
    e.preventDefault();

    // 1. Dispatch custom event to trigger treatment selection & open details modal in TreatmentsGridSection
    window.dispatchEvent(
      new CustomEvent("open-treatment", {
        detail: { id: treatmentId, name: treatmentName },
      })
    );

    // 2. Smoothly scroll to the treatments section
    const section = document.getElementById("treatments");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="book"
      className="relative w-full bg-[#05080f] text-slate-200 font-sans border-t border-white/[0.08] overflow-hidden select-none"
      aria-label="Vighnaharta Dental Footer and Appointment Booking"
    >
      {/* Subtle Luminous Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[55vw] h-[400px] rounded-full bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[45vw] h-[400px] rounded-full bg-gradient-to-tl from-blue-900/15 via-emerald-900/10 to-transparent blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[clamp(1.25rem,4vw,4rem)] pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 select-text">
        {/* =========================================================
            TIER 1: HIGH-CONVERSION CONSULTATION & BOOKING SUITE
           ========================================================= */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.1] backdrop-blur-2xl p-6 sm:p-10 lg:p-12 mb-16 sm:mb-20 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Side: Headline & Clinic Status */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Live Status Beacon */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4 sm:mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>Studio Open • Walk-ins & Emergencies Welcome</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                  Experience Dentistry,{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                    Reimagined.
                  </span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-md">
                  Schedule your comprehensive scan and smile consultation. Our team ensures a relaxed, pain-free visit tailored completely around you.
                </p>
              </div>

              {/* Direct Fast-Track Contacts */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                <a
                  href="tel:+917823812717"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs sm:text-sm font-semibold transition-all border border-white/[0.12] hover:border-white/30"
                  aria-label="Direct Phone Consultation"
                >
                  <svg className="w-4 h-4 text-pink-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 78238 12717</span>
                </a>

                <a
                  href="https://wa.link/1qa5iz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs sm:text-sm font-semibold transition-all border border-emerald-500/30 hover:border-emerald-400/50"
                  aria-label="Chat on WhatsApp"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-2.02-.486-1.579-.658-2.617-2.28-2.697-2.387-.08-.107-.638-.85-.638-1.621s.404-1.151.547-1.309c.144-.158.313-.198.418-.198.104 0 .209.002.3.007.098.006.229-.037.357.27.132.316.449 1.094.488 1.173.04.079.066.172.013.277-.053.106-.079.172-.158.264-.079.092-.167.206-.238.277-.08.079-.163.165-.07.324.093.159.412.68.884 1.101.607.541 1.118.708 1.277.787.159.079.252.066.345-.04.093-.106.397-.462.503-.62.106-.158.212-.132.357-.079.146.053.926.436 1.085.515.159.079.265.119.304.185.04.066.04.382-.104.787z" />
                  </svg>
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Booking Form */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!bookingSuccess ? (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleBookingSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="patient-name" className="text-xs font-semibold text-slate-300">
                        Patient Name *
                      </label>
                      <input
                        id="patient-name"
                        type="text"
                        required
                        placeholder="e.g. Priyadarshini Shinde"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="patient-phone" className="text-xs font-semibold text-slate-300">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="patient-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98200 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                      />
                    </div>

                    {/* Treatment Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="treatment-select" className="text-xs font-semibold text-slate-300">
                        Treatment Needed
                      </label>
                      <div className="relative">
                        <select
                          id="treatment-select"
                          value={treatment}
                          onChange={(e) => setTreatment(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="Invisalign Clear Aligners">Invisalign Clear Aligners</option>
                          <option value="Custom Porcelain Veneers">Custom Porcelain Veneers</option>
                          <option value="Biomimetic Smile Restoration">Biomimetic Smile Restoration</option>
                          <option value="Digital 3D Dental Implant">Digital 3D Dental Implant</option>
                          <option value="Single-Visit Root Canal">Single-Visit Root Canal</option>
                          <option value="Wisdom Tooth / Oral Surgery">Wisdom Tooth / Oral Surgery</option>
                          <option value="Laser Teeth Whitening">Laser Teeth Whitening</option>
                          <option value="General Preventive Checkup">General Preventive Checkup</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Preferred Date */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="preferred-date" className="text-xs font-semibold text-slate-300">
                        Preferred Date
                      </label>
                      <input
                        id="preferred-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all cursor-pointer"
                      />
                    </div>

                    {/* Preferred Time Slot */}
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-300">Preferred Time Window</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Morning (9am - 12pm)", "Afternoon (12pm - 4pm)", "Evening (4pm - 8:30pm)"].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            className={`py-2 px-2 text-[11px] sm:text-xs rounded-lg font-medium transition-all text-center border cursor-pointer ${
                              timeSlot === slot
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-sm"
                                : "bg-white/[0.04] text-slate-300 border-white/[0.1] hover:bg-white/[0.08]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="sm:col-span-2 mt-2">
                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:opacity-95 active:scale-[0.99] transition-all shadow-[0_8px_24px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {bookingLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Confirming Availability...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Priority Consultation</span>
                            <span className="text-base font-normal">→</span>
                          </>
                        )}
                      </button>
                      <p className="mt-2 text-[11px] text-center text-slate-400">
                        Zero cancellation fee • Complete privacy guaranteed • Instant WhatsApp confirmation
                      </p>
                    </div>
                  </motion.form>
                ) : (
                  /* Booking Confirmation Screen */
                  <motion.div
                    key="booking-confirmed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 sm:p-8 rounded-2xl bg-white/[0.05] border border-emerald-500/30 text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white">Consultation Requested!</h3>
                    <p className="text-sm text-slate-300 mt-1 max-w-sm">
                      Thank you, <span className="font-semibold text-white">{patientName}</span>. Your slot request for{" "}
                      <span className="text-pink-300 font-semibold">{treatment}</span> has been received.
                    </p>

                    <div className="mt-4 px-4 py-2 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-emerald-400">
                      Booking Reference: <span className="font-bold text-white">{bookingCode}</span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2">
                      Our patient coordinator will contact you via WhatsApp/Phone within 15 minutes to confirm exact chair time.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/917823812717?text=Hello%20Vighnaharta%20Dental%2C%20my%20booking%20reference%20is%20${bookingCode}.%20Please%20confirm%20my%20slot.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-all"
                      >
                        Confirm on WhatsApp ↗
                      </a>
                      <button
                        onClick={() => {
                          setBookingSuccess(false);
                          setPatientName("");
                          setPhone("");
                        }}
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all cursor-pointer"
                      >
                        Book Another Visit
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* =========================================================
            TIER 2: NAVIGATION & BRAND GRID (3 BALANCED COLUMNS)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/[0.08]">
          {/* Column 1: Studio Wordmark, Philosophy & Address (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Dental Studio Brand Lockup */}
              <Link href="#hero" className="inline-flex items-center gap-2.5 group focus:outline-none mb-4" aria-label="Vighnaharta Dental Clinic Home">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-0.5">
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-white group-hover:bg-pink-400 transition-colors" />
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-white/40" />
                  </div>
                  <div className="flex items-center gap-0.5 pl-1.5">
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-pink-500" />
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-pink-300 transition-colors">
                  Vighnaharta Dental
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-white/10 text-slate-300">
                  Clinic
                </span>
              </Link>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm mb-6">
                Pusad&apos;s premier dental clinic and implant centre. Providing gentle, patient-centered, and technology-driven oral healthcare with single-sitting painless root canals and biomimetic smile design.
              </p>

              {/* Physical Studio Address */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300 space-y-1.5 max-w-sm">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <svg className="w-4 h-4 text-pink-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Vighnaharta Dental Clinic • Pusad</span>
                </div>
                <p className="text-slate-400 pl-5 leading-normal">
                  Vasantrao Naik Chowk, Shree Sainath Plaza Complex, Near Aadhar Medical, Pusad, Maharashtra 445204
                </p>
                <div className="pt-2 pl-5 flex items-center gap-3">
                  <a
                    href="https://maps.google.com/?q=Vighnaharta+Dental+Clinic+Pusad+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 font-semibold inline-flex items-center gap-1 text-[11px]"
                  >
                    <span>Get Directions</span>
                    <span>↗</span>
                  </a>
                  <button
                    onClick={() => handleCopy("Vasantrao Naik Chowk, Shree Sainath Plaza Complex, Near Aadhar Medical, Pusad, Maharashtra 445204", "address")}
                    className="text-slate-400 hover:text-white font-medium text-[11px] underline cursor-pointer"
                  >
                    Copy Address
                  </button>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mt-6 text-xs text-slate-400 space-y-1 border-l-2 border-pink-500/40 pl-3">
              <p className="font-semibold text-white">Clinical Hours</p>
              <p>Monday – Saturday: 10:00 AM – 8:30 PM</p>
              <p>Sunday: 10:00 AM – 2:00 PM (Emergency Consultation)</p>
            </div>
          </div>

          {/* Column 2: Specialized Treatments (Span 4) */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              Specialized Treatments
            </h3>
            <p className="text-xs text-slate-400 mb-3 font-normal">
              Click any treatment below to view procedure details, expected timeline, and clinical scan options.
            </p>
            <ul className="space-y-2">
              {TREATMENTS_LIST.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={(e) => handleTreatmentClick(e, item.id, item.name)}
                    className="text-xs sm:text-sm text-slate-300 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group text-left cursor-pointer hover:translate-x-1.5 py-1"
                    aria-label={`View clinical details for ${item.name}`}
                  >
                    <span className="text-pink-400/60 group-hover:text-pink-400 group-hover:translate-x-0.5 transition-all font-bold">›</span>
                    <span className="group-hover:text-pink-200 group-hover:underline decoration-pink-500/50 underline-offset-4 font-medium transition-colors">
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Clinical Hours & Emergency Concierge Desk (Span 3) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Concierge & Emergency
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Immediate triage assistance for dental emergencies, cosmetic consultations, and insurance desk support.
              </p>

              <div className="space-y-3 text-xs">
                <button
                  type="button"
                  onClick={() => handleCopy("+917823812717", "emergency contact")}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-emerald-500/30 transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    ⚡
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Emergency & Appointments Desk</div>
                    <div className="text-slate-300 font-semibold group-hover:text-white transition-colors">+91 78238 12717</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy("contact@vighnahartadental.com", "email")}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-pink-500/30 transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center shrink-0">
                    ✉
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-pink-400">Direct Concierge Email</div>
                    <div className="text-slate-300 font-semibold group-hover:text-white transition-colors">contact@vighnahartadental.com</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Zero-Wait Guarantee</span>
              </p>
              <p className="text-[11px] text-slate-400">Reserved operatory suites & dedicated personalized care.</p>
            </div>
          </div>
        </div>

        {/* =========================================================
            TIER 3: SOCIAL HANDLES & INTERACTIVE SCROLL TO TOP
            ========================================================= */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/[0.08]">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 mr-2 font-medium">Follow Vighnaharta Dental:</span>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-slate-300 hover:text-white border border-white/[0.08] hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Vighnaharta Dental Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-red-600 text-slate-300 hover:text-white border border-white/[0.08] hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Vighnaharta Dental YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-blue-600 text-slate-300 hover:text-white border border-white/[0.08] hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Vighnaharta Dental LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Google Reviews */}
            <Link
              href="#reviews"
              className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-amber-500 text-slate-300 hover:text-slate-900 border border-white/[0.08] hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="View Google Reviews"
            >
              <span className="font-bold text-xs">G</span>
            </Link>
          </div>

          {/* Back to Top Smooth Scroll Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-slate-300 hover:text-white transition-all border border-white/[0.1] hover:border-white/30 cursor-pointer"
            aria-label="Scroll back to top of page"
          >
            <span>Back to Top</span>
            <svg className="w-3.5 h-3.5 -translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        {/* =========================================================
            TIER 4: LEGAL, CERTIFICATIONS & COPYRIGHT
           ========================================================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Vighnaharta Dental Clinic. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-slate-400">Pusad, Maharashtra</span>
          </div>

          {/* Interactive Legal Modals Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button
              onClick={() => setLegalModal("privacy")}
              className="hover:text-slate-200 transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal("terms")}
              className="hover:text-slate-200 transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Terms of Care
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal("compliance")}
              className="hover:text-slate-200 transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Clinical Compliance
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          INTERACTIVE LEGAL MODAL
         ========================================================= */}
      <AnimatePresence>
        {legalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalModal(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl rounded-2xl bg-[#0b1320] border border-white/20 p-6 sm:p-8 text-slate-200 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <h4 className="text-lg font-bold text-white capitalize">
                  {legalModal === "privacy" && "Patient Privacy & Data Protection Policy"}
                  {legalModal === "terms" && "Terms of Clinical Care & Appointments"}
                  {legalModal === "compliance" && "Sterilization & Clinical Compliance Protocols"}
                </h4>
                <button
                  onClick={() => setLegalModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {legalModal === "privacy" && (
                  <>
                    <p>
                      At Vighnaharta Dental Clinic, confidentiality and patient diagnostic records are strictly preserved with complete clinical security.
                    </p>
                    <p>
                      We never sell, distribute, or share patient medical data with third parties. Patient imaging is only transmitted securely to certified dental laboratories for customized milling, crowns, and aligner manufacturing with patient consent.
                    </p>
                  </>
                )}
                {legalModal === "terms" && (
                  <>
                    <p>
                      Appointments are reserved exclusively for each patient to preserve our strict zero-waiting-room standard. If you need to reschedule or adjust chair time, we kindly request prior notice.
                    </p>
                    <p>
                      Emergency dental visits for acute pain, toothaches, or dental trauma are prioritized immediately during operational hours. Transparent treatment estimates are always provided before commencing any clinical procedure.
                    </p>
                  </>
                )}
                {legalModal === "compliance" && (
                  <>
                    <p>
                      Vighnaharta Dental Clinic adheres strictly to multi-stage autoclave sterilization protocols mandated by international healthcare and dental safety standards.
                    </p>
                    <p>
                      Every instrument pouch is barcoded and opened directly in front of the patient. Operatory suites feature continuous medical air filtration and automated surface disinfection between patient appointments.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setLegalModal(null)}
                  className="px-5 py-2 rounded-full bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Understood & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================
          INTERACTIVE TOAST NOTIFICATION
         ========================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full bg-slate-900/95 border border-white/20 text-white text-xs font-semibold shadow-2xl backdrop-blur-xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
