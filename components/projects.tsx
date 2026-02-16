"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { projects } from "@/lib/data"

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Track scroll progress within the tall container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Number of cards * card width percentage to determine how far to translate
  // Each card is ~70vw wide + gap. We want to move from 0 to -(totalWidth - 100vw)
  // With 4 cards at ~72vw each (70vw card + 2vw gap) = 288vw total, minus 100vw visible = -188vw
  // We map to [0, 0.8] so the horizontal scroll finishes slightly before the vertical scroll ends,
  // giving the user time to view the last project ("esperar un poco mas").
  const x = useTransform(scrollYProgress, [0, 0.8], ["0vw", "-188vw"])

  // Progress indicator per card
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["0%", "100%"]
  )

  return (
    <section id="projects" ref={sectionRef} className="relative" style={{ height: `${projects.length * 100 + 100}vh` }}>
      {/* Sticky container - stays pinned while we scroll through the tall parent */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-6 md:px-12 mb-8"
        >
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs text-primary font-medium tracking-widest uppercase">
                Portafolio
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Proyectos
              </h2>
            </div>

            {/* Progress bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-32 h-0.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  style={{ width: progressWidth }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {String(projects.length).padStart(2, "0")} proyectos
              </span>
            </div>
          </div>
        </motion.div>

        {/* Horizontal track - moves left as user scrolls down */}
        <motion.div
          className="flex gap-[2vw] px-6 md:px-12"
          style={{ x }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex-shrink-0 w-[85vw] md:w-[70vw]"
            >
              <Link
                href={`/projects/${project.id}`}
                className="group w-full text-left cursor-pointer block"
              >
                <div
                  className={`relative aspect-[16/10] rounded-xl bg-gradient-to-br ${project.color} border border-border overflow-hidden transition-all duration-500 group-hover:border-primary/50`}
                >
                  {/* Project number */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8">
                    <span className="text-6xl md:text-8xl font-display font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Project info overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded bg-background/80 text-foreground border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.p
            className="text-xs text-muted-foreground tracking-widest uppercase"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll para explorar
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
