"use client"

import { Button } from "../components/ui/button"
import { ArrowRight } from "lucide-react"
import { useSettings } from "../lib/settings-provider"
import AnimatedText from "../components/animated-text"
import ParticleBackground from "../components/particle-background"
import Image from "next/image"

export default function HeroSection() {
  const { settings } = useSettings()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Background GIF instead of water effect */}
      <div className="absolute inset-0 z-0">
        <Image src="/digital-waves.gif" alt="Digital Waves" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-blue-900/30 to-black/70" />
      </div>

      <ParticleBackground />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <AnimatedText
            text={settings.hero_title || "Innovative IT Solutions"}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-lg"
          />
          <AnimatedText
            text={
              settings.hero_subtitle ||
              "Transforming ideas into powerful digital experiences with cutting-edge technology"
            }
            className="text-xl md:text-2xl text-white/90 max-w-[700px] drop-shadow-md"
          />
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 backdrop-blur-sm bg-white/90">
              Our Services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 backdrop-blur-sm">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
