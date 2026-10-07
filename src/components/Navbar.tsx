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
 * So the hierarchy is visual rather than structural: "Smart Vizion" is a
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
  heading: "Smart Vizion",
  blurb: "Facial-recognition access, attendance and alerts.",
  items: PRODUCT_VERTICALS,
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /* The mobile Product row is a disclosure of its own. It starts open when
     the reader is already somewhere under /product, so the sheet shows them
     where they are rather than hiding it behind a tap. */
  const [mobileProduct, setMobileProduct] = useState(false);
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
      {/* One flat bar across the full width, rather than a floating pill
          with the mark on a badge of its own.

          It carries no ground of its own at the top of a page, where it
          always sits over a violet section, and takes the paper surface
          once the reader scrolls. The two states need opposite inks, which
          is what nav-on-dark does: it re-points the role tokens the way the
          surface scopes do, so the links, the disclosure and the Button all
          follow without a single light-mode special case between them. */}
      <motion.header
        className={
          "fixed inset-x-0 top-0 z-nav border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
          (open
            ? "border-border bg-paper"
            : lifted
              ? "glass border-border bg-surface/92 backdrop-blur-xl"
              : "nav-on-dark border-transparent bg-transparent")
        }
        initial={false}
        animate={{ y: hidden ? "-130%" : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE_GLIDE }}
      >
        <motion.div
          initial={reduce ? false : { y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="safe-x mx-auto flex h-20 w-full max-w-[1480px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-[5.5rem] lg:px-10"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="DYCH Technologies, home"
          >
            <Image
              /* The mark in its cream dome, not the full lockup. The new
                 lockup carries the wordmark and the script tagline, and at
                 this height neither is legible - the mark alone is what
                 reads, with the name set in the site's own type beside it. */
              src="/logo/dych-mark-v2.png"
              alt=""
              aria-hidden
              width={320}
              height={222}
              priority
              className="h-10 w-auto lg:h-12"
            />
            {/* Both words at one size, the way the supplied lockup sets
                them. TECHNOLOGIES keeps its wider tracking and lighter
                weight, which is what separates the two without shrinking
                either. */}
            <span className="font-display text-[1rem] font-medium leading-none tracking-[-0.01em] text-foreground sm:text-[1.125rem]">
              DYCH
              <span className="ml-1.5 font-normal tracking-[0.12em] text-muted sm:ml-2 sm:tracking-[0.14em]">
                TECHNOLOGIES
              </span>
            </span>
          </Link>

        {/* The links take the middle rather than crowding the right edge,
            so the bar carries its full width instead of leaving a dead
            stretch between the mark and the menu. */}
        <nav aria-label="Primary" className="flex flex-1 items-center justify-end gap-1 lg:justify-center lg:gap-2">
          <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
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
                  "relative flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-300 xl:px-3.5 " +
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
                    <div className="nav-panel min-w-[17.5rem] rounded-card border border-border bg-surface p-2 shadow-[var(--shade-lift)]">
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
                      "relative block whitespace-nowrap rounded-full px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-300 xl:px-3.5 " +
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
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden lg:block">
            <Button href="/contact" size="md">Book a Demo</Button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!open) setMobileProduct(pathname.startsWith("/product"));
              setOpen((v) => !v);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative -mr-1.5 flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-300 active:scale-[0.94] lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {/* Two bars that rotate and translate into an X, rather than
                swapping one icon for another. Both bars sit at top-0 and move
                on `y`, so this animates transform only and never layout. */}
            <span aria-hidden className="relative block h-[0.875rem] w-[1.375rem]">
              <motion.span
                className="absolute left-0 top-0 block h-[2px] w-full rounded-full bg-foreground"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE_GLIDE }}
              />
              <motion.span
                className="absolute left-0 top-[6px] block h-[2px] w-full rounded-full bg-foreground"
                animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.4 : 1 }}
                transition={{ duration: 0.25, ease: EASE_GLIDE }}
              />
              <motion.span
                className="absolute left-0 top-0 block h-[2px] w-full rounded-full bg-foreground"
                animate={open ? { y: 6, rotate: -45 } : { y: 12, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE_GLIDE }}
              />
            </span>
          </button>
        </div>
        </motion.div>
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
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={pathname === link.href ? "page" : undefined}
                          className={
                            "block flex-1 py-3.5 text-xl font-semibold tracking-tight transition-colors duration-300 " +
                            (isActive(link.href) ? "text-accent-on-light" : "text-foreground")
                          }
                        >
                          {link.label}
                        </Link>

                        {link.href === "/product" && (
                          <button
                            type="button"
                            onClick={() => setMobileProduct((v) => !v)}
                            aria-expanded={mobileProduct}
                            aria-controls="mobile-product"
                            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-muted transition-colors duration-300"
                          >
                            <span className="sr-only">
                              {mobileProduct ? "Hide" : "Show"} product pages
                            </span>
                            <motion.span
                              aria-hidden
                              className="flex"
                              animate={{ rotate: mobileProduct ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: EASE_GLIDE }}
                            >
                              <CaretDown size={18} weight="bold" />
                            </motion.span>
                          </button>
                        )}
                      </div>

                      {/* The two verticals, indented under Product rather than
                          behind a second tap. A nested flyout on touch is the
                          pattern this menu exists to avoid; on mobile there is
                          room to simply show both. */}
                      {link.href === "/product" && mobileProduct && (
                        <ul id="mobile-product" className="-mt-1 flex flex-col pb-4 pl-5">
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
