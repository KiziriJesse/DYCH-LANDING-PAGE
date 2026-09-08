import type { ReactNode } from "react";

/**
 * Button — the single interactive primitive for the whole site.
 * Spec: ../../button.md  (ghost/outline only; no solid fills except on hover)
 *
 * Ground-aware because the accent splits by role for WCAG AA:
 *   light ground -> label #006ad6   dark ground -> label #2d87e2
 *   blue band    -> label/border #fefefe
 * Borders always keep the reference blue #0071e3.
 */

type Ground = "light" | "dark" | "blue";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  /** Circular 33px glyph slot. Never an emoji (governing spec §1). */
  icon?: ReactNode;
  ground?: Ground;
  size?: Size;
  href?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const HEIGHT: Record<Size, string> = {
  sm: "h-7",      // 28px
  md: "h-9",      // 36px — measured default
  lg: "h-11",     // 44px
};

const GROUND: Record<Ground, string> = {
  light:
    "border-[var(--accent)] text-[var(--accent-on-light)] " +
    "hover:bg-[var(--accent)] hover:text-[var(--paper-pure)] hover:border-[var(--accent)]",
  dark:
    "border-[var(--accent)] text-[var(--accent-on-dark)] " +
    "hover:bg-[var(--accent)] hover:text-[var(--paper-pure)] hover:border-[var(--accent)]",
  blue:
    "border-[var(--accent-inverse)] text-[var(--accent-inverse)] " +
    "hover:bg-[var(--accent-inverse)] hover:text-[var(--accent)]",
};

export function Button({
  children,
  icon,
  ground = "light",
  size = "md",
  href,
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) {
  const classes = [
    // base
    "group relative inline-flex items-center justify-center gap-2",
    "rounded-full border px-4 text-sm font-normal tracking-tight",
    "transition-colors duration-150 ease-out",
    "active:scale-[0.98] motion-reduce:active:scale-100",
    // ≥44x44 hit area without changing the 36px visual box (button.md §5.1)
    "after:absolute after:left-0 after:top-1/2 after:h-11 after:w-full",
    "after:-translate-y-1/2 after:content-['']",
    HEIGHT[size],
    GROUND[ground],
    disabled ? "opacity-40 pointer-events-none" : "",
    // §7 — visual height itself grows to 44px on small viewports
    size === "md" ? "max-md:h-11" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {icon ? (
        <span
          aria-hidden="true"
          className="inline-flex size-[1.375rem] shrink-0 items-center justify-center rounded-full border border-current"
        >
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
