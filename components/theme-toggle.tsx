"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [isAnimating, setIsAnimating] = React.useState(false)

    // Handle hydration issues
    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        if (isAnimating) return

        setIsAnimating(true)
        const newTheme = theme === "dark" ? "light" : "dark"

        // Delay the actual theme change to allow for animation
        setTimeout(() => {
            setTheme(newTheme)
            setTimeout(() => {
                setIsAnimating(false)
            }, 300)
        }, 300)
    }

    if (!mounted) {
        return (
            <button
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-muted-foreground"
                aria-label="Toggle theme"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </button>
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className={`
        w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground
        ${isAnimating ? 'animate-pulse bg-primary/20' : 'bg-primary/10 hover:bg-primary/20'}
        transition-all duration-300 ease-in-out
      `}
            aria-label="Toggle theme"
        >
            <div className="relative h-[1.2rem] w-[1.2rem]">
                <Sun
                    className={`
            absolute h-[1.2rem] w-[1.2rem] transition-all duration-300
            ${theme === 'dark'
                            ? 'rotate-0 scale-100 opacity-100'
                            : 'rotate-90 scale-0 opacity-0'
                        }
          `}
                />
                <Moon
                    className={`
            absolute h-[1.2rem] w-[1.2rem] transition-all duration-300
            ${theme === 'light'
                            ? 'rotate-0 scale-100 opacity-100'
                            : '-rotate-90 scale-0 opacity-0'
                        }
          `}
                />
            </div>
        </button>
    )
} 