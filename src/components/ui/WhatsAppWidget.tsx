"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WhatsappLogo, X } from "@phosphor-icons/react";
import { CONTACT } from "@/lib/site";

/**
 * Floating WhatsApp entry point, bottom-left.
 *
 * Bottom-LEFT deliberately. The right-hand side of the viewport is where the
 * nav pill sits and where every CTA on the site ends up, and a floating bubble
 * over a "Book a Demo" button is how these widgets earn their reputation. On
 * the left it stays out of the reading column and out of the thumb path for
 * the primary action.
 *
 * z-float is 30, below the mobile menu overlay (40) and the nav (50), so
 * opening the menu covers this rather than fighting it.
 *
 * Numbers come from CONTACT, so this cannot drift from the footer or the
 * contact page.
 */
export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Escape closes and returns focus to the trigger; a click anywhere outside
  // closes without stealing focus, which is what a dismissible panel should do.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Focus lands on the dismiss control, so the panel can be closed again from
  // the keyboard without tabbing through the numbers first.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const transition = reduce ? { duration: 0 } : { duration: 0.4, ease };

  return (
    <div
      ref={rootRef}
      className="safe-x z-float pointer-events-none fixed bottom-0 left-0 flex flex-col items-start gap-3 pb-4 sm:pb-5"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            transition={transition}
            style={{ transformOrigin: "bottom left" }}
            className="theme-light pointer-events-auto w-[min(20rem,calc(100vw-2rem))] rounded-card border border-border bg-surface p-5 text-foreground shadow-[0_24px_48px_-24px_rgba(10,14,20,0.45)]"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-lg leading-snug tracking-[-0.01em]">
                Message us on WhatsApp
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close WhatsApp panel"
                className="-mr-1.5 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-surface-raised hover:text-foreground"
              >
                <X size={16} weight="bold" aria-hidden />
              </button>
            </div>

            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              Two lines, both answered by the people who would install the system.
              Ask anything, including whether it suits your school.
            </p>

            <ul className="mt-4 flex flex-col gap-2">
              {CONTACT.whatsapp.map((number) => (
                <li key={number.href}>
                  <a
                    href={number.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nums flex items-center gap-3 rounded-full border border-border py-2.5 pl-4 pr-5 font-medium transition-[border-color,background-color] duration-300 hover:border-accent-line hover:bg-surface-raised"
                  >
                    <WhatsappLogo
                      size={18}
                      weight="fill"
                      aria-hidden
                      className="shrink-0 text-accent"
                    />
                    {number.display}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close WhatsApp panel" : "Contact us on WhatsApp"}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.6, ease }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-ink shadow-[var(--glow-cta)] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[var(--glow-cta-hover)]"
      >
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 90 : 0 }}
          transition={transition}
          className="grid place-items-center"
        >
          {open ? <X size={24} weight="bold" /> : <WhatsappLogo size={26} weight="fill" />}
        </motion.span>
      </motion.button>
    </div>
  );
}
