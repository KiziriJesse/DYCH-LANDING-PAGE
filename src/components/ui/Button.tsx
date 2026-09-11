import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentType, ReactNode } from "react";

/**
 * Button — restyled from main's ghost/outline primitive.
 * Spec: ghost at rest, fill only on hover. DYCH purple tokens instead of
 * main's reference blue (#0071e3 / #006ad6 / #2d87e2).
 *
 *   --accent           #8369D3   border and hover fill
 *   --accent-on-light  #6846B9   label on paper
 *   --accent-ink       #FFFFFF   label once the pill fills
 *
 * Public API is unchanged: href, size, type, icon (Phosphor component),
 * variant, TextLink. .band-accent still remaps the tokens, so the closing
 * CTA inverts without a special case here.
 */

type Variant = "outline" | "inverted";
type Size = "sm" | "md" | "lg";

const HEIGHT: Record<Size, string> = {
  sm: "h-7",
  md: "h-9",
  lg: "h-11",
};

function ButtonIcon({
  Glyph,
}: {
  Glyph: ComponentType<{ size?: number; weight?: "bold"; "aria-hidden"?: boolean }>;
}) {
  return (
    <span
      aria-hidden
      className="inline-flex size-[1.375rem] shrink-0 items-center justify-center rounded-full border border-current"
    >
      <Glyph size={12} weight="bold" aria-hidden />
    </span>
  );
}

export function Button({
  children,
  href,
  variant = "outline",
  size = "md",
  disabled = false,
  icon: Glyph = ArrowUpRight,
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  icon?: ComponentType<{ size?: number; weight?: "bold"; "aria-hidden"?: boolean }>;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const invert =
    variant === "inverted"
      ? "[--accent:var(--accent-inverse)] [--accent-on-light:var(--accent-inverse)] [--accent-ink:#6846b9]"
      : "";

  const classes = [
    "group relative inline-flex items-center justify-center gap-2",
    "rounded-full border border-accent bg-transparent px-4",
    "text-sm font-normal tracking-tight text-accent-on-light",
    "transition-colors duration-150 ease-out",
    "hover:bg-accent hover:text-accent-ink",
    "active:scale-[0.98] motion-reduce:active:scale-100",
    "after:absolute after:left-0 after:top-1/2 after:h-11 after:w-full",
    "after:-translate-y-1/2 after:content-['']",
    HEIGHT[size],
    size === "md" ? "max-md:h-11" : "",
    invert,
    disabled ? "opacity-40 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <ButtonIcon Glyph={Glyph} />
      <span>{children}</span>
    </>
  );

  if (href && !disabled) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {inner}
    </button>
  );
}

Button.Icon = ButtonIcon;

/**
 * The second tier, and the only other interactive treatment permitted.
 * Used for the secondary hero action and inline links that need an arrow.
 */
export function TextLink({
  children,
  href,
  icon: Glyph = ArrowUpRight,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href: string;
  icon?: ComponentType<{ size?: number; weight?: "bold"; "aria-hidden"?: boolean }>;
  className?: string;
  onClick?: () => void;
}) {
  const cls =
    "group relative inline-flex items-center gap-2.5 text-[0.9375rem] font-semibold " +
    "text-accent-on-light transition-colors duration-150 ease-out hover:text-accent " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
    "after:absolute after:left-0 after:top-1/2 after:h-11 after:w-full " +
    "after:-translate-y-1/2 after:content-[''] " +
    className;

  const inner = (
    <>
      <span className="border-b border-accent-line pb-0.5 transition-colors duration-150 group-hover:border-accent">
        {children}
      </span>
      <Glyph size={15} weight="bold" aria-hidden />
    </>
  );

  return (
    <Link href={href} onClick={onClick} className={cls}>
      {inner}
    </Link>
  );
}
