"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  slug: string
  index?: number
}

export default function BlogCard({ title, excerpt, image, date, readTime, category, slug, index = 0 }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.4 }}>
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={600}
              height={340}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Category badge */}
          <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta info */}
          <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">{title}</h3>

          {/* Excerpt */}
          <p className="mb-4 text-gray-600">{excerpt}</p>

          {/* Read more button */}
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
            <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
              <a href={`/blog/${slug}`}>
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
