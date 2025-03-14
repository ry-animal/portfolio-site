"use client"

import type React from "react"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import type * as THREE from "three"

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

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden pt-0 md:pt-0 snap-start">
      <Canvas className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <color attach="background" args={["#050505"]} />
        <Environment preset="city" />
        <HeroScene />
      </Canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4 pt-16 md:pt-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="block">Hello, I&apos;m</span>
          <span className="block text-5xl md:text-7xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 pb-2">
            Ryan Van Valkenburg
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-6">
          Frontend Developer & UI/UX Designer specializing in creating immersive digital experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
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
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
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

