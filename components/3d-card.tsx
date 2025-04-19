"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
  glareColor?: string
  borderColor?: string
}

export default function ThreeDCard({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.4)",
  borderColor = "rgba(255, 255, 255, 0.2)",
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for smooth animation
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smoother movement
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })

  // Transform rotation based on mouse position
  const rotateXOutput = useTransform(springY, [-0.5, 0.5], [15, -15])
  const rotateYOutput = useTransform(springX, [-0.5, 0.5], [-15, 15])

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center (normalized from -0.5 to 0.5)
    const xPos = (e.clientX - rect.left) / rect.width - 0.5
    const yPos = (e.clientY - rect.top) / rect.height - 0.5

    // Update motion values
    x.set(xPos)
    y.set(yPos)

    // Update glare position
    setGlarePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateX: rotateXOutput,
        rotateY: rotateYOutput,
        transformStyle: "preserve-3d",
        transformPerspective: "1000px",
        boxShadow: isHovered
          ? "0 50px 100px -20px rgba(0, 0, 0, 0.3), 0 30px 60px -30px rgba(0, 0, 0, 0.4)"
          : "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
        transition: isHovered ? "box-shadow 0.3s ease" : "box-shadow 0.3s ease, transform 0.3s ease",
        border: `1px solid ${borderColor}`,
        borderRadius: "inherit",
      }}
    >
      {/* Glare effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, rgba(255, 255, 255, 0) 80%)`,
            opacity: 0.8,
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* Card content with 3D effect */}
      <div
        className="relative z-0 w-full h-full"
        style={{
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
