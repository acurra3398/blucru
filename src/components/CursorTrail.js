import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const TRAIL_LENGTH = 18;

const COLORS_DEFAULT = [
  '#f59e0b', '#fbbf24', '#3b82f6', '#60a5fa', '#93c5fd',
  '#f59e0b', '#fbbf24', '#3b82f6', '#60a5fa', '#fde68a',
];

const COLORS_GREEN = [
  '#bef264', '#a3e635', '#86efac', '#4ade80', '#fde68a',
  '#bef264', '#a3e635', '#86efac', '#4ade80', '#fef08a',
];

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mouse = useRef({ x: -999, y: -999 });
  const animRef = useRef(null);
  const location = useLocation();

  const isGreenGang = location.pathname === '/green-gang';
  const colors = isGreenGang ? COLORS_GREEN : COLORS_DEFAULT;

  // Keep a ref so the draw loop always sees the latest colors without restart
  const colorsRef = useRef(colors);
  colorsRef.current = colors;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x === undefined) return;
      mouse.current = { x, y };
      points.current.unshift({ x, y, age: 0 });
      if (points.current.length > TRAIL_LENGTH) points.current.length = TRAIL_LENGTH;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const c = colorsRef.current;

      points.current.forEach((pt, i) => {
        pt.age += 1;
        const progress = i / TRAIL_LENGTH; // 0 = newest, 1 = oldest
        const alpha = (1 - progress) * 0.85;
        const radius = (1 - progress) * 10 + 2;
        const color = c[i % c.length];

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);

        // Outer glow
        const gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius * 2.5);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = alpha * 0.7;
        ctx.fill();
        ctx.restore();
      });

      // Trim very old points
      points.current = points.current.filter((_, i) => i < TRAIL_LENGTH);
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
