import { cn } from "@/lib/utils"

const RESUME_HREF = "/resume.pdf"

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function ResumeLink({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href={RESUME_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "rounded-full bg-foreground font-medium text-background transition-colors hover:bg-foreground/85",
        focusRing,
        className
      )}
    >
      Resume
    </a>
  )
}
