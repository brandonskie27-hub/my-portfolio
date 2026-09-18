import type { IconType } from "react-icons"
import { TbTag } from "react-icons/tb"
import {
  SiAndroidstudio,
  SiClaude,
  SiFirebase,
  SiFlutter,
  SiJavascript,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import { Reveal } from "@/components/reveal"
import { StaggerGroup, StaggerItem } from "@/components/stagger"
import { cn } from "@/lib/utils"

type Skill = {
  label: string
  icon: IconType
  /** Brand hex color, e.g. "#61DAFB". Omit for icons with no real brand hue
   *  (a generic fallback glyph, or a brand like Next.js that is itself
   *  monochrome) - those fall back to a theme-neutral tint instead. */
  brandColor?: string
}

type SkillGroup = {
  label: string
  skills: Skill[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { label: "TypeScript", icon: SiTypescript, brandColor: "#3178C6" },
      { label: "JavaScript", icon: SiJavascript, brandColor: "#F7DF1E" },
      { label: "Kotlin", icon: SiKotlin, brandColor: "#7F52FF" },
      { label: "PHP", icon: SiPhp, brandColor: "#777BB4" },
      { label: "SQL", icon: TbTag },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { label: "React", icon: SiReact, brandColor: "#61DAFB" },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "React Native", icon: SiReact, brandColor: "#61DAFB" },
      { label: "Flutter", icon: SiFlutter, brandColor: "#02569C" },
      { label: "Tailwind CSS", icon: SiTailwindcss, brandColor: "#38BDF8" },
      { label: "Android Studio", icon: SiAndroidstudio, brandColor: "#3DDC84" },
      { label: "Claude Code", icon: SiClaude, brandColor: "#D97757" },
    ],
  },
  {
    label: "Backend & Data",
    skills: [
      { label: "Firebase", icon: SiFirebase, brandColor: "#FFCA28" },
      { label: "Supabase", icon: SiSupabase, brandColor: "#3ECF8E" },
      { label: "PostgreSQL", icon: SiPostgresql, brandColor: "#4169E1" },
      { label: "MySQL", icon: SiMysql, brandColor: "#00758F" },
    ],
  },
]

function SkillPill({ label, icon: Icon, brandColor }: Skill) {
  return (
    <span
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border/70 py-1.5 pr-3.5 pl-1.5 text-sm text-foreground/90 transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-foreground/40 hover:text-foreground hover:shadow-sm"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full",
          !brandColor && "bg-foreground/10"
        )}
        style={brandColor ? { backgroundColor: `${brandColor}1f` } : undefined}
      >
        <Icon className="size-3.5 text-foreground/75 transition-colors duration-200 group-hover:text-foreground" />
      </span>
      {label}
    </span>
  )
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <div className="flex h-full flex-col gap-5 rounded-3xl border border-border/60 bg-card p-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {group.label}
        </h3>
        <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-foreground/70" />
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillPill key={skill.label} {...skill} />
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="w-full py-24 sm:py-32">
      <Reveal className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Skills
        </h2>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <StaggerItem key={group.label} className="h-full">
              <SkillGroupCard group={group} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Reveal>
    </section>
  )
}
