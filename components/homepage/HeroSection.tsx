"use client";

import { useEffect, useState, type PointerEvent } from "react";
import Image from "next/image";
import ridgeFar from "@/public/images/hero/ridge-far.webp";
import columnsFar from "@/public/images/hero/columns-far.webp";
import cliffFront from "@/public/images/hero/cliff-front.webp";
import ridgeGlow from "@/public/images/hero/ridge-far-glow.webp";
import columnsGlow from "@/public/images/hero/columns-far-glow.webp";
import cliffGlow from "@/public/images/hero/cliff-front-glow.webp";
import { RockLight } from "@/components/homepage/RockLight";
import styles from "./HeroSection.module.css";

const RIDGE_SIZES = "(max-width: 900px) 241vw, 89vw";
const COLUMNS_SIZES = "(max-width: 900px) 170vw, 62vw";
const CLIFF_SIZES = "(max-width: 900px) 322vw, 117vw";

function drift(section: HTMLElement, nx: number, ny: number) {
  for (const el of section.querySelectorAll<HTMLElement>("[data-drift]")) {
    const depth = Number(el.dataset.drift);
    el.style.transform = `translate3d(${(nx * -depth).toFixed(1)}px, ${(ny * -depth * 0.5).toFixed(1)}px, 0)`;
  }
}

const TYPED = "Knockout Club";

// Types "Knockout Club" one letter at a time; shows it whole for reduced-motion users.
function useTyped() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => { i = instant ? TYPED.length : i + 1; setCount(i); if (i < TYPED.length) timer = setTimeout(tick, 110); };
    // On a first visit the boot screen (BootScreen.tsx) covers the hero for ~3s, so start typing after it.
    const firstVisit = !document.documentElement.hasAttribute("data-booted");
    timer = setTimeout(tick, instant ? 0 : firstVisit ? 3000 : 500);
    return () => clearTimeout(timer);
  }, []);
  return count;
}

export default function HeroSection() {
  const typed = useTyped();
  const split = TYPED.indexOf(" ");
  function movePointer(event: PointerEvent<HTMLElement>) {
    const section = event.currentTarget;
    const bounds = section.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width * 2 - 1, ny = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    const lit = [...section.querySelectorAll<HTMLElement>("[data-rock-light]")];
    const litBoxes = lit.map((el) => el.getBoundingClientRect());
    lit.forEach((el, i) => {
      el.style.setProperty("--lx", `${(event.clientX - litBoxes[i].left).toFixed(0)}px`);
      el.style.setProperty("--ly", `${(event.clientY - litBoxes[i].top).toFixed(0)}px`);
    });
    drift(section, nx, ny);
    section.style.setProperty("--lp", "1");
  }

  function leavePointer(event: PointerEvent<HTMLElement>) {
    drift(event.currentTarget, 0, 0);
    event.currentTarget.style.setProperty("--lp", "0");
  }

  return (
    <section id="home" aria-labelledby="hero-heading" className={styles.hero}
      onPointerDown={movePointer} onPointerMove={movePointer} onPointerLeave={leavePointer}>
      <div className={styles.scene}>
        <div className={styles.frame}>
          <div aria-hidden="true" data-rock-light data-parallax data-drift="6" className={`${styles.layer} ${styles.ridge}`}>
            <Image src={ridgeFar} alt="" priority sizes={RIDGE_SIZES} draggable={false} />
            <RockLight glow={ridgeGlow} sizes={RIDGE_SIZES} />
          </div>
          <div aria-hidden="true" data-rock-light data-parallax data-drift="10" className={`${styles.layer} ${styles.columns}`}>
            <Image src={columnsFar} alt="" priority sizes={COLUMNS_SIZES} draggable={false} />
            <RockLight glow={columnsGlow} sizes={COLUMNS_SIZES} />
          </div>
          <div aria-hidden="true" data-rock-light data-parallax data-drift="22" className={`${styles.layer} ${styles.cliff}`}>
            <Image src={cliffFront} alt="" priority sizes={CLIFF_SIZES} draggable={false} />
            <RockLight glow={cliffGlow} sizes={CLIFF_SIZES} />
          </div>
          <div aria-hidden="true" data-parallax data-drift="9" className={styles.fogBack} />
          <div aria-hidden="true" data-parallax data-drift="24" className={styles.fogFront} />
        </div>
      </div>
      <div aria-hidden="true" className={styles.scrim} />

      <div className={styles.inner}>
        <div data-parallax className={styles.copy}>
          <h1 id="hero-heading" className={styles.heading} aria-label="We Are Knockout Club">
            <span className={styles.headingLine}>
              <span className={styles.silver}>We Are</span>{" "}<span className={styles.brackets} aria-hidden="true">&lt;/&gt;</span>
            </span>
            <span className={styles.headingLine}>
              {/* Untyped letters stay in the layout (hidden) so the heading never shifts while typing. */}
              <span aria-hidden="true">
                <span className={styles.green}>{TYPED.slice(0, Math.min(typed, split))}</span>
                <span className={styles.silver}>{TYPED.slice(split, Math.max(typed, split))}</span>
                <span className={styles.cursor} />
                <span className={styles.untyped}>{TYPED.slice(typed)}</span>
              </span>
            </span>
          </h1>
          <p className={styles.tagline}>Student run CTF, Hackathon &amp; Hardware Community</p>
        </div>
      </div>
    </section>
  );
}
