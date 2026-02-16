"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { About } from "@/components/about"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="fixed top-6 left-6 z-50">
                <Link href="/">
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            <About />
        </div>
    )
}
