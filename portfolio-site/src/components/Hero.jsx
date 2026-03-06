import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import profileImg from '../assets/profile.jpg'

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      })
      gsap.from(".hero-image-wrapper", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'center' }}>
        <div className="hero-content">
          <span className="hero-tag gradient-text" style={{ fontSize: '1.4rem', fontWeight: 700, display: 'block', marginBottom: '1.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Aspiring AI/ML Engineer
          </span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
            Ragini <br /> <span className="gradient-text">Gupta</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.4rem', color: 'var(--text-dim)', maxWidth: '600px', lineHeight: 1.6 }}>
            Designing the future of <strong style={{ color: '#fff' }}>intelligence</strong> and building high-performance models.
          </p>
          <div style={{ marginTop: '3rem' }}>
             <a href="#projects" className="glass-card" style={{ textDecoration: 'none', color: '#fff', padding: '1.2rem 2.5rem', fontWeight: 600, fontSize: '1.1rem' }}>View Work</a>
          </div>
        </div>
        <div className="hero-image-wrapper" style={{ textAlign: 'right', position: 'relative' }}>
           <div className="glass-card" style={{ padding: '0.8rem', borderRadius: '32px', display: 'inline-block', position: 'relative', overflow: 'hidden' }}>
             <img src={profileImg} alt="Ragini Gupta" style={{ width: '100%', maxWidth: '450px', borderRadius: '24px', display: 'block', transform: 'perspective(1000px) rotateY(-5deg)' }} />
           </div>
           <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--accent-primary)', filter: 'blur(50px)', opacity: 0.4, zIndex: -1 }}></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
