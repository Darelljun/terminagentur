import { About } from "@/components/sections/about";
import { Audience } from "@/components/sections/audience";
import { Contact } from "@/components/sections/contact";
import { Difference } from "@/components/sections/difference";
import { Faq, FAQS } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Process } from "@/components/sections/process";
import { Guarantee } from "@/components/sections/promise";
import { Qualification } from "@/components/sections/qualification";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { site } from "@/lib/site";

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
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Difference />
        <Process />
        <Qualification />
        <Guarantee />
        <About />
        <Audience />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
