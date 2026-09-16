type ExperienceEntry = {
  title: string
  place: string
  period: string
  description: string
}

const ENTRIES: ExperienceEntry[] = [
  {
    title: "BS Computer Science",
    place: "PHINMA UPANG College Urdaneta",
    period: "4th Year",
    description:
      "Coursework in software engineering, databases, and systems design, alongside independent full-stack work outside class.",
  },
  {
    title: "Tapt (Thesis Project)",
    place: "Independent, with a Philippine public school",
    period: "In progress",
    description:
      "Designed and built an offline-first NFC attendance system through real school site visits, matching DepEd's SF2 attendance compliance requirements end to end.",
  },
  {
    title: "OJT & Freelance",
    place: "Open to opportunities",
    period: "Available now",
    description:
      "Looking for an OJT placement, along with job and freelance opportunities where I can contribute as a full-stack developer.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Experience
        </h2>

        <div className="mt-10 flex flex-col divide-y divide-border/60 border-t border-border/60">
          {ENTRIES.map((entry) => (
            <div
              key={entry.title}
              className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <span className="text-sm text-muted-foreground">
                {entry.period}
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {entry.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {entry.place}
                  </span>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
