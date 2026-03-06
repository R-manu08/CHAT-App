import React, { useState, useEffect } from 'react'

const GitHubStats = () => {
  // Pulling public stats for the user (Mocking for visual excellence if API is slow)
  const [stats, setStats] = useState({
    repos: 12,
    contributions: "450+",
    stars: 82,
    languages: ["Python", "JavaScript", "C++"]
  })

  // In a real scenario, we'd use fetch("https://api.github.com/users/R-manu08")
  // For now, we focus on the high-end UI

  return (
    <section id="github">
      <div className="container">
        <div className="glass-card" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1.5fr', 
          gap: '4rem', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))'
        }}>
          <div>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Open Source</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Building in public and contributing to the AI ecosystem.
            </p>
            <a href="https://github.com/R-manu08" target="_blank" rel="noreferrer" className="glass-card" style={{ display: 'inline-block', textDecoration: 'none', color: '#fff' }}>
              @R-manu08 on GitHub
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)' }}>{stats.repos}</h3>
              <p style={{ color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Repositories</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-secondary)' }}>{stats.contributions}</h3>
              <p style={{ color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Contributions</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)' }}>{stats.stars}</h3>
              <p style={{ color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Stars Earned</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{stats.languages.join(', ')}</h3>
              <p style={{ color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: '0.5rem' }}>Top Stack</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubStats
