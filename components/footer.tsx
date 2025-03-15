import { Github, Linkedin, Twitter, MapPin } from "lucide-react"
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
    <footer ref={footerRef} className="bg-background border-t pt-2 md:pt-4 pb-3 md:pb-6 w-full">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 text-muted-foreground" />
              <span className="text-xs md:text-sm text-muted-foreground">Seattle, Wa</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">&copy; {currentYear} Ryan Van Valkenburg. All rights reserved.</p>
          </div>

          <div className="flex gap-3 md:gap-4">
            <a
              href="https://github.com/ry-animal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 md:h-5 md:w-5" />
            </a>
            <a
              href="https://linkedin.com/in/ryanlvv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
            </a>
            <a
              href="https://twitter.com/ryan7vv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

