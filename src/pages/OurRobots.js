import React from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';
import ScratchReveal from '../components/ScratchReveal';

// Each page gets its own set of images - swap these out with actual photos
const heroSlides = [
  { image: "cadthing.png" },
  { image: "tuffaf.png" },
  { image: "hardatwork.jpg" },
];

const robots = [
  {
    season: 'DECODE',
    name: 'DUGTRIO',
    image: 'dugtrio.png',
    pokeImage: '/dugtriopoke.png',
    description: 'Our most ambitious and innovative design yet! After hundreds of iterations, we created the worlds only triple-shooter on a turret. DUGTRIO also features an 18 inch wide intake, and a 6 wheel serpentine belt drive.',
    tags: ['Innovative Design', 'High Performance', 'Autonomous Excellence'],
  },
  {
    season: 'INTO THE DEEP',
    name: 'WARTORTLE',
    image: 'wartortle.png',
    pokeImage: '/wartortlepoke.png',
    description: 'Built for the INTO THE DEEP challenge, WARTORTLE featured a boxtube extension for efficient sample and specimen operations. This feature won Innovate #3 at the World Championships. Also featured a magnetic ascent mechanism',
    tags: ['Precision Placement', 'Climbing System', 'State Finalist'],
  },
  {
    season: 'CENTERSTAGE 2023-24',
    name: 'Center Stage Champion',
    image: 'CenterstageBluCruRobot.jpg',
    pokeImage: null,
    description: 'Our CENTERSTAGE robot featured creative solutions for pixel placement and backdrop scoring. This design emphasized consistency and reliability, setting the foundation for our future successes.',
    tags: ['Dual Pixel Intake', 'Backdrop Precision', 'Autonomous Scoring'],
  },
];

export default function OurRobots() {
  useScrollAnimations();
  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        badge="ENGINEERING"
        title={[
          { text: 'OUR ', highlight: false },
          { text: 'ROBOTS', highlight: true },
        ]}
        subtitle="Each season brings new challenges and new robots. Here's a look at the machines we've built."
      />

      <section className="robots-section">
        {robots.map((robot, index) => (
          <GlowTracker key={index} className="robot-card" pokeImage={robot.pokeImage || null}>
            {index % 2 === 0 ? (
              <>
                <div className="robot-info">
                  <span className="robot-season">{robot.season}</span>
                  <h2 className="robot-name">{robot.name}</h2>
                  <p className="robot-desc">{robot.description}</p>
                  <div className="season-tags">
                    {robot.tags.map((tag, i) => (
                      <span key={i} className="season-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="robot-image">
                  <ScratchReveal width="100%" height="100%">
                    <img src={robot.image} alt={robot.name} className="robot-photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </ScratchReveal>
                </div>
              </>
            ) : (
              <>
                <div className="robot-image">
                  <ScratchReveal width="100%" height="100%">
                    {robot.image
                      ? <img src={robot.image} alt={robot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div className="placeholder">Robot Photo - {robot.name}</div>
                    }
                  </ScratchReveal>
                </div>
                <div className="robot-info">
                  <span className="robot-season">{robot.season}</span>
                  <h2 className="robot-name">{robot.name}</h2>
                  <p className="robot-desc">{robot.description}</p>
                  <div className="season-tags">
                    {robot.tags.map((tag, i) => (
                      <span key={i} className="season-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </GlowTracker>
        ))}
      </section>
    </div>
  );
}
