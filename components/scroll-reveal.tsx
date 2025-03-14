"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
    children: React.ReactNode
    className?: string
    direction?: "up" | "down" | "left" | "right"
    duration?: number
    delay?: number
    distance?: number
    threshold?: number
    once?: boolean
}

export default function ScrollReveal({
    children,
    className = "",
    direction = "up",
    duration = 800,
    delay = 0,
    distance = 50,
    threshold = 0.1,
    once = true,
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (once && ref.current) {
                        observer.unobserve(ref.current)
                    }
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            {
                threshold,
            }
        )

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [once, threshold])

    // Calculate transform based on direction
    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case "up":
                    return `translateY(${distance}px)`
                case "down":
                    return `translateY(-${distance}px)`
                case "left":
                    return `translateX(${distance}px)`
                case "right":
                    return `translateX(-${distance}px)`
                default:
                    return "none"
            }
        }
        return "none"
    }

    const styles: React.CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
    }

    return (
        <div ref={ref} className={cn("", className)} style={styles}>
            {children}
        </div>
    )
} 