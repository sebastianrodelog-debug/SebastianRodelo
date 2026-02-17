"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const name = "Sebastian Rodelo />"

  return (
    <footer className="border-t border-border py-12 md:py-20 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-12 items-center">

          {/* Left Side */}
          <div className="text-center md:text-left select-none">
            <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-foreground cursor-default whitespace-nowrap">
              {name.split("").map((char, index) => (
                <motion.span
                  key={index}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block hover:text-primary transition-colors duration-200"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
            <p className="text-primary font-bold text-lg md:text-2xl mt-4 tracking-[0.2em] uppercase">
              Full Stack Developer
            </p>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-end gap-8 text-center md:text-right">
            <div>
              <p className="text-xl md:text-3xl font-bold text-foreground/90 italic">
                "Si lo puedes soñar, lo puedes programar"
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Social Buttons */}
              <a
                href="https://github.com/MillerSebastian"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/sebastian-rodelo-139696266/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@sebastian.rodelo5?_r=1&_t=ZS-93xN16K3uX1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black hover:bg-black/80 transition-colors"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="mailto:sebastianrodelog@gmail.com"
                className="p-3 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-end gap-2 text-foreground font-semibold text-lg">
                <span>Hecho con el</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                </motion.div>
                <span>y mucho código</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {`\u00A9 ${new Date().getFullYear()} Sebastian Rodelo. Todos los derechos reservados.`}
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
