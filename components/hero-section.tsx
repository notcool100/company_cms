"use client";

import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSettings } from "../lib/settings-provider";
import ParticleBackground from "../components/particle-background";
import Image from "next/image";

export default function HeroSection() {
  const { settings } = useSettings();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="home"
    >
      {/* Background with fallback */}
      <div className="absolute inset-0 z-0">
        <Image
          src={settings.hero_background || "/digital-waves.gif"}
          alt="Digital Background"
          fill
          className="object-cover opacity-60"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/digital-waves.gif";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-blue-900/30 to-black/70" />
      </div>

      <ParticleBackground />

      <div className="container relative z-10 px-4 md:px-6 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
              {settings.hero_title || "Innovative IT Solutions"}
            </h1>
          </div>
          <div className="animate-fade-in-up animation-delay-300">
            <p className="text-xl md:text-2xl text-white max-w-[800px] drop-shadow-md">
              {settings.hero_subtitle ||
                "Transforming ideas into powerful digital experiences with cutting-edge technology"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 backdrop-blur-sm bg-white/90 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#services">
                Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-[#1F2937] text-white hover:bg-[#374151] backdrop-blur-sm transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center pt-2">
              <div className="w-1 h-3 bg-white rounded-full animate-scroll-down"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
