import React, { useState, useEffect, useRef } from 'react'

const AIBioAssistant = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Initializing Neural Bio-Agent v2.0.6...' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ])
  const scrollRef = useRef(null)

  const commands = {
    help: "Available commands: [whois, skills, edu, projects, contact, clear, reset]",
    whois: "RAGINI GUPTA: A results-driven AIML Engineer specializing in creating intelligent solutions for real-world problems. Passionate about computer vision and autonomous systems.",
    skills: "TECHNICAL STACK: Python (Expert), C, Java, SQL. LIBRARIES: TensorFlow, OpenCV, Scikit-Learn, React, GSAP, Three.js.",
    edu: "EDUCATION: Pursuing B.Tech in CSE (AIML) at Graphic Era Hill University (CGPA: 7.5/10). Completed 12th in 2022-23 (85%) and 10th in 2020-21 (93%) from Baluni Public School.",
    projects: "KEY PROJECTS: 1. Wildlife Discovery Drone (OpenCV), 2. Breast Cancer Detection (VGG16), 3. DBMS Library System.",
    contact: "CONNECT: LinkedIn: /ragini-gupta-2a74b3252 | GitHub: /R-manu08 | Email: ragini.gupta@example.com",
    clear: "CLEAR"
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim()
      setHistory(prev => [...prev, { type: 'user', text: `> ${input}` }])
      
      if (cmd === 'clear') {
        setHistory([])
      } else if (commands[cmd]) {
        setHistory(prev => [...prev, { type: 'bot', text: commands[cmd] }])
      } else if (cmd !== '') {
        setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${cmd}. Type "help" for help.` }])
      }
      
      setInput('')
    }
  }

  return (
    <section id="bio-assistant" style={{ padding: '8rem 0', perspective: '1000px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Neural Bio-Agent</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>Interact with my virtual twin to explore my background.</p>
        </div>

        <div className="glass-card" style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          background: '#000', 
          border: '1px solid #333',
          padding: 0,
          overflow: 'hidden',
          boxShadow: '0 0 40px rgba(0, 255, 65, 0.1)'
        }}>
          {/* Terminal Header */}
          <div style={{ 
            background: '#1a1a1a', 
            padding: '10px 20px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            borderBottom: '1px solid #333'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#666', fontFamily: 'monospace' }}>Neural_Terminal.exe</span>
          </div>

          {/* Terminal Content */}
          <div 
            ref={scrollRef}
            style={{ 
              height: '450px', 
              padding: '25px', 
              overflowY: 'auto', 
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              position: 'relative'
            }}
          >
            {/* Scanline Effect */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, bottom: 0, right: 0,
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              zIndex: 2,
              backgroundSize: '100% 2px, 3px 100%',
              pointerEvents: 'none'
            }} />

            {history.map((line, i) => (
              <div key={i} style={{ 
                color: line.type === 'user' ? '#fff' : line.type === 'bot' ? 'var(--accent-primary)' : line.type === 'error' ? '#ff5f56' : '#00ff41',
                marginBottom: '8px',
                opacity: 0.9
              }}>
                {line.text}
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '15px' }}>
              <span style={{ color: '#00ff41' }}>guest@ragini:~ $</span>
              <input
                type="text"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  width: '100%',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIBioAssistant
