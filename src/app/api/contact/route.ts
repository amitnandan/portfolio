import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// tiny validators
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Env checks (helps avoid confusing runtime errors)
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey || !to) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL in your environment.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to,
      // NOTE: If your SDK version prefers snake_case, change to `reply_to`.
      replyTo: `${name} <${email}>`,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            (typeof error === "object" && error && "message" in error
              ? (error as { message?: string }).message
              : undefined) || "Failed to send message. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unexpected server error.";
    console.error("API /contact error:", e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
