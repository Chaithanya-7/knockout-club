"use client";

import { useEffect, useState } from "react";

const KEY = "ko-booted";
const LINES = [
  "> initializing knockout_club...",
  "> loading modules [web, pwn, rev, crypto, forensics]",
  "> establishing secure connection...",
];

// First-visit boot sequence. Returning visitors are hidden by the inline script in layout.tsx
// (html[data-booted]) before paint, so they never see a flash of it.
export default function BootScreen() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, "1"); } catch {}
    const t = setTimeout(() => setGone(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;
  return (
    <div id="boot-screen" aria-hidden="true" onClick={() => setGone(true)}>
      <div className="boot-lines">
        {LINES.map((line, i) => (
          <p key={line} style={{ animationDelay: `${i * 0.45}s` }}>{line}</p>
        ))}
        <p className="boot-ok" style={{ animationDelay: `${LINES.length * 0.45}s` }}>
          {"> access granted"}<span className="boot-cursor" />
        </p>
      </div>
    </div>
  );
}

export const BOOT_SCRIPT = `try{localStorage.getItem("${KEY}")&&document.documentElement.setAttribute("data-booted","")}catch(e){}`;
