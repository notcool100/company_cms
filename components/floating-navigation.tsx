"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Home, Layers, Users, Briefcase, Mail, Menu, X } from "lucide-react"

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "services", label: "Services", icon: Layers },
    { id: "about", label: "About", icon: Users },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state for styling
      setIsScrolled(window.scrollY > 100)

      // Determine active section based on scroll position
      const sections = navItems.map((item) => {
        const element = document.getElementById(item.id)
        if (!element) return { id: item.id, position: 0 }

        const rect = element.getBoundingClientRect()
        return {
          id: item.id,
          position: Math.abs(rect.top),
        }
      })

      // Find the section closest to the top of the viewport
      const closest = sections.reduce((prev, curr) => (prev.position < curr.position ? prev : curr))

      setActiveSection(closest.id)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-[80%] max-w-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-primary/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop navigation */}
      <motion.div
        className="fixed left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isScrolled ? 20 : 40,
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`px-2 py-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isScrolled ? "bg-black/50 shadow-lg" : "bg-transparent"
          }`}
        >
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.id} href={`#${item.id}`} className="relative px-4 py-2 rounded-full transition-colors">
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    layoutId="activeSection"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className={`relative z-10 ${activeSection === item.id ? "text-white" : "text-white/70"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
