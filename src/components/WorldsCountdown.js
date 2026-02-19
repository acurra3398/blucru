import React, { useState, useEffect, useRef, useCallback } from 'react';

// April 29, 2026, 7:00 AM local time (start of Worlds)
const TARGET = new Date('2026-04-29T07:00:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

// ── Constellation canvas ──────────────────────────────────────────────────────
const NODE_COUNT = 70;
const CONNECTION_DIST = 160;
const COLORS = ['#3b82f6', '#60a5fa', '#f59e0b', '#fbbf24', '#93c5fd'];

function ConstellationCanvas() {
  const canvasRef = useRef(null);
  const nodes = useRef([]);
  const animRef = useRef(null);

  const init = useCallback((w, h) => {
    nodes.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1.5 + Math.random() * 2.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const ns = nodes.current;

      // Update positions
      ns.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[i].x - ns[j].x;
          const dy = ns[i].y - ns[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.45;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = ns[i].color;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(ns[i].x, ns[i].y);
            ctx.lineTo(ns[j].x, ns[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw nodes
      ns.forEach((n) => {
        const pulseR = n.r + Math.sin(n.pulse) * 0.8;

        // Outer glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 5);
        g.addColorStop(0, n.color + 'aa');
        g.addColorStop(1, 'transparent');
        ctx.save();
        ctx.globalAlpha = 0.4 + Math.sin(n.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();

        // Core dot
        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.75,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
      }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WorldsCountdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <section className="countdown-section">
        <ConstellationCanvas />
        <div className="countdown-label">🌍 We're at Worlds right now!</div>
      </section>
    );
  }

  const units = [
    { label: 'DAYS', value: time.days },
    { label: 'HRS', value: pad(time.hours) },
    { label: 'MIN', value: pad(time.minutes) },
    { label: 'SEC', value: pad(time.seconds) },
  ];

  return (
    <section className="countdown-section">
      <ConstellationCanvas />
      <div className="countdown-inner">
        <div className="countdown-eyebrow">
          <span className="section-label">WORLDS 2026</span>
        </div>
        <h2 className="countdown-title">
          🌍 Off to <span className="countdown-highlight">Worlds</span>!
        </h2>
        <p className="countdown-subtitle">Houston, TX · April 29 - May 2, 2026</p>
        <div className="countdown-grid">
          {units.map(({ label, value }) => (
            <div key={label} className="countdown-unit">
              <div className="countdown-number">{value}</div>
              <div className="countdown-unit-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
