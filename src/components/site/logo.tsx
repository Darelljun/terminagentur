import { cn } from "@/lib/utils";

/** Bildmarke: ein Kalenderblatt, in dem ein Termin gesetzt ist. */
export function LogoMark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  const tile = inverse ? "#ffffff" : "#0b0b0d";
  const ink = inverse ? "#0b0b0d" : "#ffffff";
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)}>
      <rect x="1" y="1" width="30" height="30" rx="9" fill={tile} />
      <rect x="7" y="9" width="18" height="2" rx="1" fill={ink} opacity="0.35" />
      <rect x="7" y="14" width="10" height="9" rx="2.5" fill={ink} />
      <circle cx="22" cy="18.5" r="2.25" fill="#2FBF85" />
    </svg>
  );
}

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", inverse ? "text-white" : "text-ink", className)}>
      <LogoMark inverse={inverse} />
      <span className="text-[1.0625rem] font-semibold tracking-[0.14em]">KAYCO</span>
    </span>
  );
}
