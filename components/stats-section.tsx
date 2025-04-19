"use client"

import { motion } from "framer-motion"
import AnimatedCounter from "./animated-counter"
import { Users, Code, Award, Globe } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: 500,
      label: "Happy Clients",
      suffix: "+",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: Code,
      value: 1250,
      label: "Projects Completed",
      suffix: "+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      value: 15,
      label: "Industry Awards",
      suffix: "",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Globe,
      value: 30,
      label: "Countries Served",
      suffix: "+",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>

              <div className="text-4xl md:text-5xl font-bold flex items-baseline">
                <AnimatedCounter
                  from={0}
                  to={stat.value}
                  duration={2.5}
                  delay={0.5 + index * 0.1}
                  formatter={(value) => value.toString()}
                />
                <span className="ml-1">{stat.suffix}</span>
              </div>

              <p className="text-gray-500 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
