"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { EASE_GLIDE, EASE_OUT_EXPO } from "@/lib/motion";
import { Cta } from "@/components/ui/Cta";
import { Wordmark } from "@/components/ui/Wordmark";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Integration", href: "#integration" },
  { label: "Contact Team", href: "#contact-team" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  // Discrete state flip, not a per-frame value, so React state is safe here.
  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 24));

  // Scroll-spy via IntersectionObserver. Never a scroll event listener.
  useEffect(() => {
    const nodes = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive("#" + visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  // Lock the page while the full-screen menu owns the viewport.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-nav flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          aria-label="Primary"
          initial={reduce ? false : { y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className={
            "glass pointer-events-auto flex h-[4.25rem] w-full max-w-[1180px] items-center justify-between gap-6 rounded-full border pl-5 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
            (lifted
              ? "border-line bg-surface/80 shadow-[var(--shade)]"
              : "border-transparent bg-surface/35")
          }
        >
          <a
            href="#main"
            className="flex items-center rounded-full py-2 pr-2"
            aria-label="DYCH Technologies, back to top"
          >
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 " +
                      (isActive ? "text-ink" : "text-ink-muted hover:text-ink")
                    }
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-[var(--accent-line)]"
                        transition={{ duration: 0.45, ease: EASE_GLIDE }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Cta href="#contact-team">Book a walkthrough</Cta>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface/60 transition-transform duration-300 active:scale-[0.94] lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-ink"
                animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE_GLIDE }}
              />
              <motion.span
                className="absolute left-0 block h-[1.5px] w-5 rounded-full bg-ink"
                animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE_GLIDE }}
              />
            </span>
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_GLIDE }}
            className="glass fixed inset-0 z-menu bg-canvas/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex min-h-[100dvh] flex-col justify-between px-6 pb-10 pt-28">
              <ul className="flex flex-col">
                {LINKS.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-b border-line">
                    <motion.a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={reduce ? false : { y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: reduce ? 0 : 0.06 + i * 0.06,
                        ease: EASE_OUT_EXPO,
                      }}
                      className="block py-5 font-display text-3xl font-semibold tracking-tight text-ink"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: reduce ? 0 : 0.34, ease: EASE_OUT_EXPO }}
                className="flex flex-col gap-5"
              >
                <Cta href="#contact-team" onClick={() => setOpen(false)} className="w-fit">
                  Book a walkthrough
                </Cta>
                <a
                  href="tel:+256767870035"
                  className="nums text-sm text-[var(--accent-text)]"
                >
                  +256 767 870 035
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
