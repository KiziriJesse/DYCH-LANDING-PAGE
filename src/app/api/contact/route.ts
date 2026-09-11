import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INBOX = CONTACT.email.display;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 12;

const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function str(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  if (limited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Please wait a few minutes before sending another message." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "The form could not be read." }, { status: 400 });
  }

  // Bots fill hidden fields. Pretend success so they do not retry.
  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 120);
  const company = str(body.company, 160);
  const email = str(body.email, 254);
  const message = str(body.message, 5000);

  if (!name || !company || !email || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please complete the form." }, { status: 400 });
  }

  const origin =
    request.headers.get("origin") ||
    request.headers.get("referer")?.replace(/\/[^/]*$/, "") ||
    new URL(request.url).origin;

  const payload = {
    name,
    company,
    email,
    message,
    _replyto: email,
    _subject: `DYCH website enquiry from ${name} (${company})`,
    _template: "box",
    _captcha: "false",
  };

  const upstream = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/contact`,
    },
    body: JSON.stringify(payload),
  });

  const result = (await upstream.json().catch(() => null)) as
    | { success?: string | boolean; message?: string }
    | null;

  const note = (result?.message ?? "").toLowerCase();
  if (note.includes("activation")) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Check dychtech256@gmail.com for an email from FormSubmit titled something like “Activate Form”, click the link, then send this message again. Look in spam if it is not in the inbox.",
      },
      { status: 409 },
    );
  }

  const accepted =
    upstream.ok &&
    (result?.success === true ||
      result?.success === "true" ||
      result?.success === "True");

  if (!accepted) {
    return NextResponse.json(
      {
        ok: false,
        error:
          result?.message ||
          "The message could not be sent. Please email us directly or reach us on WhatsApp.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
