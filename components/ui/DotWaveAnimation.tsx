'use client';

import { useEffect, useRef } from 'react';
import './DotWaveAnimation.css';

const SETTINGS = {
  gap: 15,
  dotSize: 1,
  mouseRadius: 100,
  springStrength: 0.05,
  friction: 0.85,
  waveAmplitude: 8,
  waveSpeed: 0.001,
  waveFrequency: 0.005,
  color: 'rgba(0, 255, 0, 0.3)',
};

class Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }

  update(time: number, mouseX: number, mouseY: number) {
    const t = time * SETTINGS.waveSpeed;
    const freq = SETTINGS.waveFrequency;
    const amp = SETTINGS.waveAmplitude;

    const l1 = Math.sin((this.baseX + this.baseY) * freq + t);
    const l2 = Math.sin((this.baseX * 2 - this.baseY) * freq * 1.5 + t * 2.3);
    const l3 = Math.cos((this.baseY * 1.2 + this.baseX) * freq * 0.7 + t * 0.4);

    const combinedWave = (l1 + l2 + l3) / 3;

    const targetX = this.baseX + combinedWave * amp;
    const targetY = this.baseY + combinedWave * amp;

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < SETTINGS.mouseRadius) {
      const force = (SETTINGS.mouseRadius - distance) / SETTINGS.mouseRadius;
      const angle = Math.atan2(dy, dx);
      this.vx -= Math.cos(angle) * force * 5;
      this.vy -= Math.sin(angle) * force * 5;
    }

    const ax = (targetX - this.x) * SETTINGS.springStrength;
    const ay = (targetY - this.y) * SETTINGS.springStrength;

    this.vx += ax;
    this.vy += ay;
    this.vx *= SETTINGS.friction;
    this.vy *= SETTINGS.friction;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(Math.round(this.x), Math.round(this.y), SETTINGS.dotSize, SETTINGS.dotSize);
  }
}

const DotWaveAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const dots = useRef<Dot[]>([]);
  const rafId = useRef<number | null>(null);

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(w / SETTINGS.gap) + 1;
    const rows = Math.ceil(h / SETTINGS.gap) + 1;
    const newDots: Dot[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        newDots.push(new Dot(i * SETTINGS.gap, j * SETTINGS.gap));
      }
    }
    dots.current = newDots;
  };

  useEffect(() => {
    init();

    const onResize = () => init();
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const animate = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = SETTINGS.color;

      dots.current.forEach(dot => {
        dot.update(time, mouse.current.x, mouse.current.y);
        dot.draw(ctx);
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="dot-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DotWaveAnimation;
