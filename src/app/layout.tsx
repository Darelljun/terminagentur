import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";
import "./kayco.css";
import "./fx.css";

// Schriften lokal über next/font (keine Anfragen an Google beim Seitenaufruf).
// Instrument Sans mit Breitenachse: halbschmal für Headlines, normal für Fließtext.
const sans = Instrument_Sans({ variable: "--font-sans", subsets: ["latin"], axes: ["wdth"], display: "swap" });
// Geist Mono für Labels, Nummern und Zeiten – nur der eine genutzte Schnitt.
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], weight: "500", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | KAYCO" },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Terminvereinbarung Finanzberater",
    "Termingenerierung Finanzdienstleister",
    "qualifizierte Beratungstermine",
    "Termine für Versicherungsmakler",
    "Neukundengewinnung Finanzberatung",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" data-theme="dark" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
