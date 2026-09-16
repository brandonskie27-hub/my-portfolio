import { ArrowUpRight } from "lucide-react"
import { HeroGrid } from "@/components/hero-grid"
import { ResumeLink } from "@/components/resume-link"
import { cn } from "@/lib/utils"

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/brandonskie27-hub" },
]

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh w-full items-center overflow-hidden pt-24 pb-20"
    >
      <HeroGrid />
      {/* Fades the grid into the page background at the top (clears the
          floating navbar) and bottom (softens into the next section)
          instead of the pattern cutting off abruptly at the section edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-1 h-32 bg-linear-to-b from-background to-transparent sm:h-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-40 bg-linear-to-t from-background to-transparent sm:h-56"
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Brandon Dylan Narito
          </h1>

          <div className="mt-6 flex flex-col gap-4">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              I&apos;m a full-stack developer who builds clean, functional web
              applications, from backend logic to pixel-considered interfaces.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Right now, I&apos;m open to OJT and full-time opportunities, as
              well as freelance work. Feel free to reach out if you&apos;re
              looking to collaborate.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ResumeLink className="px-5 py-2.5 text-sm" />
            <a
              href="#contact"
              className={cn(
                "rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted",
                focusRing
              )}
            >
              Get in Touch
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
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
        </div>
      </div>
    </section>
  )
}
