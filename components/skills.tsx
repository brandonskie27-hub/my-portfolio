type SkillGroup = {
  label: string
  items: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "PHP", "SQL"] },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS"],
  },
  { label: "Backend & Data", items: ["Supabase", "PostgreSQL", "MySQL"] },
]

function SkillPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border/70 px-3 py-1.5 text-sm text-foreground">
      {label}
    </span>
  )
}

export function Skills() {
  return (
    <section id="skills" className="w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Skills
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillPill key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
