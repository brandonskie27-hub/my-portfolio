import { FLOW_GRID, FlowArrow, FlowColumn, FlowHub } from "@/components/case-study/diagram-parts"

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

/** How stock changes in Wholesale IMS: every kind of change goes through
 *  StockLedger, which updates the count and writes a movement. */
export function StockFlowDiagram() {
  return (
    <div className={FLOW_GRID}>
      <FlowColumn heading="What changes stock" items={CHANGES} className="grid-cols-2 lg:grid-cols-1" />
      <FlowArrow />
      <FlowHub title="StockLedger">
        The only code that changes stock. Runs inside a database transaction and works in the
        product&apos;s base unit.
      </FlowHub>
      <FlowArrow />
      <FlowColumn heading="What it keeps" items={OUTPUTS} />
    </div>
  )
}
