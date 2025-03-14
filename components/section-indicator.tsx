"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [sections, setSections] = useState<{ id: string; label: string }[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Get all sections with IDs
    const sectionElements = Array.from(document.querySelectorAll("section[id]")) as HTMLElement[]

    const sectionData = sectionElements.map((section) => ({
      id: section.id,
      label: section.id.charAt(0).toUpperCase() + section.id.slice(1),
    }))

    setSections(sectionData)

    // Improved intersection observer options for more accurate tracking
    const observerOptions = {
      root: null,
      // Adjust rootMargin to trigger closer to the center of the viewport
      rootMargin: "-45% 0px -45% 0px",
      // Use multiple thresholds for more granular detection
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Sort entries by their intersection ratio to find the most visible section
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visibleEntries.length > 0) {
        setActiveSection(visibleEntries[0].target.id)
      }
    }

    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create and store the observer
    observerRef.current = new IntersectionObserver(handleIntersect, observerOptions)

    // Observe all sections
    sectionElements.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    // Initial active section based on URL hash or first section
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1)
      if (sectionData.some((section) => section.id === sectionId)) {
        setActiveSection(sectionId)
      }
    } else if (sectionData.length > 0) {
      setActiveSection(sectionData[0].id)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Add scroll event listener for more responsive updates
  useEffect(() => {
    const handleScroll = () => {
      // Force re-evaluation of sections on scroll
      if (observerRef.current) {
        const sections = document.querySelectorAll("section[id]")
        sections.forEach((section) => {
          const entry = observerRef.current?.takeRecords().find((record) => record.target === section)
          if (entry && entry.isIntersecting) {
            setActiveSection(section.id)
          }
        })
      }
    }

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
      // Update active section immediately for better UX
      setActiveSection(sectionId)
      // Update URL hash
      history.pushState(null, "", `#${sectionId}`)
    }
  }

  if (sections.length === 0) return null

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden md:flex">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center"
          aria-label={`Scroll to ${section.label} section`}
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 mr-2",
              activeSection === section.id
                ? "bg-primary w-3 h-3"
                : "bg-muted-foreground/50 group-hover:bg-muted-foreground",
            )}
          />
          <span
            className={cn(
              "text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity",
              activeSection === section.id ? "opacity-100 text-primary" : "text-muted-foreground",
            )}
          >
            {section.label}
          </span>
        </button>
      ))}
    </div>
  )
}

