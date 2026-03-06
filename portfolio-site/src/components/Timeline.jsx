import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: "2020-21", title: "10th Boards (93%)", org: "Baluni Public School", desc: "Foundation of academic excellence and technical curiosity." },
  { year: "2022-23", title: "12th Boards (85%)", org: "Baluni Public School", desc: "Specialized in PCM with a focus on computing science." },
  { year: "2023", title: "Started B.Tech AIML", org: "Graphic Era Hill University", desc: "Focusing on Deep Learning and Autonomous Systems (Current CGPA: 7.5)." },
  { year: "2024", title: "ML Project Lead", org: "University Lab", desc: "Developed the Breast Cancer Prediction model with 95%+ accuracy." },
  { year: "2024", title: "Deep Learning Enthusiast", org: "Self-Driven", desc: "Built the CNN-based Wildlife Conservation system." },
  { year: "2025", title: "Technical Intern", org: "Internshala", desc: "Applied algorithms to real-world data processing tasks." },
  { year: "Future", title: "AI/ML Engineer", org: "Global Tech", desc: "Scaling intelligent solutions for the next billion users." }
]

const Timeline = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        x: (i) => i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      })
      
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        },
        height: 0,
        ease: "none"
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" ref={containerRef}>
      <div className="container">
         <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '3.5rem' }}>The Journey</h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Central Line */}
          <div className="timeline-line" style={{ 
            position: 'absolute', 
            left: '50%', 
            top: 0, 
            width: '2px', 
            height: '100%', 
            background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))',
            transform: 'translateX(-50%)'
          }} />

          {milestones.map((m, i) => (
            <div key={i} className="timeline-item" style={{ 
              display: 'flex', 
              justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
              marginBottom: '6rem',
              position: 'relative'
            }}>
              <div className="glass-card" style={{ width: '45%', position: 'relative' }}>
                <span style={{ 
                  position: 'absolute', 
                  top: '1.5rem', 
                  [i % 2 === 0 ? 'right' : 'left']: '-6.5rem', 
                  background: 'var(--accent-primary)',
                  color: '#fff',
                  padding: '5px 15px',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  zIndex: 2
                }}>
                  {m.year}
                </span>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>{m.title}</h3>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '1rem' }}>{m.org}</h4>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
