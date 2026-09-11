---
name: image-first-web-design
description: Generates premium website section reference images first, deeply analyzes them, implements matching frontend, then audits against Web Interface Guidelines. Routes the project's taste-skill pack: design-taste-frontend, imagegen-frontend-web, image-to-code, redesign-existing-projects, high-end-visual-design, minimalist-ui, industrial-brutalist-ui, stitch-design-taste. Use for landing pages, heroes, marketing sites, portfolios, redesigns, image-to-code, UI reviews, accessibility audits, or visually important web pages.
---

# Image-First Web Design

Orchestrates this repo’s three skill packs:

- `skills/` — Leonxlnx taste-skill pack (now installed under `.cursor/skills/`)
- `skills2/` — Web Interface Guidelines review
- `skills3/` — image-first design to code

Always-on companions (read before writing code):

- `.cursor/skills/full-output-enforcement/SKILL.md` — no placeholders, no truncated files
- [image-to-code.md](image-to-code.md) — full image-first rules
- [web-guidelines.md](web-guidelines.md) — post-implementation audit

## Taste-skill pack routing

Read the matching skill **immediately** after this file. Do not mix conflicting style skills.

| User intent | Read this skill |
|---|---|
| Landing page, portfolio, “don’t look AI”, default visual frontend | `.cursor/skills/design-taste-frontend/SKILL.md` |
| Redesign / upgrade this existing site without a rewrite | `.cursor/skills/redesign-existing-projects/SKILL.md` then design-taste-frontend |
| Generate website section comps (images only, one image per section) | `.cursor/skills/imagegen-frontend-web/SKILL.md` |
| Generate mobile app screens (images only, no code) | `.cursor/skills/imagegen-frontend-mobile/SKILL.md` |
| Image → analyze → implement website | this skill + `.cursor/skills/image-to-code/SKILL.md` |
| High-end agency polish (type, shadow, motion, expensive feel) | `.cursor/skills/high-end-visual-design/SKILL.md` |
| Minimal / editorial / no gradients / warm monochrome | `.cursor/skills/minimalist-ui/SKILL.md` |
| Industrial / brutalist / tactical / blueprint | `.cursor/skills/industrial-brutalist-ui/SKILL.md` |
| Google Stitch `DESIGN.md` | `.cursor/skills/stitch-design-taste/SKILL.md` and `DESIGN.md` beside it |
| Need exact taste-skill v1 behavior | `.cursor/skills/design-taste-frontend-v1/SKILL.md` |
| Review UI / accessibility / best practices | [web-guidelines.md](web-guidelines.md) |

Default visual stack for this website:

1. `design-taste-frontend` (brief inference + anti-slop)
2. `imagegen-frontend-web` (one 16:9 image per section)
3. `image-to-code` (analyze, then implement)
4. `full-output-enforcement` (complete files)
5. Web Interface Guidelines audit
6. Browser verification

If the user names a style (minimal, brutalist, high-end), that style skill **replaces** design-taste-frontend for visual language. Image-first order still applies.

## Mandatory order

For visually important website work:

1. Generate design images first
2. Deeply analyze those images
3. Implement the frontend to match them
4. Audit the coded UI against Web Interface Guidelines
5. Fix findings, then verify in the browser

Do not start with freeform coding when visual quality is the point.
Do not skip image generation when `GenerateImage` is available.
The generated images are the primary visual source of truth.
The code is the translation layer.

Direct-code first is acceptable only for bug fixes, purely technical work, or when the user already supplied a precise design system.

## Cursor image generation

Before the first image, inspect the Cursor `GenerateImage` tool schema (`GetDynamicTools` namespace `cursor`, tool `GenerateImage`), then invoke it with `CallDynamicTool`.

Rules:

- One **separate** `16:9` image per section. Never compress multiple sections into one frame.
- 1 section → 1 image. 8 sections → 8 images. And so on.
- If a landing page has no count, default to 6 sections → 6 images.
- Filename pattern: `section-01-hero.png`, `section-02-trust.png`, …
- If a section is unclear, generate a **fresh** standalone image. Do not crop, zoom, or slice an older board.
- If text, buttons, or spacing are too small, generate an extra detail/extraction image for that same section.
- Prefer too many clear images over too few compressed ones.
- Do not be lazy with image count.

Hero composition: do not default to left-text / right-image. Consider centered-over-image, editorial offset, image-as-canvas, mini minimalist, or inverted split first.

## Baseline configuration

Use these unless the user clearly wants something else:

- DESIGN_VARIANCE: 8
- VISUAL_DENSITY: 3
- ART_DIRECTION: 8
- IMPLEMENTATION_CLARITY: 9
- IMAGE_USAGE_PRIORITY: 9
- SPACING_GENEROSITY: 9
- ANALYSIS_PRECISION: 10
- IMAGE_GENERATION_EAGERNESS: 10
- UI_SIMPLICITY_DISCIPLINE: 9

