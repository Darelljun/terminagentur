/** Inhaltsmodell der Startseite. Texte stehen in `src/content/kayco.ts`, die Gestaltung in `src/components/landing`. */

export type Link = { label: string; href: string }

export type Stat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }

export type Service = { title: string; text: string; tags: string[]; time: string }

/** Selbst gehostetes Video (MP4) mit Vorschaubild – ohne Drittanbieter, daher datenschutzfreundlich. */
export type Video = { src: string; poster?: string; title: string }

export type Testimonial = { name: string; role?: string; video: Video }

export type Step = { name: string; when: string; title: string; text: string }

export type Faq = { q: string; a: string }

export type LandingContent = {
  brand: string
  links: Link[]
  hero: { pre: string; lead: string; words: string[]; tail: string; intro: string; sub: string; founders: string; video?: Video }
  services: { items: Service[] }
  process: { title: string; steps: Step[] }
  proof: Stat[]
  testimonials: { title: string; items: Testimonial[] }
  faq: { title: string; text: string; items: Faq[] }
  cta: { title: string; text: string; button: string }
  footer: { claim: string; columns: { title: string; links: Link[] }[]; note: string; copyright: string }
  email: string
}
