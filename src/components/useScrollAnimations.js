import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up for section headers
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Staggered card reveals
      gsap.utils.toArray('.achievement-card, .initiative-card, .sponsor-card, .news-card, .media-link-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: (i % 3) * 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Season / robot cards slide in from sides
      gsap.utils.toArray('.season-card, .robot-card').forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Team members pop in
      gsap.utils.toArray('.team-member').forEach((member, i) => {
        gsap.from(member, {
          scale: 0.7,
          opacity: 0,
          duration: 0.5,
          delay: (i % 5) * 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: member,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Gallery items scale up
      gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
          scale: 0.85,
          opacity: 0,
          duration: 0.6,
          delay: (i % 3) * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Outreach stat counters
      gsap.utils.toArray('.outreach-stat-number').forEach((el) => {
        gsap.from(el, {
          textContent: 0,
          duration: 1.5,
          ease: 'power1.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Form groups slide up
      gsap.utils.toArray('.form-group, .form-row').forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Parallax on hero sections
      gsap.utils.toArray('.hero-slide.active').forEach((slide) => {
        gsap.to(slide, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
