import React, { useEffect, useRef } from 'react';

const COLORS = ['#f59e0b', '#3b82f6', '#60a5fa', '#fbbf24', '#93c5fd', '#fde68a', '#ffffff'];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function Confetti({ duration = 10000 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const windRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Extremely slow confetti - takes 10+ seconds to fall
    const pieces = Array.from({ length: 180 }, () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(-canvas.height * 0.2, -10),
      w: randomBetween(8, 14),
      h: randomBetween(5, 9),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: randomBetween(-0.08, 0.08),  // barely moves horizontally
      vy: randomBetween(0.08, 0.15),   // very very slow fall
      angle: randomBetween(0, Math.PI * 2),
      spin: randomBetween(-0.01, 0.01),  // barely rotates
      opacity: 1,
    }));

    const start = performance.now();

    // Mouse move listener for wind effect
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);

    function draw(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth wind from mouse position
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = mouseRef.current.x - centerX;
      const dy = mouseRef.current.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const influence = Math.max(0, 1 - distance / maxDistance);
      
      windRef.current.x = (dx / (distance || 1)) * influence * 0.8;  // very gentle wind
      windRef.current.y = (dy / (distance || 1)) * influence * 0.2;  // minimal vertical wind

      const fadeStart = duration - 1000;
      pieces.forEach((p) => {
        // Apply wind effect
        p.vx += windRef.current.x * 0.02;
        p.vy += windRef.current.y * 0.02;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.008;  // extremely gentle gravity - takes forever to fall
        p.angle += p.spin;

        if (elapsed > fadeStart) {
          p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / 1000);
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Strong glow effect - larger and more vibrant
        const glowSize = Math.max(p.w, p.h) * 3.5;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
        gradient.addColorStop(0, p.color + 'dd');  // more opaque
        gradient.addColorStop(0.3, p.color + '99');  // semi-transparent
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');  // fade to white
        ctx.fillStyle = gradient;
        ctx.fillRect(-glowSize, -glowSize, glowSize * 2, glowSize * 2);

        // Bright glowing core
        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(p.w, p.h) * 1.5);
        coreGradient.addColorStop(0, '#ffffff');  // white hot center
        coreGradient.addColorStop(0.4, p.color);  // color mid
        coreGradient.addColorStop(1, p.color + '00');  // transparent
        ctx.fillStyle = coreGradient;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);

        // Solid piece on top
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);

        ctx.restore();
      });

      if (elapsed < duration) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
