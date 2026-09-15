import { ArrowUpRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type ProjectLink = { label: string; href: string }

type Project = {
  title: string
  tagline: string
  description: string
  tech: string[]
  links: ProjectLink[]
}

const FEATURED_PROJECT: Project = {
  title: "Tapt",
  tagline:
    "An NFC-based attendance monitoring system built for a real Philippine public school.",
  description:
    "Thesis project consisting of a React Native (Expo) mobile app for teachers and school secretaries, plus a React admin web dashboard, sharing a Supabase (Postgres) backend. Built offline-first to handle real classroom conditions with no reliable internet, and designed through actual school site visits to match DepEd's official SF2 attendance compliance requirements.",
  tech: [
    "React Native",
    "Expo",
    "React",
    "Supabase",
    "PostgreSQL",
    "TypeScript",
  ],
  links: [
    { label: "View Case Study", href: "#" },
    { label: "GitHub", href: "#" },
  ],
}

const STANDARD_PROJECT: Project = {
  title: "E-Commerce Demo",
  tagline:
    "A school project e-commerce platform with real payment gateway integration.",
  description:
    "Built with vanilla PHP and MySQL, integrating PayMongo for payment processing (demo/sandbox mode).",
  tech: ["PHP", "MySQL", "PayMongo"],
  links: [
    { label: "View Details", href: "#" },
    { label: "GitHub", href: "#" },
  ],
}

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function TechTag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border/70 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground">
      {label}
    </span>
  )
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={cn(
            "group inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground",
            focusRing
          )}
        >
          {link.label}
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  )
}

function FeaturedProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 rounded-3xl border border-border/60 bg-card p-10 text-card-foreground transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:border-border hover:shadow-xl sm:p-12",
        className
      )}
    >
      <div aria-hidden="true" className="border-beam" />
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Featured
        </span>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="text-base text-muted-foreground sm:text-lg">
          {project.tagline}
        </p>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>

      <ProjectLinks links={project.links} />
    </div>
  )
}

function StandardProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card p-8 text-card-foreground transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:border-border hover:shadow-xl">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>

      <ProjectLinks links={project.links} />
    </div>
  )
}

function ComingSoonCard() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-border/60 p-8 text-center opacity-70 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-border hover:opacity-90">
      <Sparkles className="size-5 text-muted-foreground" aria-hidden="true" />
      <p className="text-sm text-muted-foreground">More projects coming soon</p>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Projects
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeaturedProjectCard
            project={FEATURED_PROJECT}
            className="sm:col-span-2 lg:col-span-3"
          />
          <StandardProjectCard project={STANDARD_PROJECT} />
          <ComingSoonCard />
          <ComingSoonCard />
        </div>
      </div>
    </section>
  )
}
