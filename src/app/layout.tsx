import type { Metadata } from "next";
import "./globals.css";
import { clinicData } from "./data/clinicData";

export const metadata: Metadata = {
  title: `${clinicData.name} | ${clinicData.tagline}`,
  description: `${clinicData.name} in Pusad, Maharashtra. Led by ${clinicData.doctor.name}. ${clinicData.doctor.specialty}. Book your consultation today.`,
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

