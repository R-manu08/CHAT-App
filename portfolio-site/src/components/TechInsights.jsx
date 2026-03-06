import React from 'react'

const TechInsights = () => {
  const news = [
    {
      date: "March 2026",
      title: "Agentic AI Transformation",
      summary: "AI systems are evolving from simple chat interfaces to autonomous agents. Google and Samsung are integrating Gemini to handle complex, multi-step tasks across 800M+ devices.",
      tag: "Trends"
    },
    {
      date: "March 2026",
      title: "Apple-Google Partnership",
      summary: "Apple is reportedly integrating Google's Gemini AI into Siri, enabling more privacy-focused and intelligent interactions for iPhone users globally.",
      tag: "Industry"
    },
    {
      date: "March 2026",
      title: "NVIDIA Vera Rubin Platform",
      summary: "The next-gen platform is set to reduce AI training costs by 10x, enabling efficient processing of trillion-parameter models for the first time.",
      tag: "Hardware"
    }
  ]

  return (
    <section id="tech-insights" style={{ paddingBottom: '10rem' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Daily Tech Insights</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>Curated news and breakthroughs from the AI frontiers.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {news.map((item, i) => (
            <div key={i} className="glass-card" style={{ padding: '2.5rem' }}>
               <div style={{ 
                 display: 'inline-block', 
                 padding: '5px 12px', 
                 borderRadius: '100px', 
                 background: 'var(--accent-primary)', 
                 color: '#fff', 
                 fontSize: '0.75rem', 
                 fontWeight: 800,
                 textTransform: 'uppercase',
                 marginBottom: '1.5rem'
               }}>
                 {item.tag}
               </div>
               <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1rem' }}>{item.date}</span>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>{item.title}</h3>
               <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: '1rem' }}>{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechInsights
