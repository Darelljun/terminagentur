"use client"

import OverstoryStudioLanding from "@/components/ui/overstory-studio-landing"
import { landingProps } from "@/content/kayco"
import { site } from "@/lib/site"
import { AboutSection } from "./about-section"
import { ProblemCalendar } from "./problem-calendar"
import { ResultsSection } from "./results-section"

export function KaycoLanding() {
  return (
    <OverstoryStudioLanding
      {...landingProps}
      // Ist ein Buchungstool verbunden (NEXT_PUBLIC_BOOKING_URL), öffnen alle Buchungs-Buttons es direkt.
      // Ohne Buchungstool führen sie zum Abschluss mit E-Mail-Anfrage an hello@kayco.io.
      onBook={site.bookingUrl ? () => window.open(site.bookingUrl as string, "_blank", "noopener") : undefined}
      slots={{
        afterAbout: <ProblemCalendar />,
        afterProcess: (
          <>
            <ResultsSection />
            <AboutSection />
          </>
        ),
      }}
    />
  )
}
