"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResumePage() {
  const [status, setStatus] = useState<"checking" | "ok" | "missing">("checking");

  useEffect(() => {
    let alive = true;
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => alive && setStatus(res.ok ? "ok" : "missing"))
      .catch(() => alive && setStatus("missing"));
    return () => { alive = false; };
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Resume</h1>
          <Link href="/" className="text-white/80 hover:text-white underline underline-offset-4">
            ← Back to Home
          </Link>
        </div>

        <p className="text-white/60 text-sm mt-1">
          If the PDF doesn’t load, use the buttons below.
        </p>

        {status === "checking" && (
          <div className="mt-6 text-white/70">Loading preview…</div>
        )}

        {status === "ok" && (
          <div className="mt-4 rounded-lg overflow-hidden border border-white/10 bg-white/5">
            <object data="/resume.pdf" type="application/pdf" className="w-full h-[80vh]">
              <p className="p-4">
                Your browser doesn’t support embedded PDFs. 
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="underline">Open the PDF</a> instead.
              </p>
            </object>
          </div>
        )}

        {status === "missing" && (
          <div className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
            Could not find <code>/resume.pdf</code>. Place your file inside <code>public/resume.pdf</code> and refresh.
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded border border-white/20 hover:bg-white/10 transition"
          >
            Open PDF
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-4 py-2 rounded border border-white/20 hover:bg-white/10 transition"
          >
            Download
          </a>
        </div>
      </div>
    </main>
  );
}
