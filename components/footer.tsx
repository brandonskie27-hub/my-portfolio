import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-10 lg:px-16">
        <p>&copy; {year} Brandon Dylan Narito.</p>
        <a
          href="#top"
          className={cn(
            "group inline-flex items-center gap-1 rounded-sm text-muted-foreground transition-colors hover:text-foreground",
            focusRing
          )}
        >
          Back to top
          <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
