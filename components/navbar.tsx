"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Home, FolderGit2, Code2, Wrench, Mail } from "lucide-react"

const navItems = [
    { name: "Inicio", href: "#top", icon: Home },
    { name: "Proyectos", href: "#projects", icon: FolderGit2 },
    { name: "Mastery", href: "#code-mastery", icon: Code2 },
    { name: "Skills", href: "#skills", icon: Wrench },
    { name: "Contacto", href: "#contact", icon: Mail },
]

export function Navbar() {
    const [activeSection, setActiveSection] = useState("top")
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Reveal navbar after a small delay
        const timer = setTimeout(() => setIsVisible(true), 1500)

        const handleScroll = () => {
            // Find the current section
            const sections = navItems.map((item) => item.href.substring(1))

            // If at the very top, set to "top"
            if (window.scrollY < 100) {
                setActiveSection("top")
                return
            }

            let current = ""
            for (const section of sections) {
                if (section === "top") continue
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // Adjust threshold based on section height to ensure it triggers correctly
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
                        current = section
                    }
                }
            }

            if (current) {
                setActiveSection(current)
            }
        }

        const handleClickLink = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest("a")
            if (link && link.hash && link.hash.startsWith("#")) {
                e.preventDefault()
                const id = link.hash.substring(1)
                if (id === "top") {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                } else {
                    const element = document.getElementById(id)
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" })
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        document.addEventListener("click", handleClickLink)

        // Initial check
        handleScroll()

        return () => {
            clearTimeout(timer)
            window.removeEventListener("scroll", handleScroll)
            document.removeEventListener("click", handleClickLink)
        }
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 1,
                    }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4"
                >
                    <nav className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href.substring(1)
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors duration-300",
                                        isActive ? "text-white" : "text-muted-foreground hover:text-white hover:bg-white/5"
                                    )}
                                    aria-label={item.name}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <item.icon
                                        className={cn(
                                            "w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform duration-300",
                                            isActive && "scale-110"
                                        )}
                                    />

                                    {/* Tooltip on hover for desktop */}
                                    <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 text-xs px-2 py-1 rounded pointer-events-none hidden sm:block whitespace-nowrap">
                                        {item.name}
                                    </span>
                                </a>
                            )
                        })}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
