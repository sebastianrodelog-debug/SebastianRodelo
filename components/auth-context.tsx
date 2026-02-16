"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

interface AuthContextType {
    user: User | null
    isAdmin: boolean
    signIn: () => Promise<void>
    logout: () => Promise<void>
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAdmin: false,
    signIn: async () => { },
    logout: async () => { },
    loading: true,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Explicitly check for the admin email provided by the user
    const isAdmin = user?.email === "sebastianrodelog@gmail.com" || user?.email === "sebastianrodelog@gamil.com"

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const signIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error("Error signing in with Google", error)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Error signing out", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAdmin, signIn, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
