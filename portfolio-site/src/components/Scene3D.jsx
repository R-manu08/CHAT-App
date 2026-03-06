import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Stars, Text } from '@react-three/drei'

function DoraemonModel() {
  return (
    <group>
      {/* Head */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#00a1e9" />
      </Sphere>
      {/* Face */}
      <Sphere args={[0.8, 32, 32]} position={[0, -0.1, 0.3]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      {/* Eyes */}
      <Sphere args={[0.15, 16, 16]} position={[-0.2, 0.3, 1]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <Sphere args={[0.15, 16, 16]} position={[0.2, 0.3, 1]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      {/* Nose */}
      <Sphere args={[0.1, 16, 16]} position={[0, 0.1, 1.1]}>
        <meshStandardMaterial color="#e60012" />
      </Sphere>
      {/* Bell */}
      <Sphere args={[0.12, 16, 16]} position={[0, -0.6, 0.8]}>
        <meshStandardMaterial color="#fedc00" />
      </Sphere>
    </group>
  )
}

function ShinchanModel() {
  return (
    <group scale={0.8} position={[0, -0.5, 0]}>
      {/* Face/Head */}
      <Sphere args={[1, 32, 32]} scale={[1.2, 0.8, 1]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>
      {/* Shirt */}
      <mesh position={[0, -1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#e60012" />
      </mesh>
      {/* Shorts */}
      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[1.5, 0.8, 1]} />
        <meshStandardMaterial color="#fedc00" />
      </mesh>
    </group>
  )
}

function NobitaModel() {
  return (
    <group scale={0.8}>
      {/* Head */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>
      {/* Hair Top */}
      <Sphere args={[1.05, 32, 16]} position={[0, 0.2, 0]} scale={[1, 0.5, 1]}>
        <meshStandardMaterial color="#2f3542" />
      </Sphere>
      {/* Shirt */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[1.5, 1.2, 0.8]} />
        <meshStandardMaterial color="#fedc00" />
      </mesh>
      {/* Pants */}
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[1.6, 0.8, 0.9]} />
        <meshStandardMaterial color="#1e3799" />
      </mesh>
    </group>
  )
}

function AnimatedNeuralSphere({ theme }) {
  const meshRef = useRef();
  
  const themeMap = {
    obsidian: { color: '#6366f1', intensity: 0.5, stars: 5000 },
    cyber: { color: '#ff00ff', intensity: 0.8, stars: 7000 },
    emerald: { color: '#10b981', intensity: 0.6, stars: 4000 },
    solaris: { color: '#ea580c', intensity: 1.5, stars: 1000 },
    sakura: { color: '#f472b6', intensity: 0.7, stars: 3000 },
    sea: { color: '#38bdf8', intensity: 0.4, stars: 6000 },
    nebula: { color: '#8b5cf6', intensity: 0.9, stars: 8000 },
    espresso: { color: '#d97706', intensity: 0.5, stars: 2000 },
    plum: { color: '#6b0f1a', intensity: 0.4, stars: 3000 },
    wasabi: { color: '#adff2f', intensity: 0.8, stars: 4000 },
    ice: { color: '#0ea5e9', intensity: 1.5, stars: 1000 },
    lavender: { color: '#d6c1e5', intensity: 0.6, stars: 5000 },
    synthwave: { color: '#ff006e', intensity: 1.2, stars: 9000 },
    scrapbook: { color: '#8b5e34', intensity: 1.1, stars: 0 },
    manga: { color: '#000000', intensity: 2.0, stars: 0 }
  }

  const currentTheme = themeMap[theme] || themeMap.obsidian;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color={currentTheme.color}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

const Scene3D = ({ theme }) => {
  const themeMap = {
    obsidian: { intensity: 0.5, stars: 5000 },
    cyber: { intensity: 0.8, stars: 7000 },
    emerald: { intensity: 0.6, stars: 4000 },
    solaris: { intensity: 1.5, stars: 1000 },
    sakura: { intensity: 0.7, stars: 3000 },
    sea: { intensity: 0.4, stars: 6000 },
    nebula: { intensity: 0.9, stars: 8000 },
    espresso: { intensity: 0.5, stars: 2000 },
    plum: { intensity: 0.4, stars: 3000 },
    wasabi: { intensity: 0.8, stars: 4000 },
    ice: { intensity: 1.5, stars: 1000 },
    lavender: { intensity: 0.6, stars: 5000 },
    synthwave: { intensity: 1.2, stars: 9000 },
    nostalgia: { intensity: 1.2, stars: 500 },
    scrapbook: { intensity: 1.1, stars: 0 },
    manga: { intensity: 2.0, stars: 0 }
  }
  const currentTheme = themeMap[theme] || themeMap.obsidian;

  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={currentTheme.intensity} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={currentTheme.stars} factor={4} saturation={0} fade speed={1} />
        
        {theme === 'nostalgia' ? (
          <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <group position={[-4, 0, 0]}>
                <DoraemonModel />
                <Text position={[0, -2, 0]} fontSize={0.4} color="#00a1e9">DORAEMON</Text>
              </group>
            </Float>
            <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1}>
              <group position={[0, 0.5, 0]}>
                <NobitaModel />
                <Text position={[0, -3.2, 0]} fontSize={0.4} color="#fedc00">NOBITA</Text>
              </group>
            </Float>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
              <group position={[4, 0, 0]}>
                <ShinchanModel />
                <Text position={[0, -2.5, 0]} fontSize={0.4} color="#e60012">SHINCHAN</Text>
              </group>
            </Float>
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
              <Text position={[0, 6, -8]} fontSize={1.5} color="rgba(0,0,0,0.05)">NOSTALGIA ADVENTURE</Text>
            </Float>
          </group>
        ) : (
          <AnimatedNeuralSphere theme={theme} />
        )}
      </Canvas>
    </div>
  )
}

export default Scene3D
