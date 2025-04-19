"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ScrollReveal from "./scroll-reveal"

interface TimelineItem {
  year: string
  title: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    year: "2010",
    title: "Company Founded",
    description:
      "Our journey began with a small team of passionate developers and a vision to transform the digital landscape.",
  },
  {
    year: "2013",
    title: "First Major Client",
    description:
      "Secured our first enterprise client and delivered a groundbreaking e-commerce solution that set new industry standards.",
  },
  {
    year: "2015",
    title: "International Expansion",
    description: "Opened our first international office and began serving clients across Europe and Asia.",
  },
  {
    year: "2018",
    title: "Cloud Innovation Award",
    description: "Recognized for our innovative cloud solutions with the prestigious Technology Innovation Award.",
  },
  {
    year: "2020",
    title: "100th Team Member",
    description:
      "Celebrated the growth of our team to 100 talented professionals across development, design, and strategy.",
  },
  {
    year: "2023",
    title: "AI Division Launch",
    description:
      "Launched our specialized AI division to help clients leverage the power of artificial intelligence and machine learning.",
  },
]

export default function Timeline() {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  return (
    <div className="relative py-10">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/80 via-cyan-500/50 to-blue-500/30" />

      <div className="relative">
        {timelineData.map((item, index) => (
          <ScrollReveal key={index} direction={index % 2 === 0 ? "left" : "right"} className="mb-12">
            <div
              className={`relative flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center`}
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                <motion.div
                  className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="mb-2 text-sm font-bold text-primary">{item.year}</div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              </div>

              {/* Center point */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
                  animate={{
                    scale: activeItem === index ? 1.2 : 1,
                    backgroundColor: activeItem === index ? "#0ea5e9" : "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="h-4 w-4 rounded-full bg-primary"
                    animate={{
                      scale: activeItem === index ? 1.5 : 1,
                      backgroundColor: activeItem === index ? "#ffffff" : "#0ea5e9",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Empty space for the other side */}
              <div className="w-1/2" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
