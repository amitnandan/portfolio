"use client";

import { useEffect, useRef, useState } from "react";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState<{ email?: boolean }>({});

  const nameEmpty = name.trim() === "";
  const emailEmpty = email.trim() === "";
  const emailBad = !emailEmpty && !isEmail(email);
  const messageEmpty = message.trim() === "";

  const showNameError = attempted && nameEmpty;
  const showMessageError = attempted && messageEmpty;
  const showEmailError = Boolean(
    (attempted && (emailEmpty || emailBad)) || (!attempted && !!touched.email && emailBad)
  );

  const formValid = !nameEmpty && !emailEmpty && !emailBad && !messageEmpty;

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  async function handleSend() {
    setAttempted(true);
    if (!formValid || status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const data = new FormData();
      data.append("name", name.trim());
      data.append("email", email.trim());
      data.append("message", message.trim());

      const res = await fetch("/api/contact", { method: "POST", body: data, signal: ac.signal });
      let json: any = null;
      try { json = await res.json(); } catch {}

      if (!res.ok || !json?.ok) {
        const msg =
          json?.error ||
          (res.status >= 500
            ? "Server error. Please try again in a moment."
            : res.status >= 400
            ? "Please check your details and try again."
            : "Failed to send message. Please try again later.");
        setStatus("error");
        setErrorMsg(msg);
        return;
      }

      setStatus("success");
      setName(""); setEmail(""); setMessage("");
      setAttempted(false); setTouched({});
      const t = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(t);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  function handleReset() {
    setName(""); setEmail(""); setMessage("");
    setAttempted(false); setTouched({});
    setStatus("idle"); setErrorMsg("");
    abortRef.current?.abort();
  }

  const fieldClass = (showErr: boolean) =>
    `w-full bg-white/5 border rounded px-3 py-2 text-white placeholder-white/50 transition
     ${showErr ? "border-red-500/60 focus:outline-none focus:border-red-400"
               : "border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20"}`;

  return (
    <section id="contact" className="relative pb-28">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h3 className="text-3xl font-bold text-white mb-10 text-center">Contact</h3>

        {status === "success" && (
          <div className="mt-6 mx-auto max-w-xl rounded-md border border-white/10 bg-green-500/10 text-green-200 px-4 py-3 text-sm text-center" role="status">
            ✅ Thanks! Your message has been sent.
          </div>
        )}
        {status === "error" && (
          <div className="mt-6 mx-auto max-w-xl rounded-md border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm text-center" role="alert">
            {errorMsg}
          </div>
        )}

        <form
          noValidate
          className="mt-6 grid gap-4 max-w-xl mx-auto"
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          {/* Name */}
          <div>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              autoCapitalize="words"
              autoCorrect="off"
              spellCheck={false}
              required
              aria-invalid={!!showNameError}
              aria-describedby={showNameError ? "name-error" : undefined}
              className={fieldClass(!!showNameError)}
            />
            {showNameError && (
              <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">
                Please enter your name.
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!touched.email) setTouched({ email: true });
              }}
              type="email"
              placeholder="Your email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
              aria-invalid={!!showEmailError}
              aria-describedby={showEmailError ? "email-error" : undefined}
              className={fieldClass(!!showEmailError)}
            />
            {showEmailError && (
              <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                {emailEmpty ? "Please enter your email address." : "Please enter a valid email address."}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="How can I help?"
              autoCorrect="off"
              spellCheck={false}
              required
              aria-invalid={!!showMessageError}
              aria-describedby={showMessageError ? "message-error" : undefined}
              className={fieldClass(!!showMessageError)}
            />
            {showMessageError && (
              <p id="message-error" className="mt-1 text-xs text-red-400" role="alert">
                Please write a brief message.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending" || !formValid}
              aria-disabled={status === "sending" || !formValid}
              className={`px-5 py-2 rounded font-semibold transition
                ${formValid ? "bg-white/90 text-[#0B0F14] hover:bg-white" : "bg-white/50 text-[#0B0F14]/70 cursor-not-allowed"}`}
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-white/70 hover:text-white underline/50 hover:underline"
              aria-label="Clear all fields"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-white/60 text-center">
          Or email directly: <a href="mailto:a.amitnandan@gmail.com" className="underline">a.amitnandan@gmail.com</a>
        </div>
      </div>
    </section>
  );
}
