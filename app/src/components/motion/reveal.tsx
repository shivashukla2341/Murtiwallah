"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** Quiet viewport-triggered fade/slide-up, per the design system's "whisper,
 *  not drama" motion direction — used to bring each section in once. Honors
 *  prefers-reduced-motion (WCAG 2.3.3) by skipping the animation entirely.
 *
 *  The viewport margin is a positive lookahead on the bottom edge (not a
 *  negative one) so the fade-in finishes *before* a section scrolls into
 *  view, rather than after — otherwise, on a fast mobile scroll, sections
 *  sit at opacity:0 while already on-screen, reading as a blank flash. The
 *  `.reveal` class below is a CSS-only safety net (globals.css) that forces
 *  full visibility on mobile widths regardless of JS/hydration timing. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 200px 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn("reveal", className)}
    >
      {children}
    </motion.div>
  );
}

export { Reveal };
