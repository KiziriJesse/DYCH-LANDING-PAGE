"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CheckCircle,
  EnvelopeSimple,
  MapPin,
  Phone,
  WhatsappLogo,
  Warning,
} from "@phosphor-icons/react";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

type Field = "name" | "company" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS: {
  id: Field;
  label: string;
  helper?: string;
  type: "text" | "email" | "textarea";
  autoComplete?: string;
}[] = [
  { id: "name", label: "Your name", type: "text", autoComplete: "name" },
  {
    id: "company",
    label: "School or organisation",
    type: "text",
    autoComplete: "organization",
  },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  {
    id: "message",
    label: "What would you like to solve?",
    helper: "Roll size, current register method, and anything already installed at the gate.",
    type: "textarea",
  },
];

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us who you are.";
  if (!values.company.trim()) errors.company = "Please name the school or organisation.";
  if (!values.email.trim()) errors.email = "We need an address to reply to.";
  else if (!EMAIL.test(values.email.trim())) errors.email = "That address looks incomplete.";
  if (!values.message.trim()) errors.message = "Tell us what you would like to solve.";
  else if (values.message.trim().length < 10)
    errors.message = "A sentence or two helps us route this to the right person.";
  return errors;
}

const CHANNELS: {
  Icon: typeof Phone;
  label: string;
  lines: { text: string; href?: string }[];
}[] = [
  {
    Icon: Phone,
    label: "Call the team",
    lines: [
      { text: "+256 767 870 035", href: "tel:+256767870035" },
      { text: "+256 788 195 067", href: "tel:+256788195067" },
    ],
  },
  {
    Icon: WhatsappLogo,
    label: "WhatsApp",
    lines: [{ text: "Message +256 767 870 035", href: "https://wa.me/256767870035" }],
  },
  {
    Icon: EnvelopeSimple,
    label: "Email",
    lines: [{ text: "xristeck@gmail.com", href: "mailto:xristeck@gmail.com" }],
  },
  {
    Icon: MapPin,
    label: "Where we are",
    lines: [{ text: "Kampala, Uganda" }],
  },
];

export function Contact() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(
          data.formError ?? "We could not send that. Please check the fields and try again.",
        );
        setStatus("idle");
        return;
      }

      setStatus("sent");
    } catch {
      setFormError(
        "The message did not reach us. Please call or use the WhatsApp link on the left.",
      );
      setStatus("idle");
    }
  }

  return (
    <section id="contact-team" className="bg-canvas-alt px-4 py-28 sm:px-6 lg:px-10 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
            className="max-w-[14ch] font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink"
          >
            Contact our team.
          </motion.h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
            Tell us the size of your roll and how attendance is taken today. We will
            come back with what an installation would involve at your site.
          </p>

          <dl className="mt-12 divide-y divide-[var(--line)] border-t border-line">
            {CHANNELS.map(({ Icon, label, lines }) => (
              <div key={label} className="flex gap-5 py-6">
                <dt className="sr-only">{label}</dt>
                <span
                  aria-hidden
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[var(--accent-text)] ring-1 ring-[var(--accent-line)]"
                >
                  <Icon size={22} weight="light" />
                </span>
                <dd>
                  <p className="text-sm font-medium text-ink-faint">{label}</p>
                  {lines.map((line) =>
                    line.href ? (
                      <a
                        key={line.text}
                        href={line.href}
                        {...(line.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="nums mt-1 block text-[0.9375rem] text-ink underline decoration-[var(--accent-line)] decoration-2 underline-offset-4 transition-colors duration-300 hover:text-[var(--accent-text)]"
                      >
                        {line.text}
                      </a>
                    ) : (
                      <p key={line.text} className="mt-1 text-[0.9375rem] text-ink">
                        {line.text}
                      </p>
                    ),
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="bezel shadow-[var(--shade)] lg:col-span-7"
        >
          <div className="bezel-core p-6 sm:p-10">
            {status === "sent" ? (
              <div className="flex min-h-[24rem] flex-col justify-center">
                <span
                  aria-hidden
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-[var(--accent-text)] ring-1 ring-[var(--accent-line)]"
                >
                  <CheckCircle size={28} weight="light" />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">
                  Your message is with the team.
                </h3>
                <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-muted">
                  The team picks it up from the Kampala office and replies to the
                  address you gave. If it is urgent, WhatsApp reaches us faster.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues({ name: "", company: "", email: "", message: "" });
                    setStatus("idle");
                  }}
                  className="mt-8 w-fit rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-accent-line active:scale-[0.98]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
                {FIELDS.map((field) => {
                  const inputId = `${uid}-${field.id}`;
                  const error = errors[field.id];
                  const helperId = field.helper ? `${inputId}-helper` : undefined;
                  const errorId = error ? `${inputId}-error` : undefined;
                  const describedBy =
                    [helperId, errorId].filter(Boolean).join(" ") || undefined;

                  const shared = {
                    id: inputId,
                    name: field.id,
                    value: values[field.id],
                    autoComplete: field.autoComplete,
                    "aria-invalid": error ? (true as const) : undefined,
                    "aria-describedby": describedBy,
                    // No focus:outline-none here: the global focus-visible ring is
                    // the keyboard affordance and must survive.
                    className:
                      "w-full rounded-input border bg-surface-sunk px-4 py-3 text-ink transition-colors duration-300 " +
                      (error ? "border-[var(--accent-text)]" : "border-line-strong"),
                  };

                  return (
                    <div
                      key={field.id}
                      className={`flex flex-col gap-2 ${
                        field.type === "textarea" ? "sm:col-span-2" : ""
                      }`}
                    >
                      <label htmlFor={inputId} className="text-sm font-semibold text-ink">
                        {field.label}
                      </label>
                      {field.helper && (
                        <p id={helperId} className="text-[0.8125rem] text-ink-muted">
                          {field.helper}
                        </p>
                      )}
                      {field.type === "textarea" ? (
                        <textarea
                          {...shared}
                          rows={5}
                          onChange={(e) => update(field.id, e.target.value)}
                        />
                      ) : (
                        <input
                          {...shared}
                          type={field.type}
                          onChange={(e) => update(field.id, e.target.value)}
                        />
                      )}
                      {error && (
                        <p
                          id={errorId}
                          className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--accent-text)]"
                        >
                          <Warning size={15} weight="fill" aria-hidden />
                          {error}
                        </p>
                      )}
                    </div>
                  );
                })}

                {formError && (
                  <p
                    role="alert"
                    className="sm:col-span-2 rounded-input border border-accent-line bg-accent-soft px-4 py-3 text-[0.875rem] leading-relaxed text-ink"
                  >
                    {formError}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative w-full overflow-hidden rounded-full bg-accent px-6 py-4 text-[0.9375rem] font-semibold text-[var(--accent-ink)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:cursor-progress disabled:opacity-75 sm:w-auto sm:px-10"
                  >
                    {status === "sending" ? "Sending your message" : "Send message"}
                    {status === "sending" && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--accent-ink)]/45"
                        initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </button>
                  <p aria-live="polite" className="sr-only">
                    {status === "sending" ? "Sending your message" : ""}
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
