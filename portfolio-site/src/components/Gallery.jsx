import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import gallery1 from '../assets/gallery1.png'
import gallery2 from '../assets/gallery2.png'
import gallery3 from '../assets/gallery3.png'

const Gallery = () => {
    const sectionRef = useRef(null)
    const images = [gallery1, gallery2, gallery3]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gallery-title", {
                scrollTrigger: {
                    trigger: ".gallery-title",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1
            })

            gsap.utils.toArray(".gallery-item").forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    },
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                })
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="gallery" ref={sectionRef} style={{ overflow: 'hidden' }}>
            <div className="container">
                <h2 className="gallery-title gradient-text" style={{ fontSize: '3.5rem', marginBottom: '4rem', textAlign: 'center' }}>My Gallery</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {images.map((img, idx) => (
                        <div key={idx} className="gallery-item glass-card" style={{ padding: '0.8rem', borderRadius: '24px', overflow: 'hidden' }}>
                            <img 
                                src={img} 
                                alt={`Gallery item ${idx + 1}`} 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    borderRadius: '16px', 
                                    display: 'block',
                                    transition: 'transform 0.5s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Gallery
