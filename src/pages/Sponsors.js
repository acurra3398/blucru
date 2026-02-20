import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

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
  { id: 1, name: 'GenScript', logo: 'genscript.png', description: 'A global biotech leader providing gene synthesis, molecular biology reagents, and biologics manufacturing services.' },
  { id: 2, name: 'Gene Universal', logo: 'geneuniversal.png', description: 'A life sciences company specializing in gene synthesis and molecular biology tools for cutting-edge research.' },
  { id: 3, name: 'Gene Haas Foundation', logo: 'haas.png', description: 'Supporting machining and manufacturing education through scholarships for the next generation of skilled engineers.' },
  { id: 4, name: 'nTop', logo: 'ntop.png', description: 'Implicit modeling software enabling engineers to design next-generation products with unprecedented computational power.' },
  { id: 5, name: 'Bambu Lab', logo: 'bambu.png', description: 'Makers of high-speed precision 3D printers that power our rapid prototyping and parts manufacturing pipeline.' },
  { id: 6, name: 'Montgomery Blair Magnet Foundation', logo: 'magnet.jpg', description: 'Supporting the Magnet Program at Montgomery Blair High School, fostering excellence in math, science, and CS.' },
  { id: 7, name: 'Maryland Space Business Roundtable', logo: 'msbr.png', description: 'A professional network advancing the space industry in Maryland through advocacy, collaboration, and community.' },
  { id: 8, name: 'Simscale', logo: 'simscale.png', description: 'Cloud-based CFD and FEA simulation platform that lets engineers run complex analyses directly from a web browser.' },
  { id: 9, name: 'Rockville Science Center', logo: 'rsc.png', description: 'Our home base — a community science center dedicated to hands-on STEM learning for all ages in the DC area.' },
  { id: 10, name: 'Explorer Post 1010', logo: 'post1010.png', description: 'The BSA Explorer Post that hosts Blu Cru, providing youth with real-world STEM and robotics mentorship.' },
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
              <div className="sponsor-flip-inner">
                <div className="sponsor-flip-front">
                  <img src={`/${sponsor.logo}`} alt={`${sponsor.name} Logo`} />
                </div>
                <div className="sponsor-flip-back">
                  <h4 className="sponsor-flip-name">{sponsor.name}</h4>
                  <p className="sponsor-flip-desc">{sponsor.description}</p>
                </div>
              </div>
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
