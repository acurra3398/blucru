import React from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

/** * 1. UPDATE HERO IMAGES 
 * Replace the strings below with your actual file paths.
 */
const heroSlides = [
  { image: 'fllkid.png' },
  { image: 'ugandapeople.png' },
  { image: '/images/hero-outreach-3.jpg' },
];

/**
 * 2. UPDATE GALLERY IMAGES
 * Create an array of objects containing the path to each photo.
 */
const galleryImages = [
  { id: 1, src: 'johnfll.png', alt: 'STEM Workshop at Local School' },
  { id: 2, src: 'ethanuganda.png', alt: 'Mentoring FTC teams' },
  { id: 3, src: 'robo4all.png', alt: 'Community Science Fair' },
  { id: 4, src: 'scouts.png', alt: 'Robot Demonstration' },
  { id: 5, src: 'senator.png', alt: 'Library Coding Session' },
  { id: 6, src: 'ugandagirls.png', alt: 'Parts Sharing Event' },
  { id: 7, src: 'mtivol.png', alt: 'Maker Faire Presentation' },
  { id: 8, src: 'minime.png', alt: 'Team Volunteering' },
];

const stats = [
  { number: '875+', label: 'Community Hours' },
  { number: '25+', label: 'Events Hosted' },
  { number: '2800+', label: 'People Reached' },
  { number: '50%', label: 'Minority impact' },
];

const initiatives = [
  {
    icon: '🌍',
    title: 'Uganda Partnership',
    description: 'We started the FTC and FLL region in Uganda, extending our impact globally and bringing robotics opportunities to underserved communities worldwide.',
  },
  {
    icon: '🛠️',
    title: 'MiniMe STEM Kits',
    description: 'We distribute MiniMe STEM kits to students, providing hands-on learning tools that introduce robotics and engineering to the next generation.',
  },
  {
    icon: '🤖',
    title: 'Robo4All: ESOL Robotics',
    description: 'Our Robo4All program brings robotics education to ESOL (English Speakers of Other Languages) students, breaking language barriers in STEM.',
  },
  {
    icon: '🏛️',
    title: 'Rockville Science Center',
    description: 'We partner with Rockville Science Center to host robotics demonstrations, workshops, and community STEM events throughout the year.',
  },
  {
    icon: '👥',
    title: 'Mentoring Programs',
    description: 'Our team members mentor younger FTC and FLL teams, sharing technical knowledge, competition strategies, and fostering the next generation of engineers.',
  },
  {
    icon: '📢',
    title: 'Advocacy & Policy',
    description: 'We advocate for STEM education in schools and communities, working to increase funding and support for robotics and engineering programs.',
  },
];

export default function Outreach() {
  useScrollAnimations();
  
  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        badge="GIVING BACK"
        title={[
          { text: 'OUR ', highlight: false },
          { text: 'OUTREACH', highlight: true },
        ]}
        subtitle="Making a difference beyond the competition field. We're committed to spreading STEM education and inspiring the next generation."
      />

      {/* Stats */}
      <section className="outreach-stats-section">
        <div className="outreach-stats">
          {stats.map((stat, i) => (
            <div key={i} className="outreach-stat">
              <div className="outreach-stat-number">{stat.number}</div>
              <div className="outreach-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="outreach-gallery">
        <div className="section-header">
          <span className="section-label">MEMORIES</span>
          <h2 className="section-title outreach-section-heading">Outreach Gallery</h2>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((item) => (
            <GlowTracker key={item.id} className="gallery-item">
              {/* 3. RENDER THE ACTUAL IMAGE */}
              <img 
                src={item.src} 
                alt={item.alt} 
                className="gallery-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </GlowTracker>
          ))}
        </div>
      </section>

      {/* Initiatives */}
      <section className="initiatives-section">
        <div className="section-header">
          <span className="section-label">WHAT WE DO</span>
          <h2 className="section-title outreach-section-heading">Outreach Overview</h2>
          <p className="section-subtitle">Programs and activities that make an impact in our community.</p>
        </div>
        <div className="initiatives-grid">
          {initiatives.map((initiative, i) => (
            <GlowTracker key={i} className="initiative-card">
              <div className="initiative-icon">{initiative.icon}</div>
              <h3>{initiative.title}</h3>
              <p>{initiative.description}</p>
            </GlowTracker>
          ))}
        </div>
      </section>
    </div>
  );
}