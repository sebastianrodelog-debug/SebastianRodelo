export const projects = [
  {
    id: 1,
    title: "StudyFlow",
    stack: ["React", "Next.js", "Tailwind CSS", "PostgreSQL", "Vercel"],
    description:
      "Plataforma integral para la gestion y organizacion academica de estudiantes. Centraliza horarios, tareas y material de estudio.",
    problem:
      "Los estudiantes pierden el control de sus horarios, tareas y material de estudio al tenerlos dispersos en multiples plataformas fisicas y digitales.",
    solution:
      "Cree una aplicacion web unificada que permite gestionar horarios de clase, listas de tareas, planes de estudio y videos educativos en un solo lugar.",
    color: "from-indigo-950/50 to-background",
    demo: "https://study-flow-teal.vercel.app/login",
    repo: "#",
    video: "/studyFlowMedia/studyFlow.mp4",
    image: "/studyFlowMedia/og-image.svg",
    gallery: [
      "/studyFlowMedia/Captura de pantalla 2026-02-15 054538.png",
      "/studyFlowMedia/Captura de pantalla 2026-02-15 054614.png",
      "/studyFlowMedia/Captura de pantalla 2026-02-15 055415.png",
      "/studyFlowMedia/Captura de pantalla 2026-02-15 055715.png",
      "/studyFlowMedia/Captura de pantalla 2026-02-15 060502.png",
    ]
  },
  {
    id: 2,
    title: "LifeSync",
    stack: ["React", "Firebase", "Node.js", "Tailwind CSS", "Vercel"],
    description:
      "Aplicacion para la sincronizacion de estilo de vida, salud y productividad. Permite a los usuarios llevar un registro de sus habitos y metas diarias.",
    problem:
      "Las personas tienen dificultades para mantener habitos saludables y productivos debido a la falta de seguimiento y motivacion.",
    solution:
      "Desarrolle una plataforma que gamifica el seguimiento de habitos y ofrece analisis detallados del progreso personal.",
    color: "from-cyan-950/50 to-background",
    demo: "https://life-sync-cyan.vercel.app/login",
    repo: "#",
    video: "/LifeSyncMedia/LifeSync.mp4",
    image: "/LifeSyncMedia/og-image.svg",
    gallery: [
      "/LifeSyncMedia/Captura de pantalla 2026-02-15 062151.png",
      "/LifeSyncMedia/Captura de pantalla 2026-02-15 062230.png",
      "/LifeSyncMedia/Captura de pantalla 2026-02-15 062321.png",
      "/LifeSyncMedia/Captura de pantalla 2026-02-15 062503.png",
      "/LifeSyncMedia/Captura de pantalla 2026-02-15 062723.png",
    ]
  },
  {
    id: 3,
    title: "GlobalSpeak",
    stack: ["Vue.js", "Firebase", "Tailwind CSS", "Vercel"],
    description:
      "Plataforma de chat en tiempo real diseñada para conectar personas globalmente. Desafiamos los limites de Firebase Realtime Database para ofrecer mensajeria instantanea fluida.",
    problem:
      "Las aplicaciones de chat tradicionales a menudo sufren de latencia o complejidad innecesaria para conexiones rapidas.",
    solution:
      "Implementamos una arquitectura optimizada sobre Firebase para garantizar la entrega de mensajes en milisegundos y una experiencia de usuario intuitiva.",
    color: "from-purple-950/50 to-background",
    demo: "https://speak-global-rouge.vercel.app/",
    repo: "#",
    video: "/GlobalSpeackMedia/Grabación de pantalla 2026-02-15 064105.mp4",
    image: "/GlobalSpeackMedia/og-image.svg",
    gallery: [
      "/GlobalSpeackMedia/Captura de pantalla 2026-02-15 064141.png",
      "/GlobalSpeackMedia/Captura de pantalla 2026-02-15 064231.png",
      "/GlobalSpeackMedia/Captura de pantalla 2026-02-15 064255.png",
    ]
  },
  {
    id: 4,
    title: "ServiScore",
    stack: ["React", "Next.js", "Tailwind CSS", "Firebase", "Vercel"],
    description: "Conectando emprendedores. Plataforma para conectar servicios y calificaciones confiables.",
    problem: "La falta de confianza y visibilidad para nuevos emprendedores limita su crecimiento.",
    solution: "Una plataforma centralizada donde los usuarios pueden calificar y descubrir servicios locales verificados.",
    color: "from-zinc-900 to-zinc-950", // Dark gray gradient
    demo: "https://servi-score.vercel.app/landingPage",
    repo: "#",
    video: "/serviscoreMedia/Grabación 2026-02-16 142206.mp4",
    image: "/serviscore-cover.svg",
    gallery: [
      "/serviscoreMedia/Captura de pantalla 2026-02-16 142242.png",
      "/serviscoreMedia/Captura de pantalla 2026-02-16 142257.png",
      "/serviscoreMedia/Captura de pantalla 2026-02-16 142328.png",
      "/serviscoreMedia/Captura de pantalla 2026-02-16 142355.png",
    ]
  },
  {
    id: 5,
    title: "Ver más proyectos",
    stack: ["GitHub", "Open Source"],
    description: "Explora el resto de mi portafolio y contribuciones en mi perfil de GitHub.",
    problem: "",
    solution: "",
    color: "from-neutral-900 to-black",
    demo: "https://github.com", // Linking to GitHub
    repo: "https://github.com",
    image: "/portfolio-icon.png", // Using a generic icon or profile image
    gallery: []
  },
]

export interface Skill {
  name: string
  icon: string
}

export const technologies: Skill[] = [
  { name: "React", icon: "react" },
  { name: "Vue.js", icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Python", icon: "python" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "GraphQL", icon: "graphql" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Firebase", icon: "firebase" },
  { name: "Vercel", icon: "vercel" },
  { name: "Express", icon: "express" },
  { name: "Solar2D", icon: "https://upload.wikimedia.org/wikipedia/commons/3/30/Solar2D_Logo.png" }, // Placeholder for Lua/Solar2D if needed
]

export const tools: Skill[] = [
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
  { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Figma", icon: "figma" },
  { name: "VS Code", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
  { name: "Terminal", icon: "lucide-terminal" },
  { name: "npm", icon: "npm" },
  { name: "Linux", icon: "linux" },
]

export const allSkills = [...technologies, ...tools]
