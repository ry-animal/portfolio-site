import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-16 bg-background flex items-center snap-start">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-2 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-3">Software Engineer</h3>
            <p className="text-muted-foreground mb-3">
              Hello! I&apos;m a passionate frontend developer with expertise in creating immersive digital experiences. With
              a strong foundation in modern web technologies and a keen eye for design, I specialize in building
              responsive, accessible, and performant web applications.
            </p>
            <p className="text-muted-foreground mb-4">
              My journey in web development began 5 years ago, and since then, I&apos;ve worked on a diverse range of
              projects, from e-commerce platforms to interactive data visualizations. I&apos;m constantly exploring new
              technologies and approaches to enhance user experiences and solve complex problems.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium">Name:</h4>
                <p className="text-muted-foreground">Ryan Van Valkenburg</p>
              </div>
              <div>
                <h4 className="font-medium">Email:</h4>
                <p className="text-muted-foreground">ryanlvv@gmail.com</p>
              </div>
              <div>
                <h4 className="font-medium">Location:</h4>
                <p className="text-muted-foreground">Seattle, Wa, USA</p>
              </div>
              <div>
                <h4 className="font-medium">Availability:</h4>
                <p className="text-muted-foreground">Open to opportunities</p>
              </div>
            </div>

            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/me.webp"
                alt="Ryan Van Valkenburg"
                fill
                className="object-cover object-[center_0%]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

