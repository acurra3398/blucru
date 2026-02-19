import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const heroSlides = [
  { image: "/tuffstuff.png"},
  { image: "/gg.png" },
  { image: "/inmatch.png" },
  { image: "/greengangworkings.png"},
  { image: "/greengangawards.png"}
];

const achievements = [
  { season: 'DECODE', items: [
    'Winning Alliance Captain at Both Qualifiers',
    'Chesapeake Championship Red Cardinal Alliance 7 Pick'
  ]},
  { season: 'INTO THE DEEP', items: [
    'Advanced to Michiana Premier Event',
    'Chesapeake Championship Dulaman Alliance 3 Captain'
  ]}
];

const teamMembers = [
  { name: 'Nicholas Y', role: 'Captain', image:"nicholasy.png" },
  { name: 'Ana W', role: 'Mechanical', image: "anaw.png" },
  { name: 'Crystal L', role: 'Mechanical', image:"crystall.png" },
  { name: 'Caleb L', role: 'Mechanical', image: "calebl.png" },
  { name: 'Chase L', role: 'Software' , image: "chasel.png"},
  { name: 'Matthew B', role: 'Software',image:"matthewb.png" },
  { name: 'Abhijay B', role: 'Software',image:"abhijayb.png" },
  { name: 'Ben A', role: 'Outreach',image:"bena.png"},
];

export default function GreenGang() {
  useScrollAnimations();
  return (
    <div className="green-gang-page">
      <HeroSlideshow
        slides={heroSlides}
        variant="green"
        badge="FTC TEAM #24158"
        title={[
          { text: 'GREEN ', highlight: true },
          { text: 'GANG', highlight: true },
        ]}
        subtitle="The JV sister team to Blu Cru. Our sustainability pipeline, and the next generation!"
        buttons={
          <>
            <Link to="/join" className="btn btn-primary-green">Join Our Team</Link>
          </>
        }
      />

      {/* Current Season Robot */}
      <section className="season-section section-dark">
        <div className="section-header">
          <span className="section-label green">CURRENT SEASON</span>
          <h2 className="section-title">Our Robot</h2>
        </div>
        <GlowTracker className="season-card green-theme" color="green">
          <div className="season-info">
            <span className="season-year green">2025-26 SEASON</span>
            <h3 className="season-name">Wasabi</h3>
            <p className="season-desc">
              KISS - Keep it Simple, Stupid. Wasabi is highly effective due to its endless failsafes and thought out design. One of the most consistent robots in Chesapeake, with endless software enhancement.            </p>
            <div className="season-tags">
              <span className="season-tag green">Efficient Design</span>
              <span className="season-tag green">Strategic Play</span>
              <span className="season-tag green">Team Collaboration</span>
            </div>
          </div>
          <div className="season-image">
            <img src="/wasabireal.png" alt="Wasabi Robot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </GlowTracker>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <div className="section-header">
          <span className="section-label green">ACCOMPLISHMENTS</span>
          <h2 className="section-title">Our Achievements</h2>
          <p className="section-subtitle">Green Gang's growing list of accomplishments.</p>
        </div>
        {achievements.map((group) => (
          <div key={group.season} style={{ maxWidth: 1200, margin: '0 auto 2.5rem' }}>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--green-primary)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              paddingLeft: '0.5rem'
            }}>{group.season}</h3>
            <div className="achievements-grid" style={{ marginBottom: 0 }}>
              {group.items.map((item, i) => (
                <GlowTracker key={i} className="achievement-card green-theme" color="green">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-content">
                    <h4 className="green">{group.season}</h4>
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
          <span className="section-label green">THE GANG</span>
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Meet the members of Green Gang.</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-member">
              <div className="team-member-photo green">
                <div className="placeholder-avatar">
                  {member.name.charAt(0)}
                </div>
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
