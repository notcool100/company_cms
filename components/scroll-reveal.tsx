"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  className?: string
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 50,
  once = true,
  className = "",
}: ScrollRevealProps) {
  // Set the initial and animate properties based on direction
  let initial = {}

  switch (direction) {
    case "up":
      initial = { opacity: 0, y: distance }
      break
    case "down":
      initial = { opacity: 0, y: -distance }
      break
    case "left":
      initial = { opacity: 0, x: distance }
      break
    case "right":
      initial = { opacity: 0, x: -distance }
      break
    default:
      initial = { opacity: 0, y: distance }
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      viewport={{ once, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
