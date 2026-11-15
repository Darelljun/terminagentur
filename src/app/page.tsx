import { KaycoLanding } from "@/components/kayco/kayco-landing"
import { faqItems, heroPhoto, pricing } from "@/content/kayco"
import { site } from "@/lib/site"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      email: site.email,
      founder: site.founders.map((name) => ({ "@type": "Person", name })),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.zip,
        addressLocality: site.address.city,
        addressCountry: "DE",
      },
      areaServed: { "@type": "Country", name: "Deutschland" },
    },
    {
      "@type": "Service",
      name: "Qualifizierte Beratungstermine für Finanzdienstleister",
      provider: { "@id": `${site.url}/#organization` },
      areaServed: "DE",
      audience: { "@type": "BusinessAudience", name: "Finanzdienstleister" },
      description: site.description,
      offers: [
        { "@type": "Offer", name: "Beratungstermin", price: pricing.perAppointment, priceCurrency: "EUR" },
        { "@type": "Offer", name: "Einrichtung", price: pricing.setup, priceCurrency: "EUR" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      {/* Das Hero-Foto ist das größte sichtbare Element: React hebt den Link in den <head>,
          der Browser lädt das Foto parallel zu den Skripten. */}
      <link rel="preload" as="image" href={heroPhoto} type="image/avif" fetchPriority="high" />
      <KaycoLanding />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  )
}
