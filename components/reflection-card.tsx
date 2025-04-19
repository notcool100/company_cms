"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ReflectionCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function ReflectionCard({ icon, title, description }: ReflectionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 p-6"
    >
      {/* Card content */}
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-lg bg-cyan-500/10 p-3 text-cyan-400">{icon}</div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      {/* Reflection effect */}
      <div className="absolute inset-0 -bottom-2 bg-gradient-to-b from-transparent to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Shine effect on hover */}
      <div className="absolute -inset-x-20 top-0 h-[1px] w-[calc(100%+40px)] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </motion.div>
  )
}
