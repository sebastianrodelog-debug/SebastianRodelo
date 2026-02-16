"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Gamepad2, Music, Code2, Dumbbell } from "lucide-react"

const experience = [
  {
    year: "Ene 2023 - Actualidad",
    role: "Desarrollador Web Freelance",
    company: "Proyectos Independientes",
    description: "Desarrollo de soluciones a medida: e-commerce con Stripe, chatbots con Twilio/Chatbase y aplicaciones con Supabase. Gestión ágil con Asana.",
  },
  {
    year: "Dic 2023 - Dic 2024",
    role: "Desarrollador Frontend",
    company: "Cooweb",
    description: "Desarrollo de interfaces con Vue.js, integraciones con Firebase/Node.js y diseño de bots de atención con n8n. Optimización de UX/UI y trabajo en equipos ágiles.",
  },
]

const education = [
  {
    year: "2025 - Presente",
    title: "Desarrollador Web Junior",
    institution: "RIWI - Barranquilla",
  },
  {
    year: "Feb 2024 - Dic 2024",
    title: "Técnico Profesional en Computación",
    institution: "Institución Universitaria Americana",
  },
  {
    year: "Ene 2023 - Nov 2024",
    title: "Ingeniería de Sistemas (3 Semestres)",
    institution: "Universidad Autónoma del Caribe",
  },
]

const hobbies = [
  { icon: Gamepad2, label: "Gaming" },
  { icon: Music, label: "Musica" },
  { icon: Code2, label: "Open Source" },
  { icon: Dumbbell, label: "Fitness" },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 space-y-32 md:space-y-48">

        {/* Section 1: Intro (Image Left - Text Right) */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="flex justify-center md:justify-start">
            <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="/AboutMultimedia/sebastianrojocopi.png"
                alt="Sebastian Rojo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <span className="text-sm text-primary font-medium tracking-widest uppercase">Quien Soy</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground mt-4 mb-8">Sobre Mi</h2>
            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
              Desarrollador apasionado por crear experiencias digitales que combinan
              <span className="text-foreground font-medium"> rendimiento</span>,
              <span className="text-primary font-medium"> diseno</span> y
              <span className="text-foreground font-medium"> funcionalidad</span>.
              Creo en el codigo limpio y las interfaces que cuentan historias.
            </p>
          </motion.div>
        </div>

        {/* Section 2: Programmer Persona (Text Left - Video Right) */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-1">
            <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">El Codigo es Arte</h3>
            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed mb-8">
              Para mi, programar no es solo escribir lineas de texto, es crear mundos interactivos.
              Cada proyecto es un lienzo donde la logica y la creatividad se encuentran.
              Me especializo en construir arquitecturas escalables y UIs que se sienten vivas.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 text-base font-medium text-foreground bg-secondary px-6 py-3 rounded-full">
                <Code2 className="w-5 h-5 text-primary" />
                Clean Code
              </div>
              <div className="flex items-center gap-3 text-base font-medium text-foreground bg-secondary px-6 py-3 rounded-full">
                <Briefcase className="w-5 h-5 text-primary" />
                Problem Solver
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 w-full max-w-xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                src="/AboutMultimedia/Pixel_Art_Developer_Workspace_Animation.mp4"
              />
            </div>
          </motion.div>
        </div>

        {/* Section 3: Hobbies (Video Left - Text Right) */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="flex justify-center md:justify-start">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 w-full max-w-xl -rotate-2 hover:rotate-0 transition-transform duration-500">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                src="/AboutMultimedia/Animación_de_Pixel_Art_con_Victoria.mp4"
              />
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">Mas alla del Codigo</h3>
            <p className="text-muted-foreground text-xl md:text-2xl mb-10">
              Cuando no estoy programando, me encuentro explorando otras formas de creatividad y bienestar.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {hobbies.map((hobby, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border transition-colors hover:border-primary/50 group">
                  <hobby.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-lg text-foreground">{hobby.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section 4: Studies (Text Left - Video Right) */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-1">
            <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12">Formacion Continua</h3>
            <div className="relative border-l-2 border-border pl-12 space-y-12">
              {education.map((item, i) => (
                <div key={i} className="relative group">
                  <span className="absolute -left-[59px] w-7 h-7 rounded-full border-[5px] border-background bg-border group-hover:bg-primary transition-colors" />
                  <span className="text-sm text-primary font-bold tracking-wider uppercase block mb-2">{item.year}</span>
                  <h4 className="text-2xl font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-lg">{item.institution}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 w-full max-w-xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                src="/AboutMultimedia/Creación_de_Video_Pixel_Art_Animado.mp4"
              />
            </div>
          </motion.div>
        </div>

        {/* Section 5: Experience (Full Width with Decor) */}
        <div className="relative pt-12">
          {/* Decorative Background Image */}
          <div className="absolute top-0 right-0 -z-10 opacity-10 pointer-events-none translate-x-1/4">
            <img src="/AboutMultimedia/pixel art.png" alt="" className="w-96 md:w-[600px]" />
          </div>

          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground">Trayectoria Profesional</h3>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {experience.map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border-none bg-transparent shadow-none p-0">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-background bg-primary text-secondary shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-0 mt-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                      <h4 className="text-xl font-bold text-foreground">{item.role}</h4>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">{item.year}</span>
                    </div>
                    <p className="text-base font-semibold text-foreground mb-3">{item.company}</p>
                    <p className="text-muted-foreground text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
