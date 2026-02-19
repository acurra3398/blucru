import React, { useRef, useCallback } from 'react';

/**
 * Wraps children with a cursor-tracking gradient glow overlay.
 * When you move your mouse over the element, a bright gradient streak follows.
 * Optional pokeImage: shows a small sprite that follows the cursor inside the card.
 */
export default function GlowTracker({ children, className = '', style = {}, color = 'blue', pokeImage = null }) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const pokeRef = useRef(null);

  const gradientColor = color === 'green'
    ? 'rgba(34, 197, 94, 0.35)'
    : 'rgba(59, 130, 246, 0.3)';

  const gradientColor2 = color === 'green'
    ? 'rgba(74, 222, 128, 0.15)'
    : 'rgba(245, 158, 11, 0.15)';

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || !glowRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.opacity = '1';
    glowRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${gradientColor}, ${gradientColor2}, transparent 70%)`;
    if (pokeRef.current) {
      pokeRef.current.style.opacity = '1';
      pokeRef.current.style.left = `${x}px`;
      pokeRef.current.style.top = `${y}px`;
    }
  }, [gradientColor, gradientColor2]);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (pokeRef.current) pokeRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 5,
          mixBlendMode: 'screen',
        }}
      />
      {pokeImage && (
        <img
          ref={pokeRef}
          src={pokeImage}
          alt=""
          style={{
            position: 'absolute',
            width: 56,
            height: 56,
            objectFit: 'contain',
            transform: 'translate(-50%, -120%)',
            pointerEvents: 'none',
            zIndex: 6,
            opacity: 0,
            transition: 'opacity 0.2s ease',
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))',
          }}
        />
      )}
    </div>
  );
}
