import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

// Swap these out with actual sponsor event photos
const heroSlides = [
  { image: null },
  { image: null },
  { image: null },
];

/**
 * SPONSORS: Edit the filenames below to add your sponsor logos
 * Each entry should have: { id, name, logo }
 * Logo files should be in /public/
 * Example: { id: 1, name: 'GenScript', logo: 'genscript.png' }
 */
const sponsors = [
  { id: 1, name: 'GenScript', logo: 'genscript.png' },
  { id: 2, name: 'Gene Universal', logo: 'geneuniversal.png' },
  { id: 3, name: 'Gene Haas Foundation', logo: 'haas.png' },
  { id: 4, name: 'nTop', logo: 'ntop.png' },
  { id: 5, name: 'Bambu Lab', logo: 'bambu.png' },
  { id: 6, name: 'Montgomery Blair Magnet Foundation', logo: 'magnet.jpg' },
  { id: 7, name: 'Maryland Space Business Rountable', logo: 'msbr.png' },
  { id: 8, name: 'Simscale', logo: 'simscale.png' },
  { id: 9, name: 'Rockville Science Center', logo: 'rsc.png' },
  { id: 10, name: 'Explorer Post 1010', logo: 'post1010.png' },
];

export default function Sponsors() {
  useScrollAnimations();
  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        badge="OUR SUPPORTERS"
        title={[
          { text: 'SPONSORS', highlight: true },
        ]}
        subtitle="We are grateful to our sponsors who make our mission possible. Their support fuels our passion for robotics and STEM education."
      />

      <section className="sponsors-section" style={{ paddingTop: '4rem' }}>
        <div className="sponsors-grid">
          {sponsors.map((sponsor) => (
            <GlowTracker key={sponsor.id} className="sponsor-card">
              <img
                src={`/${sponsor.logo}`}
                alt={`${sponsor.name} Logo`}
              />
            </GlowTracker>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.3rem', marginBottom: '1rem' }}>
            Become a Sponsor
          </h3>
          <p style={{ color: 'var(--gray-400)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Interested in supporting our team? Your sponsorship helps us purchase parts,
            register for competitions, and expand our outreach programs.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
