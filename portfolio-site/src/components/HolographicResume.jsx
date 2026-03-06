import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, MeshTransmissionMaterial, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

const HologramContent = () => {
  const groupRef = useRef()
  
  // Mouse parallax logic
  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.4, 0.1)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.4, 0.1)
  })

  return (
    <group ref={groupRef}>
      {/* The Resume Base Card */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[4.5, 6]} />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={0.5} 
          chromaticAberration={0.05} 
          anisotropy={0.1} 
          distortion={0.1} 
          distortionScale={0.1} 
          temporalDistortion={0.1} 
          transparent={true}
          opacity={0.4}
          color="#6366f1"
        />
      </mesh>

      {/* Holographic Border Glow */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.6, 6.1]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Text Content */}
      <group position={[-1.8, 2.5, 0.1]}>
        <Text fontSize={0.3} color="white" anchorX="left" font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoS_fUXjSwh9ZBY_EBX6.woff">
          RAGINI GUPTA
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.15} color="#var(--accent-primary)" anchorX="left" opacity={0.8}>
          B.TECH AIML @ GEHU | CGPA: 7.5
        </Text>
        
        <group position={[0, -0.8, 0]}>
          <Text fontSize={0.18} color="white" anchorX="left" font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoS_fUXjSwh9ZBY_EBX6.woff">
            EDUCATION
          </Text>
          <Text position={[0, -0.2, 0]} fontSize={0.1} color="white" anchorX="left" opacity={0.6}>
            - 10th Boards: 93% (Baluni Public)
          </Text>
          <Text position={[0, -0.35, 0]} fontSize={0.1} color="white" anchorX="left" opacity={0.6}>
            - 12th Boards: 85% (Baluni Public)
          </Text>
        </group>

        <group position={[0, -1.8, 0]}>
          <Text fontSize={0.18} color="white" anchorX="left" font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoS_fUXjSwh9ZBY_EBX6.woff">
            MAJOR PROJECTS
          </Text>
          <Text position={[0, -0.2, 0]} fontSize={0.1} color="white" anchorX="left" opacity={0.7}>
            - Breast Cancer Prediction (95% Acc)
          </Text>
          <Text position={[0, -0.35, 0]} fontSize={0.1} color="white" anchorX="left" opacity={0.7}>
            - Wildlife Drone Conservation (CNN)
          </Text>
          <Text position={[0, -0.5, 0]} fontSize={0.1} color="white" anchorX="left" opacity={0.7}>
            - Genome Assembly Pipeline
          </Text>
        </group>

        <group position={[0, -3.2, 0]}>
          <Text fontSize={0.18} color="white" anchorX="left" font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoS_fUXjSwh9ZBY_EBX6.woff">
            CORE SKILLS
          </Text>
          <Text position={[0, -0.2, 0]} fontSize={0.1} color="white" anchorX="left" opacity={0.6}>
            Python, ML, TensorFlow, OpenCV, SQL, JS
          </Text>
        </group>
      </group>

      {/* Interactive Scanlines Overlay */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[4.5, 6]} />
        <meshBasicMaterial transparent opacity={0.05} color="#00ffff" depthWrite={false} />
      </mesh>
    </group>
  )
}

const HolographicResume = () => {
  return (
    <section id="holographic-resume" style={{ padding: '8rem 0', height: '110vh', background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%)' }}>
      <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '4rem' }}>Holographic Resume</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>Move your cursor to inspect the digital clone of my credentials.</p>
        </div>

        <div className="hologram-wrapper" style={{ 
          width: '100%', 
          height: '700px', 
          cursor: 'grab',
          position: 'relative'
        }}>
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} color="#6366f1" />
            <pointLight position={[-10, -10, -10]} color="#a855f7" />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <HologramContent />
            </Float>
            <Environment preset="city" />
          </Canvas>

          {/* Download Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}>
            <button 
              className="glass-card" 
              style={{ 
                padding: '1rem 2.5rem', 
                fontSize: '1.1rem', 
                fontWeight: 700, 
                color: '#fff',
                border: '1px solid var(--accent-primary)',
                background: 'rgba(99, 102, 241, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease'
              }}
              onClick={() => window.print()} // Mock for now
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-primary)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <span>📥</span> Download Full PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HolographicResume
