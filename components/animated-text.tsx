"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
}

export default function AnimatedText({ text, className = "", once = false }: AnimatedTextProps) {
  const textArray = text.split(" ")
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useRef<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !controls.current) {
          controls.current = true
          if (containerRef.current) {
            containerRef.current.style.opacity = "1"
          }
        } else if (!entries[0].isIntersecting && !once) {
          controls.current = false
          if (containerRef.current) {
            containerRef.current.style.opacity = "0"
          }
        }
      },
      { threshold: 0.5 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [once])

  return (
    <div
      ref={containerRef}
      className={`inline-block opacity-0 transition-opacity duration-500 ${className}`}
      aria-label={text}
    >
      {textArray.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-2 mb-2">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={controls.current ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                delay: 0.03 * charIndex + 0.1 * index,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  )
}
