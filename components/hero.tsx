"use client"

import { motion } from "framer-motion"

import Link from "next/link"
import ScrollFloat from '@/components/scroll-float';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Subtle red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
      />

      <div className="relative text-center">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 relative w-40 h-40 md:w-52 md:h-52"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
              <img
                src="/hero-avatar.png"
                alt="Avatar"
                className="w-full h-full object-contain drop-shadow-2xl animate-bounce-slow"
              />
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ScrollFloat
                animationDuration={0.6}
                ease='back.inOut(2)'
                scrollStart='top bottom+=10%'
                scrollEnd='bottom top+=15%'
                stagger={0.01}
                containerClassName="mb-4"
                textClassName="text-sm md:text-base font-semibold tracking-widest text-primary uppercase"
              >
                Hola, soy
              </ScrollFloat>

              <Link
                href="/about"
                className="group cursor-pointer bg-transparent border-none outline-none inline-block decoration-0 select-none"
                aria-label="Conocer mas sobre Sebastian Rodelo"
              >
                <ScrollFloat
                  animationDuration={0.6}
                  ease='back.inOut(2)'
                  scrollStart='top bottom+=10%'
                  scrollEnd='bottom top+=15%'
                  stagger={0.02}
                  textClassName="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary mb-6"
                >
                  Sebastian Rodelo
                </ScrollFloat>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <ScrollFloat
            animationDuration={0.5}
            ease='back.inOut(2)'
            scrollStart='top bottom+=10%'
            scrollEnd='bottom top+=15%'
            stagger={0.01}
            textClassName="text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase font-light"
          >
            Full Stack Developer
          </ScrollFloat>

          <Link
            href="https://atomiclabs.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <ScrollFloat
              animationDuration={0.5}
              ease='back.inOut(2)'
              scrollStart='top bottom+=10%'
              scrollEnd='bottom top+=15%'
              stagger={0.01}
              textClassName="text-sm md:text-base font-medium tracking-[0.2em] text-primary group-hover:text-foreground transition-colors duration-300 border-b border-primary/30 group-hover:border-foreground pb-1"
            >
              CEO AtomicaLabs
            </ScrollFloat>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Click en mi nombre</span>
            <div className="w-px h-8 bg-muted-foreground/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
