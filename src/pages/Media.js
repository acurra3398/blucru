import React, { useEffect } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const photoGallery = [
  { image: '54696214320_fe7f83ff32_o.jpg', alt: 'Blu Cru photo' },
  { image: '20251206_183220.jpg', alt: 'Blu Cru photo' },
  { image: 'IMG_7707.jpg', alt: 'Blu Cru photo' },
];

// Swap these out with actual media/social photos
const heroSlides = [
  { image: null },
  { image: null },
  { image: null },
];

const socialLinks = [
  {
    name: 'YouTube',
    handle: '@BluCruFTC',
    description: 'Watch our robot reveals, match highlights, and behind-the-scenes content.',
    url: 'https://www.youtube.com/@BluCruFTC',
    iconClass: 'youtube',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@blucruftc',
    description: 'Follow us for team updates, competition photos, and outreach highlights.',
    url: 'https://www.instagram.com/blucruftc',
    iconClass: 'instagram',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'FTCScout',
    handle: 'Team #6417',
    description: 'View our match history, OPR stats, and competition records.',
    url: 'https://ftcscout.org/teams/6417',
    iconClass: 'ftcscout',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
];

const newsArticles = [
  {
    title: 'Rockville Science Center New Location',
    description: 'The Banner covers the Rockville Science Center\'s move to a new location — home base for Explorer Post 1010 and Blu Cru Robotics.',
    image: 'rsc.png',
    url: 'https://www.thebanner.com/education/k-12-schools/rockville-science-center-new-location-RPO7QFH4SNB53IETI6B646JHUE/',
  },
  {
    title: 'Cru-ising into the Season With Blu Cru',
    description: 'IMTS covers Blu Cru #6417\'s advanced performance at the Chesapeake Regional Championship and their participation in international off-season competition.',
    image: 'blucru-imts.png',
    url: 'https://www.imts.com/read/article-details/Cru-ising-into-the-Season-With-Blu-Cru/2058/type/Apprentice-Blog/8',
  },
  {
    title: 'INTO THE DEEP BTB',
    description: 'Watch our Behind the Bot from INTO THE DEEP World Championships!',
    image: null,
    url: 'https://www.youtube.com/watch?v=3DHBFhEj6Y4',
    isVideo: true,
  },
];

export default function Media() {
  useScrollAnimations();

  useEffect(() => {
    if (!document.getElementById('instagram-embed-script')) {
      const s = document.createElement('script');
      s.id = 'instagram-embed-script';
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      document.body.appendChild(s);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  const instagramPosts = [
    'https://www.instagram.com/p/DUjddx8lTIo/',
    'https://www.instagram.com/p/DI-WprPMBDk/',
    'https://www.instagram.com/p/DIU1gUVOivS/',
  ];

  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        badge="CONNECT WITH US"
        title={[
          { text: 'MEDIA', highlight: true },
        ]}
        subtitle="Stay up to date with Blu Cru across all our platforms."
      />

      <section className="media-section" style={{ paddingTop: '4rem' }}>
        <div className="media-links">
          {socialLinks.map((link, i) => (
            <GlowTracker key={i} className="media-link-card" style={{ cursor: 'pointer' }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textDecoration: 'none', color: 'inherit', width: '100%', padding: '2rem' }}>
                <div className={`media-link-icon ${link.iconClass}`}>
                  {link.icon}
                </div>
                <div className="media-link-info">
                  <h3>{link.name}</h3>
                  <p>{link.handle} &mdash; {link.description}</p>
                </div>
              </a>
            </GlowTracker>
          ))}
        </div>

        {/* In The News */}
        <div className="news-section">
          <div className="section-header">
            <span className="section-label">IN THE NEWS</span>
            <h2 className="section-title">Press Coverage</h2>
          </div>
          <div className="news-grid">
            {newsArticles.map((article, i) => {
              const CardWrapper = article.url ? 'a' : 'div';
              const linkProps = article.url ? { href: article.url, target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <GlowTracker key={i} className="news-card">
                  <CardWrapper {...linkProps} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div className="news-card-image">
                      {article.image ? (
                        <img src={`/${article.image}`} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : article.isVideo ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%', backgroundImage: `url('https://img.youtube.com/vi/3DHBFhEj6Y4/maxresdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--gray-500)' }}>
                          {article.title}
                        </div>
                      )}
                    </div>
                    <div className="news-card-content">
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      {article.url && <span className="news-card-link">Read Article →</span>}
                    </div>
                  </CardWrapper>
                </GlowTracker>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="media-section">
        <div className="gallery-section">
          <div className="section-header">
            <span className="section-label">PHOTO GALLERY</span>
            <h2 className="section-title">Team Photos</h2>
          </div>
          <div className="gallery-grid">
            {photoGallery.map((photo, i) => (
              <GlowTracker key={i} className="gallery-item">
                <img src={`/${photo.image}`} alt={photo.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </GlowTracker>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="instagram-section">
        <div className="section-header">
          <span className="section-label">FOLLOW ALONG</span>
          <h2 className="section-title">@blucruftc</h2>
          <p className="section-subtitle">Our latest matches, events, and behind-the-scenes moments.</p>
        </div>
        <div className="instagram-grid">
          {instagramPosts.map((url, i) => (
            <div key={i} className="instagram-embed-wrapper">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ maxWidth: 328, minWidth: 260, margin: 0 }}
              />
            </div>
          ))}
        </div>
        <div className="instagram-cta">
          <a
            href="https://www.instagram.com/blucruftc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @blucruftc on Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
