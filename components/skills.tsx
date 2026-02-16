"use client"

import { motion } from "framer-motion"
import { Terminal } from "lucide-react"

// Data structure for skills
interface Skill {
  name: string
  icon: string // Simple Icons slug or "lucide" for generic components
}

const technologies: Skill[] = [
  { name: "React", icon: "react" },
  { name: "Vue.js", icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Python", icon: "python" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "GraphQL", icon: "graphql" },
]

const tools: Skill[] = [
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
  { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Figma", icon: "figma" },
  { name: "VS Code", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
  { name: "Terminal", icon: "lucide-terminal" },
  { name: "npm", icon: "npm" },
  { name: "Vercel", icon: "vercel" },
  { name: "Linux", icon: "linux" },
]

function SkillCard({ item }: { item: Skill }) {
  const isUrl = item.icon.startsWith("http")
  const isLucide = item.icon.startsWith("lucide-")

  return (
    <div className="group flex flex-col items-center justify-center gap-4 w-40 h-40 md:w-48 md:h-48 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
      <div className="p-4 rounded-xl bg-background/80 group-hover:scale-110 transition-transform duration-300">
        {isLucide ? (
          <Terminal className="w-10 h-10 text-foreground" />
        ) : (
          <img
            src={isUrl ? item.icon : `https://cdn.simpleicons.org/${item.icon}`}
            alt={item.name}
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
            loading="lazy"
          />
        )}
      </div>
      <span className="text-foreground font-semibold text-lg">{item.name}</span>
    </div>
  )
}

function InfiniteCarousel({ items, direction, speed }: { items: Skill[]; direction: "left" | "right"; speed: string }) {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className={`flex gap-6 md:gap-8 ${direction === "left" ? speed === "fast" ? "animate-scroll-left-fast" : "animate-scroll-left" : "animate-scroll-right"}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <SkillCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 px-6"
      >
        <span className="text-xs text-primary font-medium tracking-widest uppercase">Habilidades</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Tecnologías & Herramientas</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <InfiniteCarousel items={technologies} direction="left" speed="normal" />
        <InfiniteCarousel items={tools} direction="right" speed="fast" />
      </motion.div>
    </section>
  )
}
