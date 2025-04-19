"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PortfolioItemProps {
  image: string
  title: string
  category: string
  description: string
  index?: number
}

export default function PortfolioItem({ image, title, category, description, index = 0 }: PortfolioItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card
        className="overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-60 overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="outline" className="text-white border-white hover:bg-white/20">
              View Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <CardContent className="pt-6 relative">
          <motion.div animate={{ y: isHovered ? -5 : 0 }} transition={{ duration: 0.3 }}>
            <div className="text-sm text-muted-foreground mb-2">{category}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </motion.div>

          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-6 right-6 h-0.5 bg-primary/50"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </CardContent>

        <CardFooter className="pt-0">
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
            <Button variant="ghost" className="p-0 h-auto font-medium">
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
