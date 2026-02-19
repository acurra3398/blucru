import React, { useRef, useEffect, useState, useCallback } from 'react';

const SCRATCH_THRESHOLD = 0.55; // fraction scratched to auto-complete

export default function ScratchReveal({ children, width = '100%', height = '100%' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const scratchedPixels = useRef(0);
  const totalPixels = useRef(0);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const checkProgress = useCallback((ctx, canvas) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) transparent++;
    }
    const fraction = transparent / (canvas.width * canvas.height);
    if (fraction > SCRATCH_THRESHOLD && !revealed) {
      // Fade out the whole canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setRevealed(true);
    }
  }, [revealed]);

  const scratch = useCallback((ctx, canvas, pos) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineWidth = 54;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    // Extra circle for smooth dots on slow moves
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 27, 0, Math.PI * 2);
    ctx.fill();
    lastPos.current = pos;
    checkProgress(ctx, canvas);
  }, [checkProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      totalPixels.current = w * h;

      // Dark foil overlay with grid pattern
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#0f1623';
      ctx.fillRect(0, 0, w, h);

      // Shimmer grid
      ctx.strokeStyle = 'rgba(59,130,246,0.18)';
      ctx.lineWidth = 1;
      const spacing = 18;
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Diagonal shimmer lines
      ctx.strokeStyle = 'rgba(245,158,11,0.10)';
      ctx.lineWidth = 1;
      for (let d = -h; d < w + h; d += 36) {
        ctx.beginPath(); ctx.moveTo(d, 0); ctx.lineTo(d + h, h); ctx.stroke();
      }

      // Scratch to reveal text
      ctx.globalCompositeOperation = 'source-over';
      ctx.save();
      ctx.translate(w / 2, h / 2);

      // Coin icon
      const coinR = 28;
      const gradient = ctx.createRadialGradient(-6, -6, 4, 0, 0, coinR);
      gradient.addColorStop(0, '#fde68a');
      gradient.addColorStop(0.5, '#f59e0b');
      gradient.addColorStop(1, '#92400e');
      ctx.beginPath();
      ctx.arc(0, -52, coinR, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Dollar sign on coin
      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', 0, -52);

      // "SCRATCH TO REVEAL" text
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 13px "Orbitron", sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('SCRATCH TO REVEAL', 0, -10);

      ctx.fillStyle = 'rgba(148,163,184,0.8)';
      ctx.font = '11px sans-serif';
      ctx.fillText('drag your cursor across the image', 0, 12);

      ctx.restore();
    };

    draw();

    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');

    const start = (e) => {
      e.preventDefault();
      isDrawing.current = true;
      lastPos.current = null;
      setStarted(true);
      scratch(ctx, canvas, getPos(e, canvas));
    };
    const move = (e) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      scratch(ctx, canvas, getPos(e, canvas));
    };
    const end = () => {
      isDrawing.current = false;
      lastPos.current = null;
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [scratch, revealed]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width, height, userSelect: 'none' }}>
      {/* The revealed content sits underneath */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {children}
      </div>

      {/* Scratch canvas sits on top */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            cursor: 'crosshair',
            borderRadius: 'inherit',
            transition: revealed ? 'opacity 0.5s ease' : 'none',
          }}
        />
      )}

      {/* Hint pulse indicator — fades once started */}
      {!revealed && (
        <div style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          opacity: started ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#f59e0b',
            animation: 'scratchPulse 1.2s ease-in-out infinite',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: 11, color: '#f59e0b', fontFamily: 'sans-serif', letterSpacing: 1 }}>
            scratch to reveal
          </span>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#f59e0b',
            animation: 'scratchPulse 1.2s ease-in-out 0.4s infinite',
            display: 'inline-block',
          }} />
        </div>
      )}
    </div>
  );
}
