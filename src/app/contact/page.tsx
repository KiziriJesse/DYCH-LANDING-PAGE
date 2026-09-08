import type { Metadata } from "next";
import {
  EnvelopeSimple,
  MapPin,
  PhoneCall,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a demo with DYCH Technologies, or reach the team in Kampala by phone, WhatsApp or email.",
};

const CHANNELS: {
  Icon: typeof PhoneCall;
  label: string;
  lines: { text: string; href?: string; external?: boolean }[];
}[] = [
  {
    Icon: PhoneCall,
    label: "Call the team",
    lines: CONTACT.phones.map((p) => ({ text: p.display, href: p.href })),
  },
  {
    Icon: EnvelopeSimple,
    label: "Email",
    lines: [{ text: CONTACT.email.display, href: CONTACT.email.href }],
  },
  {
    Icon: MapPin,
    label: "Where we are",
    lines: [{ text: CONTACT.location }],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Talk to the team in Kampala."
        intro="Tell us the size of your roll and how attendance is taken today, and we will come back with what an installation would involve at your site. A site assessment costs nothing and ends with a written scope."
      />

      {/* No closing CTA band on this page: every other page's CTA points here,
          so one more "Book a Demo" would loop the reader back to where they
          already are. */}
      <section className="bg-background px-4 pb-28 pt-16 sm:px-6 lg:px-10 lg:pb-40 lg:pt-20">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {/* WhatsApp first and as real buttons: it is the channel that
                actually reaches us fastest, and the form below cannot yet
                deliver anything. */}
            <Reveal>
              <h2 className="text-xl tracking-[-0.02em] text-foreground">
                Prefer WhatsApp?
              </h2>
              <p className="mt-3 max-w-[46ch] leading-relaxed text-muted">
                It is the quickest way to reach us, and you will get a person rather
                than a ticket number.
              </p>
              <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {CONTACT.whatsapp.map((line) => (
                  <li key={line.href}>
                    <a
                      href={line.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full border border-accent-line bg-accent-soft py-2.5 pl-4 pr-5 text-[0.9375rem] font-semibold text-foreground transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent hover:bg-surface-raised active:scale-[0.98]"
                    >
                      <WhatsappLogo
                        size={20}
                        weight="light"
                        aria-hidden
                        className="text-accent"
                      />
                      <span className="nums">{line.display}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <dl className="mt-12 divide-y divide-[var(--border)] border-t border-border">
              {CHANNELS.map(({ Icon, label, lines }, i) => (
                <Reveal key={label} delay={0.06 * i} className="flex gap-5 py-6">
                  <dt className="sr-only">{label}</dt>
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface-raised text-accent"
                  >
                    <Icon size={22} weight="light" />
                  </span>
                  <dd>
                    <p className="text-sm font-medium text-faint">{label}</p>
                    {lines.map((line) =>
                      line.href ? (
                        <a
                          key={line.text}
                          href={line.href}
                          className="nums mt-1 block text-[0.9375rem] text-foreground underline decoration-[var(--accent-line)] decoration-2 underline-offset-4 transition-colors duration-300 hover:text-accent"
                        >
                          {line.text}
                        </a>
                      ) : (
                        <p key={line.text} className="mt-1 text-[0.9375rem] text-foreground">
                          {line.text}
                        </p>
                      ),
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-card border border-border bg-surface p-6 sm:p-9">
              <h2 className="text-xl tracking-[-0.02em] text-foreground">
                Or send us the details
              </h2>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-muted">
                The more you can tell us about the site, the more useful the first
                conversation is.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
