# /how-it-works screenshots

Real screenshots of the admin dashboard, one per subsection of the
"What the school's admin actually sees" block on /how-it-works.

Drop the files in here with these exact names:

- live-operations.png   the camera grid with recognition overlays and the
                        recent-match log beneath it
- records.png           the pupil database table with class, parent contact
                        and attendance columns
- permissions.png       roles and what each account can open
- communication.png     staff threads, parent conversations, announcements
- reliability.png       the offline / sync behaviour

Until a file lands, that subsection keeps rendering PlaceholderMedia. The
component takes an optional `src`: pass the path and it renders a real
next/image instead, one line per subsection, no restructure.

    <PlaceholderMedia
      src="/how-it-works/live-operations.png"
      description="the live camera grid ..."
      aspect="aspect-[4/3]"
    />

Screenshots of a real dashboard will contain real pupil names and faces.
Blur or substitute them before committing anything here.
