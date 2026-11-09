"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { run, type Line } from "@/components/terminal/run";

const PROMPT = "guest@knockout:~$";
const WELCOME: Line[] = [
  { text: "Knockout Club terminal v1.0", kind: "ok" },
  { text: "Type 'help' to see available commands.", kind: "dim" },
];
const COLORS = { cmd: "text-white", ok: "text-pbgreen", err: "text-red-400", dim: "text-white/50" };

export default function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest" }); }, [lines]);

  function submit() {
    const result = run(input);
    const echo: Line = { text: `${PROMPT} ${input}`, kind: "cmd" };
    setLines(result.clear ? [] : (prev) => [...prev, echo, ...result.lines]);
    if (input.trim()) setHistory((h) => [input, ...h]);
    setHIndex(-1);
    setInput("");
    if (result.goto) setTimeout(() => router.push(result.goto!), 600);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit();
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, Math.min(history.length - 1, hIndex + (e.key === "ArrowUp" ? 1 : -1)));
      setHIndex(next);
      setInput(next === -1 ? "" : history[next]);
    }
  }

  return (
    <section className="px-4 sm:px-10 lg:px-20 pt-24 pb-20">
      <div
        className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#050b0b] shadow-[0_0_40px_rgba(55,255,0,0.08)] overflow-hidden"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-pbgray">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-pbgreen/80" />
          <span className="ml-3 text-xs text-white/50 font-mono">knockout_club — bash</span>
        </div>
        <div className="h-[60vh] overflow-y-auto p-5 font-mono text-sm sm:text-base leading-relaxed" role="log" aria-live="polite">
          {lines.map((l, i) => (
            <p key={i} className={`whitespace-pre-wrap break-words ${l.kind ? COLORS[l.kind] : "text-white/80"}`}>{l.text}</p>
          ))}
          <div className="flex gap-2" ref={endRef}>
            <label htmlFor="terminal-input" className="text-pbgreen shrink-0">{PROMPT}</label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck={false}
              className="flex-1 min-w-0 bg-transparent outline-none text-white caret-pbgreen"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
