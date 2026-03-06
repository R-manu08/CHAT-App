import React, { useState, useEffect } from 'react'
import gsap from 'gsap'

const AIPlayground = () => {
  const [text, setText] = useState('')
  const [sentiment, setSentiment] = useState({ score: 0, label: 'Neutral', emoji: '😐' })

  const analyzeSentiment = (input) => {
    const categories = [
      {
        label: 'Excited',
        emoji: '🤩',
        keywords: ['amazing', 'awesome', 'excellent', 'wow', 'super', 'best', 'incredible', 'hype', 'love', 'fantastic', 'party', 'celebrate']
      },
      {
        label: 'Positive',
        emoji: '🚀',
        keywords: ['good', 'great', 'happy', 'intelligent', 'smart', 'cool', 'masterpiece', 'efficient', 'nice', 'sweet']
      },
      {
        label: 'Angry',
        emoji: '💢',
        keywords: ['bad', 'terrible', 'worst', 'hate', 'stupid', 'broken', 'ugly', 'annoying', 'angry', 'garbage', 'trash']
      },
      {
        label: 'Confused',
        emoji: '🤨',
        keywords: ['buggy', 'error', 'fail', 'fail', 'broken', 'weird', 'what', 'how', 'why', '?', 'maybe', 'strange']
      },
      {
        label: 'Curious',
        emoji: '🤔',
        keywords: ['think', 'logic', 'research', 'explore', 'learn', 'idea', 'algorithm', 'neural', 'future']
      }
    ]
    
    const words = input.toLowerCase().split(/[\s,.]+/)
    let bestCategory = { label: 'Neutral', emoji: '😐', score: 0 }
    
    categories.forEach(cat => {
      let score = 0
      words.forEach(w => {
        if (cat.keywords.includes(w)) score++
      })
      if (score > bestCategory.score) {
        bestCategory = { ...cat, score }
      }
    })

    return bestCategory
  }

  useEffect(() => {
    const result = text.trim() === '' ? { score: 0, label: 'Neutral', emoji: '😐' } : analyzeSentiment(text)
    setSentiment(result)
  }, [text])

  const getGlowColor = () => {
    switch(sentiment.label) {
      case 'Excited': return 'rgba(251, 191, 36, 0.4)'
      case 'Positive': return 'rgba(34, 197, 94, 0.4)'
      case 'Angry': return 'rgba(239, 68, 68, 0.4)'
      case 'Confused': return 'rgba(168, 85, 247, 0.4)'
      case 'Curious': return 'rgba(59, 130, 246, 0.4)'
      default: return 'rgba(99, 102, 241, 0.1)'
    }
  }

  return (
    <section id="ai-playground" style={{ position: 'relative', padding: '10rem 2rem', zIndex: 5 }}>
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>AI Playground</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.3rem' }}>Give it a try—experience real-time sentiment detection.</p>
        </div>

        <div className="glass-card" style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '3rem',
          boxShadow: `0 0 40px ${getGlowColor()}`,
          transition: 'all 0.3s ease'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <textarea
              placeholder="Type here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                height: '140px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                color: '#fff',
                padding: '1.5rem',
                fontSize: '1.2rem',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                display: 'block'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '3.5rem' }}>{sentiment.emoji}</div>
            <div>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{sentiment.label}</h3>
              <p style={{ color: 'var(--text-dim)', margin: 0 }}>Score: {sentiment.score}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIPlayground
