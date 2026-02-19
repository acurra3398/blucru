import React, { useState } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import useScrollAnimations from '../components/useScrollAnimations';
import Confetti from '../components/Confetti';

// Swap these out with actual team/recruitment photos
const heroSlides = [
  { image: ".holymoly.png.icloud" },
  { image: "postinspire.png" },
  { image: null },
];

export default function JoinBluCru() {
  useScrollAnimations();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setBannerVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '',
    school: '',
    team: '',
    experience: '',
    why: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[BluCru Join Application] ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nGrade: ${formData.grade}\nSchool: ${formData.school}\nTeam Preference: ${formData.team}\n\nRelevant Experience:\n${formData.experience || 'N/A'}\n\nWhy They Want to Join:\n${formData.why}`
    );
    window.location.href = `mailto:blucru6417@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  };

  if (submitted) {
    return (
      <div>
        {showConfetti && <Confetti duration={3500} />}
        <HeroSlideshow
          slides={heroSlides}
          compact
          badge="GET INVOLVED"
          title={[
            { text: 'JOIN ', highlight: false },
            { text: 'OUR CRU', highlight: true },
          ]}
          subtitle="Interested in joining our team for the 2026-2027 season? Fill out the application below and we'll be in touch!"
        />
        <section className="join-section" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <div className="achievement-icon" style={{ fontSize: '3rem', margin: '0 auto 1.5rem', width: 80, height: 80 }}>🎉</div>
          <h2 className="section-title">Application Submitted!</h2>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            Thank you for your interest in joining our team! We'll review your application and get back to you soon.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div>
      {!bannerDismissed && (
        <div className={`announcement-banner ${bannerVisible ? 'announcement-banner--visible' : ''}`}>
          <span>📢 Blu Cru and Green Gang are now accepting applications for the 2026 - 27 season</span>
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
        compact
        badge="GET INVOLVED"
        title={[
          { text: 'JOIN OUR ', highlight: false },
          { text: 'CRU', highlight: true },
        ]}
        subtitle="Interested in joining our team for the 2026-2027 season?<br />Fill out the application below and we'll be in touch!"
      />

      <section className="join-section" style={{ paddingTop: '3rem' }}>
        <form className="join-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Your first name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Your last name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="grade">Grade Level *</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="">Select grade</option>
                <option value="7">7th Grade</option>
                <option value="8">8th Grade</option>
                <option value="9">9th Grade</option>
                <option value="10">10th Grade</option>
                <option value="11">11th Grade</option>
                <option value="12">12th Grade</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="school">School *</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                placeholder="Your school name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="team">Which team would you like to join? *</label>
            <select
              id="team"
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
            >
              <option value="">Select a team</option>
              <option value="blucru">Blu Cru (FTC #6417) - Varsity</option>
              <option value="greengang">Green Gang (FTC #24158) - JV</option>
              <option value="either">Either / No preference</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Relevant Experience</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Tell us about any robotics, programming, engineering, or other relevant experience you have..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="why">Why do you want to join? *</label>
            <textarea
              id="why"
              name="why"
              value={formData.why}
              onChange={handleChange}
              required
              placeholder="What excites you about robotics? What do you hope to learn or contribute?"
            />
          </div>

          <div className="form-submit">
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Submit Application
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
