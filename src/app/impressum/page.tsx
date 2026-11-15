import type { Metadata } from "next";
import { LegalPage, Todo } from "@/components/site/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von KAYCO, einer Marke von Kacou North, Neuss.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" updated="November 2026">
      <section>
        <h2>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</h2>
        <p>
          <strong>{site.legalName}</strong>
          <br />
          <Todo>
            Vor Veröffentlichung ergänzen: vollständiger Name der Inhaberin bzw. des Inhabers – oder Rechtsform und
            vertretungsberechtigte Person(en), falls es sich um eine Gesellschaft handelt
          </Todo>
          <br />
          {site.address.street}
          <br />
          {site.address.zip} {site.address.city}
          <br />
          {site.address.country}
        </p>
        <p>KAYCO ist eine Marke von {site.legalName}.</p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          <Todo>
            Prüfen: Für eine „unmittelbare Kommunikation“ ist neben der E-Mail-Adresse ein weiterer schneller Kontaktweg
            sinnvoll, z. B. eine Telefonnummer
          </Todo>
        </p>
      </section>

      <section>
        <h2>Umsatzsteuer</h2>
        <p>
          <Todo>
            Falls vorhanden: Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG ergänzen. Die allgemeine Steuernummer
            muss nicht veröffentlicht werden und wird hier bewusst nicht angegeben.
          </Todo>
        </p>
      </section>

      <section>
        <h2>Registereintrag</h2>
        <p>
          <Todo>Nur falls vorhanden: Registergericht und Registernummer ergänzen – andernfalls diesen Abschnitt entfernen</Todo>
        </p>
      </section>

      <section>
        <h2>Gewerberechtliche Angaben</h2>
        <p>
          <Todo>
            Prüfen, ob für die Tätigkeit (Terminvereinbarung für Finanz- und Versicherungsvermittler) eine Erlaubnis- oder
            Registerpflicht besteht, z. B. nach §§ 34d, 34f GewO, und ob daraus weitere Pflichtangaben folgen
          </Todo>
        </p>
      </section>

      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          <Todo>Name und Anschrift der verantwortlichen Person ergänzen, sofern journalistisch-redaktionelle Inhalte angeboten werden</Todo>
        </p>
      </section>

      <section>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Unser Angebot richtet sich ausschließlich an Unternehmer. Wir sind nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.{" "}
          <Todo>Formulierung vor Veröffentlichung bestätigen</Todo>
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte und Links</h2>
        <p>
          Wir erstellen die Inhalte dieser Website mit Sorgfalt. Für Inhalte externer Websites, auf die wir verlinken, sind
          ausschließlich deren Betreiber verantwortlich. Werden uns Rechtsverletzungen bekannt, entfernen wir betroffene
          Inhalte oder Links umgehend.
        </p>
      </section>
    </LegalPage>
  );
}
