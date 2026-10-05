"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { NAV_LINKS, CONTACT, PRODUCT_VERTICALS } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_GLIDE = [0.32, 0.72, 0, 1] as const;

/**
 * The Product panel: the software name, then the two verticals under it.
 *
 * ONE PANEL, NOT A NESTED FLYOUT. The hierarchy asked for is Product > Smart
 * Vision > Schools / Business, but building that as a sub-flyout of a
 * sub-flyout is a known bad pattern - it is fiddly on desktop hover, where
 * the pointer has to cross two panels without falling out of either, and on
 * a touch device it is worse still, because a third level has no hover to
 * open it and needs a tap target that then fights the tap that navigates.
 *
 * So the hierarchy is visual rather than structural: "Smart Vision" is a
 * plain heading at the top of one panel, and the two verticals are the only
 * clickable items in it. Reads the same, behaves like a single menu.
 *
 * The seven capability anchors that used to live here are gone. They pointed
 * into a single /product page that has since become three, and a menu of
 * seven anchors was already the longest thing in the nav.
 */
const PRODUCT_MENU = {
  /* The software name, and the panel's link to the product overview. The
     verticals under it are the other two destinations. */
  heading: "Smart Vision",
  blurb: "Facial-recognition access, attendance and alerts.",
  items: PRODUCT_VERTICALS,
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const productRef = useRef<HTMLLIElement>(null);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setLifted(y > 24);

    const prev = lastY.current;
    lastY.current = y;

    if (open || menuOpen || y < 32) {
      setHidden(false);
      return;
    }

    if (y > prev + 6) setHidden(true);
    else if (y < prev - 6) setHidden(false);
  });

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
      <motion.header
        className="safe-x pointer-events-none fixed inset-x-0 top-0 z-nav flex items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10"
        initial={false}
        animate={{ y: hidden ? "-130%" : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE_GLIDE }}
      >
        <Link
          href="/"
          className={
            "glass pointer-events-auto ml-4 flex size-[3.75rem] shrink-0 items-center justify-center rounded-full border p-1.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:ml-6 sm:size-[4.25rem] sm:p-2 lg:ml-8 " +
            (lifted
              ? "border-transparent bg-surface/90 shadow-[var(--shade)]"
              : "border-transparent bg-surface/70")
          }
          aria-label="DYCH Technologies, home"
        >
          <Image
            /* The mark in its cream dome, not the full lockup. The new
               lockup carries the wordmark and the script tagline, and at
               60px across a pill neither is legible - the mark alone is
               what reads at this size. */
            src="/logo/dych-mark-v2.png"
            alt="DYCH Technologies"
            width={320}
            height={222}
            priority
            className="h-full w-full object-contain"
          />
        </Link>

        <motion.nav
          aria-label="Primary"
          initial={reduce ? false : { y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className={
            "glass pointer-events-auto flex h-11 w-fit items-center gap-0.5 rounded-full border pl-1.5 pr-1.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:h-12 lg:gap-0.5 lg:pl-1.5 lg:pr-1.5 " +
            (lifted
              ? "border-transparent bg-surface/90 shadow-[var(--shade)]"
              : "border-transparent bg-surface/70")
          }
        >
          <ul className="hidden items-center gap-0.5 lg:flex">
            {/* Product is a disclosure rather than a link: it reveals the
                software name and the two verticals under it. */}
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
                  "relative flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300 xl:px-2.5 " +
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
                    className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-accent-line"
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
                    <div className="min-w-[17.5rem] rounded-card bg-surface p-2 shadow-[var(--shade-lift)]">
                      {/* The software name, and the way in to /product.
                          It was a plain label, which left that page with no
                          route to it anywhere on desktop: the trigger is a
                          disclosure rather than a link, and the panel listed
                          only the verticals. The overview is where the two
                          verticals are explained as one product, so it has
                          to be reachable. */}
                      <Link
                        id="product-menu-heading"
                        href="/product"
                        aria-current={pathname === "/product" ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-[calc(var(--radius-card)-0.25rem)] px-3.5 pb-2 pt-2.5 text-sm font-semibold tracking-[-0.01em] text-foreground transition-colors duration-200 hover:bg-wash"
                      >
                        {PRODUCT_MENU.heading}
                        <span className="mt-0.5 block text-[0.8125rem] font-normal leading-snug text-faint">
                          {PRODUCT_MENU.blurb}
                        </span>
                      </Link>
                      <ul
                        aria-labelledby="product-menu-heading"
                        className="mt-1 border-t border-border pt-1"
                      >
                        {PRODUCT_MENU.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              aria-current={
                                pathname === item.href ? "page" : undefined
                              }
                              onClick={() => setMenuOpen(false)}
                              className="block rounded-[calc(var(--radius-card)-0.25rem)] px-3.5 py-2.5 transition-colors duration-200 hover:bg-wash"
                            >
                              <span className="block text-sm font-medium text-foreground">
                                {item.label}
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-faint">
                                {item.note}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
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
                      "relative block whitespace-nowrap rounded-full px-2 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300 xl:px-2.5 " +
                      (active ? "text-foreground" : "text-muted hover:text-foreground")
                    }
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-accent-soft ring-1 ring-accent-line"
                        transition={{ duration: 0.45, ease: EASE_GLIDE }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Button href="/contact" size="sm">Book a Demo</Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface/60 transition-transform duration-300 active:scale-[0.94] lg:hidden"
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
      </motion.header>

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
            className="glass fixed inset-0 z-menu overflow-y-auto overscroll-contain bg-paper/95 backdrop-blur-2xl lg:hidden"
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
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={
                          "block py-4 text-2xl font-semibold tracking-tight transition-colors duration-300 " +
                          (isActive(link.href) ? "text-accent-on-light" : "text-foreground")
                        }
                      >
                        {link.label}
                      </Link>

                      {/* The two verticals, indented under Product rather than
                          behind a second tap. A nested flyout on touch is the
                          pattern this menu exists to avoid; on mobile there is
                          room to simply show both. */}
                      {link.href === "/product" && (
                        <ul className="-mt-1 flex flex-col pb-4 pl-5">
                          {PRODUCT_VERTICALS.map((v) => (
                            <li key={v.href}>
                              <Link
                                href={v.href}
                                onClick={() => setOpen(false)}
                                aria-current={
                                  pathname === v.href ? "page" : undefined
                                }
                                className={
                                  "block border-l border-border py-2.5 pl-5 text-lg font-medium transition-colors duration-300 " +
                                  (pathname === v.href
                                    ? "text-accent-on-light"
                                    : "text-muted hover:text-foreground")
                                }
                              >
                                {v.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
                <Button
                  href="/contact"
                  size="lg"
                  onClick={() => setOpen(false)}
                  className="w-fit"
                >
                  Book a Demo
                </Button>
                <a
                  href={CONTACT.phones[0].href}
                  className="nums text-sm text-link underline decoration-[var(--link-rule)] decoration-2 underline-offset-4 transition-colors duration-300 hover:text-link-hover"
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
