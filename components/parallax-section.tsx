"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ParallaxSectionProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

export default function ParallaxSection({ title, subtitle, buttonText, buttonLink }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  // Parallax stars effect
  useEffect(() => {
    if (!sectionRef.current) return

    const stars: HTMLDivElement[] = []
    const section = sectionRef.current
    const starCount = 100

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.classList.add("absolute", "rounded-full", "bg-white")

      // Random size
      const size = Math.random() * 3
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // Random position
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`

      // Random opacity
      star.style.opacity = `${Math.random() * 0.8 + 0.2}`

      // Add to section
      section.appendChild(star)
      stars.push(star)
    }

    // Cleanup
    return () => {
      stars.forEach((star) => star.remove())
    }
  }, [])

  return (
    <motion.div
      ref={sectionRef}
      className="relative h-[50vh] md:h-[70vh] overflow-hidden bg-gradient-to-b from-gray-900 to-blue-950"
      style={{ y, opacity }}
    >
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-xl text-white/80 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90" asChild>
            <a href={buttonLink}>
              {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/80" />
    </motion.div>
  )
}
