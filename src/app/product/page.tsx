import type { Metadata } from "next";
import {
  ChartLineUp,
  ListChecks,
  PaperPlaneTilt,
  Receipt,
  ScanSmiley,
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Capability, type CapabilityData } from "@/components/product/Capability";
import { RecognitionFigure } from "@/components/product/RecognitionFigure";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Facial-recognition security, automatic attendance, parent alerts, fees and analytics from DYCH Technologies.",
};

// TODO: every `lead` and `points` entry below expands the copy carried over
// from the previous site and has not been reviewed by DYCH. Check each claim
// against what the platform actually ships before launch.
const CAPABILITIES: CapabilityData[] = [
  {
    id: "security",
    title: "Facial recognition at the entry point",
    lead: "A camera at the gate matches an arriving face against the school’s own enrolled records, and the entry is written the moment it happens. Staff, pupils and expected visitors pass through without stopping at a desk; anyone unrecognised is held for a person to check.",
    points: [
      {
        label: "What sits at the gate",
        body: "A camera on the approach, a reader at the threshold, and a local unit that does the matching on site rather than in a distant data centre.",
      },
      {
        label: "Who the school can see",
        body: "A live list of who is on the grounds, and who was expected but has not arrived, without anyone walking a clipboard to the perimeter.",
      },
      {
        label: "When recognition fails",
        body: "An unmatched face is not turned away automatically. It is flagged to the person on the gate, who checks it the way they always have.",
      },
    ],
    media:
      "recognition view at the school gate, or the camera and reader hardware in place",
    mediaAspect: "aspect-[4/3]",
    // The one capability with a real figure. The other four keep the marked
    // placeholder slot until artwork exists for them.
    renderMedia: () => <RecognitionFigure />,
    accent: "var(--accent-security)",
    Icon: ScanSmiley,
    layout: "split-right",
  },
  {
    id: "attendance",
    title: "A register that fills itself",
    lead: "Arrival and departure are recorded as they happen, from the same pass through the gate that handles security. The class teacher opens a register that is already correct, and nobody reconstructs a morning from memory at break.",
    points: [
      {
        label: "Marked without being marked",
        body: "The entry event is the attendance record. There is no second step for a teacher to remember and no paper register to transcribe.",
      },
      {
        label: "Late arrivals and early departures",
        body: "Both are timestamped rather than rounded to a lesson, so a pattern across a term is visible instead of anecdotal.",
      },
      {
        label: "Correcting a record",
        body: "Staff can amend an entry, and the amendment is kept alongside the original rather than overwriting it.",
      },
    ],
    media: "the attendance dashboard showing a class register for one morning",
    mediaAspect: "aspect-[4/3]",
    accent: "var(--accent-attendance)",
    Icon: ListChecks,
    layout: "split-left",
  },
  {
    id: "communication",
    title: "Parents told while it still matters",
    lead: "A message goes out on arrival, on departure, and when a pupil who was expected does not appear in the register. It travels over SMS and WhatsApp, so it reaches the handset a parent already carries without asking them to install anything.",
    points: [
      {
        label: "Three moments, not a feed",
        body: "Arrived, left, and did not arrive. Enough for a parent to trust the day without a stream of notifications they learn to ignore.",
      },
      {
        label: "The channel parents already use",
        body: "SMS reaches a basic handset with no data. WhatsApp carries more detail where a parent prefers it.",
      },
      {
        label: "Turning it down",
        body: "A guardian can ask the school to change the number, receive alerts for one pupil only, or stop them.",
      },
    ],
    media: "a phone showing a parent alert as it arrives",
    mediaAspect: "aspect-[9/19]",
    accent: "var(--accent-communication)",
    Icon: PaperPlaneTilt,
    layout: "stage",
  },
  {
    id: "finance",
    title: "Fees tied to the pupil, not to a paper file",
    lead: "Each student profile carries its own payment record, so the bursar can see what is outstanding without opening a ledger. Reminders reach the parent on the same channel as the attendance alerts, from a number they already recognise.",
    points: [
      {
        label: "One record per pupil",
        body: "Fee status sits on the same profile as attendance, so a question about a pupil is answered in one place.",
      },
      {
        label: "Reminders that are not a surprise",
        body: "Scheduled by the school, sent over the channel the parent already receives arrival messages on.",
      },
      {
        label: "What the bursar sees",
        body: "Outstanding balances by class or by term, exportable for the meeting where the question actually gets asked.",
      },
    ],
    media: "the finance view showing outstanding balances by class",
    mediaAspect: "aspect-[4/3]",
    accent: "var(--accent-finance)",
    Icon: Receipt,
    layout: "split-right",
  },
  {
    id: "analytics",
    title: "Analytics and reporting",
    lead: "Security logs and attendance records collect into one view, so a head teacher can answer a question with a record rather than a memory. Reports export, because the meeting that needs them rarely happens in front of a screen.",
    points: [
      {
        label: "Attendance over a term",
        body: "Trends by class, by pupil and by day of the week, so a pattern is visible while there is still time to act on it.",
      },
      {
        label: "Security log",
        body: "Every entry and exit, searchable by pupil, by gate and by time, including the ones a person had to check by hand.",
      },
      {
        label: "Exports",
        body: "Spreadsheet and PDF, for board papers, ministry returns and the conversation with a parent.",
      },
    ],
    media: "the analytics dashboard showing attendance trends across a term",
    mediaAspect: "aspect-[16/7]",
    // Analytics is the layer over all four features rather than a fifth one,
    // so it carries the brand accent, not a feature hue.
    accent: "var(--accent)",
    Icon: ChartLineUp,
    layout: "wide",
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHeader
        title="Every part of the school day, on one record."
        intro="Five capabilities that share a single student record: recognition at the gate, attendance that writes itself, alerts to parents, fees tied to the pupil, and the reporting that sits on top of all of it. A school can start with one and add the rest without replacing anything."
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
