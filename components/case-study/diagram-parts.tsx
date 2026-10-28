import type { ReactNode } from "react"
import { ArrowDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/** Points down on narrow screens, where diagram columns stack, and right on wide ones. */
export function FlowArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-muted-foreground">
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
    </div>
  )
}

export function FlowNode({ label, note }: { label: string; note: string }) {
  return (
    <li className="rounded-2xl border border-border/70 bg-background px-4 py-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{note}</p>
    </li>
  )
}

export function FlowColumn({
  heading,
  items,
  className,
}: {
  heading: string
  items: { label: string; note: string }[]
  className?: string
}) {
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {heading}
      </p>
      <ul className={cn("grid grid-cols-1 gap-2", className)}>
        {items.map((item) => (
          <FlowNode key={item.label} {...item} />
        ))}
      </ul>
    </div>
  )
}

/** The emphasized middle box a flow passes through. */
export function FlowHub({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-foreground/80 bg-background px-5 py-6 text-center">
      <p className="font-mono text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}

export const FLOW_GRID =
  "grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_minmax(0,0.9fr)_auto_1fr]"
