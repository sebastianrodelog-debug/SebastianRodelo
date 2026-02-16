"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { db } from "@/lib/firebase"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, User } from "lucide-react"

interface Comment {
    id: string
    text: string
    userId: string
    userName: string
    userImage: string
    createdAt: any
}

export function Comments() {
    const { user, isAdmin, signIn, logout } = useAuth()
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        const q = query(collection(db, "comments"), orderBy("createdAt", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const comms = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Comment[]
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
                createdAt: serverTimestamp(),
            })
            setNewComment("")
        } catch (error) {
            console.error("Error adding comment: ", error)
        }
    }

    const handleDelete = async (id: string) => {
        if (!isAdmin) return
        if (confirm("¿Estás seguro de borrar este comentario?")) {
            await deleteDoc(doc(db, "comments", id))
        }
    }

    return (
        <section id="comments" className="py-24 relative overflow-hidden">
            <div className="mx-auto max-w-3xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-display text-3xl font-bold mb-4">Muro de Comentarios</h2>
                    <p className="text-muted-foreground">Deja tu huella en mi portafolio.</p>
                </motion.div>

                {/* Input Area */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 mb-12">
                    {!user ? (
                        <div className="text-center py-6">
                            <p className="mb-4 text-muted-foreground">Inicia sesión con Google para comentar</p>
                            <button
                                onClick={signIn}
                                className="flex items-center justify-center gap-2 mx-auto bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                            >
                                {/* Google SVG */}
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                Iniciar Sesión con Google
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <User className="w-8 h-8 rounded-full bg-secondary p-1" />
                                    )}
                                    <span className="text-sm font-medium">{user.displayName}</span>
                                </div>
                                <button onClick={logout} type="button" className="text-xs text-red-400 hover:text-red-300">Cerrar Sesión</button>
                            </div>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Escribe un comentario..."
                                className="w-full bg-background border border-border rounded-lg p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={!newComment.trim()}
                                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Publicar
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {comments.map((comment) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-secondary/30 border border-border/50 rounded-xl p-4 flex gap-4 group"
                            >
                                <div className="relative shrink-0">
                                    {comment.userImage ? (
                                        <img src={comment.userImage} alt={comment.userName} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span className="text-primary font-bold">{comment.userName[0]}</span>
                                        </div>
                                    )}
                                    {/* Google Logo Badge */}
                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                        <svg className="w-3 h-3" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-sm">{comment.userName}</h4>
                                        <span className="text-xs text-muted-foreground">
                                            {comment.createdAt?.seconds
                                                ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString()
                                                : "Hace un momento"}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{comment.text}</p>
                                </div>
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Borrar comentario"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {comments.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">Sé el primero en comentar ✨</p>
                    )}
                </div>
            </div>
        </section>
    )
}
