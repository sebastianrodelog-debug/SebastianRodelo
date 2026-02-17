"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion" // Added AnimatePresence
import { useAuth } from "@/components/auth-context"
import { db } from "@/lib/firebase"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Star } from "lucide-react"
import { ViewCounter } from "@/components/view-counter"

interface Testimonial {
  id: string
  text: string
  userName: string
  userImage: string
  userId: string
  rating?: number
}

function TestimonialCard({ comment, isAdmin, onDelete }: { comment: Testimonial; isAdmin: boolean; onDelete: (id: string) => void }) {
  return (
    <div className="relative group flex-shrink-0 w-72 md:w-96 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-start gap-3 mb-4">
        {comment.userImage ? (
          <img
            src={comment.userImage}
            alt={comment.userName}
            className="w-10 h-10 rounded-full object-cover border border-border"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-border">
            <span className="text-primary font-bold text-sm">{comment.userName[0]}</span>
          </div>
        )}
        <div>
          <p className="text-foreground text-sm font-semibold">{comment.userName}</p>
          {/* Star Rating Display */}
          <div className="flex gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${(comment.rating || 5) >= star ? "fill-primary text-primary" : "fill-muted text-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>

        {/* Google Badge */}
        <div className="ml-auto bg-white rounded-full p-1 shadow-sm h-6 w-6 flex items-center justify-center shrink-0" title="Verificado con Google">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" className="w-full h-full">
            <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
            <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.516 21.3 7.565 24 12.255 24z" />
            <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z" />
            <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
          </svg>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed italic">{`"${comment.text}"`}</p>

      {isAdmin && (
        <button
          onClick={() => onDelete(comment.id)}
          className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-card shadow-sm rounded-md z-10"
          title="Borrar testimonio"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

function TestimonialRow({ testimonials, direction, isAdmin, onDelete }: { testimonials: Testimonial[]; direction: "left" | "right"; isAdmin: boolean; onDelete: (id: string) => void }) {
  // Ensure we have enough items to scroll smoothly. If few items, repeat them more.
  const items = testimonials.length > 0 ? [...testimonials, ...testimonials, ...testimonials, ...testimonials] : []
  const animClass = direction === "left" ? "animate-scroll-left-slow" : "animate-scroll-right-slow"

  if (testimonials.length === 0) return null;

  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-background to-transparent" />
      <div className={`flex gap-6 ${animClass}`} style={{ width: 'max-content' }}>
        {items.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} comment={t} isAdmin={isAdmin} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  const { user, isAdmin, signIn, logout } = useAuth()
  const [comments, setComments] = useState<Testimonial[]>([])
  const [newComment, setNewComment] = useState("")
  const [rating, setRating] = useState(5)

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Testimonial[]
      setComments(comms)
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    try {
      await addDoc(collection(db, "comments"), {
        text: newComment,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userImage: user.photoURL || "",
        rating: rating,
        createdAt: serverTimestamp(),
      })
      setNewComment("")
      setRating(5)
    } catch (error) {
      console.error("Error adding comment: ", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!isAdmin) return
    if (confirm("¿Estás seguro de borrar este testimonio?")) {
      await deleteDoc(doc(db, "comments", id))
    }
  }

  // Distribute comments into 4 rows
  const rows: Testimonial[][] = [[], [], [], []]

  comments.forEach((comment, index) => {
    if (index < 40) {
      // First 40 comments: ordered 10 per row
      // 0-9 -> Row 0, 10-19 -> Row 1, etc.
      const rowIndex = Math.floor(index / 10)
      if (rowIndex < 4) {
        rows[rowIndex].push(comment)
      }
    } else {
      // Remaining comments: distributed deterministically (round-robin) to simulate randomness
      // using char code of ID to be deterministic but "random-looking" or just simple index mod
      // User asked for "randomly", but for SSR/Hydration stability we use deterministic distribution.
      // Let's use index % 4 for even distribution.
      rows[index % 4].push(comment)
    }
  })

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      {/* Real-time View Counter */}
      <ViewCounter />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 px-6"
      >
        <span className="text-xs text-primary font-medium tracking-widest uppercase">Opiniones</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Testimonios</h2>
        <p className="text-muted-foreground mt-4">Lo que dicen sobre trabajar conmigo</p>
      </motion.div>

      {/* Input Area */}
      <div className="mx-auto max-w-lg px-6 mb-20">
        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
          {!user ? (
            <div className="text-center py-6">
              <p className="mb-6 text-muted-foreground">Únete y deja tu valoración.</p>
              <Button
                onClick={signIn}
                variant="outline"
                className="w-full gap-2 h-12 text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" className="w-5 h-5">
                  <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
                  <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.516 21.3 7.565 24 12.255 24z" />
                  <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z" />
                  <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
                </svg>
                Continuar con Google
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full border border-border"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">{user.displayName ? user.displayName[0] : "U"}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-semibold block leading-none mb-1">{user.displayName}</span>
                    <button onClick={logout} type="button" className="text-xs text-muted-foreground hover:text-red-400 transition-colors">Cerrar sesión</button>
                  </div>
                </div>

                {/* Star Rating Input */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-5 h-5 ${rating >= star ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Comparte tu experiencia..."
                className="bg-background/50 border-muted placeholder:text-muted-foreground/50 min-h-[100px] resize-none focus-visible:ring-primary"
              />
              <Button type="submit" disabled={!newComment.trim()} className="w-full font-semibold">
                Publicar Testimonio
              </Button>
            </form>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        {comments.length > 0 ? (
          <>
            {rows[0].length > 0 && <TestimonialRow testimonials={rows[0]} direction="right" isAdmin={isAdmin} onDelete={handleDelete} />}
            {rows[1].length > 0 && <TestimonialRow testimonials={rows[1]} direction="left" isAdmin={isAdmin} onDelete={handleDelete} />}
            {rows[2].length > 0 && <TestimonialRow testimonials={rows[2]} direction="right" isAdmin={isAdmin} onDelete={handleDelete} />}
            {rows[3].length > 0 && <TestimonialRow testimonials={rows[3]} direction="left" isAdmin={isAdmin} onDelete={handleDelete} />}
          </>
        ) : (
          <div className="text-center py-12 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Aún no hay testimonios. <br />¡Sé el primero en dejar una valoración de 5 estrellas! ⭐</p>
          </div>
        )}
      </motion.div>
    </section >
  )
}
