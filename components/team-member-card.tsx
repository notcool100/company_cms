"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  image: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  index?: number
}

export default function TeamMemberCard({ name, role, bio, image, socialLinks, index = 0 }: TeamMemberProps) {
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
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="aspect-square overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Overlay with bio */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-4 text-sm">{bio}</p>

            {/* Social links */}
            {socialLinks && (
              <div className="flex gap-3">
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
                  >
                    <Twitter size={16} />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
                  >
                    <Linkedin size={16} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/40"
                  >
                    <Github size={16} />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>

        <div className="p-4 text-center">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-500">{role}</p>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
