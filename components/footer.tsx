import { Github, Linkedin, Twitter } from "lucide-react"
import { useEffect, useRef } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const setFooterHeight = () => {
      const height = footerRef.current?.offsetHeight || 0
      document.documentElement.style.setProperty('--footer-height', `${height}px`)
    }

    // Set initial height
    setFooterHeight()

    // Update on window resize
    window.addEventListener('resize', setFooterHeight)

    return () => {
      window.removeEventListener('resize', setFooterHeight)
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-background border-t pt-4 pb-6 w-full">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground mt-1">&copy; {currentYear} Ryan Van Valkenburg. All rights reserved.</p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/ry-animal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/ryanlvv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/ryan7vv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

