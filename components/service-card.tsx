"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import ThreeDCard from "./3d-card"
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Shield, 
  Cloud, 
  LineChart, 
  Layers, 
  Cpu, 
  Headphones,
  LucideIcon
} from "lucide-react"

interface ServiceCardProps {
  icon?: ReactNode
  iconName?: string
  title: string
  description: string
  className?: string
  index?: number
}

// Map of icon names to Lucide icons
const iconMap: Record<string, ReactNode> = {
  code: <Code className="h-10 w-10" />,
  database: <Database className="h-10 w-10" />,
  globe: <Globe className="h-10 w-10" />,
  smartphone: <Smartphone className="h-10 w-10" />,
  shield: <Shield className="h-10 w-10" />,
  cloud: <Cloud className="h-10 w-10" />,
  chart: <LineChart className="h-10 w-10" />,
  layers: <Layers className="h-10 w-10" />,
  cpu: <Cpu className="h-10 w-10" />,
  support: <Headphones className="h-10 w-10" />,
}

export default function ServiceCard({ 
  icon, 
  iconName, 
  title, 
  description, 
  className, 
  index = 0 
}: ServiceCardProps) {
  // Determine which icon to use
  const displayIcon = icon || (iconName && iconMap[iconName]) || <Code className="h-10 w-10" />
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <ThreeDCard
        className={cn("h-full transition-all duration-300", className)}
        glareColor="rgba(100, 200, 255, 0.4)"
        borderColor="rgba(100, 200, 255, 0.1)"
      >
        <Card className="h-full border-none bg-transparent">
          <CardHeader>
            <div className="text-primary mb-4 relative">
              <div className="absolute -inset-2 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {displayIcon}
            </div>
            <CardTitle className="relative z-10">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="relative z-10">{description}</CardDescription>
          </CardContent>
        </Card>
      </ThreeDCard>
    </motion.div>
  )
}
