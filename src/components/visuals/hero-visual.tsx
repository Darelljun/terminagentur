"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE } from "@/components/motion/reveal";
import { HeroCalendar } from "./hero-calendar";

/** Kalender-„Gerät“, das sich beim Scrollen aufrichtet – wie eine Produktinszenierung. */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <div ref={ref} className="container-kayco relative mt-16 sm:mt-20 [perspective:1600px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
        style={reduce ? undefined : { rotateX, scale, transformOrigin: "50% 0%" }}
      >
        <HeroCalendar />
      </motion.div>
    </div>
  );
}
