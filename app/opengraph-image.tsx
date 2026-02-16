import { ImageResponse } from 'next/og'
import { join } from 'path'
import { readFileSync } from 'fs'

export const runtime = 'nodejs'

export const alt = 'Sebastian Rodelo - Full Stack Developer'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    // Font loading (using fetch for edge compatibility if needed, or system fonts)
    // For simplicity in this environment, we'll try to use a standard font stack or load from a CDN if possible.
    // Since local file access in edge runtime can be tricky without proper setup, we'll use a robust fallback.

    // Loading the background image from the public folder
    // Note: In Next.js OG, initializing with a URL is often easiest.
    // We'll assume the site is deployed or running locally.
    // For local development, we can try to fetch, but here we might need a direct URL or base64.
    // Since we are in a specific environment, we will use a solid background with the image if we can't easily resolve the public URL at build time without a deployment URL.
    // However, we can use an absolute URL if we know it, or try to construct one.
    // A safer bet for this specific tool environment is to use a high-quality solid design if the image load fails, or try to load it.

    // Let's try to simulate the design requested.
    // "Color negro personalizado en las lineas" might mean a border or specific styling.

    const imagePath = join(process.cwd(), 'public', 'og-bg.png')
    const fileBuffer = readFileSync(imagePath)
    const base64Image = `data:image/png;base64,${fileBuffer.toString('base64')}`

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0a0a0a',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={base64Image}
                    alt="Background"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.4, // Darken it to make text pop
                    }}
                />

                {/* Decorative Lines "Color negro personalizado en las lineas" */}
                <div
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        right: 20,
                        bottom: 20,
                        border: '2px solid rgba(0,0,0,0.5)',
                        zIndex: 10,
                        pointerEvents: 'none',
                    }}
                />

                {/* Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 20,
                        textAlign: 'center',
                        textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 600,
                            color: '#ef4444', // Primary Red
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: 10,
                            background: 'rgba(0,0,0,0.6)',
                            padding: '4px 12px',
                            borderRadius: 4,
                        }}
                    >
                        Portafolio Web Profesional
                    </div>

                    <div
                        style={{
                            fontSize: 84,
                            fontWeight: 900,
                            color: 'white',
                            lineHeight: 1,
                            marginBottom: 10,
                        }}
                    >
                        Sebastian Rodelo
                    </div>

                    <div
                        style={{
                            fontSize: 42,
                            fontWeight: 700,
                            color: '#ef4444',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Junior Developer
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
