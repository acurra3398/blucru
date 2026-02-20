import React, { useState } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import useScrollAnimations from '../components/useScrollAnimations';
import Confetti from '../components/Confetti';

// Swap these out with actual team/recruitment photos
const heroSlides = [
  { image: "/holymoly.png" },
  { image: "postinspire.png" },
  { image: 'hardatwork.jpg' },
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
    discord: '',
    grade: '',
    school: '',
    areasOfInterest: [],
    introduction: '',
    personalGoals: '',
    stemPassion: '',
    ftcExperience: '',
    teamExperience: '',
    commitment: false,
    additionalInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const interestOptions = ['Software', 'Mechanical', 'Fundraising', 'Judging', 'Outreach', 'Other'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'areasOfInterest') {
      setFormData({
        ...formData,
        areasOfInterest: checked
          ? [...formData.areasOfInterest, value]
          : formData.areasOfInterest.filter(item => item !== value)
      });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.commitment) {
      setSubmitError('You must agree to commit the time and effort.');
      return;
    }

    if (formData.areasOfInterest.length === 0) {
      setSubmitError('Please select at least one area of interest.');
      return;
    }

    if (formData.areasOfInterest.length > 3) {
      setSubmitError('Please limit areas of interest to 3 areas.');
      return;
    }

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbysqtIuEzyiuo_DUQq9qQyGxnRXnmFmvUVsQEYuFMK4h3Nvi3ZqLJ7DejJNR7obAIgw/exec';

      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('discord', formData.discord);
      data.append('grade', formData.grade);
      data.append('school', formData.school);
      data.append('areasOfInterest', formData.areasOfInterest.join(', '));
      data.append('introduction', formData.introduction);
      data.append('personalGoals', formData.personalGoals);
      data.append('stemPassion', formData.stemPassion);
      data.append('ftcExperience', formData.ftcExperience);
      data.append('teamExperience', formData.teamExperience);
      data.append('commitment', formData.commitment ? 'Yes I agree' : '');
      data.append('additionalInfo', formData.additionalInfo);

      await fetch(scriptURL, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
      });

      setSubmitted(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('There was an error submitting your form. Please try again.');
    }
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
          subtitle="Interested in joining the Blu Cru and Green Gang family for the 2026-2027 season? Fill out the application below!"
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
          <span>📢 Blu Cru and Green Gang are now accepting applications for the 2026 - 27 season. Applications close June 20th 2027</span>
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
          {submitError && (
            <div style={{ background: '#fee', border: '1px solid #fcc', color: '#c33', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
              {submitError}
            </div>
          )}

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
              <label htmlFor="email">Email *</label>
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
              <label htmlFor="discord">Discord *</label>
              <input
                type="text"
                id="discord"
                name="discord"
                value={formData.discord}
                onChange={handleChange}
                required
                placeholder="Your Discord username"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="grade">Grade (2026-2027) *</label>
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
              <label htmlFor="school">School (2026-2027) *</label>
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
            <label>Areas of Interest (limit to 3) *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
              {interestOptions.map(option => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="areasOfInterest"
                    value={option}
                    checked={formData.areasOfInterest.includes(option)}
                    onChange={handleChange}
                    disabled={formData.areasOfInterest.length >= 3 && !formData.areasOfInterest.includes(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="introduction">Please introduce yourself to our team. What are you looking for in a team? *</label>
            <textarea
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              required
              placeholder="Tell us about yourself and what you're looking for..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="personalGoals">What are your personal goals for joining the team? *</label>
            <textarea
              id="personalGoals"
              name="personalGoals"
              value={formData.personalGoals}
              onChange={handleChange}
              required
              placeholder="Share your goals..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stemPassion">Why are you passionate about STEM? *</label>
            <textarea
              id="stemPassion"
              name="stemPassion"
              value={formData.stemPassion}
              onChange={handleChange}
              required
              placeholder="Tell us about your STEM passion..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ftcExperience">Do you have experience in FTC/Robotics? If so, please describe thoroughly. *</label>
            <textarea
              id="ftcExperience"
              name="ftcExperience"
              value={formData.ftcExperience}
              onChange={handleChange}
              required
              placeholder="Describe your FTC/Robotics experience..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="teamExperience">Have you had any other experience working on a team? What did you do? Please describe thoroughly. *</label>
            <textarea
              id="teamExperience"
              name="teamExperience"
              value={formData.teamExperience}
              onChange={handleChange}
              required
              placeholder="Describe your team experience..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="commitment"
                checked={formData.commitment}
                onChange={handleChange}
                required
                style={{ marginTop: '0.25rem', flexShrink: 0 }}
              />
              <span>
                I agree to commit the time and effort it takes for the team to succeed. I should expect to commit at least 10 hours per week during team meetings and outside of team meetings. <em>*Will increase as competition season draws near</em> *
              </span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">Is there anything else you would like to tell us? (questions, extra info)</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any additional information..."
              rows="3"
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
