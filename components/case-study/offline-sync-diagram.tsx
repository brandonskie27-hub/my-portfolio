import { FLOW_GRID, FlowArrow, FlowColumn, FlowHub } from "@/components/case-study/diagram-parts"

const ON_PHONE = [
  { label: "Card tap", note: "UID looked up in the cached card list" },
  { label: "Saved to SQLite", note: "record written locally, with a UUID made on the phone" },
  { label: "Queued", note: "the full row goes into a write-ahead sync queue" },
]

const ON_SERVER = [
  { label: "Upsert on the UUID", note: "a retry updates the same row, never a duplicate" },
  { label: "Row-level security", note: "checks school, section and role on every write" },
  { label: "Adviser confirms", note: "corrections keep the original mark" },
  { label: "SF2 export", note: "confirmed sessions roll up into the official template" },
]

/** How an attendance tap reaches Supabase in Tapt: saved on the phone first,
 *  then sent by an in-order sync queue whenever a connection appears. */
export function OfflineSyncDiagram() {
  return (
    <div className={FLOW_GRID}>
      <FlowColumn heading="On the phone, offline" items={ON_PHONE} />
      <FlowArrow />
      <FlowHub title="Sync queue">
        Sends one write at a time, in the order made. Retries network errors with backoff from 2
        to 60 seconds; real rejections go to a Sync Problems screen.
      </FlowHub>
      <FlowArrow />
      <FlowColumn heading="On Supabase" items={ON_SERVER} />
    </div>
  )
}
