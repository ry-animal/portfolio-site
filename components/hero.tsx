"use client"

import type React from "react"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import type * as THREE from "three"
import Typewriter from "@/components/typewriter"

export default function Hero() {
  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault()
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" })
      // Update URL hash
      history.pushState(null, "", "#about")
    }
  }

  const specialties = [
    "Frontend Development",
    "React & Next.js",
    "UI/UX Design",
    "Interactive Experiences",
    "Modern Web Applications",
  ]

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden pt-0 md:pt-0 snap-start">
      <Canvas className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <color attach="background" args={["#050505"]} />
        <Environment preset="city" />
        <HeroScene />
      </Canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 pt-16 md:pt-4">
        <div className="space-y-4 mb-4">
          <div className="opacity-0 animate-[fadeIn_1s_ease-in-out_0.3s_forwards]">
            <span className="text-3xl md:text-5xl font-bold text-white">Hello, I&apos;m</span>
          </div>
          <div className="opacity-0 animate-[fadeIn_1s_ease-in-out_0.6s_forwards]">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 pb-2">
              Ryan Van Valkenburg
            </h1>
          </div>
        </div>
        <div className="h-8 md:h-12 mb-6 opacity-0 animate-[fadeIn_1s_ease-in-out_1.2s_forwards]">
          <p className="text-xl md:text-2xl text-gray-200">
            Specializing in <Typewriter texts={specialties} typingSpeed={80} className="text-blue-300" />
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeIn_1s_ease-in-out_1.8s_forwards]">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            onClick={(e) => {
              e.preventDefault()
              const projectsSection = document.getElementById("projects")
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth", block: "start" })
                history.pushState(null, "", "#projects")
              }
            }}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white/10"
            onClick={(e) => {
              e.preventDefault()
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
                history.pushState(null, "", "#contact")
              }
            }}
          >
            Contact Me
          </Button>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0 animate-[fadeIn_1s_ease-in-out_2.4s_forwards]">
        <button
          onClick={handleScrollToAbout}
          aria-label="Scroll to About section"
          className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
        >
          <ArrowDown className="h-8 w-8 text-white" />
        </button>
      </div>
    </section>
  )
}

function HeroScene() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 100 }).map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15]}>
            <octahedronGeometry args={[0.2 * Math.random(), 0]} />
            <meshStandardMaterial
              color={`hsl(${Math.random() * 90 + 180}, 100%, 75%)`}
              emissive={`hsl(${Math.random() * 90 + 180}, 100%, 30%)`}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

