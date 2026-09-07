import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Facial-recognition security, automatic attendance, parent alerts, fees and analytics from DYCH Technologies.",
};

export default function ProductPage() {
  return (
    <PagePlaceholder
      title="Every part of the school day, on one record."
      summary="Five capabilities that share one student record: recognition at the gate, attendance that writes itself, alerts to parents, fees tied to the pupil, and the reporting that sits on top of all of it."
      buildsIn="Phase 3"
    />
  );
}
