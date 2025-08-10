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
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

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

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO_EMAIL!;
    const from = process.env.FROM_EMAIL || "onboarding@resend.dev"; // safe test sender

    const { data, error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to,
      replyTo: `${name} <${email}>`, // user’s email goes to Reply-To
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: error.message || "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e: any) {
    console.error("API /contact error:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Unexpected server error." },
      { status: 500 }
    );
  }
}