Adapt: “clean” → lower density, higher clarity. “crazy creative” → higher variance. “premium SaaS” → high clarity, controlled art direction. “editorial” → stronger type and asymmetry.

## Combinatorial direction (commit once)

Pick one coherent combination and keep it across every section image:

- Theme: Pristine Light / Deep Dark / Bold Studio Solid / Quiet Premium Neutral
- Background: technical grid / solid+ambient / cinematic imagery / tactile texture
- Type: grotesk / display / compressed / editorial serif+sans / Swiss
- Hero: cinematic centered / asymmetric split / polaroid scatter / inline type behemoth / editorial offset / image-first restrained text
- Sections: bento / editorial blocks / poster stack / gallery cadence / Swiss grid / asymmetric marketing
- Signature components: choose exactly 4
- Motion-implied cues: choose exactly 2

These are visual-direction cues, not extra UI chrome.

## Hard visual rules

Hero:

- Clean, cinematic, readable on a small laptop
- Headline 1–3 lines. Prefer fewer words over extra wrapping
- One focal point. Obvious CTA. Generous negative space
- No pills, fake stats, badges, system markers, or nested cards in the first viewport

Layout:

- No cards-inside-cards-inside-cards
- No giant rounded wrappers around every section
- Prefer open layouts and one primary frame, not stacked boxes
- Vary section rhythm; do not clone the same block forever
- Keep spacing generous, even, and analyzable

Anti-slop (never unless explicitly requested):

- Default purple/blue AI gradients, glow soup, glassmorphism stacks
- Identical card rows, cloned left-text/right-image sections
- Filler words: unleash, elevate, revolutionize, next-gen, seamless
- Fake brands: Acme, Nexus, Flowbit, Quantumly, NovaCore
- Fake operator / orchestration / runtime jargon

## Analysis before code

Treat each generated image as a design spec. Extract:

- Visible text (headline, subhead, CTAs, nav, section titles)
- Type scale, weight, tracking, line count
- Spacing: headline→subhead, text→CTA, gutters, section gaps, card padding
- Buttons: shape, radius, fill vs outline, hierarchy
- Color: background, accent, text ranks, borders, image grade
- Component family, grid, image frames, radius logic

If anything is unclear, generate another image before coding.
Do not implement from vibe. Do not invent a different design during coding.

Missing-detail order:

1. Preserve visible language, layout, spacing, component family
2. Generate a detail image or a fresh section image
3. Only then choose the most faithful implementation-friendly version

## Implementation

This repo is Next.js + React + Tailwind + framer-motion.

- Match existing routes and components under `src/app` and `src/components` unless the user asked for new pages
- Follow the generated references closely: layout, spacing rhythm, section order, type mood, component style
- Do not flatten distinctive sections into generic templates
- Do not compress generous spacing into dense layout
- Extract readable copy from the images; do not replace it with generic SaaS filler
- Implement completely. No placeholders, no “rest of section”, no skipped files

After code, audit with [web-guidelines.md](web-guidelines.md):

1. WebFetch `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
2. Check every changed file against all fetched rules
3. Output findings in the guidelines’ `file:line` format
4. Fix critical/accessibility issues before finishing

Then verify in the browser: exercise the changed flow, check related routes, and confirm desktop plus a small-laptop viewport.

## Default section packs

Use when the user does not specify structure.

**4:** Hero → Features → Social proof → CTA

**6:** Hero → Trust → Features → Product/proof → Testimonials → CTA

**8:** Hero → Trust bar → Features → Product showcase → Benefits → Testimonials → Pricing → CTA

**12:** Hero → Trust bar → Feature grid → Product preview → Problem/solution → Benefits → Workflow → Metrics → Testimonials → Pricing → FAQ → CTA + footer

This site’s current home sections: Navbar, Hero, About, Solutions, Integration, Trust, Footer. For redesigns, generate one image per existing section unless the user changes the sitemap.

## Clarity check

Before finishing:

- [ ] Images generated first (one per section, plus details if needed)
- [ ] Unclear sections regenerated fresh, not cropped
- [ ] Text, type, spacing, buttons, colors extracted
- [ ] Hero clean and readable on a small laptop
- [ ] No nested-box / pill / fake-jargon clutter
- [ ] Coded UI matches the references (no generic drift)
- [ ] Guidelines fetched and findings fixed
- [ ] Browser verification done

## Examples

**“Make one hero for an AI startup”**
Generate 1 hero image (plus a closer extraction image if type/CTA is small). Analyze. Implement. Guidelines-audit that hero.

**“Design an 8-section landing page”**
Generate 8 section images in Cursor. Extra detail images as needed. Analyze all 8. Implement the full page from those refs. Audit the coded UI.

**“Review my UI / check accessibility”**
Skip image generation. Follow [web-guidelines.md](web-guidelines.md) on the specified files. If no files given, ask which to review.
