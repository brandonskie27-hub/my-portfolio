import { ArrowDown, ArrowRight } from "lucide-react"

const CHANGES = [
  { label: "Delivery", note: "stock in from a supplier" },
  { label: "Sale", note: "stock out, may go below zero" },
  { label: "Voided sale", note: "puts the stock back" },
  { label: "Transfer", note: "out of one location, into another" },
  { label: "Stock count", note: "sets the counted amount, keeps the variance" },
  { label: "Adjustment", note: "manual correction by the owner" },
]

const OUTPUTS = [
  { label: "Current stock", note: "per product, per location: store and two warehouses" },
  { label: "Movement history", note: "type, quantity, who, when and the balance after" },
]

function Arrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-muted-foreground">
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
    </div>
  )
}

function Node({ label, note }: { label: string; note: string }) {
  return (
    <li className="rounded-2xl border border-border/70 bg-background px-4 py-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{note}</p>
    </li>
  )
}

/** How stock changes in Wholesale IMS: every kind of change goes through
 *  StockLedger, which updates the count and writes a movement. */
export function StockFlowDiagram() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_minmax(0,0.9fr)_auto_1fr]">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          What changes stock
        </p>
        <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {CHANGES.map((item) => (
            <Node key={item.label} {...item} />
          ))}
        </ul>
      </div>

      <Arrow />

      <div className="rounded-2xl border-2 border-foreground/80 bg-background px-5 py-6 text-center">
        <p className="font-mono text-sm font-semibold text-foreground">StockLedger</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          The only code that changes stock. Runs inside a database transaction and works in the
          product&apos;s base unit.
        </p>
      </div>

      <Arrow />

      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          What it keeps
        </p>
        <ul className="grid grid-cols-1 gap-2">
          {OUTPUTS.map((item) => (
            <Node key={item.label} {...item} />
          ))}
        </ul>
      </div>
    </div>
  )
}
