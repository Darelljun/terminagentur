/** Inhaltsmodell der Startseite. Texte stehen in `src/content/kayco.ts`, die Gestaltung in `src/components/landing`. */

export type Link = { label: string; href: string }

export type Stat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }

export type Service = { title: string; text: string; tags: string[]; time: string }

/** Welche Produktansicht eine Einblick-Karte zeigt. */
export type CaseMock = "dashboard" | "chat" | "doc" | "mobile"

export type Case = {
  client: string
  kind: string
  title: string
  metric: string
  metricLabel: string
  year: string
  mock: CaseMock
}

export type Step = { name: string; when: string; title: string; text: string }

export type Plan = {
  name: string
  /** Festpreis in Euro; `null` zeigt „Individuell“. */
  price: number | null
  unit?: string
  text: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

export type Faq = { q: string; a: string }

export type LandingContent = {
  brand: string
  links: Link[]
  status: string
  hero: { lead: string; words: string[]; tail: string; cue: string; sub: string }
  manifesto: { kicker: string; text: string }
  stats: Stat[]
  services: { kicker: string; title: string; text: string; items: Service[] }
  work: { kicker: string; title: string; next: string; items: Case[] }
  process: { kicker: string; title: string; steps: Step[] }
  pricing: { kicker: string; title: string; text: string; plans: Plan[] }
  faq: { kicker: string; title: string; text: string; items: Faq[] }
  cta: { title: string; text: string; button: string }
  footer: { claim: string; columns: { title: string; links: Link[] }[]; note: string; copyright: string }
  /** Laufband – ausschließlich wörtliche Aussagen, die bereits auf der Seite stehen. */
  marquee: string[]
  email: string
}
