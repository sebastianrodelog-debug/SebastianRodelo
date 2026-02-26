"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal } from "lucide-react"
import { allSkills, technologies, tools, type Skill } from "@/lib/data"
import * as Tabs from "@radix-ui/react-tabs"
import * as Tooltip from "@radix-ui/react-tooltip"

function SkillCard({ item }: { item: Skill }) {
  const isUrl = item.icon.startsWith("http") || item.icon.startsWith("/")
  const isLucide = item.icon.startsWith("lucide-")

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col items-center justify-center gap-3 w-32 h-32 md:w-40 md:h-40 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-background/80 group-hover:scale-110 transition-transform duration-300">
              {isLucide ? (
                <Terminal className="w-8 h-8 text-foreground" />
              ) : (
                <img
                  src={isUrl ? item.icon : `https://cdn.simpleicons.org/${item.icon}`}
                  alt={item.name}
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  loading="lazy"
                />
              )}
            </div>
            <span className="text-foreground font-medium text-sm md:text-base">{item.name}</span>
          </motion.div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-[200px] bg-secondary border border-border px-4 py-2 rounded-lg text-sm shadow-xl animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95"
            sideOffset={10}
          >
            <p className="font-semibold text-foreground mb-1">{item.name}</p>
            {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
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
  const [activeTab, setActiveTab] = useState("Todas")
  const categories = ["Todas", "Frontend", "Backend", "Herramientas"]

  const filteredSkills = activeTab === "Todas"
    ? allSkills
    : allSkills.filter(skill => skill.category === activeTab)

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 px-6"
      >
        <span className="text-xs text-primary font-medium tracking-widest uppercase">Habilidades</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Tecnologías & Herramientas</h2>
      </motion.div>

      <div className="container mx-auto px-6">
        <Tabs.Root defaultValue="Todas" onValueChange={setActiveTab} className="flex flex-col items-center">
          <Tabs.List className="flex flex-wrap justify-center gap-2 mb-12 bg-secondary/50 p-1.5 rounded-full border border-border backdrop-blur-sm">
            {categories.map((category) => (
              <Tabs.Trigger
                key={category}
                value={category}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
              >
                {category}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {activeTab === "Todas" ? (
                <motion.div
                  key="carousel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 w-[100vw] ml-[calc(50%-50vw)]"
                >
                  <InfiniteCarousel items={technologies} direction="left" speed="normal" />
                  <InfiniteCarousel items={tools} direction="right" speed="fast" />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto"
                >
                  {filteredSkills.map((skill, index) => (
                    <SkillCard key={`${skill.name}-${index}`} item={skill} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs.Root>
      </div>
    </section>
  )
}
