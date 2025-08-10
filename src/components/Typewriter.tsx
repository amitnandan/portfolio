"use client";

import { useState, useEffect } from "react";

type TypewriterProps = {
  phrases: string[];
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
  loop?: boolean;
};

export default function Typewriter({
  phrases,
  typingMs = 50,
  deletingMs = 30,
  pauseMs = 1000,
  loop = true,
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // which phrase
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      }, deletingMs);
    } else {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      }, typingMs);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, phrases, typingMs, deletingMs, pauseMs]);

  return <span>{text}</span>;
}
