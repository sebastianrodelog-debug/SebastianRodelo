import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sebastian-rodelo.vercel.app'), // Vercel URL
  title: 'Sebastian Rodelo | Junior Full Stack Developer',
  description: 'Portafolio Web Profesional de Sebastian Rodelo. Junior Developer especializado en experiencias digitales impactantes.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Portfolio', 'Web Development'],
  authors: [{ name: 'Sebastian Rodelo' }],
  creator: 'Sebastian Rodelo',
  openGraph: {
    title: 'Sebastian Rodelo | Junior Full Stack Developer',
    description: 'Portafolio Web Profesional. Experiencias digitales de alto impacto.',
    url: 'https://sebastian-rodelo.vercel.app', // Vercel URL
    siteName: 'Sebastian Rodelo Portfolio',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastian Rodelo | Junior Full Stack Developer',
    description: 'Portafolio Web Profesional. Experiencias digitales de alto impacto.',
    creator: '@sebastianrodelo', // Placeholder
  },
  icons: {
    icon: '/portfolio-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

import { ScrollObserver } from '@/components/scroll-observer'
import { AuthProvider } from '@/components/auth-context'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <AuthProvider>
          <ScrollObserver />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
