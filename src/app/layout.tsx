import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vighnaharta Dental Clinic | Best Dentist in Pusad | Root Canal Specialist & Implants",
  description:
    "Vighnaharta Dental Clinic in Pusad, Maharashtra. Led by Dr. Amol Manthankar. Advanced Root Canal Treatment, Digital Dental Implants, Smile Makeovers & Painless Dentistry. Book your consultation today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans bg-[#f3f7fb] text-[#09111e] overflow-x-clip">
        {children}
      </body>
    </html>
  );
}

