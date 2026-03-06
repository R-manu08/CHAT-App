import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import cancerImg from '../assets/cancer_ml.png'
import genomeImg from '../assets/genome.png'
import wildlifeImg from '../assets/wildlife.png'
import projectImg from '../assets/project.png'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Breast Cancer Prediction",
    desc: "Implemented clinical feature analysis using Python & ML. Performed intensive data preprocessing, feature selecting, and comparative model analysis to optimize diagnostic precision.",
    tech: ["Python", "Machine Learning", "Scikit"],
    img: cancerImg
  },
  {
    title: "AI Genome Assembly",
    desc: "Architected an overlap-based genome assembly pipeline utilizing C and advanced algorithms. Integrated pattern-search logic and efficient file handling for high-throughput mutation detection.",
    tech: ["C", "Algorithms", "Bio-Info"],
    img: genomeImg
  },
  {
    title: "Wildlife Conservation Drone",
    desc: "Designed an automated animal detection system using CNNs and drone telemetry. Focused on dataset tuning and real-time inference accuracy for wildlife protection.",
    tech: ["Deep Learning", "CV", "Drones"],
    img: wildlifeImg
  },
  {
    title: "ER-Database Model",
    desc: "Drafted comprehensive ER-schema and normalized relational tables for scale. Authored optimized SQL queries to automate complex database operations and ensure data integrity.",
    tech: ["SQL", "DBMS", "Normalization"],
    img: projectImg
  },
  {
    title: "Hypervisor Sandbox",
    desc: "Engineered a secure sandboxed environment based on lightweight hypervisor logic. Demonstrated process isolation and resource monitoring for malicious activity analysis.",
    tech: ["OS", "Security", "C"],
    img: projectImg
  }
]

const Projects = () => {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".project-card", { opacity: 0, y: 50 });
      gsap.to(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
           gsap.set(".project-card", { clearProps: "all" });
        }
      })
    }, sectionRef)
    
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      ctx.revert();
      clearTimeout(timer);
    }
  }, [])

  const openProject = (p) => {
    setSelectedProject(p)
    document.body.style.overflow = 'hidden'
  }

  const closeProject = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <section ref={sectionRef} id="projects">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Signature Work</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.3rem' }}>Showcasing expertise in AI, Machine Learning, and Systems Engineering.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          {projects.map((p, i) => (
            <div 
              key={i} 
              className="glass-card project-card" 
              style={{ padding: '0', overflow: 'hidden', cursor: 'zoom-in' }}
              onClick={() => openProject(p)}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
              </div>
              <div style={{ padding: '2.5rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', lineHeight: 1.7, fontSize: '1.05rem' }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: '0.85rem', fontWeight: 600, background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(15px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={closeProject}>
          <div className="glass-card" style={{ 
            maxWidth: '1000px', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            padding: '4rem',
            position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            <button onClick={closeProject} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>×</button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
              <div>
                 <img src={selectedProject.img} alt={selectedProject.title} style={{ width: '100%', borderRadius: '24px' }} />
                 <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {selectedProject.tech.map(t => (
                      <span key={t} style={{ background: 'var(--accent-primary)', color: '#fff', padding: '8px 16px', borderRadius: '100px', fontWeight: 700 }}>{t}</span>
                    ))}
                 </div>
              </div>
              <div>
                <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{selectedProject.title}</h2>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-dim)', marginBottom: '2.5rem' }}>{selectedProject.desc}</p>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                   <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Technical Impact</h4>
                   <ul style={{ color: 'var(--text-dim)', paddingLeft: '1.5rem', lineHeight: 2 }}>
                      <li>Optimized pipeline for high-throughput data processing.</li>
                      <li>Integrated advanced algorithms for pattern recognition.</li>
                      <li>Achieved significant performance improvements in trial runs.</li>
                   </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
