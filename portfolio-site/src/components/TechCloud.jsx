import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, OrbitControls } from '@react-three/drei'

// Expanded skills list
const skills = [
  "Python", "C", "Java", "ML", "SQL", "React", "Three.js", "GSAP", 
  "TensorFlow", "OpenCV", "GitHub", "DS&A", "Scikit-Learn", "Keras", 
  "Pandas", "NumPy", "PyTorch", "Tableau", "PowerBI", "Docker"
]

function SkillWord({ word, position }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Suble drift
    ref.current.position.y += Math.sin(t + position[0]) * 0.001
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={ref}
        position={position}
        fontSize={0.35}
        color="white"
        font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoS_fUXjSwh9ZBY_EBX6.woff" // Space Grotesk
        anchorX="center"
        anchorY="middle"
      >
        {word}
        <meshStandardMaterial attach="material" emissive="var(--accent-primary)" emissiveIntensity={0.2} />
      </Text>
    </Float>
  )
}

const Cloud = () => {
  const groupRef = useRef()
  
  useFrame((state) => {
    groupRef.current.rotation.y += 0.002 // Auto-rotation
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi
        const x = 4 * Math.cos(theta) * Math.sin(phi)
        const y = 4 * Math.sin(theta) * Math.sin(phi)
        const z = 4 * Math.cos(phi)
        return <SkillWord key={i} word={skill} position={[x, y, z]} />
      })}
    </group>
  )
}

const TechCloud = () => {
  return (
    <section id="tech-stack" style={{ minHeight: '100vh', position: 'relative', padding: '8rem 0' }}>
      <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1rem', zIndex: 1 }}>Tech Bio-Sphere</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '3rem', fontSize: '1.2rem', zIndex: 1 }}>Interactive visualization of my primary toolset and expertises.</p>
        
        <div style={{ width: '100%', height: '600px', cursor: 'grab', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls enableZoom={false} autoRotate speed={0.5} />
            <Cloud />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default TechCloud
