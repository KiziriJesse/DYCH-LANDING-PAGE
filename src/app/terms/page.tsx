import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms that apply to this website and to a DYCH Technologies school deployment.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What this page covers",
    paragraphs: [
      "These terms apply to the use of this website. A school deployment is governed by the signed agreement between DYCH Technologies and the school, which takes precedence over anything written here.",
    ],
  },
  {
    heading: "Information on this site",
    paragraphs: [
      "The descriptions of security, attendance, parent messaging and fees functions describe what the platform is built to do. Scope, hardware and timelines for any particular school are set in that school's proposal after a site visit, and nothing on this website is an offer or a quotation.",
    ],
  },
  {
    heading: "Enquiries you send us",
    paragraphs: [
      "When you use the contact form, you confirm that the details you enter are yours to share and that you are authorised to make the enquiry on behalf of the organisation you name. Do not send pupil records, biometric data or any other personal information about a third party through the form.",
    ],
  },
  {
    heading: "Availability",
    paragraphs: [
      "We aim to keep the site reachable but do not guarantee uninterrupted access. Pages may change without notice as the platform develops.",
    ],
  },
  {
    heading: "Ownership",
    paragraphs: [
      "The DYCH Technologies name, the site design and its written content belong to DYCH Technologies. You may link to the site and quote short passages with attribution. Reproducing whole pages, or presenting the platform as your own, is not permitted.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "Where the site links out, for example to WhatsApp, that service has its own terms and privacy practices. We are not responsible for how those services handle your data.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "This site is provided for information. To the extent permitted by Ugandan law, DYCH Technologies is not liable for loss arising from reliance on the website alone. Obligations relating to a live deployment sit in the school agreement, including uptime, support response and remedies.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of Uganda, and the courts of Uganda have jurisdiction over any dispute arising from them.",
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms"
      updated="7 September 2026"
      intro="Plain terms for the use of this website, and a note on where the binding obligations for a live school deployment actually sit."
      sections={SECTIONS}
    />
  );
}
