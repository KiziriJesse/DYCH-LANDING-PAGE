import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Tone = "primary" | "quiet";

const base =
  "group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-[0.9375rem] font-semibold " +
  "transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
  "active:scale-[0.98] whitespace-nowrap";

const tones: Record<Tone, string> = {
  // marigold plate, near-black label: 4.7:1, clears WCAG AA
  primary:
    "bg-accent text-[var(--accent-ink)] hover:shadow-[var(--shade-lift)] border border-transparent",
  // hairline pill on the page surface, ink label at full strength
  quiet:
    "bg-surface/70 text-ink border border-line-strong hover:border-accent-line hover:bg-surface backdrop-blur-sm glass",
};

const dots: Record<Tone, string> = {
  primary: "bg-[var(--accent-ink)]/12 text-[var(--accent-ink)]",
  quiet: "bg-accent-soft text-[var(--accent-text)]",
};

type CtaProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "className">;

/**
 * Button-in-button CTA: the arrow lives in its own circular plate flush with the
 * pill's right padding, and drifts diagonally on hover for kinetic tension.
 */
export function Cta({ children, tone = "primary", className = "", ...rest }: CtaProps) {
  return (
    <a className={`${base} ${tones[tone]} ${className}`} {...rest}>
      <span>{children}</span>
      <span
        aria-hidden
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${dots[tone]} transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[2px] group-hover:scale-105`}
      >
        <ArrowUpRight size={17} weight="bold" />
      </span>
    </a>
  );
}
