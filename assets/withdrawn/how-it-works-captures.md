# /how-it-works screenshots

Screenshots of the operations console, captured from a working install and
placed on `/how-it-works`. Names match the screens in the **Admin Dashboard
User Guide** (20pp).

## In use

| File | Where | Screen |
|---|---|---|
| `live-operations.png` | media split, "Live operations" | Live Display — camera grid, overlays, recognition log |
| `records.png` | media split, "Records" | Database Management — the people table |
| `cameras.png` | gallery | Camera Management — capture source, NVR/DVR fields |
| `gate.png` | gallery | Gate Management — recent events, who is on site |
| `chat.png` | gallery | Messaging — staff groups and linked-contact threads |
| `system.png` | gallery | System — local database, settings sections |

Each is rendered at its own intrinsic ratio (`aspect-[W/H]` matching the file)
so nothing is cropped. **Do not change these to `4/3`** — the captures run from
1.53:1 to 2.17:1 and `object-cover` would eat the panels at both ends.

## Held back

**`security-settings.png` — not used, three reasons.**

1. It shows **Idle timeout: never**. `/security-and-trust` tells readers that
   sessions end. Illustrating that with a screenshot of the timeout disabled
   argues the opposite.
2. The audit table contains an **`AUDIT_CHAIN_INVALID` / `row_hash_mismatch`**
   row — the tamper-evidence reporting itself broken. That is the worst
   possible frame for a picture of an audit trail.
3. My redaction of the Actor column clipped the first few characters of the
   Reason column beside it.

Worth a fresh capture: timeout set to something real, a clean audit run, and
the Actor column already anonymised in the data rather than blurred after.

**`parent-accounts.png` — kept, unused.** It is education-specific (parent
approvals), and `/how-it-works` is now sector-neutral. It belongs on
`/product/schools` if that page ever grows a media slot.

## What was redacted, and why

The captures arrived carrying live personal data. Everything below was blurred
before the files went into this folder, and the un-redacted originals were
deliberately **not** kept in the repo:

- `records.png` — three pupils by name, aged 10, with their parents' names and
  phone numbers
- `chat.png` — two parent names and an admin Gmail address
- `parent-accounts.png` — two parent usernames and their Gmail addresses
- `security-settings.png` — an admin Gmail address, six times, in the audit log
- `gate.png` — visitor names and two mobile numbers
- `live-operations.png` — a personal export directory path

A few pixels also came off each edge: every capture had the guide's red
annotation frame around it, which is not product UI.

**If these are ever re-captured, capture against a demo dataset instead.**
Blurring is a patch. Real names of children beside their parents' phone
numbers should not be in a public folder on a marketing site even briefly, and
`public/` is served verbatim.

## Two things still visible in the captures

Neither is fixable by redaction; both need a build or a re-capture.

1. **The product names disagree.** The bottom bar reads **Smart School Vision
   v1.0**, the sign-in splash reads **Smart School Systems**, the window title
   reads **Th3 Attend**, and this site calls the software **Smart Vision**.
   Four names for one product, one of them on screen in `live-operations.png`.
2. **The install is nearly empty and shows a disk warning.** Camera slots read
   "Initializing…", counts are near zero, and the recognition log repeats
   `ALERT: Disk space warning: 89.5% used`. A populated demo with a healthy
   disk would sell considerably better.

## Adding one

`PlaceholderMedia` takes an optional `src`. Pass it and the component renders a
real `next/image`, using the `description` already at the call site as alt
text; leave it off and the marked placeholder renders instead.

```tsx
<PlaceholderMedia
  src="/how-it-works/live-operations.png"
  description="the live camera grid with recognition overlays and the recent-match log beneath it"
  aspect="aspect-[1911/1010]"
/>
```

## A note on how these look

The console is a dark desktop application and this site is a near-white paper
palette. A dark screenshot inside a light page is correct — it is a picture of
the product, and it should look like the product.
