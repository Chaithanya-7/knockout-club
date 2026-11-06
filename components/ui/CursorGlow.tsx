"use client";

import { useEffect, useRef } from "react";

// Soft green light that follows the mouse. Updates a CSS variable per frame; no React re-renders.
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--glow-x", `${e.clientX}px`);
        el.style.setProperty("--glow-y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };
    const hide = () => { el.style.opacity = "0"; };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, []);

  return <div ref={ref} id="cursor-glow" aria-hidden="true" />;
}
