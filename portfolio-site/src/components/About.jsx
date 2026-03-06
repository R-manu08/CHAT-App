import React from 'react'
import profileImg from '../assets/profile.jpg'

const About = () => {
  return (
    <section id="about">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: '5rem', alignItems: 'center' }}>
        <div className="about-image" style={{ textAlign: 'left' }}>
           <div className="glass-card" style={{ padding: '0.6rem', borderRadius: '28px', display: 'inline-block' }}>
              <img src={profileImg} alt="Ragini Gupta" style={{ width: '100%', borderRadius: '20px', display: 'block', transform: 'perspective(1000px) rotateY(5deg)' }} />
           </div>
        </div>
        <div className="about-content">
          <div className="glass-card">
            <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '2rem' }}>About Me</h2>
            <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: 'var(--text-dim)', marginBottom: '2rem' }}>
              I am a B.Tech student in <strong style={{ color: 'var(--text-main)' }}>Artificial Intelligence & Machine Learning</strong> at Graphic Era Hill University (CGPA: 7.5/10). 
              My focus lies at the intersection of complex algorithms and real-world impact—from healthcare prediction models to autonomous systems.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
              <div>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Education</h4>
                <p style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-dim)' }}>12th: 85% | 10th: 93%</p>
                <p style={{ fontWeight: 500, fontSize: '0.8rem' }}>Baluni Public School</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>AI/ML</h4>
                <p style={{ fontWeight: 500 }}>TensorFlow, OpenCV</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Core</h4>
                <p style={{ fontWeight: 500 }}>DS&A, OOP, OS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
