"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { NAV_LINKS, CONTACT } from "@/lib/site";
import { Cta } from "@/components/ui/Cta";
import { Wordmark } from "@/components/ui/Wordmark";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_GLIDE = [0.32, 0.72, 0, 1] as const;

/** The five capabilities, as anchors into /product. */
const PRODUCT_MENU = [
  { label: "Facial Recognition", href: "/product#security" },
  { label: "Attendance", href: "/product#attendance" },
  { label: "Parent Alerts", href: "/product#communication" },
  { label: "Fees & Finance", href: "/product#finance" },
  { label: "Analytics", href: "/product#analytics" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const productRef = useRef<HTMLLIElement>(null);

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

  // The Product disclosure closes on Escape and on a pointer down elsewhere.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!productRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const productActive = isActive("/product");

  return (
    <>
      {/* Floating island, now weighted to the right rather than centred. The
          pill carries .theme-light so its own contents resolve against a light
          ground: dark ink, a white surface and the deeper light accent. That
          also settles the wordmark, which would otherwise still be set in the
          dark scope's near-white. */}
      <header className="safe-x pointer-events-none fixed inset-x-0 top-0 z-nav flex justify-end px-4 pt-4 sm:pt-5">
        <motion.nav
          aria-label="Primary"
          initial={reduce ? false : { y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className={
            "theme-light glass pointer-events-auto flex h-[4.25rem] w-full max-w-[1240px] items-center justify-between gap-4 rounded-full border pl-5 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
            (lifted
              ? "border-border bg-white/90 shadow-[var(--shade)]"
              : "border-transparent bg-white/70")
          }
        >
          <Link
            href="/"
            className="flex items-center rounded-full py-2 pr-2"
            aria-label="DYCH Technologies, home"
          >
            <Wordmark
              sublineClass="hidden xl:block"
              textClass="text-base xl:text-[1.0625rem]"
              markHeight={32}
              priority
            />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {/* Product is a disclosure rather than a link: it reveals the five
                capabilities as anchors into /product. */}
            <li
              ref={productRef}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setMenuOpen(true);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setMenuOpen(false);
              }}
            >
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="product-menu"
                // The trigger stands in for the Product route now that it is a
                // disclosure rather than a link, so it still has to carry the
                // current-page signal. Without this, /product is the one route
                // with no announced nav state.
                aria-current={productActive ? "page" : undefined}
                onClick={() => setMenuOpen((v) => !v)}
                className={
                  "relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors duration-300 xl:px-3 " +
                  (productActive ? "text-foreground" : "text-muted hover:text-foreground")
                }
              >
                Product
                <motion.span
                  aria-hidden
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_GLIDE }}
                  className="flex"
                >
                  <CaretDown size={12} weight="bold" />
                </motion.span>
                {productActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-[var(--accent-line)]"
                    transition={{ duration: 0.45, ease: EASE_GLIDE }}
                  />
                )}
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    id="product-menu"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE_GLIDE }}
                    // pt-3 rather than mt-3: the pointer must not cross a gap
                    // between the trigger and the panel.
                    className="absolute left-0 top-full pt-3"
                  >
                    <ul className="min-w-[15rem] rounded-[1.25rem] border border-border bg-surface p-2 shadow-[var(--shade-lift)]">
                      {PRODUCT_MENU.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-[0.75rem] px-3.5 py-2.5 text-sm font-medium text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-foreground"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {NAV_LINKS.filter((l) => l.href !== "/product").map((link) => {
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
            // Light, to match the now-light nav trigger floating above it.
            className="theme-light glass fixed inset-0 z-menu overflow-y-auto overscroll-contain bg-background/95 backdrop-blur-2xl lg:hidden"
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
