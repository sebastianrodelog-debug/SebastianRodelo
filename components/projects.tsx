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

  // Calculate total width based on number of projects
  // Each card is ~70vw + 2vw gap = 72vw per item.
  // Total width = projects.length * 72vw
  // Visible width = 100vw
  // Translate = -(totalWidth - 100vw)
  // For 5 items: -(5 * 72 - 100) = -260vw
  const totalWidthVw = projects.length * 72
  const translateVw = -(totalWidthVw - 100)
  const x = useTransform(scrollYProgress, [0, 0.8], ["0vw", `${translateVw}vw`])

  // Progress indicator per card
  const progressWidth = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["0%", "100%"]
  )

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative h-auto md:h-[var(--scroll-height)]"
      style={{ '--scroll-height': `${projects.length * 100 + 100}vh` } as React.CSSProperties}
    >
      {/* Sticky container - stays pinned while we scroll through the tall parent on Desktop */}
      {/* On Mobile: Standard vertical flow */}
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center overflow-hidden py-12 md:py-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-6 md:px-12 mb-8 md:mb-12"
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

            {/* Progress bar (Desktop Only) */}
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

        {/* Tracks: Grid on Mobile, Horizontal on Desktop */}
        <motion.div
          className="grid grid-cols-2 gap-4 px-4 md:flex md:gap-[2vw] md:px-12 max-md:!transform-none"
          style={{ x }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full md:flex-shrink-0 md:w-[70vw]"
            >
              <Link
                href={`/projects/${project.id}`}
                className="group w-full text-left cursor-pointer block"
              >
                <div
                  className={`relative aspect-[16/10] rounded-xl bg-gradient-to-br ${project.color} border border-border overflow-hidden transition-all duration-500 group-hover:border-primary/50`}
                >
                  {/* Project number */}
                  <div className="absolute top-2 left-3 md:top-8 md:left-8">
                    <span className="text-3xl md:text-8xl font-display font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Project info overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
                    {/* Stack tags */}
                    <div className="hidden md:flex flex-wrap gap-2 mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded bg-background/80 text-foreground border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Mobile: Smaller Title */}
                    <h3 className="font-display text-base md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 md:line-clamp-none">
                      {project.title}
                    </h3>
                    <p className="hidden md:block text-muted-foreground text-sm mt-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint (Desktop Only) */}
        <motion.div
          className="hidden md:flex justify-center mt-8"
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
