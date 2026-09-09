import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentType, ReactNode } from "react";

/**
 * The one interactive element on this site.
 *
 * Built to button.md, with that spec's reference blue swapped for DYCH's
 * verified purple. Same hue-split logic, different hex values:
 *
 *   --accent           #7C5CE0   border, icon ring, and the hover fill.
 *                                3.94-4.70:1 across the paper tones, so it
 *                                clears the 3:1 that a border needs on every
 *                                one of them, and 4.70:1 under a white label
 *                                so the same token also carries the fill.
 *   --accent-on-light  #6238C7   the label. 6.04-7.22:1. The label is
 *                                body-size, so it needs 4.5:1, and --accent
 *                                itself is 4.49:1 on --paper - a hair short.
 *                                That single measurement is the whole reason
 *                                the accent is split in two.
 *   --accent-ink       #FFFFFF   the label once the pill fills.
 *
 * GHOST BY DEFAULT. There is no solid-filled button anywhere on this site at
 * rest. Hover is the only place a fill is permitted, and it is the accent
 * itself - never a second hue, never a gradient.
 *
 * ON THE ACCENT BAND. `.band-accent` re-points --accent, --accent-on-light
 * and --accent-ink locally, so an `outline` button dropped inside it comes
 * out as a white outline that fills white with a purple label, with no
 * special casing here. `variant="inverted"` exists for the same treatment
 * outside that class.
 *
 * TAP TARGET. The visual height is 36px on desktop to match the spec, which
 * on its own fails the 44x44 minimum. An ::after overlay expands the hit area
 * to 44px tall without changing the look, and below 768px the visual height
 * itself goes to 44px.
 */

type Variant = "outline" | "inverted";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { pill: string; circle: string; glyph: number; text: string }> =
  {
    // Mobile-first: every size is at least 44px tall below the md breakpoint,
    // then settles to its spec height on desktop.
    sm: { pill: "h-11 md:h-7 pr-4", circle: "size-6 md:size-[1.625rem]", glyph: 12, text: "text-[0.8125rem]" },
    md: { pill: "h-11 md:h-9 pr-5", circle: "size-9 md:size-[2.0625rem]", glyph: 15, text: "text-[0.875rem]" },
    lg: { pill: "h-12 md:h-11 pr-6", circle: "size-10", glyph: 17, text: "text-[0.9375rem]" },
  };

/*  The 33px glyph circle. A ring rather than a fill at rest, so the button
    stays entirely ghost; it inverts along with everything else on hover.
    Never an emoji - the governing standard bans those outright. */
function ButtonIcon({
  Glyph,
  size,
}: {
  Glyph: ComponentType<{ size?: number; weight?: "bold"; "aria-hidden"?: boolean }>;
  size: Size;
}) {
  return (
    <span
      aria-hidden
      className={
        `${SIZES[size].circle} ml-px grid shrink-0 place-items-center rounded-full ` +
        "border border-accent text-accent-on-light " +
        "transition-[transform,color,border-color] duration-150 ease-out " +
        "group-hover:border-accent-ink group-hover:text-accent-ink " +
        "group-hover:translate-x-px group-hover:-translate-y-px"
      }
    >
      <Glyph size={SIZES[size].glyph} weight="bold" aria-hidden />
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
  const s = SIZES[size];

  const shell =
    "group relative inline-flex items-center whitespace-nowrap rounded-full " +
    `border border-accent bg-transparent pl-px font-semibold ${s.pill} ${s.text} ` +
    "text-accent-on-light " +
    "transition-[background-color,border-color,color] duration-150 ease-out " +
    // The only fill on the site.
    "hover:bg-accent hover:text-accent-ink " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
    // Hit area to 44px without touching the visual height.
    "after:absolute after:left-0 after:top-1/2 after:h-11 after:w-full after:min-w-11 " +
    "after:-translate-y-1/2 after:content-['']";

  const invert =
    variant === "inverted"
      ? "[--accent:var(--accent-inverse)] [--accent-on-light:var(--accent-inverse)] [--accent-ink:#6238c7]"
      : "";

  const off = disabled
    ? "pointer-events-none cursor-not-allowed opacity-40"
    : "active:scale-[0.98]";

  const cls = `${shell} ${invert} ${off} ${className}`;

  /* The 34px icon-to-label gap the spec measured. It is the one number here
     that is content-dependent rather than absolute: at `sm` it is halved,
     because a 34px void inside a 28px-tall pill reads as a mistake. */
  const label = (
    <span className={size === "sm" ? "ml-4" : "ml-[2.125rem]"}>{children}</span>
  );

  const inner = (
    <>
      <ButtonIcon Glyph={Glyph} size={size} />
      {label}
    </>
  );

  if (href && !disabled) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={cls}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

Button.Icon = ButtonIcon;

/**
 * The second tier, and the only other interactive treatment permitted.
 *
 * button.md §1: "every interactive element is an outline or a bare text link
 * with an icon." This is that second form. It exists so secondary actions can
 * sit next to a primary without either being given a fill, which is what the
 * old primary/quiet pair was doing.
 *
 * Used for: the secondary hero action, card "read more" affordances, and
 * inline links that need an arrow. Anything that needs to look like a control
 * uses Button instead.
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
    // Same 44px hit area as Button, on a control with no box of its own.
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
