/*  PARKED - NOT A ROUTE, NOT BUILT, NOT LINKED.

    This page is commented out and the file is off the `page.tsx` name, so
    App Router does not route it and nothing below ships.

    WHY: no DYCH document describes a business deployment. Everything below
    was derived by generalising the confirmed schools technology, which was
    honest as a draft but is not something to publish as product copy. It
    waits here for the business documents.

    TO BRING IT BACK:
      1. Rewrite the capabilities below against the real business documents.
         Do not simply uncomment - the content is inference, not source.
      2. Uncomment the file and rename it back to `page.tsx`.
      3. Restore the "For Business" entry in PRODUCT_VERTICALS in
         src/lib/site.ts, the second card on /product, the Smart Vision for
         Business line in SITEMAP, and the pointer under the homepage
         product grid. Each of those carries a comment marking the spot.
*/

// import type { Metadata } from "next";
// import {
//   DeviceMobileSpeaker,
//   Export,
//   ListChecks,
//   ScanSmiley,
//   Table,
// } from "@phosphor-icons/react/dist/ssr";
// import { PageHeader } from "@/components/ui/PageHeader";
// import { CtaBand } from "@/components/ui/CtaBand";
// import { Capability, type CapabilityData } from "@/components/product/Capability";
// import { RecognitionFigure } from "@/components/product/RecognitionFigure";
//
// export const metadata: Metadata = {
//   title: "Smart Vision for Business",
//   description:
//     "Facial-recognition access at reception, automatic staff time records, real-time alerts to a security desk, and one operations dashboard, from DYCH Technologies.",
// };
//
// /*  ============================================================
//     DERIVED, NOT CONFIRMED. READ BEFORE PUBLISHING.
//
//     Every other product page on this site is written from a DYCH source
//     document. This one is not. No document provided describes what Smart
//     Vision does for a general business client - the case-study deck, the
//     product spec and the admin guide are all written for schools.
//
//     So this page is a GENERALISATION of the confirmed underlying technology,
//     reframed for a business deployment:
//
//       gate            -> entry point / reception
//       pupil           -> staff member, contractor, visitor
//       student roll    -> staff directory
//       parent alert    -> alert to a manager or the security desk
//       class register  -> time record
//       head teacher    -> operations or HR
//
//     The technology claims underneath are the confirmed ones and have not been
//     stretched: on-device matching, no images leaving the site, offline
//     operation at the entry point, an admin application, and exports.
//
//     DELIBERATELY NOT INVENTED: printed visitor badges, meeting-room booking,
//     turnstile or door-hardware integration, payroll integration, occupancy
//     analytics, anti-tailgating. None of those appear in any source document,
//     and several imply hardware DYCH has not said it supplies.
//
//     ACTION REQUIRED: DYCH must confirm or correct this page before it goes
//     live. If a business deployment differs from the schools build in any way -
//     different hardware, a different licence, features that do not exist
//     outside the school product - this page is wrong until it says so.
//     ============================================================ */
// const CAPABILITIES: CapabilityData[] = [
//   {
//     // DERIVED from the confirmed gate-recognition capability. The matching
//     // behaviour, the tuning thresholds and the on-device claim are all
//     // document-backed; only the setting is generalised.
//     id: "access",
//     title: "Recognition at reception, not a badge at a desk",
//     lead: "A camera at the entry point matches an arriving face against your own enrolled directory, and a unit on your premises does the matching. Face data is matched and encrypted on your own hardware: no images leave the building. Someone walks in as normal, with no card to forget and no fob to lend to a colleague.",
//     points: [
//       {
//         label: "Tuned to your entrance, not to a default",
//         body: "Match, low and track similarity thresholds, minimum face size and track timeout are adjustable, so you set how strictly a face must match before it counts as recognised. A busy lobby and a quiet back entrance are not the same problem.",
//       },
//       {
//         label: "Nobody is refused by a machine",
//         body: "An unrecognised face is flagged for the person on the desk to check. The system raises the question; a human answers it.",
//       },
//       {
//         label: "It does not stop when the line does",
//         body: "Matching runs on your network, so the entrance keeps working through an outage and records sync when connectivity returns.",
//       },
//     ],
//     media: "the recognition view at a reception desk, or the camera in place above an entrance",
//     mediaAspect: "aspect-[4/3]",
//     renderMedia: () => <RecognitionFigure />,
//     Icon: ScanSmiley,
//     layout: "split-right",
//   },
//   {
//     // DERIVED from the confirmed attendance capability, which writes the
//     // entry event straight into a register. Same mechanism, different record.
//     id: "time",
//     title: "Hours recorded from the door, not from a form",
//     lead: "The entry event is the time record. First in and last out are timestamped from the same scan that opened the door, so there is no separate clock to remember and no timesheet reconstructed on a Friday afternoon.",
//     points: [
//       {
//         label: "Arrival, departure, and the gap between",
//         body: "Each scan is timestamped against the staff record as it happens. Late arrivals and early departures land at their real times rather than at whatever someone writes down later.",
//       },
//       {
//         label: "Contractors and visitors on the same record",
//         body: "A contractor on site for a week and a visitor on site for an hour both produce the same kind of entry and exit event, so who was in the building is one question with one answer.",
//       },
//       {
//         label: "Exceptions are the interesting part",
//         body: "Expected but not arrived is the state worth surfacing, and it surfaces on its own rather than waiting for someone to notice an empty desk.",
//       },
//     ],
//     media: "the time record for one team over a week, filterable by person and date",
//     mediaAspect: "aspect-[4/3]",
//     Icon: ListChecks,
//     layout: "split-left",
//   },
//   {
//     // DERIVED from the confirmed parent-alert capability. Push primary, SMS
//     // as a metered fallback - that split is document-backed. The recipient
//     // is generalised from a parent to a manager or a security desk.
//     id: "alerts",
//     title: "The desk knows before anyone walks over to ask",
//     lead: "A push notification reaches whoever needs to know within seconds of the scan, carrying the person's photo so the recipient can see at a glance that it matched the right individual. Push is the primary channel: it is immediate and costs nothing per message.",
//     points: [
//       {
//         label: "SMS is the fallback, and it is metered",
//         body: "If a push goes unopened, an SMS follows, so someone without the app on their phone is still reached. SMS carries a real per-message cost and is priced as an add-on rather than folded into a flat fee.",
//       },
//       {
//         label: "Who gets told is a decision, not a broadcast",
//         body: "An unrecognised face at a service entrance and a director arriving early are not the same event. Recipients are set per alert type rather than everything going to everyone.",
//       },
//       {
//         label: "Site-wide notices from the same place",
//         body: "Announcements go out from the dashboard, separate from the alert stream, so a notice does not get lost among arrivals.",
//       },
//     ],
//     media: "a phone showing an arrival alert as it reaches a duty manager",
//     mediaAspect: "aspect-[9/19]",
//     Icon: DeviceMobileSpeaker,
//     layout: "stage",
//   },
//   {
//     // DERIVED from the Admin Dashboard user guide, which documents this
//     // application in full. The screens are confirmed; the framing for HR and
//     // operations rather than a school office is the generalisation.
//     id: "operations",
//     title: "One application instead of a shared spreadsheet",
//     lead: "The desktop application your operations and HR people actually run on. Live camera views with recognition overlays, the entry devices and desk accounts, and a searchable directory of staff, contractors and departments in one place.",
//     points: [
//       {
//         label: "People see their own job, not everything",
//         body: "Roles decide what each account can open, and anything outside a role is hidden or refused. HR, a duty manager and a security desk are not sharing one login.",
//       },
//       {
//         label: "A directory that answers a question in one search",
//         body: "Staff, departments and access groups, filterable, with bulk import from a spreadsheet so nobody types a headcount in by hand.",
//       },
//       {
//         label: "Messaging built in",
//         body: "Group threads, one-to-one conversations and site-wide announcements, from the same place the records live.",
//       },
//     ],
//     media: "the operations dashboard with the live camera grid and the recent-entry log",
//     mediaAspect: "aspect-[16/10]",
//     Icon: Table,
//     layout: "wide",
//   },
//   {
//     // DERIVED from the confirmed records-and-export capability. Note what it
//     // does NOT say: there is no trend dashboard and no analytics product.
//     // Live counts and exports are what exists.
//     id: "reporting",
//     title: "Records you can take out of the building",
//     lead: "Everything above produces records. This is where they become something you can put in front of an auditor, a client or a board, without anyone re-keying a month.",
//     points: [
//       {
//         label: "Counts now, not charts later",
//         body: "Who is on site, by department and by entrance, as a live figure. This is a record system rather than an analytics dashboard, and it does not pretend otherwise.",
//       },
//       {
//         label: "Exports in a format someone else can open",
//         body: "Entry logs and time records export to Excel and to PDF, without a request to us and without a charge.",
//       },
//       {
//         label: "Retention you set",
//         body: "Records are kept for the period you choose rather than a period we choose, and deletion is something you can ask for in writing and get in writing.",
//       },
//     ],
//     media: "an exported entry log open in a spreadsheet, with the date filter visible",
//     mediaAspect: "aspect-[16/10]",
//     Icon: Export,
//     layout: "split-right",
//   },
// ];
//
// export default function ProductBusinessPage() {
//   return (
//     <>
//       <PageHeader
//         title="The same entrance, minus the paperwork behind it."
//         intro="Smart Vision for business. Recognition at the entry point, hours recorded from that same scan, alerts to the people who need them, and one application over the top. Built on the technology already running at school gates, where an outage is normal and a system that stops when the internet does is worse than paper."
//       />
//
//       {CAPABILITIES.map((item, i) => (
//         <Capability key={item.id} item={item} tone={i % 2 === 0 ? "base" : "raised"} />
//       ))}
//
//       <CtaBand
//         title="Tell us what your entrance looks like now."
//         body="A site visit is an hour walking your entry points and a written scope at the end of it. It costs nothing, and if this is not right for your building we will say so."
//       />
//     </>
//   );
// }
//
