import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/site/providers";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

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
    <html lang="de" className={`${geistSans.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Zum Inhalt springen
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
