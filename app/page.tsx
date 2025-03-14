"use client"

import { useEffect } from "react"
import SmoothScrollContainer from "@/components/smooth-scroll-container"
import SectionIndicator from "@/components/section-indicator"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  // Force section indicator to update when the component mounts
  useEffect(() => {
    // Create a custom scroll event to trigger section detection
    const scrollEvent = new Event("scroll")

    // Dispatch the event after a short delay to ensure all components are mounted
    const timer = setTimeout(() => {
      window.dispatchEvent(scrollEvent)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SectionIndicator />
      <div className="flex-grow relative">
        <SmoothScrollContainer>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </SmoothScrollContainer>
      </div>
      <Footer />
    </div>
  )
}

