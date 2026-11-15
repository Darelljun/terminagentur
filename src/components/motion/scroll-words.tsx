"use client";

/**
 * Scrollgekoppelte Wort-Enthüllung – adaptiert vom offiziellen Motion-Beispiel
 * „Scroll word reveal“ (via 21st.dev), erweitert um Hervorhebungen und Sticky-Bühne.
 */

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";
import { cn } from "@/lib/utils";

const SPAN = 0.78;
const WINDOW = 0.18;

type Token = { text: string; accent?: boolean };

function Word({ token, progress, index, count }: { token: Token; progress: MotionValue<number>; index: number; count: number }) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPAN;
  const end = Math.min(1, start + WINDOW);
  // Start in einem Grau mit ≥ 3:1 Kontrast (große Schrift), dann volle Farbe
  const color = useTransform(progress, [start, end], token.accent ? ["#6f9e86", "#0e7a52"] : ["#8a8a90", "#0b0b0d"]);
  return (
    <motion.span aria-hidden="true" style={{ color }} className={cn(token.accent && "serif-accent")}>
      {token.text}
    </motion.span>
  );
}

/** Text in Segmenten; Segmente mit accent: true werden kursiv in Signalgrün gesetzt. */
export function ScrollWords({ segments, className }: { segments: { text: string; accent?: boolean }[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const tokens: Token[] = segments.flatMap((s) => s.text.split(" ").filter(Boolean).map((w) => ({ text: w, accent: s.accent })));
  const label = segments.map((s) => s.text).join(" ");

  return (
    <div ref={ref}>
      <p className={className}>
        <span className="sr-only">{label}</span>
        {tokens.map((t, i) => (
          <Fragment key={i}>
            {reduce ? (
              <span aria-hidden="true" className={cn(t.accent && "serif-accent text-signal")}>
                {t.text}
              </span>
            ) : (
              <Word token={t} progress={scrollYProgress} index={i} count={tokens.length} />
            )}
            {i < tokens.length - 1 ? " " : null}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
