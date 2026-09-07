import { NextResponse } from "next/server";

/**
 * Contact intake.
 *
 * TODO (DYCH): wire a delivery provider here. The handler validates and shapes
 * the payload, then hands it off. Point the `deliver` call at whichever of these
 * you settle on and set the credentials in `.env.local`:
 *   - transactional email (Resend / Postmark / SES) to the team inbox
 *   - or a WhatsApp Business API message to the number in the footer
 * Until that is connected, submissions are logged on the server and the sender
 * is told to use the phone or WhatsApp link instead of being shown a false
 * "we have received it".
 */

const MAX = { name: 120, company: 160, email: 200, message: 4000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = {
  name: string;
  company: string;
  email: string;
  message: string;
};

function validate(input: Partial<Payload>) {
  const errors: Partial<Record<keyof Payload, string>> = {};

  if (!input.name?.trim()) errors.name = "Please tell us who you are.";
  else if (input.name.length > MAX.name) errors.name = "That name is too long.";

  if (!input.company?.trim()) errors.company = "Please name the school or organisation.";
  else if (input.company.length > MAX.company) errors.company = "That name is too long.";

  if (!input.email?.trim()) errors.email = "We need an address to reply to.";
  else if (!EMAIL.test(input.email.trim())) errors.email = "That address looks incomplete.";
  else if (input.email.length > MAX.email) errors.email = "That address is too long.";

  if (!input.message?.trim()) errors.message = "Tell us what you would like to solve.";
  else if (input.message.trim().length < 10)
    errors.message = "A sentence or two helps us route this to the right person.";
  else if (input.message.length > MAX.message) errors.message = "Please shorten this a little.";

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<Payload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, formError: "We could not read that submission. Please try again." },
      { status: 400 },
    );
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const enquiry = {
    name: body.name!.trim(),
    company: body.company!.trim(),
    email: body.email!.trim(),
    message: body.message!.trim(),
    receivedAt: new Date().toISOString(),
  };

  // Replace this with the delivery call described above.
  console.info("[contact] enquiry received", enquiry);

  const configured = Boolean(process.env.CONTACT_DELIVERY_CONFIGURED);
  if (!configured) {
    return NextResponse.json(
      {
        ok: false,
        formError:
          "Message delivery is not connected yet. Please call or message us on WhatsApp and we will pick it up straight away.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
