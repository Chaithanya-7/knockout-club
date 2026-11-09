import members from "@/data/members.json";
import events from "@/data/events.json";

export type Line = { text: string; kind?: "cmd" | "ok" | "err" | "dim" };
export type Result = { lines: Line[]; clear?: boolean; goto?: string };

const HELP: Line[] = [
  { text: "Available commands:" },
  { text: "  help      show this list" },
  { text: "  about     who we are" },
  { text: "  members   list the team" },
  { text: "  events    upcoming and past events" },
  { text: "  join      how to join Knockout Club" },
  { text: "  whoami    who are you?" },
  { text: "  clear     clear the screen" },
  { text: "  exit      back to the website" },
];

const today = () => new Date().toISOString().slice(0, 10);

export function run(input: string): Result {
  const cmd = input.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
    case "ls":
      return { lines: HELP };
    case "about":
      return { lines: [
        { text: "Knockout Club // student run cybersecurity & CTF community", kind: "ok" },
        { text: "We learn by breaking things (ethically): web, pwn, reversing," },
        { text: "crypto, forensics and OSINT. No spoon-feeding, just hacking together." },
      ] };
    case "members":
      return { lines: members.map((m) => ({ text: `  ${m.name.padEnd(20)} ${m.role}` })) };
    case "events": {
      const upcoming = events.filter((e) => e.eventDate >= today());
      const past = events.filter((e) => e.eventDate < today());
      const fmt = (e: (typeof events)[number]): Line => ({ text: `  ${e.eventDate}  ${e.eventName}` });
      return { lines: [
        { text: "[upcoming]", kind: "ok" }, ...(upcoming.length ? upcoming.map(fmt) : [{ text: "  none scheduled", kind: "dim" as const }]),
        { text: "[past]", kind: "dim" }, ...past.map(fmt),
      ] };
    }
    case "join":
      return { lines: [
        { text: "> access request received", kind: "ok" },
        { text: "No experience needed, just curiosity." },
        { text: "Hit 'Apply now' on the home page or reach out on our socials." },
      ] };
    case "whoami":
      return { lines: [{ text: "guest@knockout_club (not root... yet)" }] };
    case "sudo":
    case "sudo su":
      return { lines: [{ text: "Nice try. This incident will be reported.", kind: "err" }] };
    case "clear":
      return { lines: [], clear: true };
    case "exit":
      return { lines: [{ text: "logging out...", kind: "dim" }], goto: "/" };
    default:
      return { lines: [{ text: `command not found: ${input.trim()}. Type 'help'.`, kind: "err" }] };
  }
}
