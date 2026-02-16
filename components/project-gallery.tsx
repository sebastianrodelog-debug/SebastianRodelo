"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectGalleryProps {
    image?: string
    title: string
    gallery?: string[]
}

export function ProjectGallery({ image, title, gallery }: ProjectGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <>
            {/* Main Image */}
            {image && (
                <div
                    className="mb-12 rounded-lg overflow-hidden border border-border/50 shadow-2xl cursor-pointer group relative"
                    onClick={() => setSelectedImage(image)}
                >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10 flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 drop-shadow-md" />
                    </div>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}

            {/* Gallery Grid */}
            {gallery && gallery.length > 0 && (
                <div className="mt-12">
                    <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                        Galeria
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {gallery.map((img, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
                                onClick={() => setSelectedImage(img)}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10 flex items-center justify-center">
                                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 drop-shadow-md" />
                                </div>
                                <img
                                    src={img}
                                    alt={`Captura ${idx + 1}`}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-7xl max-h-[90vh] w-full h-auto rounded-xl overflow-hidden shadow-2xl bg-transparent flex items-center justify-center"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="h-6 w-6" />
                            </Button>

                            <img
                                src={selectedImage}
                                alt="Vista previa"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
