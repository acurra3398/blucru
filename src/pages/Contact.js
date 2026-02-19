import React, { useState } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import useScrollAnimations from '../components/useScrollAnimations';

// Swap these out with actual team photos
const heroSlides = [
  { image: null },
  { image: null },
  { image: null },
];

export default function Contact() {
  useScrollAnimations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[BluCru Contact] ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:blucru6417@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        badge="GET IN TOUCH"
        title={[
          { text: 'CONTACT ', highlight: false },
          { text: 'US', highlight: true },
        ]}
        subtitle="Have a question, want to sponsor us, or just want to say hi? We'd love to hear from you!"
      />

      <section className="join-section" style={{ paddingTop: '3rem' }}>
        {/* Email */}
        <div style={{
          background: 'linear-gradient(135deg, var(--blue-medium), rgba(30, 58, 95, 0.5))',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          borderRadius: 16,
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: 'rgba(245, 158, 11, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            flexShrink: 0,
          }}>
            ✉️
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--gray-400)', marginBottom: '0.2rem' }}>Email us directly</div>
            <a
              href="mailto:blucru6417@gmail.com"
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--gold)',
                textDecoration: 'none',
              }}
            >
              blucru6417@gmail.com
            </a>
          </div>
        </div>

        {/* Inquiry Form */}
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Message Sent!</h2>
            <p className="section-subtitle" style={{ marginTop: '0.75rem' }}>
              Thank you for reaching out! We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}>
              Send Us a Message
            </h3>
            <form className="join-form" onSubmit={handleSubmit} style={{ marginTop: 0 }}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                  />
                </div>
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
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  style={{ minHeight: 160 }}
                />
              </div>

              <div className="form-submit">
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
