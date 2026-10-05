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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Great+Vibes&family=Instrument+Serif:ital@0;1&family=Syne:wght@700;800;900&family=Anek+Latin:wght@400;500;600;700;800;900&family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap"
        />
      </head>
      <body className="antialiased font-sans bg-[#f3f7fb] text-[#09111e] overflow-x-clip">
        {children}
      </body>
    </html>
  );
}

