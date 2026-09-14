/**
 * Sequenced accents.
 *
 * Five stops sampled along the brand gradient, deep to light. Where a set of
 * cards or steps repeats, each item's accent steps through these in order,
 * so the group reads as one span of the brand rather than as a row of
 * arbitrary tints.
 *
 * Every stop clears 4.5:1 on both light surfaces (#7E3BE8, the lightest, is
 * 5.12:1 on paper), so an accent is safe as text as well as a fill, and the
 * #f4f0ff glyph a filled well carries is 5.10:1 at worst.
 */
export const BRAND_SEQUENCE = ["#2A0A5E", "#3E0F91", "#5416C4", "#6A2AD8", "#7E3BE8"] as const;

const channels = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const toHex = (rgb: number[]) =>
  "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

/**
 * The accent for item `index` of a set of `count`, spanning the whole
 * gradient from its first stop to its last.
 *
 * Up to five items land on the stops themselves (four items take the 1st,
 * 2nd, 4th and 5th). A longer set cannot, so it interpolates between
 * neighbouring stops - still on the same ramp, never off it.
 */
export function sequenceAccent(index: number, count: number): string {
  const last = BRAND_SEQUENCE.length - 1;
  if (count <= 1) return BRAND_SEQUENCE[0];

  const t = (Math.min(Math.max(index, 0), count - 1) / (count - 1)) * last;
  if (count <= BRAND_SEQUENCE.length) return BRAND_SEQUENCE[Math.round(t)];

  const lo = Math.floor(t);
  const hi = Math.min(lo + 1, last);
  const f = t - lo;
  const a = channels(BRAND_SEQUENCE[lo]);
  const b = channels(BRAND_SEQUENCE[hi]);
  return toHex(a.map((c, i) => c + (b[i] - c) * f));
}
