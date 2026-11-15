import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Geist nutzen nur die Rechtsseiten; die Startseite setzt eigene Systemschriften. Kein Preload, damit die
// Schrift auf der Startseite nicht mit Foto und Skripten um die Bandbreite konkurriert.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap", preload: false });

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
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={geistSans.variable}>
      <body className="min-h-dvh">
        {children}
      </body>
    </html>
  );
}
