import instaQR from '../assets/instagram_qr.png'

const Contact = () => {
  return (
    <section id="contact" style={{ textAlign: 'center', paddingBottom: '8rem' }}>
      <div className="container">
        <div className="glass-card" style={{ display: 'inline-block', padding: '4rem 6rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Let's Connect</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '3rem', fontSize: '1.2rem' }}>
            Open for collaborations in AI/ML and Software Development.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
            {/* Instagram QR Section */}
            <a href="https://www.instagram.com/raginigupta_821" target="_blank" rel="noreferrer" 
               style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-card" style={{ 
                padding: '1.5rem', 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
              >
                <img src={instaQR} alt="Instagram QR" style={{ width: '180px', height: 'auto', borderRadius: '12px', marginBottom: '1rem' }} />
                <p style={{ fontWeight: 600, color: 'var(--accent-primary)', margin: 0 }}>@raginigupta_821</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>Scan to follow</p>
              </div>
            </a>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <a href="mailto:raginigupta8505@gmail.com" className="glass-card" style={{ textDecoration: 'none', color: 'inherit', padding: '1rem 2rem' }}>
                Email
              </a>
              <a href="https://linkedin.com/in/ragini-gupta-abba01287" target="_blank" rel="noreferrer" className="glass-card" style={{ textDecoration: 'none', color: 'inherit', padding: '1rem 2rem' }}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <footer style={{ marginTop: '5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          © 2026 Ragini Gupta. Built with React & 3D.
        </footer>
      </div>
    </section>
  )
}

export default Contact
