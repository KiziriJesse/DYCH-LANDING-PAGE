# /how-it-works screenshots

Screenshots of the admin dashboard for the "What the school's admin actually
sees" block on `/how-it-works`.

Filenames below are matched to the screens as they appear in the **Admin
Dashboard User Guide** (Smart School Vision, 20pp), so whoever captures them
knows exactly which window is wanted.

---

## Wanted now — the page has two slots

Both render at `aspect-[4/3]`, so capture landscape and crop to 4:3 rather
than shipping a 16:9 window that will be cropped for you.

| File | The screen | Guide |
|---|---|---|
| `live-operations.png` | **Live Display.** The 20-slot camera grid with recognition overlays, the `Live Recognition Log` strip beneath it, and the `Refresh / Enable Detection / Parameter Settings / Full Screen / Clear All` toolbar. | p.4 |
| `records.png` | **Database Management.** The student table — Student ID, Name, Age, Gender, Class, Parent Name, Parent Contact, Face Images, Status — with the filter bar and the `Refresh Data / Export Data / Export Today's Attendance / Backup Database` bar along the bottom. | p.11 |

Dropping a file in is not enough on its own — uncomment one line in
`src/components/how-it-works/AdminDashboard.tsx`:

```tsx
<PlaceholderMedia
  src="/how-it-works/live-operations.png"
  description="the live camera grid with recognition overlays and the recent-match log beneath it"
  aspect="aspect-[4/3]"
/>
```

`description` is already written at each call site and becomes the alt text,
so it does not need changing. Until `src` is passed, the slot keeps rendering
the marked placeholder.

## Not wanted yet

The old version of this file also asked for `permissions.png`,
`communication.png` and `reliability.png`. Those three subsections are
hairline text rows on the page with no media slot, so the files would have sat
here unused. They are listed under "if more slots are added" below instead.

---

## Four things to fix before any of these can ship

These are all visible in the guide's own screenshots, so they will be in a
fresh capture too.

**1. The product name in the app does not match the site.** The sign-in splash
reads **"Smart School Systems · By Dych Technologies"** and the window title
bar reads **"Th3 Attend"**. This site calls the software **Smart Vision**. Any
screenshot showing either string contradicts the page it sits on. Either
capture screens that avoid the splash and the title bar, or get the build
relabelled first. Worth resolving regardless of screenshots — it is the same
name in three places and three different answers.

**2. Every screen in the guide is an empty install.** "No content in table",
"No records yet", `Pending 0 / Approved 0 / Total Parents 0`, camera slots
reading "Initializing...". An empty product is a bad advert. Capture against a
populated demo school, not a fresh install.

**3. A real personal email is on almost every screen.** The top bar shows
`Signed in as saidasalim123456@gmail.com` in most of the guide's captures.
Sign in as a demo account before capturing, or scrub it.

**4. Populated screens will contain real children.** Pupil names, parent phone
numbers and faces. Blur, substitute, or use a demo dataset — do not commit a
screenshot of a live school's roll to a public folder.

---

## If more slots are added later

The other screens from the guide, should the page ever grow media for them.
Same folder, same convention.

| File | The screen | Guide |
|---|---|---|
| `cameras.png` | **Camera Management** — capture source, and the NVR/DVR fields with `Test connection` and `Discover channels`. This is the one that shows existing CCTV being adopted, which is a selling point the page now makes in words only. | p.5 |
| `gate.png` | **Gate Management** — the `Live Gate Board / Devices / Guards / Visitor Log / Policy` tabs and recent gate events. | p.10 |
| `parent-accounts.png` | **Parent Accounts** — pending vs approved counts and the approval table. | pp.7, 9 |
| `security-settings.png` | **Security settings** — idle timeout, login credentials, admin login lock recovery, and the audit table with `Export CSV`. | p.8 |
| `chat.png` | **Chat** — staff groups on the left, parent groups on the right. | p.6 |
| `system.png` | **System Management** — database connection, attendance export settings, school day schedule. | p.14 |

---

## A note on how these will look

The dashboard is a dark desktop application and this site is a near-white
paper palette. A dark screenshot inside a light page is correct — it is a
picture of the product, and it should look like the product. The slot draws a
hairline border around it so the edge does not float.
