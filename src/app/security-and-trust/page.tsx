import type { Metadata } from "next";
import {
  Export,
  HandPalm,
  PlugsConnected,
  UserFocus,
  Vault,
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Commitment, type CommitmentData } from "@/components/trust/Commitment";

export const metadata: Metadata = {
  title: "Security & trust",
  description:
    "How DYCH Technologies captures, stores, isolates, exports and deletes school records and biometric data.",
};

/*  ============================================================
    STOP. READ BEFORE THIS PAGE GOES LIVE.

    Every statement below is a claim about how DYCH handles biometric data
    belonging to children. None of it has been verified against the platform
    as built, and none of it has been reviewed by a lawyer.

    Two of these five sections, "Isolation between schools" and "Export and
    deletion", were written from scratch. The build plan said to reuse that
    copy from Trust.tsx, but Trust.tsx contains no such copy: it only ever
    covered offline-first operation and SMS/WhatsApp delivery. So those two
    sections are proposed positioning, not a restatement of anything DYCH has
    previously said.

    Before launch, each point needs to be either confirmed by engineering,
    corrected, or removed. Deliberately absent, because inventing them would
    be worse than leaving them out:
      - named certifications (ISO 27001, SOC 2 and the like)
      - specific encryption algorithms or key lengths
      - retention periods in days or years
      - any claim of compliance with the Uganda Data Protection and Privacy
        Act, or with GDPR
    ============================================================ */
const COMMITMENTS: CommitmentData[] = [
  {
    id: "biometric-data",
    title: "Biometric data, handled carefully",
    lead: "Enrolment does not keep a photograph of a child. It produces a mathematical template used for matching, and the template is what the system holds. It exists to recognise a pupil at an entry point and to mark a register, and it is not put to any other purpose.",
    points: [
      {
        label: "What is actually held",
        body: "A matching template derived from the face, the pupil record the school already keeps, and the entry and exit events that matching produces.",
      },
      {
        label: "What it is never used for",
        body: "It is not sold, not shared with advertisers, and not used to build or improve anything for another customer.",
      },
      {
        label: "Where matching happens",
        body: "On a unit at the school. Recognition does not depend on a round trip to a distant server, which is also why the gate keeps working when the line drops.",
      },
    ],
    Icon: UserFocus,
  },
  {
    id: "consent",
    title: "Consent and control",
    lead: "Enrolment is arranged between the school and the guardian, not between DYCH and the family. A school should hold recorded consent for every pupil before a template is created, and should be able to act on a withdrawal the same day it arrives.",
    points: [
      {
        label: "Consent comes first",
        body: "A pupil is enrolled after the school records the guardian’s agreement, not before it.",
      },
      {
        label: "Withdrawing it costs the pupil nothing",
        body: "The school deletes the template from the console, and attendance for that pupil continues by card or by the class teacher. No child is shut out of school for being withdrawn from recognition.",
      },
      {
        label: "Who can enrol",
        body: "Named staff accounts only, and every enrolment is written to a log the school can read.",
      },
    ],
    Icon: HandPalm,
  },
  {
    id: "isolation",
    title: "Isolation between schools",
    lead: "One school’s records are not visible to another. A deployment is scoped to the school that owns it, and there is no shared roll across customers that anyone could query.",
    points: [
      {
        label: "No pooled register",
        body: "Templates and pupil records belong to one school. They are not combined into a wider index.",
      },
      {
        label: "Accounts are scoped",
        body: "A staff account reaches its own school and nothing beyond it.",
      },
      {
        label: "Support access is visible",
        body: "Where our staff need access to diagnose a fault, it is requested from the school and recorded, rather than standing open.",
      },
    ],
    Icon: Vault,
  },
  {
    id: "export-and-deletion",
    title: "Export and deletion",
    lead: "The records are the school’s, not ours. A school can take them out in a form it can actually use, and can require that our copies be destroyed.",
    points: [
      {
        label: "Taking the records out",
        body: "Attendance, entry logs and fee records export in a readable format, without a request to us and without a fee.",
      },
      {
        label: "Ending a contract",
        body: "On request we delete the school’s data and confirm in writing what was removed and when.",
      },
      {
        label: "A single pupil leaving",
        body: "A leaver’s template can be destroyed while the attendance record the school is required to keep stays intact.",
      },
    ],
    Icon: Export,
  },
  {
    id: "resilience",
    title: "Uptime and offline resilience",
    lead: "A system that stops when the connection does is worse than paper, because staff stop trusting it. The gate keeps reading and the register keeps writing through an outage.",
    points: [
      {
        label: "Local first",
        body: "Entry events are written on site as they happen, not queued in the hope of a connection.",
      },
      {
        label: "Catching up",
        body: "When connectivity returns, records synchronise on their own. Nobody re-keys a morning.",
      },
      {
        label: "Power",
        body: "Battery backup at the entry point, so a cut does not leave a gate that cannot tell anyone who came through it.",
      },
    ],
    Icon: PlugsConnected,
  },
];

// TODO: confirm DYCH is willing to answer all five of these before publishing.
// The section only works if the answers exist.
const QUESTIONS = [
  "Where is the matching performed, and what happens to recognition when our connection is down?",
  "What exactly is stored for each pupil, and can you show us one record end to end?",
  "How do we withdraw a pupil from recognition, and what does that pupil’s day look like afterwards?",
  "If we leave, what do we get back, in what format, and how do you prove your copies are gone?",
  "Who at your company can see our data, under what circumstances, and where is that recorded?",
];

export default function SecurityAndTrustPage() {
  return (
    <div className="theme-light">
      <PageHeader
        title="Children’s biometric data, handled carefully."
        intro="Recognition means holding data about children, so how it is captured, stored, kept apart from other schools, exported and destroyed matters more than any feature on this site. This page sets out how that works, in terms a head teacher can take to a board meeting."
      />

      <section className="bg-background px-4 pb-24 pt-20 sm:px-6 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-[1240px]">
          {COMMITMENTS.map((item) => (
            <Commitment key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Questions rather than claims: a different kind of block from the
          commitments above, and it invites scrutiny instead of asserting. */}
      <section className="bg-surface px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <h2 className="max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-foreground">
              Questions worth putting to us, and to anyone else.
            </h2>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
              If a supplier cannot answer these plainly, that is worth knowing before
              a single camera goes up. Ask us at a site assessment and hold us to the
              answers.
            </p>
          </Reveal>

          <ol className="mt-12 border-t border-border">
            {QUESTIONS.map((question, i) => (
              <Reveal
                as="li"
                key={question}
                delay={0.05 * i}
                className="flex gap-6 border-b border-border py-6"
              >
                <span
                  aria-hidden
                  className="nums mt-0.5 shrink-0 text-sm font-semibold text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[68ch] text-lg leading-relaxed text-foreground">
                  {question}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Bring your data protection questions to the site assessment."
        body="We would rather answer them in front of your board than after an installation. A site assessment costs nothing and ends with a written scope."
      />
    </div>
  );
}
