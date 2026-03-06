import React, { useState, useEffect } from 'react'

const initialEntries = [
  {
    id: 1,
    date: "March 06, 2026",
    title: "Computer Vision Optimization",
    category: "AI/ML",
    description: "Deep dive into model pruning for edge devices.",
    what: "Implemented weight pruning on a VGG16 backbone.",
    how: "Used TensorFlow's Model Optimization Toolkit to reduce parameter count by 40% without losing accuracy.",
    study: "Learned about Structured vs. Unstructured pruning and their impact on inference latency."
  },
  {
    id: 2,
    date: "March 05, 2026",
    title: "React Three Fiber Refinement",
    category: "WebDev",
    description: "Improving the holographic resume experience.",
    what: "Replaced standard MeshPhysicalMaterial with customized MeshTransmissionMaterial.",
    how: "Adjusted chromatic aberration and temporal distortion for a more 'organic' flicker.",
    study: "Researched WebGL buffer clears and how R3F handles high-fidelity glass shaders."
  }
]

const DailyJournal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journal_entries')
    return saved ? JSON.parse(saved) : initialEntries
  })
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [newEntry, setNewEntry] = useState({
    title: '',
    category: 'AI/ML',
    description: '',
    what: '',
    how: '',
    study: ''
  })

  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries))
  }, [entries])

  const handleAddEntry = (e) => {
    e.preventDefault()
    const entryToAdd = {
      ...newEntry,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }
    setEntries([entryToAdd, ...entries])
    setNewEntry({ title: '', category: 'AI/ML', description: '', what: '', how: '', study: '' })
    setShowEditor(false)
  }

  return (
    <section id="journal" style={{ padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative' }}>
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Activity Logger</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>Tracking daily progress, deep studies, and engineering breakthroughs.</p>
          
          <button 
            onClick={() => setShowEditor(true)}
            className="glass-card"
            style={{ 
              padding: '0.8rem 2rem', 
              color: 'var(--accent-primary)', 
              fontWeight: 700, 
              border: '1px solid var(--accent-primary)',
              cursor: 'pointer'
            }}
          >
            + Log New Activity
          </button>
        </div>

        {/* Entry Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {entries.map((entry) => (
            <div 
              key={entry.id} 
              className="glass-card" 
              style={{ 
                padding: '2rem', 
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                border: '1px solid var(--glass-border)'
              }}
              onClick={() => setSelectedEntry(entry)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{entry.category}</span>
                <span style={{ color: 'var(--text-dim)' }}>{entry.date}</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{entry.title}</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.5 }}>{entry.description}</p>
              <div style={{ marginTop: '1.5rem', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Explore Detail →</div>
            </div>
          ))}
        </div>

        {/* Editor Modal */}
        {showEditor && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', zIndex: 3000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
          }}>
            <form className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '3rem' }} onSubmit={handleAddEntry}>
              <h2 className="gradient-text" style={{ marginBottom: '2rem' }}>New Activity Log</h2>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input 
                  placeholder="Activity Title" 
                  value={newEntry.title}
                  onChange={e => setNewEntry({...newEntry, title: e.target.value})}
                  required
                  style={{ flex: 2, background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', padding: '0.8rem', borderRadius: '8px' }}
                />
                <select 
                  value={newEntry.category}
                  onChange={e => setNewEntry({...newEntry, category: e.target.value})}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', padding: '0.8rem', borderRadius: '8px' }}
                >
                  <option value="AI/ML">AI/ML</option>
                  <option value="WebDev">WebDev</option>
                  <option value="Research">Research</option>
                  <option value="Core CS">Core CS</option>
                </select>
              </div>

              <textarea 
                placeholder="Brief description..." 
                value={newEntry.description}
                onChange={e => setNewEntry({...newEntry, description: e.target.value})}
                style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', resize: 'none' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <textarea placeholder="What did you do?" value={newEntry.what} onChange={e => setNewEntry({...newEntry, what: e.target.value})} style={{ height: '120px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', padding: '0.8rem', borderRadius: '8px' }} />
                <textarea placeholder="How did you do it?" value={newEntry.how} onChange={e => setNewEntry({...newEntry, how: e.target.value})} style={{ height: '120px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', padding: '0.8rem', borderRadius: '8px' }} />
                <textarea placeholder="What did you study?" value={newEntry.study} onChange={e => setNewEntry({...newEntry, study: e.target.value})} style={{ height: '120px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', padding: '0.8rem', borderRadius: '8px' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ flex: 1, padding: '1rem', background: 'var(--accent-primary)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Save to Portfolio</button>
                <button type="button" onClick={() => setShowEditor(false)} style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Reader Modal */}
        {selectedEntry && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
          }} onClick={() => setSelectedEntry(null)}>
            <div className="glass-card" style={{ maxWidth: '800px', width: '100%', padding: '4rem', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedEntry(null)}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
              >✕</button>
              
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{selectedEntry.category} • {selectedEntry.date}</span>
                <h2 style={{ fontSize: '2.5rem', marginTop: '1rem' }}>{selectedEntry.title}</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--accent-primary)' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.8rem' }}>THE WHAT</h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{selectedEntry.what}</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid #22c55e' }}>
                  <h4 style={{ color: '#22c55e', marginBottom: '0.8rem' }}>THE HOW</h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{selectedEntry.how}</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid #3b82f6' }}>
                  <h4 style={{ color: '#3b82f6', marginBottom: '0.8rem' }}>THE STUDY</h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{selectedEntry.study}</p>
                </div>
              </div>

              {entries.length > 2 && selectedEntry.id > 1000 && (
                <button 
                  onClick={() => {
                    setEntries(entries.filter(e => e.id !== selectedEntry.id))
                    setSelectedEntry(null)
                  }}
                  style={{ marginTop: '3rem', color: '#ff5f56', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Delete Log
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DailyJournal
