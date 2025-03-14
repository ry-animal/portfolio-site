"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useThrottledCallback } from "use-debounce"
import { cn } from "@/lib/utils"

interface SmoothScrollContainerProps {
  children: React.ReactNode
  className?: string
}

export default function SmoothScrollContainer({ children, className }: SmoothScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [sections, setSections] = useState<HTMLElement[]>([])
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize sections and observers
  useEffect(() => {
    if (!containerRef.current) return

    // Get all sections
    const sectionElements = Array.from(containerRef.current.querySelectorAll("section[id]")) as HTMLElement[]

    setSections(sectionElements)

    // Improved intersection observer options
    const observerOptions = {
      root: containerRef.current,
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the most visible section
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visibleEntries.length > 0) {
        const sectionId = visibleEntries[0].target.id
        setActiveSection(sectionId)

        // Update URL hash without scrolling
        if (!isScrolling) {
          history.replaceState(null, "", `#${sectionId}`)

          // Dispatch a custom event that navigation can listen to
          const event = new CustomEvent("sectionchange", { detail: { sectionId } })
          window.dispatchEvent(event)
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    sectionElements.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [isScrolling])

  // Handle wheel events for smooth scrolling
  const handleWheel = useThrottledCallback(
    (e: WheelEvent) => {
      if (isScrolling || !containerRef.current) return

      e.preventDefault()

      const direction = e.deltaY > 0 ? 1 : -1
      const currentIndex = activeSection ? sections.findIndex((section) => section.id === activeSection) : -1

      if (currentIndex === -1) return

      const targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction))
      const targetSection = sections[targetIndex]

      if (targetSection && targetSection.id !== activeSection) {
        setIsScrolling(true)

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Update URL hash
        history.pushState(null, "", `#${targetSection.id}`)

        // Set active section
        setActiveSection(targetSection.id)

        // Dispatch a custom event that navigation can listen to
        const event = new CustomEvent("sectionchange", { detail: { sectionId: targetSection.id } })
        window.dispatchEvent(event)

        // Reset scrolling state after animation completes
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 1000)
      }
    },
    200,
    { trailing: false },
  )

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isScrolling) return

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()

      const direction = e.key === "ArrowDown" ? 1 : -1
      const currentIndex = activeSection ? sections.findIndex((section) => section.id === activeSection) : -1

      if (currentIndex === -1) return

      const targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction))
      const targetSection = sections[targetIndex]

      if (targetSection && targetSection.id !== activeSection) {
        setIsScrolling(true)

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Update URL hash
        history.pushState(null, "", `#${targetSection.id}`)

        // Set active section
        setActiveSection(targetSection.id)

        // Dispatch a custom event that navigation can listen to
        const event = new CustomEvent("sectionchange", { detail: { sectionId: targetSection.id } })
        window.dispatchEvent(event)

        // Reset scrolling state after animation completes
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 1000)
      }
    }
  }

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add event listeners
    container.addEventListener("wheel", handleWheel as unknown as EventListener, { passive: false })
    window.addEventListener("keydown", handleKeyDown)

    // Handle anchor clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute("href")?.substring(1)

        if (targetId) {
          const targetSection = document.getElementById(targetId)

          if (targetSection) {
            setIsScrolling(true)

            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })

            // Update URL and active section
            history.pushState(null, "", `#${targetId}`)
            setActiveSection(targetId)

            // Reset scrolling state
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current)
            }

            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false)
            }, 1000)
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    // Check for hash in URL on initial load
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1)
      const section = document.getElementById(sectionId)

      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" })
          setActiveSection(sectionId)
        }, 100)
      }
    } else if (sections.length > 0) {
      // Set first section as active if no hash
      setActiveSection(sections[0].id)
    }

    return () => {
      container.removeEventListener("wheel", handleWheel as unknown as EventListener)
      window.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleAnchorClick)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleWheel, sections])

  // Ensure sections are properly sized for snap scrolling
  useEffect(() => {
    if (!containerRef.current) return

    // Ensure each section is at least 100vh - footer height for proper snapping
    const adjustSectionHeights = () => {
      const sections = containerRef.current?.querySelectorAll('section[id]')
      const footerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--footer-height') || '120', 10)
      const minHeight = `calc(100vh - ${footerHeight}px)`

      sections?.forEach(section => {
        if (section.id !== 'contact') { // The contact section can be its natural height
          (section as HTMLElement).style.minHeight = minHeight
        }
      })
    }

    adjustSectionHeights()
    window.addEventListener('resize', adjustSectionHeights)

    return () => {
      window.removeEventListener('resize', adjustSectionHeights)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("scroll-container overflow-y-auto overflow-x-hidden snap-y snap-mandatory", className)}
      style={{
        height: "calc(100vh - var(--footer-height, 120px))", // Restore calculated height for proper snap scrolling
        marginBottom: 0,
        paddingBottom: 0,
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        willChange: "transform", // Performance optimization
        scrollSnapType: "y mandatory", // Explicitly set scroll snap type
        scrollBehavior: "smooth", // Ensure smooth scrolling
      }}
    >
      {children}
    </div>
  )
}

