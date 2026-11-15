import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-premium)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-ink text-white hover:bg-[#2a2a2e] shadow-[0_1px_2px_rgb(0_0_0/0.12)]",
        secondary: "bg-white text-ink ring-1 ring-inset ring-border hover:ring-ink/30 hover:bg-white",
        ghost: "text-ink hover:bg-black/[0.04]",
        inverse: "bg-white text-ink hover:bg-white/90",
        "inverse-outline": "text-white ring-1 ring-inset ring-white/25 hover:ring-white/60",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonStyles>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
