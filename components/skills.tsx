"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Database, Layers, Terminal, Workflow } from "lucide-react"

type Skill = {
  name: string
  level: number
}

type SkillCategory = {
  id: string
  name: string
  icon: React.ReactNode
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Three.js", level: 75 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    id: "design",
    name: "Design",
    icon: <Palette className="h-5 w-5" />,
    skills: [
      { name: "UI/UX Design", level: 85 },
      { name: "Figma", level: 90 },
      { name: "Adobe XD", level: 80 },
      { name: "Responsive Design", level: 95 },
      { name: "Animation", level: 75 },
      { name: "Design Systems", level: 85 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Database className="h-5 w-5" />,
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "Firebase", level: 85 },
      { name: "RESTful APIs", level: 85 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    id: "tools",
    name: "Tools & Others",
    icon: <Terminal className="h-5 w-5" />,
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Webpack", level: 75 },
      { name: "Jest/Testing", level: 80 },
      { name: "CI/CD", level: 70 },
      { name: "Performance Optimization", level: 85 },
      { name: "Accessibility", level: 90 },
    ],
  },
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend")
  const [visibleSkills, setVisibleSkills] = useState<Record<string, boolean>>({})
  const skillsRef = useRef<HTMLDivElement>(null)

  // Set up intersection observer to trigger animations when skills come into view
  useEffect(() => {
    if (!skillsRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Initialize all skills with zero progress
          const initialSkillsState: Record<string, boolean> = {}
          skillCategories.forEach(category => {
            category.skills.forEach(skill => {
              const key = `${category.id}-${skill.name}`
              initialSkillsState[key] = true
            })
          })

          // Stagger the animations slightly
          setTimeout(() => {
            setVisibleSkills(initialSkillsState)
          }, 200)
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    )

    observer.observe(skillsRef.current)

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current)
      }
    }
  }, [])

  // Reset animations when tab changes
  useEffect(() => {
    // Reset all progress values
    setVisibleSkills({})

    // Stagger the animations slightly
    setTimeout(() => {
      const newSkillsState: Record<string, boolean> = {}
      skillCategories
        .find(category => category.id === activeTab)
        ?.skills.forEach(skill => {
          const key = `${activeTab}-${skill.name}`
          newSkillsState[key] = true
        })

      setVisibleSkills(newSkillsState)
    }, 100)
  }, [activeTab])

  return (
    <section id="skills" className="py-16 bg-background flex items-center snap-start">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Skills</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          A comprehensive overview of my technical skills and proficiencies across various domains.
        </p>

        <div ref={skillsRef}>
          <Tabs defaultValue="frontend" value={activeTab} onValueChange={setActiveTab} className="max-w-3xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              {skillCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="grid gap-3">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress
                        value={visibleSkills[`${category.id}-${skill.name}`] ? skill.level : 0}
                        className="h-2 transition-all duration-1000 ease-out"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Development Process</h3>
              </div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Requirements Analysis</li>
                <li>• Wireframing & Prototyping</li>
                <li>• Responsive Implementation</li>
                <li>• Testing & Optimization</li>
                <li>• Deployment & Maintenance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Soft Skills</h3>
              </div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Problem Solving</li>
                <li>• Communication</li>
                <li>• Time Management</li>
                <li>• Adaptability</li>
                <li>• Attention to Detail</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Currently Learning</h3>
              </div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• WebGL & Advanced 3D</li>
                <li>• Web3 Technologies</li>
                <li>• Machine Learning Integration</li>
                <li>• Advanced Animation Techniques</li>
                <li>• Performance Optimization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

