"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PaperPlaneTilt, Warning, CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

type Field = "name" | "company" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS: {
  id: Field;
  label: string;
  helper?: string;
  type: "text" | "email" | "textarea";
  autoComplete: string;
  spellCheck?: boolean;
}[] = [
  { id: "name", label: "Your name", type: "text", autoComplete: "name" },
  {
    id: "company",
    label: "School or organisation",
    type: "text",
    autoComplete: "organization",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    spellCheck: false,
  },
  {
    id: "message",
    label: "What would you like to solve?",
    helper:
      "How many people come through, how attendance or hours are recorded today, and anything already installed at the entrance.",
    type: "textarea",
    autoComplete: "off",
  },
];

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us who you are.";
  if (!values.company.trim())
    errors.company = "Please name the school or organisation.";
  if (!values.email.trim()) errors.email = "We need an address to reply to.";
  else if (!EMAIL.test(values.email.trim()))
    errors.email = "That address looks incomplete.";
  if (!values.message.trim())
    errors.message = "Tell us what you would like to solve.";
  else if (values.message.trim().length < 10)
    errors.message = "A sentence or two helps us route this to the right person.";
  return errors;
}

/**
 * Posts to /api/contact, which delivers the enquiry to the DYCH inbox.
 */
export function ContactForm() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");

  function update(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    const honeypot = String(
      new FormData(event.currentTarget).get("website") ?? "",
    );

    setStatus("sending");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setServerError(
          result?.error ||
            "The message could not be sent. Please email us directly or reach us on WhatsApp.",
        );
        setStatus("error");
        return;
      }

      setValues({ name: "", company: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setServerError(
        "The message could not be sent. Please email us directly or reach us on WhatsApp.",
      );
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {FIELDS.map((field) => {
        const inputId = `${uid}-${field.id}`;
        const error = errors[field.id];
        const helperId = field.helper ? `${inputId}-helper` : undefined;
        const errorId = error ? `${inputId}-error` : undefined;
        const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

        const shared = {
          id: inputId,
          name: field.id,
          value: values[field.id],
          autoComplete: field.autoComplete,
          spellCheck: field.spellCheck,
          "aria-invalid": error ? (true as const) : undefined,
          "aria-describedby": describedBy,
          // No focus:outline-none here: the global focus-visible ring is the
          // keyboard affordance and must survive.
          className:
            "w-full rounded-input border bg-surface-sunk px-4 py-3 text-foreground transition-colors duration-300 " +
            (error ? "border-accent" : "border-border-strong"),
        };

        return (
          <div
            key={field.id}
            className={`flex flex-col gap-2 ${
              field.type === "textarea" ? "sm:col-span-2" : ""
            }`}
          >
            <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
              {field.label}
            </label>
            {field.helper && (
              <p id={helperId} className="text-[0.8125rem] leading-relaxed text-muted">
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
                className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent-on-light"
              >
                <Warning size={15} weight="fill" aria-hidden />
                {error}
              </p>
            )}
          </div>
        );
      })}

      <div className="sm:col-span-2">
        {/* The submit was the last filled control on the site: a solid accent
            pill with a glow. Both are gone. It is the same outline button as
            every other control now, and the sending state is carried by the
            label plus the progress hairline rather than by a colour change. */}
        <span className="relative inline-block w-full overflow-hidden rounded-full sm:w-auto">
          <Button
            type="submit"
            size="lg"
            icon={PaperPlaneTilt}
            disabled={status === "sending"}
            className="w-full justify-center sm:w-auto sm:pr-10"
          >
            {status === "sending" ? "Sending your message" : "Send message"}
          </Button>
          {status === "sending" && (
            <motion.span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[3px] bg-accent"
              initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
              animate={{ scaleX: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 1.4, repeat: Infinity, ease: "linear" }
              }
            />
          )}
        </span>

        <p aria-live="polite" className="sr-only">
          {status === "sending"
            ? "Sending your message"
            : status === "sent"
              ? "Message sent"
              : ""}
        </p>

        {status === "sent" && (
          <p
            role="status"
            className="mt-6 flex gap-2.5 rounded-input border border-accent-line bg-accent-soft px-5 py-4 leading-relaxed text-foreground"
          >
            <CheckCircle size={20} weight="fill" aria-hidden className="mt-0.5 shrink-0 text-accent-on-light" />
            <span>
              <strong className="font-semibold">Message sent.</strong> We will
              come back from Kampala within one working day.
            </span>
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            className="mt-6 rounded-input border border-accent-line bg-accent-soft px-5 py-4 leading-relaxed text-foreground"
          >
            <strong className="font-semibold">The message did not go through.</strong>{" "}
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}
