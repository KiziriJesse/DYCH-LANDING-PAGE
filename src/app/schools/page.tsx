import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "Schools using DYCH Technologies for security, attendance and parent communication across Uganda.",
};

export default function SchoolsPage() {
  return (
    <PagePlaceholder
      title="The schools already running on DYCH."
      summary="Who is using the system, what changed for them, and what they say about it in their own words."
      buildsIn="Phase 5"
    />
  );
}
