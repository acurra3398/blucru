import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import WorldsCountdown from '../components/WorldsCountdown';

const heroSlides = [
  {image:"/chsinspire.png"},
  { image:"/wowie.png"},
  { image: "/thomasduck.png"},
  { image: "/lockedtfin.png"},
  { image: "/sonnymehra.png"},
];

const achievements = [
  { season: 'DECODE 25-26', items: [
    'Chesapeake Championship Inspire Award Winners',
    'Chesapeake Championship Red Cardinal Alliance 7 Captain',
    'Qualified for FIRST World Championship'
  ]},
  { season: 'INTO THE DEEP 24-25', items: [
    'Worlds Divisional Innovate #3',
    'World Divisional Alliance 8 Captain',
    'Attended MTI',
    'Chesapeake Championship Finalist Alliance Captain',
    'Design Award - Chesapeake Championship'
  ]},
  { season: 'CENTERSTAGE 23-24', items: [
    'Chesapeake Championship Finalist Alliance',
    'Chesapeake Championship Control #3',
    'Attended MTI'
  ]},
];

const teamMembers = [
  { name: 'Ethan Z', role: 'Systems', image: 'ethanz.png' },
  { name: 'Cooper L', role: 'Systems', image:'cooperl.png'},
  { name: 'Sonny M', role: 'Systems',image:'sonnym.png'},
  { name: 'Amber W', role: 'CAD', image:'amberw.png' },
  { name: 'Michael J', role: 'CAD', image:'michaelj.png'},
  { name: 'Kathy Z', role: 'Manufacturing', image:'kathyz.png'},
  { name: 'John H', role: 'Manufacturing', image:'johnh.png'},
  { name: 'Michael D', role: 'Autonomous', image:'michaeld.png'},
  { name: 'Deven B', role: 'Tele-Op', comingSoon: true },
  { name: 'Chase L', role: 'Software', comingSoon: true },
  { name: 'Thomas Y', role: 'Electrical',image:'thomasy.png'},
  { name: 'Annika B', role: 'Portfolio + Judging',image:'annikab.png'},
];

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBannerVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!bannerDismissed && (
        <div className={`announcement-banner ${bannerVisible ? 'announcement-banner--visible' : ''}`}>
          <span>🏆 Blu Cru Wins Chesapeake Inspire! Off to Worlds!</span>
          <button
            className="announcement-banner__close"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
      <HeroSlideshow
        slides={heroSlides}
        badge="FTC TEAM #6417"
        title={[
          { text: 'BLU ', highlight: true },
          { text: 'CRU', highlight: true },
        ]}
        subtitle="Based at Explorer Post 1010 at the Rockville Science Center"
        buttons={
          <div className="hero-btn-group" style={{ gap: '1.25rem' }}>
            <Link to="/contact" className="btn hero-btn-gradient">Contact Us</Link>
            <Link to="/outreach" className="btn hero-btn-gradient">Our Outreach</Link>
            <Link to="/our-robots" className="btn hero-btn-gradient">Our Robots</Link>
          </div>
        }
      />

      {/* Worlds Countdown */}
      <WorldsCountdown />

      {/* Current Season Robot */}
      <section className="season-section section-dark">
        <div className="section-header">
          <span className="section-label">CURRENT SEASON</span>
          <h2 className="section-title">Our Robot</h2>
        </div>
        <GlowTracker className="season-card" pokeImage="/dugtriopoke.png">
          <div className="season-info">
            <span className="season-year">2025-26 SEASON</span>
            <h3 className="season-name">Dugtrio</h3>
            <p className="season-desc">
              Our DECODE competition robot, Dugtrio, is the only triple-shooter turret design in the entire world. We have a dynamic 18 inch intake, three indepdently driven shooters, and a 6 wheel drivetrain.
            </p>
            <div className="season-tags">
              <span className="season-tag">Innovative Design</span>
              <span className="season-tag">High Performance</span>
              <span className="season-tag">Autonomous Excellence</span>
            </div>
          </div>
          <div className="season-image">
            <img src="dugtrio.png" alt="the bot"/>
          </div>
        </GlowTracker>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <div className="section-header">
          <span className="section-label">ACCOMPLISHMENTS</span>
          <h2 className="section-title">Our Achievements</h2>
          <p className="section-subtitle">Our track record at competitions across Chesapeake and beyond.</p>
        </div>
        {achievements.map((group) => (
          <div key={group.season} style={{ maxWidth: 1200, margin: '0 auto 2.5rem' }}>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--blue-accent)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              paddingLeft: '0.5rem'
            }}>{group.season}</h3>
            <div className="achievements-grid" style={{ marginBottom: 0 }}>
              {group.items.map((item, i) => (
                <GlowTracker key={i} className="achievement-card">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-content">
                    <h4>{group.season}</h4>
                    <p>{item}</p>
                  </div>
                </GlowTracker>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className="team-section section-dark">
        <div className="section-header">
          <span className="section-label">THE CRU</span>
          <h2 className="section-title">Our Team</h2>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-member">
             <div className="team-member-photo">
  {/* If an image exists in the data, show it; otherwise, show the letter */}
  {member.comingSoon ? (
    <div className="placeholder-avatar coming-soon-avatar">
      <span>Coming Soon!</span>
    </div>
  ) : member.image ? (
    <img
      src={member.image}
      alt={member.name}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
    />
  ) : (
    <div className="placeholder-avatar">
      {member.name.charAt(0)}
    </div>
  )}
</div>
              <div className="team-member-name">{member.name}</div>
              <div className="team-member-role">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
