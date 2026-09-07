import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Security & trust",
  description:
    "How DYCH Technologies captures, stores, isolates, exports and deletes school and biometric data.",
};

export default function SecurityAndTrustPage() {
  return (
    <PagePlaceholder
      title="Children’s biometric data, handled carefully."
      summary="Recognition means holding biometric data about children, so how it is captured, stored, isolated between schools, exported and deleted matters more than any feature. This page sets out exactly that."
      buildsIn="Phase 4"
    />
  );
}
