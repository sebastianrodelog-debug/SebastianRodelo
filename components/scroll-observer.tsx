"use client"

import { useScroll, useMotionValueEvent } from "framer-motion"

export function ScrollObserver() {
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        // Use a small threshold to avoid jitter
        if (Math.abs(latest - previous) < 5) return

        const direction = latest > previous ? "down" : "up"
        document.documentElement.setAttribute("data-scroll-direction", direction)
    })

    return null
}
