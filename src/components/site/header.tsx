"use client";

/**
 * Navigation – adaptiert von der 21st.dev-Komponente
 * „Floating Glassmorphic Navbar with Morphing Pill Indicator“ (themeocean),
 * umgestellt auf motion/react, KAYCO-Tokens und Sektionsanker.
 */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button-link";
import { Logo } from "./logo";

const SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 } as const;

type Item = { label: string; href: string; id: string };

function NavLinks({
  items,
  active,
  hovered,
  layoutId,
  vertical = false,
  dark = false,
  reduceMotion,
  onHover,
  onSelect,
}: {
  items: Item[];
  active: string;
  hovered: string | null;
  layoutId: string;
  vertical?: boolean;
  dark?: boolean;
  reduceMotion: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className={cn("flex", vertical ? "flex-col gap-0.5" : "items-center gap-0.5")}>
      {items.map((item) => {
        const isActive = item.id === active;
        const isHovered = item.id === hovered;
        const lit = isHovered || (hovered === null && isActive);
        return (
          <li key={item.id}>
            <a
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              onClick={() => onSelect(item.id)}
              onPointerEnter={(e) => e.pointerType === "mouse" && onHover(item.id)}
              onPointerLeave={() => onHover(null)}
              className={cn(
                "relative isolate flex items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200",
                vertical ? "min-h-12 px-4 text-base" : "h-9",
                dark ? (lit ? "text-white" : "text-white/60") : lit ? "text-ink" : "text-muted-foreground",
                // Aktiver Abschnitt: reine CSS-Hervorhebung (keine Layout-Animation, stört kein Scrollen)
                isActive && hovered === null && (dark ? "bg-white/10" : "bg-black/[0.05]"),
              )}
            >
              {/* Morphende Hover-Pille nach 21st.dev – nur bei Mauszeiger, nie scrollgesteuert */}
              {isHovered && (
                <motion.span
                  layoutId={layoutId}
                  aria-hidden="true"
                  transition={reduceMotion ? { duration: 0 } : SPRING}
                  className={cn("absolute inset-0 -z-10 rounded-full", dark ? "bg-white/10" : "bg-black/[0.05]")}
                />
              )}
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Header({ onHome = true }: { onHome?: boolean }) {
  const base = onHome ? "" : "/";
  const items: Item[] = navItems.map((n) => ({ ...n, href: `${base}#${n.id}` }));
  const ctaHref = `${base}#kontakt`;

  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopId = useId();
  const mobileId = useId();
  const panelId = useId();
  const reduceMotion = useReducedMotion() ?? false;

  const handleSelect = useCallback((id: string) => {
    setActive(id);
    setOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const probe = 44;
      setDark(
        [...document.querySelectorAll<HTMLElement>("[data-nav-theme=dark]")].some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= probe && r.bottom >= probe;
        }),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Aktiven Abschnitt beim Scrollen hervorheben (nur auf der Startseite).
  useEffect(() => {
    if (!onHome) return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (inView) setActive(inView.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    const onTop = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onResize = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wide.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wide.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      <motion.div
        ref={rootRef}
        initial={reduceMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28, delay: 0.15 }}
        className="pointer-events-auto relative w-full max-w-[1100px]"
      >
        <nav
          aria-label="Hauptnavigation"
          className={cn(
            "relative flex items-center justify-between gap-3 rounded-full py-1.5 pr-1.5 pl-4 ring-1 transition-[background-color,box-shadow] duration-300",
            dark ? "glass-dark ring-white/10" : "glass ring-black/[0.06]",
            scrolled ? "shadow-[0_12px_40px_-12px_rgb(0_0_0/0.18)]" : "shadow-[0_4px_20px_-10px_rgb(0_0_0/0.10)]",
          )}
        >
          <a href={onHome ? "#top" : "/"} className="rounded-full py-1.5" aria-label="KAYCO – zur Startseite">
            <Logo inverse={dark} />
          </a>

          <div className="hidden lg:block">
            <NavLinks
              items={items}
              active={active}
              hovered={hovered}
              layoutId={`pill-${desktopId}`}
              dark={dark}
              reduceMotion={reduceMotion}
              onHover={setHovered}
              onSelect={handleSelect}
            />
          </div>

          <div className="flex items-center gap-1">
            <a href={ctaHref} className={cn(buttonStyles({ size: "sm", variant: dark ? "inverse" : "primary" }), "hidden h-10 px-5 sm:inline-flex")}>
              Strategiegespräch
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className={cn(
                "relative flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors lg:hidden",
                dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-black/[0.05]",
              )}
            >
              <span aria-hidden="true" className="relative block h-3 w-[18px]">
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-300 motion-reduce:transition-none",
                    open ? "top-[5px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-[18px] rounded-full bg-current transition-all duration-300 motion-reduce:transition-none",
                    open ? "top-[5px] -rotate-45" : "top-[10px]",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id={panelId}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={reduceMotion ? { duration: 0.1 } : SPRING}
              style={{ transformOrigin: "top center" }}
              className="glass absolute inset-x-0 top-full mt-2 rounded-[28px] p-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.25)] ring-1 ring-black/[0.06] lg:hidden"
            >
              <NavLinks
                items={items}
                active={active}
                hovered={hovered}
                layoutId={`pill-${mobileId}`}
                vertical
                reduceMotion={reduceMotion}
                onHover={setHovered}
                onSelect={handleSelect}
              />
              <div className="mt-2 border-t border-black/[0.06] p-1 pt-3">
                <a href={ctaHref} onClick={() => setOpen(false)} className={cn(buttonStyles({ size: "md" }), "w-full")}>
                  Strategiegespräch vereinbaren
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
