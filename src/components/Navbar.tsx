"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { NAV_LINKS, CONTACT } from "@/lib/site";
import { Cta } from "@/components/ui/Cta";
import { Wordmark } from "@/components/ui/Wordmark";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_GLIDE = [0.32, 0.72, 0, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  // A discrete flip, not a per-frame value, so React state is safe here.
  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 24));

  // Menu links close the overlay on click. This effect only subscribes to
  // external events: Escape, and back/forward navigation that no click of
  // ours produced.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPop = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Floating island rather than an edge-to-edge bar glued to the top. */}
      <header className="safe-x pointer-events-none fixed inset-x-0 top-0 z-nav flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          aria-label="Primary"
          initial={reduce ? false : { y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className={
            "glass pointer-events-auto flex h-[4.25rem] w-full max-w-[1240px] items-center justify-between gap-4 rounded-full border pl-5 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
            (lifted
              ? "border-border bg-surface/85 shadow-[var(--shade)]"
              : "border-transparent bg-surface/40")
          }
        >
          <Link
            href="/"
            className="flex items-center rounded-full py-2 pr-2"
            aria-label="DYCH Technologies, home"
          >
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      "relative block whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors duration-300 xl:px-3 " +
                      (active ? "text-foreground" : "text-muted hover:text-foreground")
                    }
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-[var(--accent-line)]"
                        transition={{ duration: 0.45, ease: EASE_GLIDE }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Cta href="/contact">Book a Demo</Cta>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface/60 transition-transform duration-300 active:scale-[0.94] lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {/* Two bars that rotate and translate into an X, rather than
                swapping one icon for another. Both bars sit at top-0 and move
                on `y`, so this animates transform only and never layout. */}
            <span aria-hidden className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 top-0 block h-[1.5px] w-5 rounded-full bg-foreground"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE_GLIDE }}
              />
              <motion.span
                className="absolute left-0 top-0 block h-[1.5px] w-5 rounded-full bg-foreground"
                animate={open ? { y: 6, rotate: -45 } : { y: 12, rotate: 0 }}
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
            className="glass fixed inset-0 z-menu overflow-y-auto overscroll-contain bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="safe-x flex min-h-[100dvh] flex-col justify-between px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href} className="overflow-hidden border-b border-border">
                    <motion.div
                      initial={reduce ? false : { y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: reduce ? 0 : 0.06 + i * 0.05,
                        ease: EASE_OUT_EXPO,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={
                          "block py-4 text-2xl font-semibold tracking-tight transition-colors duration-300 " +
                          (isActive(link.href) ? "text-accent" : "text-foreground")
                        }
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: reduce ? 0 : 0.42,
                  ease: EASE_OUT_EXPO,
                }}
                className="flex flex-col gap-5"
              >
                <Cta href="/contact" onClick={() => setOpen(false)} className="w-fit">
                  Book a Demo
                </Cta>
                <a
                  href={CONTACT.phones[0].href}
                  className="nums text-sm text-accent underline decoration-[var(--accent-line)] decoration-2 underline-offset-4"
                >
                  {CONTACT.phones[0].display}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
