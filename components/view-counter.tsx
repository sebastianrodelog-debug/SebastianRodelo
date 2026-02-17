"use client"

import { useEffect, useState } from "react"
import { database } from "@/lib/firebase"
import { ref, onValue, push, onDisconnect, set, serverTimestamp } from "firebase/database"
import { Eye } from "lucide-react"

export function ViewCounter() {
    const [activeUsers, setActiveUsers] = useState(1) // Default to 1 (current user)

    useEffect(() => {
        // Reference to the special '.info/connected' path in Realtime Database
        const connectedRef = ref(database, ".info/connected")
        // Reference to the list of active connections
        const presenceListRef = ref(database, "presence")

        const unsubscribe = onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                // We're connected (or reconnected)!

                // Push a new reference to the presence list
                const myPresenceRef = push(presenceListRef)

                // When we disconnect, remove this reference
                onDisconnect(myPresenceRef).remove()

                // Set the value to true (or strictly, we could start with timestamp)
                set(myPresenceRef, {
                    joinedAt: serverTimestamp(),
                    device: navigator.userAgent
                })
            }
        })

        // Listen for changes in the presence list to count active users
        const unsubscribeCount = onValue(presenceListRef, (snap) => {
            if (snap.exists()) {
                setActiveUsers(snap.size)
            } else {
                setActiveUsers(0)
            }
        })

        return () => {
            unsubscribe()
            unsubscribeCount()
        }
    }, [])

    return (
        <div className="absolute top-4 right-6 md:top-8 md:right-12 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border shadow-sm">
            <div className="relative flex items-center justify-center w-5 h-5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                <div className="bg-background rounded-full p-0.5 relative z-10">
                    <Eye className="w-4 h-4 text-green-500" />
                </div>
            </div>
            <span className="text-xs font-mono font-medium text-foreground">
                {activeUsers} <span className="hidden sm:inline">viendo ahora</span>
            </span>
        </div>
    )
}
