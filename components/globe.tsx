"use client"

import { useEffect, useRef, useState } from "react"
import Globe, { GlobeMethods } from "react-globe.gl"
import { useTheme } from "next-themes"

export default function GlobeComponent() {
    const globeRef = useRef<GlobeMethods | undefined>(undefined)
    const [mounted, setMounted] = useState(false)
    const [currentTime, setCurrentTime] = useState("")
    const [isNight, setIsNight] = useState(true)

    useEffect(() => {
        setMounted(true)

        // Calculate time in Barranquilla (UTC-5)
        const updateTime = () => {
            const now = new Date()
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "America/Bogota",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
            const timeString = new Intl.DateTimeFormat("en-US", options).format(now)
            setCurrentTime(timeString)

            // Determine if it's night (6 PM to 6 AM)
            const hour = parseInt(new Intl.DateTimeFormat("en-US", {
                timeZone: "America/Bogota",
                hour: "numeric",
                hour12: false,
            }).format(now))

            setIsNight(hour < 6 || hour >= 18)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)

        // Initial position
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = false
            globeRef.current.controls().autoRotateSpeed = 0.3
            globeRef.current.pointOfView({ lat: 7.0, lng: -77.0, altitude: 3.5 })
        }

        return () => clearInterval(interval)
    }, [])

    if (!mounted) return <div className="w-full h-full bg-transparent animate-pulse rounded-2xl" />

    // Barranquilla coordinates
    const markers = [
        {
            id: 'barranquilla',
            city: 'Barranquilla',
            color: '#00EA86',
            coordinates: [7.0, -77.0],
            value: 100,
        },
    ]

    return (
        <div className="w-full h-full cursor-move relative flex items-center justify-center overflow-hidden bg-transparent rounded-2xl relative">
            {/* Clock Overlay */}
            <div className="absolute top-4 z-20 bg-background/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg pointer-events-none">
                <div className="relative">
                    <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground leading-none mb-0.5">Barranquilla</span>
                    <span className="text-sm font-mono font-bold text-foreground leading-none">{currentTime}</span>
                </div>
            </div>

            <Globe
                ref={globeRef}
                width={500}
                height={500}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl={isNight ? "//unpkg.com/three-globe/example/img/earth-night.jpg" : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"}
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                pointsData={markers}
                pointLat={d => (d as any).coordinates[0]}
                pointLng={d => (d as any).coordinates[1]}
                pointColor={d => (d as any).color}
                pointAltitude={0.1}
                pointRadius={0.5}
                pointsMerge={true}
                atmosphereColor={isNight ? "#00EA86" : "#4299E1"} // Green atmosphere for night, Blue for day
                atmosphereAltitude={0.15}
                onGlobeReady={() => {
                    if (globeRef.current) {
                        globeRef.current.pointOfView({ lat: 7.0, lng: -77.0, altitude: 2 }, 2000)
                    }
                }}
                htmlElementsData={markers}
                htmlLat={d => (d as any).coordinates[0]}
                htmlLng={d => (d as any).coordinates[1]}
                htmlElement={d => {
                    const el = document.createElement('div');
                    el.innerHTML = `
              <div style="color: white; font-family: sans-serif; text-align: center; transform: translate(-50%, -100%); margin-bottom: 10px;">
                <div style="font-weight: bold; font-size: 14px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">${(d as any).city}</div>
              </div>
            `;
                    return el;
                }}
            />
        </div>
    )
}
