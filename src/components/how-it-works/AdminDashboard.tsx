import {
  Broadcast,
  MonitorPlay,
  PlugsConnected,
  ShieldCheck,
  Table,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

/*  Summarised from the Admin Dashboard user guide, which documents the desktop
    application screen by screen. Deliberately NOT reproduced here: the guide is
    a reference manual, and a manual is the wrong register for a page a head
    teacher reads before ever touching the product. This is scope, not how-to.

    Everything below is described in the guide as built, so this section is not
    roadmap. */

const AREAS = [
  {
    Icon: ShieldCheck,
    title: "People and permissions",
    body: "Roles decide what each account can open, and anything outside a role is hidden or refused outright rather than merely discouraged. A bursar, a class teacher and a head teacher are not sharing one login and hoping nobody wanders.",
  },
  {
    Icon: Broadcast,
    title: "Communication",
    body: "Staff group threads, one-to-one conversations with individual parents, and school-wide announcements, all from the same place the records live. Early-pickup requests and parent feedback arrive here too, rather than as phone calls to the office.",
  },
  {
    Icon: PlugsConnected,
    title: "Reliability",
    body: "The recognition and gate flow run on the school’s own network and do not wait on an internet connection. If the line drops the gate carries on, and records sync once it returns.",
  },
];

export function AdminDashboard() {
  return (
    <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
            What the school’s admin actually sees.
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
            The gate is the part everyone notices. The dashboard is the part the
            office lives in: one desktop application covering cameras, records,
            staff accounts and parent messaging.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-line bg-surface-raised text-accent"
            >
              <MonitorPlay size={26} weight="light" />
            </span>
            <h3 className="mt-6 text-2xl leading-tight tracking-[-0.02em] text-foreground">
              Live operations
            </h3>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
              A camera grid with recognition overlays and a running log of recent
              matches underneath it. Gate tablets are registered, paired and revoked
              from here, guard accounts are created and reset here, and a live gate
              board shows what has just happened at the entrance: who came through,
              which camera saw them, and whether anything needed a decision.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6">
            <PlaceholderMedia
              description="the live camera grid with recognition overlays and the recent-match log beneath it"
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-line bg-surface-raised text-accent"
            >
              <Table size={26} weight="light" />
            </span>
            <h3 className="mt-6 text-2xl leading-tight tracking-[-0.02em] text-foreground">
              Records
            </h3>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">
              Pupils, teachers, classes, subjects, timetables and grading in one
              searchable system rather than in separate books. Rolls import from a
              spreadsheet instead of being typed in by hand, attendance is filterable
              by class or date, and a term’s report cards publish to parents from the
              same place the marks were entered.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:row-start-1">
            <PlaceholderMedia
              description="the pupil database table with class, parent contact and attendance columns"
              aspect="aspect-[4/3]"
            />
          </Reveal>
        </div>

        <dl className="mt-20 border-t border-border">
          {AREAS.map((area, i) => (
            <Reveal
              key={area.title}
              delay={0.05 * i}
              className="grid gap-x-12 gap-y-3 border-b border-border py-8 lg:grid-cols-12"
            >
              <dt className="flex items-center gap-4 lg:col-span-5">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-raised text-accent"
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
          {/* text-muted, not text-faint. Measured: --faint (#64748b) on
              --surface (#111823) is 3.74:1, which misses AA for 16px body
              text. --muted (#94a3b8) clears it comfortably on the same
              ground. */}
          <p className="mt-10 max-w-[62ch] leading-relaxed text-muted">
            A full administrator guide covers every screen and button in the
            dashboard. It is provided during onboarding rather than published here.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
