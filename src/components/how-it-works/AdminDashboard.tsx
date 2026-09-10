import {
  Archive,
  Broadcast,
  Devices,
  IdentificationBadge,
  MonitorPlay,
  PlugsConnected,
  SecurityCamera,
  Table,
  UserCircleCheck,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

/*  Summarised from the Admin Dashboard user guide, which documents the desktop
    application screen by screen across twenty pages. Deliberately NOT
    reproduced here: the guide is a reference manual, and a manual is the wrong
    register for a page a head teacher reads before ever touching the product.
    This is scope, not how-to.

    Everything below is described in the guide as built, so none of it is
    roadmap. Where the guide contradicted what this site already claimed, the
    site was corrected rather than the guide summarised around - see the
    parent-alert timing note on /product/schools.

    STILL NOT CLAIMED ANYWHERE, because the guide does not support it: any
    accuracy, latency or throughput figure. The guide documents the tuning
    controls, not what they achieve.  */

/*  SecurityCamera is used below, and that is a deliberate exception to this
    site's rule about avoiding the first, most literal glyph. That rule exists
    to stop "security" being drawn as a camera. This row is not about security
    as a concept - it is about camera hardware, what it plugs into, and how
    many of them. The literal glyph is the accurate one here. */
const AREAS = [
  {
    Icon: IdentificationBadge,
    title: "People and permissions",
    body: "Roles decide what each account can open, and anything outside a role is hidden or refused outright rather than merely discouraged. A bursar, a class teacher and a head teacher are not sharing one login and hoping nobody wanders. Roles are yours to create and rename, not a fixed list of three.",
  },
  {
    Icon: SecurityCamera,
    title: "The cameras, and what they plug into",
    body: "Up to twenty camera positions at once. As well as cameras we supply, the dashboard reads an existing NVR or DVR over the network - it will discover the channels and assign them to slots for you - or takes a single stream by URL. A school with CCTV already at the gate is not necessarily buying it twice.",
  },
  {
    Icon: Devices,
    title: "The gate tablets, issued and revoked from here",
    body: "A tablet is registered, then paired with a one-time code that expires after a day. From the same screen it can be enabled, paused, or revoked outright, and granted or denied a live view of the first four cameras. Guard accounts are created and their passwords reset here too, and there is a single-use admin code for the case where a guard is on the gate without their own PIN.",
  },
  {
    Icon: UserCircleCheck,
    title: "Parents get accounts, and you decide when",
    body: "A parent registers themselves in the portal and then waits for you. Until an administrator approves the account they can sign in and see nothing about any pupil. The list also separates parents who have signed in this week from those who have not opened it in six months, which is the difference between a channel that works and one the school only thinks works.",
  },
  {
    Icon: Broadcast,
    title: "Communication",
    body: "Staff group threads, one-to-one conversations with individual parents, and school-wide announcements, all from the same place the records live. Events are published to the parent portal as a document, so a term letter or a fixture list arrives as the PDF you already wrote. Early-pickup requests arrive as something to approve or decline rather than as a phone call to the office.",
  },
  {
    Icon: Archive,
    title: "It leaves in a format you already own",
    body: "Attendance writes itself to a folder you choose, on a schedule you set, every day without anyone remembering. Today's register exports on demand as a spreadsheet, report cards export to Excel and to PDF for print, and a backup takes the whole database and every face image with it. Nothing here needs a request to us.",
  },
  {
    Icon: PlugsConnected,
    title: "Reliability",
    body: "The recognition and gate flow run on the school's own network and do not wait on an internet connection. The parent, teacher and gate applications all talk to services on that same machine, so a dropped line stops messages leaving rather than stopping the gate. Records sync once it returns.",
  },
];

export function AdminDashboard() {
  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
            What the school&rsquo;s admin actually sees.
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
            The gate is the part everyone notices. The dashboard is the part the
            office lives in: one desktop application covering cameras, records,
            staff and parent accounts, the gate, and every message that goes out.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
            >
              <MonitorPlay size={26} weight="light" />
            </span>
            <h3 className="mt-6 text-2xl leading-tight tracking-[-0.02em] text-foreground">
              Live operations
            </h3>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
              A camera grid with recognition overlays and a running log of recent
              matches underneath it. Bounding boxes, confidence scores, landmarks
              and the match panel are each switchable, so the view can be a working
              tool or a clean one for a room with parents in it. A live gate board
              shows what has just happened at the entrance, colour-coded: normal in
              and out, late, or stop.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6">
            {/* When the screenshot lands, uncomment src. That is the whole
                swap - PlaceholderMedia renders a real next/image from it and
                uses the description above as alt text. */}
            <PlaceholderMedia
              // src="/how-it-works/live-operations.png"
              description="the live camera grid with recognition overlays and the recent-match log beneath it"
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
            >
              <Table size={26} weight="light" />
            </span>
            <h3 className="mt-6 text-2xl leading-tight tracking-[-0.02em] text-foreground">
              Records
            </h3>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
              Pupils, teachers, classes, subjects, timetables and grading in one
              searchable system rather than in separate books. Classes carry a level
              &mdash; nursery, primary, O-level, A-level &mdash; and a timetable can
              be built for you from the subjects and teachers you have already
              entered rather than filled in slot by slot. Rolls import from a
              spreadsheet, and staff are not only teachers: bursars, secretaries and
              security staff are enrolled the same way.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:row-start-1">
            <PlaceholderMedia
              // src="/how-it-works/records.png"
              description="the pupil database table with class, parent contact and attendance columns"
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>

        {/* Report cards get their own beat: it is the one part of the dashboard
            a parent sees the output of directly. */}
        <Reveal delay={0.1}>
          <div className="mt-20 grid gap-x-12 gap-y-4 border-y border-border py-10 lg:grid-cols-12">
            <h3 className="text-2xl leading-tight tracking-[-0.02em] text-foreground lg:col-span-5">
              And at the end of term, one action
            </h3>
            <div className="max-w-[62ch] lg:col-span-6 lg:col-start-7">
              <p className="leading-relaxed text-muted">
                A class&rsquo;s marks sit against your own grading bands, set per
                level or overridden for a single class. The report card carries the
                pupil&rsquo;s attendance percentage alongside the subject marks,
                which is the number a parent usually has to ask for separately.
                Publishing sends the term&rsquo;s reports to the parent portal and
                notifies every parent at once, read-only.
              </p>
            </div>
          </div>
        </Reveal>

        <dl className="mt-16 border-t border-border">
          {AREAS.map((area, i) => (
            <Reveal
              key={area.title}
              delay={0.05 * i}
              className="grid gap-x-12 gap-y-3 border-b border-border py-8 lg:grid-cols-12"
            >
              <dt className="flex items-center gap-4 lg:col-span-5">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-line bg-wash text-accent-on-light"
                >
                  <area.Icon size={20} weight="light" />
                </span>
                <span className="text-lg font-medium leading-snug text-foreground">
                  {area.title}
                </span>
              </dt>
              <dd className="max-w-[62ch] leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
                {area.body}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.16}>
          {/* text-muted, not text-faint. Under the old dark palette --faint
              measured 3.74:1 on --surface and missed AA at this size. The
              palette has changed since; the more readable token stays. */}
          <p className="mt-10 max-w-[62ch] leading-relaxed text-muted">
            A full administrator guide covers every screen and button in the
            dashboard. It is provided during onboarding rather than published here.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
