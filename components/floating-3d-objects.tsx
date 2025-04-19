"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, PresentationControls, Box, Sphere, Torus, Text } from "@react-three/drei"

// Simple 3D object with animation
function AnimatedObject({ geometry, position, color, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return

    // Gentle floating rotation
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2 * speed) * 0.5
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15 * speed) * 0.3
  })

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function Floating3DObjects() {
  return (
    <div className="h-[50vh] md:h-[70vh] w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={["#f8fafc"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Float rotationIntensity={0.5} floatIntensity={0.5} speed={1.5}>
            {/* Box with "Web" text */}
            <group position={[-3, 0, 0]}>
              <AnimatedObject geometry={<Box args={[2, 2, 2]} />} position={[0, 0, 0]} color="#0ea5e9" speed={1.2} />
              <Text position={[0, 0, 1.1]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                Web
              </Text>
            </group>

            {/* Sphere with "Cloud" text */}
            <group position={[0, 0, 0]}>
              <AnimatedObject
                geometry={<Sphere args={[1.2, 32, 32]} />}
                position={[0, 0, 0]}
                color="#8b5cf6"
                speed={0.8}
              />
              <Text position={[0, 0, 1.3]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                Cloud
              </Text>
            </group>

            {/* Torus with "Mobile" text */}
            <group position={[3, 0, 0]}>
              <AnimatedObject
                geometry={<Torus args={[1, 0.4, 16, 32]} />}
                position={[0, 0, 0]}
                color="#ec4899"
                speed={1.5}
              />
              <Text position={[0, 0, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                Mobile
              </Text>
            </group>
          </Float>
        </PresentationControls>

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
