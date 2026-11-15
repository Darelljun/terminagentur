"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/reveal";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

/** Schwebende CTA-Leiste auf Smartphones: erscheint nach dem Hero, verschwindet am Kontaktbereich. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("kontakt");
    let contactVisible = false;
    const update = () => setShow(window.scrollY > window.innerHeight * 0.5 && !contactVisible);
    const io = new IntersectionObserver(([e]) => {
      contactVisible = e.isIntersecting;
      update();
    });
    if (contact) io.observe(contact);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 sm:hidden"
        >
          <div className="glass flex items-center gap-3 rounded-full p-1.5 pl-4 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.35)] ring-1 ring-black/[0.08]">
            <span className="h-3 w-5 shrink-0 rounded-[4px] bg-signal" aria-hidden="true" />
            <p className="min-w-0 flex-1 truncate text-[0.8125rem] font-medium text-ink">30 Termine garantiert</p>
            <a href="#kontakt" className={cn(buttonStyles({ size: "sm" }), "h-11 px-5")}>
              Gespräch anfragen
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
