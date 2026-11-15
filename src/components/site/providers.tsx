"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respektiert prefers-reduced-motion für alle Motion-Animationen. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
