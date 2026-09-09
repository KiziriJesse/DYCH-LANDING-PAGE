import type { Metadata } from "next";
import {
  ChalkboardTeacher,
  ChartLineUp,
  Devices,
  House,
  ListChecks,
  PaperPlaneTilt,
  ScanSmiley,
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Capability, type CapabilityData } from "@/components/product/Capability";
import { RecognitionFigure } from "@/components/product/RecognitionFigure";

export const metadata: Metadata = {
  title: "Smart School Systems",
  description:
    "Facial-recognition entry, automatic attendance, parent alerts, boarding management, the guard app, the admin dashboard and report cards, from DYCH Technologies.",
};

/*  ============================================================
    SOURCES AND BUILD STATUS. READ BEFORE PUBLISHING.

    The copy below is drawn from three DYCH documents: the case-study deck,
    the Admin Dashboard user guide, and the internal product spec (v3, June
    2025). It is no longer placeholder prose, but it is not all shipped.

    The spec sprints its features. Anything marked "Pilot critical / Week 1-2"
    is built or building now. Anything at Month 3+ or on the Premium/Growth
    tiers is roadmap. Each capability below carries its status, and the ones
    that lean on roadmap features say so in a comment above them.

    ONE CAPABILITY WAS DELETED, NOT REWRITTEN: "Fees & Finance". No source
    document describes billing, invoicing or fee tracking. The only two "fee"
    mentions anywhere are a gate-pass reason category ("Fees issue", a student
    sent home over unpaid fees) and an attendance PDF a parent shares with an
    employer for reimbursement. Neither is a finance module, so the claim is
    gone from this page, from the homepage snapshot and from the nav.

    The product is called Smart School Systems here. The source documents call
    it Vision One and Smart School Vision; neither name is used on this site.
    ============================================================ */
