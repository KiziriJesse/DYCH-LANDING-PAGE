"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* Primary navigation.
   Structure mirrors the supplied reference (two dropdowns, an active pill,
   an outlined Sign in) rendered in the Dych system: #0071e3 accent,
   ghost/outline per button.md, 1px borders instead of drop shadows (§1).

   Opens on hover (pointer) AND on click/tap (touch); closes on Escape,
   outside click, or selecting an item. Mobile uses a tap accordion. */

type Item = { href: string; text: string };
type Entry = { label: string; href?: string; items?: Item[] };

const NAV: Entry[] = [
  {
    label: "Products",
    items: [
      { href: "/#recognition", text: "Facial Recognition" },
      { href: "/#vision-one", text: "Vision One" },
    ],
  },
  {
    label: "Vision One",
    // Six user-supplied component names — real content, not invented.
    items: [
      { href: "/#vision-one", text: "Admin dashboard" },
      { href: "/#vision-one", text: "Parent Portal" },
      { href: "/#vision-one", text: "Guard app" },
      { href: "/#vision-one", text: "Camera management" },
      { href: "/#vision-one", text: "Live display" },
      { href: "/#vision-one", text: "Report card automation" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLElement>(null);
  /* True while the open menu was opened by hover rather than a deliberate
     click. Without this, hovering opens the menu and the click that follows
     immediately toggles it shut — so clicking a trigger appears to do
     nothing. A click on a hover-opened menu pins it open instead. */
  const viaHover = useRef(false);

  const hoverOpen = (label: string) => {
    viaHover.current = true;
    setOpen(label);
  };
  const hoverClose = () => {
    if (viaHover.current) {
      viaHover.current = false;
      setOpen(null);
    }
  };
  const clickToggle = (label: string) => {
    // Read state through the updater, never from this render's closure:
    // mouseenter and click can land in the same tick, so `open` here would
    // still be null and the click would close what hover just opened.
    const hovered = viaHover.current;
    viaHover.current = false;
    setOpen((prev) => {
      if (prev === label && hovered) return label; // pin a hover-opened menu
      return prev === label ? null : label;
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        viaHover.current = false;
        setOpen(null);
        setMobile(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) {
        viaHover.current = false;
        setOpen(null);
      }
    };
    const onScroll = () => setScrolled(window.scrollY > 8);

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const edge = scrolled || open ? "border-b border-[var(--ink)]/10" : "";

  return (
    <header
      ref={bar}
      className={"sticky top-0 z-50 bg-[var(--paper-pure)] " + edge}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-[var(--shell)] py-4"
      >
        <Link
          href="/#top"
          className="font-[family-name:var(--font-display)] text-lg font-light tracking-tight text-[var(--ink)]"
        >
          dych
        </Link>

        {/* ---------------- desktop ---------------- */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((e) =>
            e.items ? (
              <li
                key={e.label}
                className="relative"
                onMouseEnter={() => hoverOpen(e.label)}
                onMouseLeave={hoverClose}
              >
                <button
                  type="button"
                  aria-expanded={open === e.label}
                  aria-haspopup="true"
                  onClick={() => clickToggle(e.label)}
                  className={
                    "flex h-11 items-center gap-1.5 rounded-md px-3 text-sm transition-colors " +
                    (open === e.label
                      ? "bg-[var(--accent)]/10 text-[var(--accent-on-light)]"
                      : "text-[var(--ink)]/75 hover:text-[var(--accent-on-light)]")
                  }
                >
                  {e.label}
                  <Chevron flipped={open === e.label} />
                </button>

                {open === e.label ? (
                  <div className="absolute left-0 top-full min-w-[16rem] border border-[var(--ink)]/12 bg-[var(--paper-pure)] py-2">
                    <ul>
                      {e.items.map((it) => (
                        <li key={it.text}>
                          <a
                            href={it.href}
                            onClick={() => {
                              viaHover.current = false;
                              setOpen(null);
                            }}
                            className="flex h-11 items-center px-5 text-sm text-[var(--ink)]/80 transition-colors hover:bg-[var(--accent)]/8 hover:text-[var(--accent-on-light)]"
                          >
                            {it.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ) : (
              <li key={e.label}>
                <a
                  href={e.href}
                  className="flex h-11 items-center rounded-md px-3 text-sm text-[var(--ink)]/75 transition-colors hover:text-[var(--accent-on-light)]"
                >
                  {e.label}
                </a>
              </li>
            )
          )}

          <li className="ml-3">
            <a
              href="/sign-in"
              className="flex h-9 items-center rounded-full border border-[var(--accent)] px-4 text-sm text-[var(--accent-on-light)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--paper-pure)]"
            >
              Sign in
            </a>
          </li>
        </ul>

        {/* ---------------- mobile trigger ---------------- */}
        <button
          type="button"
          aria-expanded={mobile}
          aria-controls="mobile-nav"
          onClick={() => setMobile((v) => !v)}
          className="relative flex size-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{mobile ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex flex-col gap-[5px]">
            <span
              className={
                "block h-px w-6 bg-[var(--ink)] transition-transform duration-200 " +
                (mobile ? "translate-y-[6px] rotate-45" : "")
              }
            />
            <span
              className={
                "block h-px w-6 bg-[var(--ink)] transition-opacity duration-200 " +
                (mobile ? "opacity-0" : "")
              }
            />
            <span
              className={
                "block h-px w-6 bg-[var(--ink)] transition-transform duration-200 " +
                (mobile ? "-translate-y-[6px] -rotate-45" : "")
              }
            />
          </span>
        </button>
      </nav>

      {/* ---------------- mobile drawer ---------------- */}
      {mobile ? (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-[var(--ink)]/10 px-[var(--shell)] pb-10 md:hidden"
        >
          <ul className="divide-y divide-[var(--ink)]/10">
            {NAV.map((e) =>
              e.items ? (
                <li key={e.label}>
                  <button
                    type="button"
                    aria-expanded={acc === e.label}
                    onClick={() => setAcc((v) => (v === e.label ? null : e.label))}
                    className="flex h-14 w-full items-center justify-between text-left text-base text-[var(--ink)]"
                  >
                    {e.label}
                    <Chevron flipped={acc === e.label} />
                  </button>
                  {acc === e.label ? (
                    <ul className="pb-3 pl-4">
                      {e.items.map((it) => (
                        <li key={it.text}>
                          <a
                            href={it.href}
                            onClick={() => {
                              setMobile(false);
                              setAcc(null);
                            }}
                            className="flex h-12 items-center text-sm text-[var(--ink)]/70"
                          >
                            {it.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={e.label}>
                  <a
                    href={e.href}
                    onClick={() => setMobile(false)}
                    className="flex h-14 items-center text-base text-[var(--ink)]"
                  >
                    {e.label}
                  </a>
                </li>
              )
            )}
          </ul>

          <a
            href="/sign-in"
            onClick={() => setMobile(false)}
            className="mt-6 flex h-11 w-full items-center justify-center rounded-full border border-[var(--accent)] text-sm text-[var(--accent-on-light)]"
          >
            Sign in
          </a>
        </div>
      ) : null}
    </header>
  );
}

function Chevron({ flipped }: { flipped: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden="true"
      className={
        "size-2.5 transition-transform duration-200 " + (flipped ? "rotate-180" : "")
      }
    >
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
