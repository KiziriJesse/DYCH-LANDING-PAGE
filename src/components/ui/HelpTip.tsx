"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Question } from "@phosphor-icons/react";

/**
 * A small "how does this work?" chip that opens a short plain-language
 * explanation in place.
 *
 * It exists so a claim can be explained where the reader meets it, rather
 * than sending them off to hunt through an FAQ. That only holds while it is
 * rare: a page with one of these has an answer waiting, a page with six has
 * copy that is not doing its job. Three on the whole site at the time of
 * writing - pricing, the on-device claim, and the calculator.
 *
 * The chip is a real button with aria-expanded and aria-controls, so a
 * screen reader announces it as a disclosure and names the panel it owns.
 * Escape closes it and returns focus to the chip; a pointer down anywhere
 * outside closes it without stealing focus. Both are modelled on the
 * Navbar's Product disclosure, which behaves the same way.
 *
 * THE PANEL IS IN FLOW, NOT A FLOATING POPOVER. It was floating first, and
 * it broke in both places it was used: inside a SpotlightCard the card's
 * overflow clip cut it in half, and on the homepage the violet section below
 * it paints in its own stacking context, so the panel passed underneath it.
 * Both are fixable with portals and collision detection; neither is worth
 * that for four sentences of explanation. Opening in flow pushes the content
 * under it down instead, which can never be clipped or covered.
 *
 * It takes its colours from the surface scope it sits in, so the same chip
 * works on paper and inside a violet or recessed section with no variant.
 */
export function HelpTip({
  label = "How does this work?",
  title,
  children,
  className = "",
}: {
  /** The chip's own text. Kept short; it sits inline beside a claim. */
  label?: string;
  /** Optional heading inside the panel. */
  title?: string;
  /** The explanation. A few sentences at most. */
  children: React.ReactNode;
  className?: string;
}) {
  const uid = useId();
  const panelId = `${uid}-help`;
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Focus goes back to the chip, or Escape strands the keyboard user at
      // the top of the document.
      buttonRef.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <span ref={wrapRef} className={`flex flex-col items-start ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-soft px-2.5 py-1 text-[0.75rem] font-medium leading-none text-accent-on-light transition-colors duration-200 hover:border-accent"
      >
        <Question size={13} weight="bold" aria-hidden />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            id={panelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="mt-2 block w-full max-w-[26rem] rounded-card border border-border-strong bg-surface p-4 text-left"
          >
            {title && (
              <span className="block text-[0.8125rem] font-semibold text-foreground">
                {title}
              </span>
            )}
            <span
              className={
                "block text-[0.8125rem] leading-relaxed text-muted " +
                (title ? "mt-1.5" : "")
              }
            >
              {children}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
