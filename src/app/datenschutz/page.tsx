import type { Metadata } from "next";
import { LegalPage, Todo } from "@/components/site/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten auf kayco.de.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" updated="November 2026">
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          <strong>{site.legalName}</strong>
          <br />
          <Todo>Name der Inhaberin bzw. des Inhabers oder vertretungsberechtigte Person(en) ergänzen</Todo>
          <br />
          {site.address.street}, {site.address.zip} {site.address.city}, {site.address.country}
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          <Todo>Prüfen, ob ein Datenschutzbeauftragter benannt werden muss (Art. 37 DSGVO, § 38 BDSG), und ggf. Kontaktdaten ergänzen</Todo>
        </p>
      </section>

      <section>
        <h2>2. Das Wichtigste in Kürze</h2>
        <ul>
          <li>Diese Website setzt keine Analyse-, Tracking- oder Marketing-Tools ein.</li>
          <li>Es werden keine Cookies gesetzt und keine Informationen auf deinem Endgerät gespeichert, die einer Einwilligung bedürfen.</li>
          <li>Schriftarten werden lokal von unserem Server ausgeliefert. Es werden keine externen Skripte oder Schriftdienste geladen.</li>
          <li>Kontakt ist ausschließlich per E-Mail möglich; die Website selbst erhebt keine Formulardaten.</li>
        </ul>
      </section>

      <section>
        <h2>3. Hosting und Server-Logfiles</h2>
        <p>
          Diese Website wird bei folgendem Anbieter gehostet: <Todo>Hosting-Anbieter mit Anschrift ergänzen</Todo>. Beim Aufruf
          der Website verarbeitet der Server technisch notwendige Daten, insbesondere IP-Adresse, Datum und Uhrzeit des
          Abrufs, aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem.
        </p>
        <p>
          Die Verarbeitung erfolgt zur sicheren und stabilen Bereitstellung der Website auf Grundlage unseres berechtigten
          Interesses (Art. 6 Abs. 1 lit. f DSGVO). Logfiles werden nach <Todo>Speicherdauer ergänzen</Todo> gelöscht, sofern
          sie nicht zur Aufklärung eines Sicherheitsvorfalls benötigt werden. Mit dem Hosting-Anbieter besteht ein Vertrag zur
          Auftragsverarbeitung gemäß Art. 28 DSGVO. <Todo>Bestätigen; bei Anbietern außerhalb der EU Angaben zur Drittlandübermittlung ergänzen</Todo>
        </p>
      </section>

      <section>
        <h2>4. Kontakt per E-Mail</h2>
        <p>
          Wenn du uns per E-Mail kontaktierst, verarbeiten wir die von dir übermittelten Angaben (z. B. Name, E-Mail-Adresse,
          Unternehmen, Telefonnummer und Nachricht), um deine Anfrage zu beantworten und ein mögliches Strategiegespräch
          vorzubereiten.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit deine Anfrage auf eine Zusammenarbeit gerichtet ist, im
          Übrigen unser berechtigtes Interesse an der Beantwortung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Wir löschen
          die Daten, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
        <p>
          E-Mail-Anbieter: <Todo>Anbieter des E-Mail-Postfachs für {site.email} ergänzen</Todo>
        </p>
      </section>

      <section>
        <h2>5. Online-Terminbuchung</h2>
        <p>
          Eine Online-Terminbuchung ist derzeit noch nicht aktiv. Sobald wir ein Buchungstool einbinden, ergänzen wir hier
          Angaben zu Anbieter, verarbeiteten Daten, Rechtsgrundlage und ggf. Drittlandübermittlung.{" "}
          <Todo>Vor Aktivierung des Buchungstools ergänzen</Todo>
        </p>
      </section>

      <section>
        <h2>6. Cookies und Speicherung auf deinem Endgerät</h2>
        <p>
          Diese Website verwendet keine Cookies und greift nicht auf Informationen auf deinem Endgerät zu, die nicht
          unbedingt erforderlich sind (§ 25 TDDDG). Deshalb zeigen wir kein Cookie- oder Einwilligungsbanner an. Sollten wir
          künftig einwilligungsbedürftige Technologien einsetzen, holen wir vorher deine Einwilligung ein.
        </p>
      </section>

      <section>
        <h2>7. Datenverarbeitung im Rahmen vorqualifizierter Beratungstermine</h2>
        <p>
          Im Rahmen unserer Dienstleistung sprechen wir Interessenten an, die über Kampagnen Interesse an einer
          Finanzberatung bekundet haben, erfragen ihr Beratungsanliegen und vereinbaren auf Wunsch einen Termin mit einem
          Finanzdienstleister.
        </p>
        <h3>Verarbeitete Daten</h3>
        <p>
          Kontaktdaten sowie – abhängig vom jeweiligen Beratungsziel und nur soweit erforderlich – Angaben zur beruflichen
          Situation, zur familiären Situation, zur Wohnsituation und zum Beratungsanliegen.
        </p>
        <h3>Zweck, Rechtsgrundlage und Empfänger</h3>
        <p>
          Die Daten dienen der Vereinbarung und Vorbereitung des Beratungsgesprächs. Sie werden an den jeweiligen
          Finanzdienstleister übermittelt, mit dem der Termin vereinbart wird. Interessenten werden bei der Erhebung über
          diese Weitergabe informiert. <Todo>Rechtsgrundlage festlegen und prüfen (z. B. Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 6 Abs. 1 lit. b DSGVO)</Todo>
        </p>
        <p>
          <Todo>
            Rollenverteilung zwischen KAYCO und den Finanzdienstleistern klären (Auftragsverarbeitung, gemeinsame oder
            getrennte Verantwortlichkeit) und entsprechende Verträge abschließen
          </Todo>
        </p>
        <p>
          <Todo>
            Eingesetzte Werbe- und Kampagnenplattformen, Formular- und CRM-Tools sowie Speicherdauer ergänzen; separate
            Datenschutzhinweise für Interessenten an der jeweiligen Erhebungsstelle bereitstellen
          </Todo>
        </p>
      </section>

      <section>
        <h2>8. Deine Rechte</h2>
        <p>Du hast nach der DSGVO insbesondere folgende Rechte:</p>
        <ul>
          <li>Auskunft über die zu deiner Person gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)</li>
          <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>
          Zur Ausübung deiner Rechte genügt eine E-Mail an <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>

      <section>
        <h2>9. Beschwerderecht</h2>
        <p>
          Du kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns zuständig ist: Landesbeauftragte für
          Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.
        </p>
      </section>

      <section>
        <h2>10. Verschlüsselung</h2>
        <p>Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung (erkennbar an „https://“ in der Adresszeile).</p>
      </section>
    </LegalPage>
  );
}
