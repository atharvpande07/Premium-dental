import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura Dental | Precision Dentistry. Designed Around You.",
  description:
    "Advanced dental care, precise treatment, and a calmer experience — thoughtfully designed to help you smile with complete confidence.",
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

