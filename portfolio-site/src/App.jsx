import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import Scene3D from './components/Scene3D'
import Hero from './components/Hero'
import About from './components/About'
import AIBioAssistant from './components/AIBioAssistant'
import Timeline from './components/Timeline'
import AIPlayground from './components/AIPlayground'
import Projects from './components/Projects'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'

import DailyJournal from './components/DailyJournal'
import TechInsights from './components/TechInsights'

import { playClick, playTransition } from './utils/audio'

function App() {
  const [theme, setTheme] = useState('obsidian')
  const [soundEnabled, setSoundEnabled] = useState(true)

  const handleThemeChange = (newTheme) => {
    if (newTheme !== theme) {
      setTheme(newTheme)
      if (soundEnabled) playTransition()
    }
  }

  const handleNavClick = () => {
    if (soundEnabled) playClick()
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const themes = [
    { id: 'obsidian', icon: '🌌', name: 'Obsidian' },
    { id: 'cyber', icon: '🌆', name: 'Cyber Neon' },
    { id: 'emerald', icon: '📟', name: 'Emerald' },
    { id: 'solaris', icon: '☀️', name: 'Solaris' },
    { id: 'sakura', icon: '🌸', name: 'Sakura' },
    { id: 'sea', icon: '🌊', name: 'Deep Sea' },
    { id: 'nebula', icon: '🎆', name: 'Nebula' },
    { id: 'espresso', icon: '☕', name: 'Espresso' },
    { id: 'nostalgia', icon: '🎒', name: 'Nostalgia' },
    { id: 'plum', icon: '🍷', name: 'Plum Noir' },
    { id: 'wasabi', icon: '🥦', name: 'Wasabi' },
    { id: 'ice', icon: '🧊', name: 'Nordic Ice' },
    { id: 'lavender', icon: '✨', name: 'Lavender Gold' },
    { id: 'synthwave', icon: '🕹️', name: 'Synthwave' },
    { id: 'scrapbook', icon: '📜', name: 'Scrapbook' },
    { id: 'manga', icon: '🖋️', name: 'Manga' }
  ]

  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <main className={theme}>
      <CustomCursor />
      <Scene3D theme={theme} />
      
      {/* Theme Toggle & Nav Overlay */}
      <nav style={{ 
        position: 'fixed', 
        top: '2rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        padding: '0.8rem 2rem',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '100px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#about" onClick={handleNavClick} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>About</a>
          <a href="#projects" onClick={handleNavClick} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Work</a>
          <a href="#timeline" onClick={handleNavClick} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Journey</a>
          <a href="#contact" onClick={handleNavClick} style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Contact</a>
        </div>

        <button 
          onClick={() => {
            setSoundEnabled(!soundEnabled)
            if (!soundEnabled) playClick()
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            fontSize: '1.2rem',
            marginLeft: '1rem',
            display: 'flex',
            alignItems: 'center',
            opacity: soundEnabled ? 1 : 0.5
          }}
          title={soundEnabled ? "Mute" : "Unmute"}
        >
          {soundEnabled ? '🔊' : '🔈'}
        </button>

        <div style={{ display: 'flex', gap: '0.8rem', marginLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem', flexWrap: 'nowrap', overflowX: 'auto', maxWidth: '300px' }}>
          {themes.map(t => (
            <button 
              key={t.id}
              onClick={() => handleThemeChange(t.id)}
              title={t.name}
              style={{ 
                background: theme === t.id ? 'rgba(255,255,255,0.1)' : 'none', 
                border: 'none', 
                color: 'var(--text-main)', 
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '5px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </nav>

      <Hero />
      <About />
      <AIBioAssistant />
      <TechInsights />
      <DailyJournal />
      <Timeline />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <AIPlayground />
      </div>
      <Projects />
      <GitHubStats />
      <Contact />
    </main>
  )
}

export default App
