import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Tone = "primary" | "quiet";

const base =
  "group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-[0.9375rem] font-semibold whitespace-nowrap " +
  "transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
  "active:scale-[0.98]";

const tones: Record<Tone, string> = {
  /* The only glow on the site. Cyan on near-black, 8.3:1 label contrast. */
  primary:
    "border border-transparent bg-accent text-accent-ink shadow-[var(--glow-cta)] hover:shadow-[var(--glow-cta-hover)]",
  /* No glow, no fill: a hairline pill that reads as secondary at a glance. */
  quiet:
    "glass border border-border-strong bg-surface/60 text-foreground backdrop-blur-sm hover:border-accent-line hover:bg-surface",
};

const wells: Record<Tone, string> = {
  primary: "bg-accent-ink/15 text-accent-ink",
  quiet: "bg-accent-soft text-accent",
};

export function Cta({
  children,
  href,
  tone = "primary",
  className = "",
  onClick,
}: {
  children: ReactNode;
  href: string;
  tone?: Tone;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className={`${base} ${tones[tone]} ${className}`}>
      <span>{children}</span>
      {/* Button-in-button: the arrow sits in its own well flush with the pill's
          right padding, and drifts diagonally on hover for kinetic tension. */}
      <span
        aria-hidden
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${wells[tone]} transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[2px] group-hover:scale-105`}
      >
        <ArrowUpRight size={17} weight="bold" />
      </span>
    </Link>
  );
}
