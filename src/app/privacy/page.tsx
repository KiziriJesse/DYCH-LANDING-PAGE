import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How DYCH Technologies handles school records, biometric identifiers and parent contact details.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who controls the data",
    paragraphs: [
      "For every school deployment, the school is the data controller and DYCH Technologies is the processor. The school decides which pupils are enrolled, which parents are contacted, and how long records are kept. We act on those instructions and do not use school data for any other purpose.",
      "For enquiries sent through this website, DYCH Technologies is the controller of the name, organisation, email address and message you submit.",
    ],
  },
  {
    heading: "What the system holds",
    paragraphs: [
      "A school deployment stores only what the attendance and entry-point functions require:",
    ],
    list: [
      "Pupil identity record: name, class, and the school's own pupil number.",
      "A biometric template used for matching. This is a mathematical representation, not a stored image of a face or finger.",
      "Entry and exit timestamps generated at the gate.",
      "Parent or guardian contact number, used to deliver attendance messages.",
      "Fee status where the school has enabled the finance module.",
    ],
  },
  {
    heading: "Children and consent",
    paragraphs: [
      "Enrolment of a pupil is arranged by the school with the parent or guardian, not by DYCH Technologies. Schools should obtain and record written consent before a pupil is enrolled, and should be able to withdraw a pupil from biometric matching on request without that pupil losing access to school.",
      "Where consent is withdrawn, the school can delete the biometric template from the console. Attendance can then be recorded by card or by the class teacher instead.",
    ],
  },
  {
    heading: "Where data is stored",
    paragraphs: [
      "The system is built to keep running when connectivity drops, so records are written locally at the school first and synchronised afterwards. Schools can ask us at any time which components hold data on site and which are synchronised off site, and we will document it for their deployment in writing.",
    ],
  },
  {
    heading: "Messages to parents",
    paragraphs: [
      "Attendance messages are sent over SMS and WhatsApp using the number the school holds for the guardian. A guardian can ask the school to stop the messages, change the number, or receive them for one pupil only. Numbers are not shared with advertisers and are not used for marketing.",
    ],
  },
  {
    heading: "Retention and deletion",
    paragraphs: [
      "Retention is set by the school. When a contract ends, the school can request export of its records and deletion of the copies held by DYCH Technologies. We will confirm deletion in writing.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Parents, guardians and staff can ask to see what the system holds about them, ask for a correction, or ask for deletion. Requests about a pupil should go to the school in the first instance, since the school holds the record. If the school needs our help to answer, we will provide it.",
    ],
  },
  {
    heading: "Website analytics",
    paragraphs: [
      "This site does not set advertising cookies and does not track visitors across other sites. If analytics are added later, this page will be updated before they are switched on.",
    ],
  },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy"
      updated="7 September 2026"
      intro="This page explains what a DYCH Technologies deployment holds, who decides what happens to it, and how a parent, pupil or member of staff can ask about their own record."
      sections={SECTIONS}
    />
  );
}
