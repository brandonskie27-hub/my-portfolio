import { cn } from "@/lib/utils"

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
]

/** Slight left offset per row, mimicking a real QWERTY's physical stagger. */
const ROW_OFFSET = ["ml-0", "ml-3", "ml-6"]

function Key({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-8 items-center justify-center rounded-md border text-xs font-medium uppercase transition-colors duration-150 sm:size-9 sm:text-sm",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border/70 text-muted-foreground"
      )}
    >
      {label}
    </span>
  )
}

export function Keyboard({ nextChar }: { nextChar: string | undefined }) {
  return (
    <div aria-hidden="true" className="flex flex-col items-center gap-1.5">
      {ROWS.map((row, i) => (
        <div key={row.join("")} className={cn("flex gap-1.5", ROW_OFFSET[i])}>
          {row.map((key) => (
            <Key key={key} label={key} active={nextChar === key} />
          ))}
        </div>
      ))}
      <div className="flex gap-1.5">
        <span
          className={cn(
            "flex h-8 w-48 items-center justify-center rounded-md border text-xs font-medium transition-colors duration-150 sm:h-9 sm:w-64",
            nextChar === " "
              ? "border-foreground bg-foreground text-background"
              : "border-border/70 text-muted-foreground"
          )}
        />
      </div>
    </div>
  )
}
