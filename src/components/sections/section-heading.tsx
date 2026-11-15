import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-[52rem]", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="text-headline mt-4 text-ink">
        {title}
      </h2>
      {lead && (
        <p className={cn("text-lead mt-6 max-w-[40rem] text-muted-foreground", align === "center" && "mx-auto")}>{lead}</p>
      )}
    </Reveal>
  );
}
