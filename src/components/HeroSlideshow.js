import React, { useState, useEffect, useCallback } from 'react';
import ParticleField from './ParticleField';

export default function HeroSlideshow({ slides, variant = 'blue', badge, title, subtitle, buttons, compact = false }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const isGreen = variant === 'green';

  return (
    <section className={`hero ${compact ? 'hero-compact' : ''}`}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: slide.image ? `url(${slide.image})` : undefined, backgroundColor: slide.image ? undefined : (isGreen ? '#0a1a0e' : '#0a0e1a') }}
        >
          {/* Light blue/green tint overlay */}
          <div className={`hero-tint ${isGreen ? 'hero-tint-green' : 'hero-tint-blue'}`}></div>
          <div className="hero-overlay"></div>
        </div>
      ))}
      <ParticleField color={isGreen ? '#22c55e' : '#3b82f6'} />
      <div className="hero-content">
        <span className={`hero-badge ${isGreen ? 'green' : ''}`}>{badge}</span>
        <h1 className="hero-title">
          {title.map((part, i) => (
            <span key={i} className={part.highlight ? (isGreen ? 'highlight-green' : 'highlight') : ''}>
              {part.text}
            </span>
          ))}
        </h1>
        <p className="hero-subtitle" dangerouslySetInnerHTML={typeof subtitle === 'string' && subtitle.includes('<br') ? { __html: subtitle } : undefined}>
          {typeof subtitle === 'string' && !subtitle.includes('<br') ? subtitle : undefined}
        </p>
        {buttons && (
          <div className="hero-buttons">
            {buttons}
          </div>
        )}
      </div>
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${index === current ? (isGreen ? 'active-green' : 'active') : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {!compact && (
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      )}
    </section>
  );
}
