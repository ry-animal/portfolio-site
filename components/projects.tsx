"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github?: string
  demo?: string
  category: "web" | "mobile" | "design"
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, cart functionality, and secure checkout process.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "web",
  },
  {
    id: 2,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard displaying complex data sets with customizable charts and filtering options.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "D3.js", "TypeScript", "Firebase"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "web",
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "A cross-platform mobile application for tracking workouts, nutrition, and fitness goals.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "TypeScript", "Firebase", "Redux"],
    github: "https://github.com",
    category: "mobile",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A personal portfolio website showcasing projects and skills with 3D elements and animations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Three.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "web",
  },
  {
    id: 5,
    title: "UI/UX Design System",
    description: "A comprehensive design system with reusable components and design guidelines for web applications.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Figma", "Design Systems", "UI/UX"],
    demo: "https://example.com",
    category: "design",
  },
  {
    id: 6,
    title: "Weather App",
    description:
      "A weather application providing real-time forecasts and historical weather data with beautiful visualizations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "TypeScript", "Weather API", "Chart.js"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "web",
  },
]

export default function Projects() {
  const [filter, setFilter] = useState<string>("all")

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="py-16 bg-muted/30 flex items-center snap-start">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          My{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          A selection of my recent work, showcasing my skills in web development, mobile applications, and UI/UX design.
        </p>

        <div className="flex justify-center gap-2 mb-8">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "web" ? "default" : "outline"} onClick={() => setFilter("web")}>
            Web
          </Button>
          <Button variant={filter === "mobile" ? "default" : "outline"} onClick={() => setFilter("mobile")}>
            Mobile
          </Button>
          <Button variant={filter === "design" ? "default" : "outline"} onClick={() => setFilter("design")}>
            Design
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
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
      <CardContent>
        <CardDescription className="line-clamp-3">{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="gap-2">
        {project.github && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="gap-1">
              <Github className="h-4 w-4" />
              Code
            </a>
          </Button>
        )}
        {project.demo && (
          <Button size="sm" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="gap-1">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

