import type { Metadata } from "next"
import type { ComponentType, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { OfflineSyncDiagram } from "@/components/case-study/offline-sync-diagram"
import { StockFlowDiagram } from "@/components/case-study/stock-flow-diagram"
import {
  CASE_STUDIES,
  getCaseStudy,
  type CaseStudyDiagram,
  type CaseStudyImage,
} from "@/lib/case-studies"
import { cn } from "@/lib/utils"

const DIAGRAMS: Record<CaseStudyDiagram, ComponentType> = {
  "wholesale-ims-stock-flow": StockFlowDiagram,
  "tapt-offline-sync": OfflineSyncDiagram,
}

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export const dynamicParams = false

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  const title = `${study.title} case study | Brandon Dylan Narito`
  return {
    title,
    description: study.tagline,
    openGraph: { title, description: study.tagline, url: `/projects/${study.slug}` },
  }
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-foreground/50" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((text) => (
        <p key={text} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {text}
        </p>
      ))}
    </div>
  )
}

function Screenshot({ shot, sizes }: { shot: CaseStudyImage; sizes: string }) {
  return (
    <figure className="flex flex-col gap-3">
      <a
        href={shot.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full size: ${shot.alt}`}
        className={cn("block overflow-hidden rounded-2xl border border-border/60", focusRing)}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          className="h-auto w-full"
        />
      </a>
      {shot.caption && (
        <figcaption className="text-sm leading-relaxed text-muted-foreground">{shot.caption}</figcaption>
      )}
    </figure>
  )
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const Diagram = study.diagram ? DIAGRAMS[study.diagram.id] : null
  const wideShots = study.screenshots.filter((shot) => !shot.narrow)
  const narrowShots = study.screenshots.filter((shot) => shot.narrow)

  return (
    <main className="flex flex-1 flex-col">
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 pt-32 pb-24 sm:px-10 sm:pt-40 sm:pb-32">
        <header className="flex flex-col gap-8">
          <Link
            href="/#projects"
            className={cn(
              "group inline-flex w-fit items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground",
              focusRing
            )}
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            All projects
          </Link>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Case study
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {study.title}
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">{study.tagline}</p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border/60 py-6 sm:grid-cols-4">
            {study.meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-2">
            {study.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/70 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <Section title="The problem">
          <Paragraphs items={study.problem} />
          <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
            <p className="mb-4 text-sm font-semibold text-foreground">{study.asks.title}</p>
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {study.asks.items.map((ask, index) => (
                <li key={ask} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="font-mono text-xs text-foreground/60">{String(index + 1).padStart(2, "0")}</span>
                  {ask}
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section title="Constraints">
          <BulletList items={study.constraints} />
        </Section>

        <Section title="Key decisions">
          <ol className="flex flex-col gap-8">
            {study.decisions.map((decision, index) => (
              <li key={decision.title} className="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-2">
                <span className="pt-0.5 font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {decision.title}
                </h3>
                <p className="col-start-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {decision.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {study.diagram && Diagram && (
          <Section title={study.diagram.title}>
            <figure className="flex flex-col gap-4">
              <div className="rounded-3xl border border-border/60 bg-card p-5 sm:p-8">
                <Diagram />
              </div>
              <figcaption className="text-sm text-muted-foreground">{study.diagram.caption}</figcaption>
            </figure>
          </Section>
        )}

        {study.extraSections?.map((section) => (
          <Section key={section.title} title={section.title}>
            {section.intro && <Paragraphs items={[section.intro]} />}
            <BulletList items={section.bullets} />
          </Section>
        ))}

        {study.screenshots.length > 0 && (
          <Section title="Screens">
            {/* Wider than the text column on large screens so desktop shots stay readable. */}
            <div className="flex flex-col gap-12 lg:-mx-24">
              {wideShots.map((shot) => (
                <Screenshot key={shot.src} shot={shot} sizes="(min-width: 1024px) 960px, 100vw" />
              ))}
              {narrowShots.length > 0 && (
                <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-3">
                  {narrowShots.map((shot) => (
                    <Screenshot key={shot.src} shot={shot} sizes="(min-width: 640px) 320px, 100vw" />
                  ))}
                </div>
              )}
            </div>
          </Section>
        )}

        <Section title="What it does">
          <BulletList items={study.features} />
        </Section>

        <Section title="How it was built">
          <Paragraphs items={study.process} />
        </Section>
      </article>
    </main>
  )
}
