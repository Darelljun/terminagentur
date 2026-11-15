import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Kapitelmarke im Stil einer Produktpräsentation: „01 — Das Problem“. */
export function Chapter({ n, label, inverse = false, className }: { n: string; label: string; inverse?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase",
        inverse ? "text-white/55" : "text-muted-foreground",
        className,
      )}
    >
      <span className={cn("tabular-nums", inverse ? "text-white" : "text-ink")}>{n}</span>
      <span aria-hidden="true" className={cn("h-px w-8", inverse ? "bg-white/25" : "bg-black/15")} />
      {label}
    </p>
  );
}

export function SectionHeading({
  id,
  chapter,
  eyebrow,
  title,
  lead,
  align = "left",
  inverse = false,
  className,
}: {
  id: string;
  chapter: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center [&_p]:justify-center", "max-w-[54rem]", className)}>
      <Chapter n={chapter} label={eyebrow} inverse={inverse} />
      <h2 id={id} className={cn("type-headline mt-5", inverse ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {lead && (
        <p className={cn("type-lead mt-6 max-w-[40rem]", inverse ? "text-white/65" : "text-muted-foreground", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
