import { projects } from "@/lib/data"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { ProjectGallery } from "@/components/project-gallery"

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id.toString(),
    }))
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const project = projects.find((p) => p.id === Number(id))

    if (!project) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="fixed top-6 left-6 z-50">
                <Link href="/#projects">
                    <Button variant="outline" size="icon" className="rounded-full">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            <div className="min-h-screen flex items-center justify-center p-6 md:p-12">
                <div
                    className={`w-full max-w-5xl rounded-xl bg-gradient-to-b ${project.color} border border-border p-8 md:p-12 mt-16 md:mt-0`}
                >
                    <span className="text-xs text-primary font-medium tracking-widest uppercase">
                        Proyecto
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-8">
                        {project.title}
                    </h1>

                    <div className="space-y-12">
                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                                Descripcion
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Main Image */}
                        <ProjectGallery
                            title={project.title}
                            image={(project as any).image}
                        />

                        {/* Video Section if available */}
                        {(project as any).video && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                                    Demo en Video
                                </h3>
                                <div className="rounded-lg overflow-hidden border border-border/50 bg-black shadow-2xl">
                                    <video
                                        controls
                                        className="w-full h-auto"
                                        src={(project as any).video}
                                    >
                                        Tu navegador no soporta el tag de video.
                                    </video>
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                                    El Problema
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {project.problem}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                                    La Solucion
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {project.solution}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                                Tecnologias
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 text-sm font-medium rounded-md bg-secondary text-foreground border border-border"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border/50">
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Ver Demo
                            </a>

                        </div>

                        {/* Gallery Grid */}
                        <ProjectGallery
                            title={project.title}
                            gallery={(project as any).gallery}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