const CAPABILITIES: CapabilityData[] = [
  {
    // STATUS: shipped. Gate recognition is the pilot's core, Week 1-2.
    id: "security",
    title: "Facial recognition at the entry point",
    lead: "A weatherproof camera at the gate matches an arriving face against the school’s own enrolled records, and a unit on site does the matching. Face data is matched and encrypted on the school’s own hardware: no photos leave the school. A pupil walks up to the gate as normal, with no card and no tag.",
    points: [
      {
        label: "Tuned to your gate, not to a default",
        body: "Match, low and track similarity thresholds, minimum face size and track timeout are all adjustable, so a school sets how strictly a face must match before it counts as recognised.",
      },
      {
        label: "Day pupils and boarders are different problems",
        body: "For a day pupil a gate scan is routine arrival or departure. For a boarder, a scan on an ordinary school day means something unusual is happening, so the system checks it against an approved pass before it shows the guard a decision.",
      },
      {
        label: "When a face is not recognised",
        body: "Nobody is turned away automatically. The screen flags it and a person on the gate checks, the way they always have.",
      },
    ],
    media:
      "the recognition view at the school gate, or the camera and reader hardware in place",
    mediaAspect: "aspect-[4/3]",
    renderMedia: () => <RecognitionFigure />,
    accent: "var(--accent-security)",
    Icon: ScanSmiley,
    layout: "split-right",
  },
  {
    // STATUS: arrival and absence alerts are Week 2 and shipped. Late-arrival,
    // evening departure, the monthly calendar and the weekly summary are
    // Month 2. The term PDF is Month 3-5. Confirm before promising the later
    // four to a school as available today.
    id: "attendance",
    title: "A register that fills itself",
    lead: "Arrival is logged the moment a face is matched, and the class teacher opens a register that is already correct. Nobody reconstructs a morning from memory at break, and nobody transcribes a paper sheet afterwards.",
    points: [
      {
        label: "Absence is noticed, not discovered",
        body: "If a pupil has not scanned by the school’s cutoff, an alert fires on its own. The cutoff is set per school; 8:30am is a common one rather than a fixed rule.",
      },
      {
        label: "Late is not the same as absent",
        body: "A pupil who arrives after the cutoff raises a late-arrival alert with its own tone, not an absence alert that then has to be corrected.",
      },
      {
        label: "What a parent can see and keep",
        body: "A monthly calendar reading green for present, red for absent and grey for holidays and weekends, a weekly summary, and a term attendance PDF they can download. Parents use that PDF with employers who reimburse school fees.",
      },
    ],
    media: "the attendance dashboard showing a class register for one morning",
    mediaAspect: "aspect-[4/3]",
    accent: "var(--accent-attendance)",
    Icon: ListChecks,
    layout: "split-left",
  },
  {
    // STATUS: push arrival alerts and live chat are Week 2 and shipped.
    // Absence excuse and school announcements are Month 2.
    id: "communication",
    title: "Parents told while it still matters",
    lead: "A push notification reaches the parent within seconds of the gate scan, and it carries the pupil’s photo so the parent can see at a glance that it is their child and not a mismatch. Push is the primary channel because it is immediate and costs nothing per message.",
    points: [
      {
        label: "SMS is a fallback, and it is not free",
        body: "If a push has not been opened within ten minutes, an SMS follows, so a parent without a smartphone is still reached. SMS carries a real per-message cost and is priced as an add-on rather than folded into every plan.",
      },
      {
        label: "A conversation, not just alerts",
        body: "A parent can message the school directly and get a reply, and can report an absence from the app before the automatic alert fires, which stops the office ringing round unnecessarily.",
      },
      {
        label: "School-wide announcements",
        body: "Holidays, events and reminders go out to every parent from the dashboard, separate from the alert stream so notices do not get lost among arrivals.",
      },
    ],
    media: "a phone showing a parent alert as it arrives, with the pupil thumbnail",
    mediaAspect: "aspect-[9/19]",
    accent: "var(--accent-communication)",
    Icon: PaperPlaneTilt,
    layout: "stage",
  },
  {
    // STATUS: MOSTLY ROADMAP. Campus status, dorm check-in, missed check-in and
    // admin-created gate passes are Month 3. Digital exeat request, approval
    // and the automatic gate check are Month 4 on the Premium tier. Opening
    // and closing day tracking are Month 4-5. Visiting-day QR is Month 6+.
    // DO NOT present this section as shipped without DYCH confirming current
    // build status. The dorm features also need a camera at each dormitory
    // entrance, which is additional hardware beyond the gate.
    id: "boarding",
    title: "Boarding schools, where the stakes are higher",
    lead: "A boarding parent is often far from the school and depends on the system entirely. So a boarder’s record is not a daily arrival event but a running campus state, and leaving campus is something that has to be authorised before it happens.",
    points: [
      {
        label: "Evening check-in, and the alert when it does not come",
        body: "A scan at the dormitory entrance confirms a boarder is in for the night. If a check-in has not happened by the school’s cutoff, the parent and the matron are alerted at the same time.",
      },
      {
        label: "Exeats and gate passes replace the paper letter",
        body: "Weekend and holiday exeats are requested and approved digitally, and unplanned exits get a gate pass with a reason and either a one-way or a return-by time. The gate checks for the approval automatically before the guard sees a decision.",
      },
      {
        label: "Opening and closing day",
        body: "The days when a school most needs to know where everyone is. Each scan marks a boarder as reported or departed, and the office watches a live count rather than a clipboard.",
      },
    ],
    media:
      "the boarding view showing campus status and a live opening-day count",
    mediaAspect: "aspect-[4/3]",
    accent: "var(--accent-operations)",
    Icon: House,
    layout: "split-right",
  },
  {
    // STATUS: the guard screen with green/red/yellow/unknown states is Week 2
    // and shipped. The override button with individual PINs and the log-visitor
    // flow are Month 2.
    id: "guard-app",
    title: "The guard holds one screen, not three books",
    lead: "No register, no visitor book, no paper pass list. A tablet at the gate tells the person on duty exactly what to do in each situation: a normal arrival, an approved gate pass, an approved exeat, an authorised pickup, a late arrival, a pupil with no pass, or a face the system does not know.",
    points: [
      {
        label: "The override is deliberately awkward",
        body: "For the case where a school has authorised something verbally but has not created the pass yet. It is tied to that guard’s own PIN, never a shared code, it requires a written reason and who authorised it, and the entry cannot be deleted afterwards.",
      },
      {
        label: "Unknown faces get logged, not waved through",
        body: "A visitor is recorded with name, phone, purpose and time in and out, which is the paper visitor book replaced rather than digitised alongside.",
      },
      {
        label: "It keeps working when the line drops",
        body: "Recognition runs on the school’s own network, so the gate carries on through an outage. Records sync once the connection returns.",
      },
    ],
    media:
      "the guard tablet at the gate showing an approved pass decision",
    mediaAspect: "aspect-[4/3]",
    accent: "var(--accent-security)",
    Icon: Devices,
    layout: "split-left",
  },
  {
    // STATUS: shipped. The Admin Dashboard user guide documents this in full,
    // screen by screen. /how-it-works carries the fuller summary.
    id: "admin-dashboard",
    title: "One dashboard instead of a shelf of files",
    lead: "The desktop application the school actually runs on. Live camera views with recognition overlays, the gate devices and guard accounts, and a searchable record of pupils, teachers, classes and timetables in one place rather than in separate books.",
    points: [
      {
        label: "Staff see their own job, not everything",
        body: "Roles decide what each account can open. Anything outside a role is hidden or refused, so a bursar, a class teacher and a head teacher are not all sharing one login.",
      },
      {
        label: "Records that answer a question in one search",
        body: "Pupils, teachers, classes, subjects and timetables, filterable, with bulk import from a spreadsheet so a school is not typing a roll in by hand.",
      },
      {
        label: "Messaging built in",
        body: "Staff group threads, one-to-one conversations with parents, and school-wide announcements, from the same place the records live.",
      },
    ],
    media: "the admin dashboard live view with the camera grid and recognition log",
    mediaAspect: "aspect-[16/10]",
    accent: "var(--accent-operations)",
    Icon: ChalkboardTeacher,
    layout: "wide",
  },
  {
    // STATUS: shipped. Documented in full in the Admin Dashboard user guide,
    // including the publish-to-parents action and both export formats.
    id: "grading",
    title: "Report cards, published in one action",
    lead: "A class’s assessment marks sit against the school’s own grading scale, which can be set per level or overridden for a single class. When a term’s reports are ready they publish to the parent portal in one action.",
    points: [
      {
        label: "Your grading scale, not ours",
        body: "Bands are defined by percentage range, letter and grade point, set as a default for an academic level and overridden per class where a school needs it.",
      },
      {
        label: "Parents see it where they already are",
        body: "Publishing notifies parents in the portal they already use for attendance, read-only, so there is no second login to explain.",
      },
      {
        label: "Still prints",
        body: "Exports to Excel and to PDF for print, because a report card often still has to leave the building on paper.",
      },
    ],
    media: "a class report card view with the grading scale beneath the table",
    mediaAspect: "aspect-[16/10]",
    accent: "var(--accent-attendance)",
    Icon: ChartLineUp,
    layout: "split-right",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHeader
        title="Every part of the school day, on one record."
        intro="Seven capabilities that share a single pupil record: recognition at the gate, attendance that writes itself, alerts to parents, boarding management, the screen the guard actually holds, the dashboard the office runs on, and report cards. A school can start with one and add the rest without replacing anything."
      />

      {CAPABILITIES.map((item, i) => (
        <Capability key={item.id} item={item} tone={i % 2 === 0 ? "base" : "raised"} />
      ))}

      <CtaBand
        title="Start with the gate, or start with the register."
        body="Most schools begin with one entry point and add the rest a term later. Tell us where the pressure is and we will scope that first."
      />
    </>
  );
}
