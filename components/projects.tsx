"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  demo?: string
  source?: string
}

const projects: Project[] = [
  {
    id: "project1",
    title: "E-commerce Dashboard",
    description:
      "A comprehensive admin dashboard for e-commerce platforms with real-time analytics, inventory management, and order processing.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Firebase"],
    image: "/placeholder.svg?height=400&width=600",
    demo: "https://example.com/demo",
    source: "https://github.com/example/project",
  },
  {
    id: "project2",
    title: "Fitness Tracker App",
    description:
      "Mobile-responsive fitness application that allows users to track workouts, set goals, and visualize progress with interactive charts.",
    tags: ["Next.js", "MongoDB", "Auth0", "D3.js", "Vercel"],
    image: "/placeholder.svg?height=400&width=600",
    demo: "https://example.com/demo",
  },
  {
    id: "project3",
    title: "Weather Visualization",
    description:
      "Interactive weather application with 3D visualizations of weather patterns, forecasts, and historical data comparison.",
    tags: ["React", "Three.js", "OpenWeather API", "CSS Animations", "Netlify"],
    image: "/placeholder.svg?height=400&width=600",
    source: "https://github.com/example/project",
  },
  {
    id: "project4",
    title: "Task Management System",
    description:
      "Collaborative project management tool with drag-and-drop interface, team assignments, and deadline tracking.",
    tags: ["Vue.js", "Vuex", "Node.js", "Express", "MongoDB", "Socket.io"],
    image: "/placeholder.svg?height=400&width=600",
    demo: "https://example.com/demo",
    source: "https://github.com/example/project",
  },
  {
    id: "project5",
    title: "Recipe Finder",
    description:
      "Personalized recipe recommendation application with filtering options based on dietary restrictions, available ingredients, and prep time.",
    tags: ["React Native", "Expo", "Firebase", "Spoonacular API"],
    image: "/placeholder.svg?height=400&width=600",
    demo: "https://example.com/demo",
  },
  {
    id: "project6",
    title: "Cryptocurrency Tracker",
    description:
      "Real-time cryptocurrency tracking dashboard with price alerts, portfolio management, and historical performance charts.",
    tags: ["React", "Redux", "CoinGecko API", "Chart.js", "Netlify"],
    image: "/placeholder.svg?height=400&width=600",
    source: "https://github.com/example/project",
  },
]

// Get all unique tags from projects
const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(projects)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isFiltering, setIsFiltering] = useState(false)

  // Handle tag filter changes
  useEffect(() => {
    setIsFiltering(true)
    const timer = setTimeout(() => {
      if (selectedTag) {
        setVisibleProjects(projects.filter((project) => project.tags.includes(selectedTag)))
      } else {
        setVisibleProjects(projects)
      }
      setIsFiltering(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedTag])

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  return (
    <section id="projects" className="py-16 bg-muted/30 flex items-center snap-start">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Here are some of my recent projects showcasing my skills and experience in web development and design.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="transition-all duration-300"
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagClick(tag)}
              className="transition-all duration-300"
            >
              {tag}
            </Button>
          ))}
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            minHeight: '400px',
            transition: 'opacity 300ms ease-in-out',
            opacity: isFiltering ? 0.6 : 1
          }}
        >
          {visibleProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 100}
              direction={index % 2 === 0 ? "left" : "right"}
              duration={600}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-2 duration-300 h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{project.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {project.demo && (
          <Button variant="outline" size="sm" asChild className="gap-1">
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
        {project.source && (
          <Button variant="outline" size="sm" asChild className="gap-1">
            <a href={project.source} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Source
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

