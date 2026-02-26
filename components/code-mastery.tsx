"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { ArrowUpRight, Terminal, Code2, Users, Target } from "lucide-react"
import Link from "next/link"
import ScrollFloat from "@/components/scroll-float"

export function CodeMastery() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    return (
        <section
            className="relative py-24 md:py-32 overflow-hidden group/section"
            id="code-mastery"
            onMouseMove={handleMouseMove}
        >
            {/* Background with specific Code Mastery red glow */}
            <motion.div
                className="absolute inset-0 opacity-[0.03] transition-opacity duration-300 group-hover/section:opacity-[0.06] pointer-events-none"
                style={{
                    background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, #dc2626, transparent 80%)`
                }}
            />

            <div className="container px-6 md:px-8 mx-auto relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Context & CTA */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col gap-6"
                    >
                        <div>
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono font-medium tracking-wider mb-6">
                                <Terminal className="w-3 h-3" />
                                <span>INICIATIVA EDUCATIVA</span>
                            </motion.div>

                            <ScrollFloat
                                animationDuration={0.8}
                                ease="back.inOut(2)"
                                scrollStart="top bottom+=10%"
                                scrollEnd="bottom top+=15%"
                                stagger={0.02}
                                textClassName="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
                            >
                                Code Mastery
                            </ScrollFloat>

                            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
                                Más que una academia, es una **comunidad para dominar la lógica de programación**.
                                En Code Mastery formamos desarrolladores reales, enseñando desde los fundamentos
                                hasta la arquitectura avanzada en Python y TypeScript.
                            </motion.p>
                        </div>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Link
                                href="https://code-mastery-sr.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 overflow-hidden"
                            >
                                {/* Button Glow Effect */}
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <span className="relative z-10">Explorar Plataforma</span>
                                <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Visual Features */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {/* Feature Card 1 */}
                        <motion.div variants={itemVariants} className="glass border border-white/5 rounded-2xl p-6 bg-secondary/30 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Code2 className="w-8 h-8 text-red-500 mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">Mentalidad Dev</h3>
                            <p className="text-sm text-muted-foreground">Enfoque en la resolución de problemas lógicos antes que en el código sintáctico.</p>
                        </motion.div>

                        {/* Feature Card 2 */}
                        <motion.div variants={itemVariants} className="glass border border-white/5 rounded-2xl p-6 bg-secondary/30 backdrop-blur-sm relative overflow-hidden group sm:translate-y-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Target className="w-8 h-8 text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">Rutas Claras</h3>
                            <p className="text-sm text-muted-foreground">Roadmaps estructurados desde nivel cero hasta la consolidación como Full Stack.</p>
                        </motion.div>

                        {/* Terminal Mockup Card */}
                        <motion.div variants={itemVariants} className="sm:col-span-2 mt-4 sm:mt-8 rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
                            <div className="flex items-center px-4 py-3 bg-[#111] border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="mx-auto text-xs text-muted-foreground font-mono">sebas_dev@mastery:~</div>
                            </div>
                            <div className="p-6 font-mono text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400">➜</span>
                                    <span className="text-blue-400">~</span>
                                    <span className="text-white">./start_learning.sh</span>
                                </div>
                                <div className="mt-4 text-gray-400">
                                    {">"} Initializing logical thinking modules...<br />
                                    {">"} Loading Python fundamentals [<span className="text-green-400">OK</span>]<br />
                                    {">"} Preparing JavaScript environments [<span className="text-green-400">OK</span>]<br />
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="text-red-500 font-bold">Error 404:</span> Excuses not found.
                                </div>
                                <div className="mt-2 text-white animate-pulse">
                                    _
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    )
}
