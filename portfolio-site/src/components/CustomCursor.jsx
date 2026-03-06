import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" })
    
    const fxTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" })
    const fyTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" })

    const handleMouseMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      fxTo(e.clientX)
      fyTo(e.clientY)
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 })
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Magnetic effect for interactive elements
    const handleHover = () => {
      gsap.to(cursor, { scale: 3, duration: 0.3 })
      gsap.to(follower, { scale: 1.5, opacity: 0.5, border: "1px solid var(--accent-primary)", duration: 0.3 })
    }

    const handleHoverLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, opacity: 1, border: "2px solid var(--glass-border)", duration: 0.3 })
    }

    const interactives = document.querySelectorAll("a, button, .glass-card")
    interactives.forEach(el => {
      el.addEventListener("mouseenter", handleHover)
      el.addEventListener("mouseleave", handleHoverLeave)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", handleHover)
        el.removeEventListener("mouseleave", handleHoverLeave)
      })
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '8px', 
          height: '8px', 
          backgroundColor: 'var(--accent-primary)', 
          borderRadius: '50%', 
          pointerEvents: 'none', 
          zIndex: 9999, 
          opacity: 0,
          transform: 'translate(-50%, -50%)'
        }} 
      />
      <div 
        ref={followerRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '40px', 
          height: '40px', 
          border: '2px solid var(--glass-border)', 
          borderRadius: '50%', 
          pointerEvents: 'none', 
          zIndex: 9998, 
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          backdropFilter: 'blur(2px)'
        }} 
      />
    </>
  )
}

export default CustomCursor
