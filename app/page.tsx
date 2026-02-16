"use client"

import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Projects - Horizontal Scroll */}
      <Projects />

      {/* Skills */}
      <Skills />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact */}
      <Contact />

      <Footer />
    </main>
  )
}
