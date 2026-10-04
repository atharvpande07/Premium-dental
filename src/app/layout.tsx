import type { Metadata } from "next";
import "./globals.css";
import { clinicData } from "./data/clinicData";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = `https://atharvpande07.github.io${basePath}`;
const pageTitle = `${clinicData.name} | ${clinicData.tagline}`;
const pageDesc = `${clinicData.name} in Pusad, Maharashtra. Led by ${clinicData.doctor.name}. ${clinicData.doctor.specialty}. Book your consultation today.`;
const ogImageUrl = `https://atharvpande07.github.io${basePath}/og-preview.jpg`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  metadataBase: new URL("https://atharvpande07.github.io"),
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    url: siteUrl,
    siteName: clinicData.name,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${clinicData.name} - Modern Dental Care`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDesc,
    images: [ogImageUrl],
  },
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

