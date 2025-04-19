"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  delay?: number
  formatter?: (value: number) => string
  className?: string
}

export default function AnimatedCounter({
  from,
  to,
  duration = 2,
  delay = 0,
  formatter = (value) => value.toString(),
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const nodeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    let startTime: number
    let animationFrame: number
    const totalFrames = duration * 60 // 60fps

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      // Easing function for smoother animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      setCount(Math.floor(from + (to - from) * easedProgress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setHasAnimated(true)
      }
    }

    // Add delay before starting animation
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(step)
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [from, to, duration, delay, isInView, hasAnimated])

  return (
    <motion.div
      ref={nodeRef}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {formatter(count)}
    </motion.div>
  )
}
