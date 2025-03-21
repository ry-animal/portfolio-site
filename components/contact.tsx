"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", formData)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitError("There was an error submitting the form. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="pt-16 md:pt-16 pb-8 md:pb-8 bg-muted/30 flex items-center snap-start">
      <div className="container">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-center">
          Get In{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Touch</span>
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center max-w-2xl mx-auto mb-4 md:mb-8">
          Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
        </p>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          <div className="lg:col-span-1 space-y-3 md:space-y-4">
            <Card>
              <CardContent className="pt-4 md:pt-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-primary/10 p-2 md:p-3 rounded-full">
                      <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Email</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">ryan@vanvalkenburg.dev</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-primary/10 p-2 md:p-3 rounded-full">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Location</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">San Francisco, CA</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="bg-primary/10 p-2 md:p-3 rounded-full">
                      <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base">Phone</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">+1 (415) 555-7890</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 md:pt-6">
                <h3 className="font-medium text-sm md:text-base mb-2 md:mb-3">Connect With Me</h3>
                <div className="flex gap-3 md:gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-1.5 md:p-2 rounded-full hover:bg-muted/80 transition-colors"
                  >
                    <Github className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-1.5 md:p-2 rounded-full hover:bg-muted/80 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-1.5 md:p-2 rounded-full hover:bg-muted/80 transition-colors"
                  >
                    <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted p-1.5 md:p-2 rounded-full hover:bg-muted/80 transition-colors"
                  >
                    <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-4 md:pt-6">
                <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
                  <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xs md:text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="h-8 md:h-10 text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xs md:text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="h-8 md:h-10 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="text-xs md:text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="h-8 md:h-10 text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-xs md:text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      className="h-20 md:h-24 text-sm"
                      rows={3}
                      required
                    />
                  </div>

                  {submitError && <div className="text-red-500 text-xs md:text-sm">{submitError}</div>}

                  {submitSuccess && (
                    <div className="text-green-500 text-xs md:text-sm">
                      Your message has been sent successfully! I&apos;ll get back to you soon.
                    </div>
                  )}

                  <Button type="submit" className="w-full gap-2 h-8 md:h-10 text-xs md:text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

