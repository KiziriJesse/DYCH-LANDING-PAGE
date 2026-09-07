/**
 * Brand mark: one simple geometric glyph (a gate with a cleared threshold)
 * beside the wordmark. Deliberately minimal so it stays legible at 32px
 * inside the nav pill.
 */
export function Wordmark({ showProduct = true }: { showProduct?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.625rem] bg-accent"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
          <path
            d="M5 20V7.5A2.5 2.5 0 0 1 7.5 5H12M19 20V7.5A2.5 2.5 0 0 0 16.5 5H15"
            stroke="var(--accent-ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 13.5 11.25 16 16 10.5"
            stroke="var(--accent-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {/* nowrap on both lines: the nav must stay on one line at 1024px. */}
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-foreground">
          DYCH
        </span>
        {showProduct && (
          <span className="mt-1 text-[0.625rem] font-medium tracking-[0.14em] text-faint">
            SMART SCHOOL SYSTEMS
          </span>
        )}
      </span>
    </span>
  );
}
