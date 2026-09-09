"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WhatsappLogo, X } from "@phosphor-icons/react";
import { BRAND, CONTACT } from "@/lib/site";

/**
 * Floating WhatsApp entry point, bottom-RIGHT.
 *
 * It was bottom-left, on the reasoning that the right is where the nav pill
 * and every CTA live. In practice that put it underneath Next's own dev-mode
 * indicator, which occupies the bottom-left corner, so during development the
 * bubble was simply invisible. The reasoning lost to a corner that was already
 * taken; it now sits bottom-right.
 *
 * Collision check on the right: the mobile menu trigger sits in the nav bar at
 * the TOP right, not the bottom, so nothing overlaps at any width. The panel
 * opens upward from the bubble and is width-capped to the viewport.
 *
 * z-float is 30, below the mobile menu overlay (40) and the nav (50), so
 * opening the menu covers this rather than fighting it.
 *
 * The expand-to-panel behaviour was already built and working - click, Escape,
 * click-outside and focus handling all verified. What changed here beyond the
 * corner: the panel gained a named header so it reads as a conversation
 * opening rather than a link list, and the trigger lost its solid accent fill
 * and glow to match the interactive spec.
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
      className="safe-x z-float pointer-events-none fixed bottom-0 right-0 flex flex-col items-end gap-3 pb-4 sm:pb-5"
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
            style={{ transformOrigin: "bottom right" }}
            className="pointer-events-auto w-[min(20.5rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-border bg-surface text-left text-foreground shadow-[var(--shade)]"
          >
            {/* Named header, so the panel reads as a conversation opening
                rather than a bare link list. */}
            <div className="flex items-start justify-between gap-4 border-b border-border bg-wash px-5 py-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-accent-line bg-surface text-accent-on-light"
                >
                  <WhatsappLogo size={22} weight="light" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold leading-tight">
                    {BRAND.name}
                  </span>
                  <span className="block text-[0.8125rem] leading-tight text-muted">
                    Answered by a person, not a bot
                  </span>
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close WhatsApp panel"
                className="-mr-1.5 grid size-8 shrink-0 place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground"
              >
                <X size={16} weight="bold" aria-hidden />
              </button>
            </div>

            <div className="px-5 py-5">
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                Two lines, both answered by the people who would install the
                system. Ask anything, including whether it suits your school or
                your business.
              </p>

              <ul className="mt-4 flex flex-col gap-2">
                {CONTACT.whatsapp.map((number) => (
                  <li key={number.href}>
                    <a
                      href={number.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nums flex items-center gap-3 rounded-full border border-accent px-4 py-2.5 font-semibold text-accent-on-light transition-colors duration-150 ease-out hover:bg-accent hover:text-accent-ink"
                    >
                      <WhatsappLogo
                        size={18}
                        weight="fill"
                        aria-hidden
                        className="shrink-0"
                      />
                      {number.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The trigger is an outline, like every other control on the site. It
          was a solid accent disc with a glow, which was one of the last places
          a fill survived. */}
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
        className="pointer-events-auto grid size-14 place-items-center rounded-full border border-accent bg-surface text-accent-on-light shadow-[var(--shade-accent)] transition-colors duration-150 ease-out hover:bg-accent hover:text-accent-ink"
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
