"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

import emailjs from "@emailjs/browser"
import dynamic from "next/dynamic"

const Globe = dynamic(() => import("@/components/globe"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-card/20 animate-pulse rounded-2xl flex items-center justify-center text-muted-foreground text-sm">Cargando Mundo...</div>
})

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // EmailJS Configuration
    const serviceId = "service_555hyod"
    const templateId = "template_4xji3be" // Updated ID
    const publicKey = "Y4-zs_lLSF27wMcNN"

    try {
      // 1. Send Email via EmailJS
      await emailjs.send(serviceId, templateId, {
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
        to_name: "Sebastian Rodelo",
      }, publicKey)

      // 2. Save to Firestore (Keep existing logic)
      await addDoc(collection(db, "contacts"), {
        ...formState,
        createdAt: serverTimestamp(),
      })

      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error submitting contact form", error)
      alert("Hubo un error enviando el mensaje. Por favor intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-primary font-medium tracking-widest uppercase">Contacto</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Hablemos</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Tienes un proyecto en mente? Escribeme.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6 bg-card/30 p-8 rounded-2xl border border-border/50 backdrop-blur-sm"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                placeholder="Cuentame sobre tu proyecto..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {submitted ? (
                <span>Mensaje enviado</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>

            <div className="w-full mt-8 rounded-xl overflow-hidden border border-border/50 shadow-sm">
              <video
                src="/AboutMultimedia/Pixel_Art_Animation_Generation_Request.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>


          </motion.form>

          {/* Right Column: Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Direct Contact Buttons */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                Contacto Directo
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href="https://wa.me/573023814958"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  {/* WhatsApp Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  WhatsApp
                </a>
                <a
                  href="mailto:sebastianrodelog@gmail.com"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-red-500 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  Enviar Email
                </a>
                <a
                  href="https://www.linkedin.com/in/sebastian-rodelo-139696266/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#0077b5] text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                Sigueme
              </h3>
              <div className="flex gap-4">
                {/* X (Twitter) */}
                <a href="https://x.com/RIDER_00000" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/share/1Hy9amACAW/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/sebas_dev69?igsh=M3RpZjdlcXM3czQ3" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@sebastian.rodelo5?_r=1&_t=ZS-93xN16K3uX1" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-black hover:bg-black/80 transition-colors" aria-label="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Location & Map */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-secondary text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Ubicacion</h3>
                  <p className="text-muted-foreground">Barranquilla, Colombia</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg h-[300px] w-full relative bg-black/20">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute flex items-center justify-center inset-0 z-0">
                  <Globe />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
