import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a demo with DYCH Technologies, or reach the team by phone, WhatsApp or email.",
};

export default function ContactPage() {
  return (
    <PagePlaceholder
      title="Talk to the team in Kampala."
      summary="Tell us the size of your roll and how attendance is taken today, and we will come back with what an installation would involve at your site."
      buildsIn="Phase 5"
    />
  );
}
