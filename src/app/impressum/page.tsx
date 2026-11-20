import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von KAYCO.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" updated="November 2026" showDraftNotice={false}>
      <section>
        <h2>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</h2>
        <p>
          <strong>{site.legalName}</strong>
          <br />
          Geschäftsbezeichnung: {site.tradingName}
          <br />
          Marke: {site.name}
          <br />
          {site.address.street}
          <br />
          {site.address.zip} {site.address.city}
          <br />
          {site.address.country}
        </p>
        <p>
          Anbieter dieser Website ist derzeit Darell Kacou als Einzelunternehmer. KAYCO ist die Marke,
          unter der die Dienstleistungen zur Termingenerierung angeboten werden.
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>

      <section>
        <h2>Steuerliche Angaben</h2>
        <p>Steuernummer: {site.taxNumber}</p>
        <p>Eine Umsatzsteuer-Identifikationsnummer wird ergänzt, sobald sie vorliegt.</p>
      </section>

      <section>
        <h2>Unsere Tätigkeit</h2>
        <p>
          KAYCO bietet Dienstleistungen im Bereich Marketing, Interessentenqualifizierung und
          Terminvereinbarung für Finanzdienstleister an. Über diese Website werden keine
          Versicherungen oder Finanzanlagen vermittelt und keine individuelle Finanzberatung erbracht.
        </p>
      </section>

      <section>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Unser Angebot richtet sich ausschließlich an Unternehmer. Wir sind nicht bereit und nicht
          verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte und Links</h2>
        <p>
          Wir erstellen die Inhalte dieser Website mit Sorgfalt. Für Inhalte externer Websites, auf die wir
          verlinken, sind ausschließlich deren Betreiber verantwortlich. Werden uns Rechtsverletzungen
          bekannt, entfernen wir betroffene Inhalte oder Links umgehend.
        </p>
      </section>
    </LegalPage>
  );
}
