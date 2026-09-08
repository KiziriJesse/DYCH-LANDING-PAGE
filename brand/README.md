# DYCH Technologies brand assets

Masters supplied by DYCH. Kept outside `public/` so they are versioned but not
served or deployed: Next.js only serves files under `public/`.

| File | Notes |
|---|---|
| `dych-logo-master-transparent.png` | 5842x4675, alpha. Source for every derived asset. |
| `dych-logo-master-white.png` | 5842x4675, white ground. For print and light surfaces. |

## Derived web assets (in `public/logo/`)

Generated from the transparent master:

- `dych-mark.png` — the mark alone, 320px wide. Used in the navbar and footer.
- `dych-lockup.png` — full lockup, 640px wide, transparent.
- `dych-lockup-on-white.png` — full lockup on its intended white ground.

## Known issue: no dark-background variant

The supplied lockup is drawn for a white background. Measured against this
site's `#0a0e14` substrate:

| Element | Average colour | Contrast |
|---|---|---|
| Mark | `#3a0aab` | 1.67:1 |
| "DYCH" | `#301091` | 1.48:1 |
| "TECHNOLOGIES" | `#251171` | 1.29:1 |
| "Automating Tomorrow" | `#33374b` | 1.65:1 |

Only the top ~10% of the mark's pixels exceed 2.87:1. That is why the site
renders the mark as artwork but sets the words in its own type at full
contrast, rather than placing the supplied lockup on the dark background.

A light-on-dark variant from the original designer would let the full lockup
be used as drawn.
