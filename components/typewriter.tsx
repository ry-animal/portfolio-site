"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
    texts: string[]
    typingSpeed?: number
    deletingSpeed?: number
    delayBetweenTexts?: number
    className?: string
}

export default function Typewriter({
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenTexts = 1500,
    className = "",
}: TypewriterProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentText, setCurrentText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [isBlinking, setIsBlinking] = useState(true)

    useEffect(() => {
        let timeout: NodeJS.Timeout

        if (isDeleting) {
            // Deleting text
            if (currentText.length === 0) {
                setIsDeleting(false)
                setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
                timeout = setTimeout(() => {
                    setIsBlinking(false)
                }, delayBetweenTexts)
            } else {
                timeout = setTimeout(() => {
                    setCurrentText(currentText.slice(0, -1))
                }, deletingSpeed)
            }
        } else {
            // Typing text
            const fullText = texts[currentTextIndex]
            if (currentText.length === fullText.length) {
                // Finished typing the current text
                timeout = setTimeout(() => {
                    setIsDeleting(true)
                }, delayBetweenTexts)
            } else {
                // Still typing
                setIsBlinking(false)
                timeout = setTimeout(() => {
                    setCurrentText(fullText.slice(0, currentText.length + 1))
                }, typingSpeed)
            }
        }

        return () => clearTimeout(timeout)
    }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, delayBetweenTexts])

    return (
        <span className={className}>
            {currentText}
            <span className={`inline-block w-0.5 h-5 ml-0.5 bg-current ${isBlinking ? 'animate-blink' : ''}`}></span>
        </span>
    )
} 