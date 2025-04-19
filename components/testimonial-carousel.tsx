"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechGrowth Inc.",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Working with this team has been transformative for our business. Their technical expertise and innovative approach helped us launch our platform 3 months ahead of schedule.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "Innovate Solutions",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The attention to detail and commitment to quality is unmatched. They didn't just build our application; they enhanced our entire concept with valuable insights.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Global Brands",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Our website traffic increased by 200% within two months of launch. The UI/UX design perfectly captures our brand identity while delivering exceptional user experience.",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative overflow-hidden py-10">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-cyan-500/5 rounded-3xl" />

      <div className="absolute top-10 left-10 text-primary/20">
        <Quote size={120} strokeWidth={1} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col items-center text-center"
            onHoverStart={() => setAutoplay(false)}
            onHoverEnd={() => setAutoplay(true)}
          >
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-cyan-500/30 rounded-full blur-xl opacity-50" />
              <Image
                src={testimonials[current].image || "/placeholder.svg"}
                alt={testimonials[current].name}
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-xl object-cover z-10 relative"
              />
            </div>

            <blockquote className="text-xl md:text-2xl font-light italic text-gray-700 mb-6">
              "{testimonials[current].quote}"
            </blockquote>

            <div className="flex flex-col items-center">
              <h4 className="text-lg font-bold">{testimonials[current].name}</h4>
              <p className="text-gray-500">
                {testimonials[current].role}, {testimonials[current].company}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
          <button
            onClick={prevTestimonial}
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute bottom-6 left-0 right-0">
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1)
                  setCurrent(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${index === current ? "bg-primary" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
