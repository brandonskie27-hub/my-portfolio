export type CaseStudyDiagram = "wholesale-ims-stock-flow" | "tapt-offline-sync"

export type CaseStudyImage = {
  /** Path under /public, e.g. "/projects/wholesale-ims/checkout.png" */
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  /** Phone screens and other tall shots, shown side by side instead of full width. */
  narrow?: boolean
}

export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  meta: { label: string; value: string }[]
  tech: string[]
  problem: string[]
  /** Numbered box under the problem, e.g. what the client asked for. */
  asks: { title: string; items: string[] }
  constraints: string[]
  decisions: { title: string; body: string }[]
  diagram?: { id: CaseStudyDiagram; title: string; caption: string }
  /** Project-specific sections shown after the diagram. */
  extraSections?: { title: string; intro?: string; bullets: string[] }[]
  features: string[]
  process: string[]
  /** Leave empty until real screenshots exist; the gallery is hidden when empty. */
  screenshots: CaseStudyImage[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "tapt",
    title: "Tapt",
    tagline:
      "An offline-first NFC attendance system that turns card taps into DepEd's monthly SF2 report.",
    meta: [
      { label: "Role", value: "Full-stack developer" },
      { label: "Type", value: "Thesis, team project" },
      { label: "Timeline", value: "Aug 2026 to present" },
      { label: "Status", value: "Ready for pilot" },
    ],
    tech: [
      "React Native",
      "Expo",
      "TypeScript",
      "React",
      "Supabase",
      "PostgreSQL",
      "expo-sqlite",
      "Vitest",
    ],
    problem: [
      "At the partner school, a public senior high school in Pangasinan, attendance was kept on paper. A student class secretary wrote attendance on a logsheet every subject period, the subject teacher signed it, and at the end of the month the class adviser tallied everything by hand into School Form 2 (SF2), DepEd's Daily Attendance Report of Learners.",
      "The SF2 is strict: each day splits into AM and PM half-days, partial absence counts as tardy, learners are grouped by sex with subtotals, and the form needs monthly statistics like Average Daily Attendance and learners with five consecutive absences. Doing that by hand every month is slow and error-prone, and a lost or unsigned logsheet leaves a gap the adviser has to reconstruct.",
    ],
    asks: {
      title: "Who uses it",
      items: [
        "Class secretary: scans classmates' NFC cards on an Android phone",
        "Class adviser: reviews, corrects and confirms each session, then exports the SF2",
        "Admin: sets up the school, rosters, schedules and suspensions on the web",
        "Students: just tap their cards, with no account to manage",
      ],
    },
    constraints: [
      "The classroom has no reliable Wi-Fi or mobile data, so the app had to work fully offline. This was a hard requirement, not a nice-to-have.",
      "The secretary takes attendance in the short change between periods, so scanning had to be fast and hard to get wrong.",
      "Class suspensions for typhoons and flooding come from several sources (PAGASA, DepEd, the provincial DRRMO, the LGU, the school) and arrive unpredictably.",
      "The output had to be the official SF2, matching DepEd's rules exactly, not a look-alike report.",
      "The data is about minors, so access had to follow the Data Privacy Act of 2012 (RA 10173): scoped by role, with as little data collected as possible.",
    ],
    decisions: [
      {
        title: "Offline-first with a local write queue",
        body: "Every write is saved to SQLite on the phone before any network call. A sync queue sends writes to Supabase one at a time, in the exact order they were made, retrying with backoff. Order matters because the server only accepts taps while a session is open: if \"session ended\" arrived before an offline tap, the tap would be rejected. A bug that broke this ordering was found, fixed and covered by tests.",
      },
      {
        title: "IDs made on the phone, so retries are harmless",
        body: "Sessions and attendance records get their UUID on the phone, not from the server. The server upserts on that ID, so if the app is killed after a write lands but before it's marked synced, sending it again updates the same row instead of creating a duplicate. A double tap reuses the existing record too.",
      },
      {
        title: "Access rules live in the database",
        body: "Supabase row-level security is on for every table: each school sees only its data, secretaries and advisers only their section, and each role can write only what it should. A bug in the app can't leak another section's attendance. Work that needs secret keys, like filling the SF2 or creating accounts, runs in Edge Functions so the keys never reach a phone.",
      },
      {
        title: "Only the adviser corrects marks",
        body: "Subject teachers aren't in the system, so the adviser's confirmation replaced the paper signature. A card tap is the only way a secretary can mark someone present, and the database blocks anything else. Every correction is the adviser's, and the original mark is kept for audit.",
      },
      {
        title: "Follow the real SF2 exactly",
        body: "The export fills DepEd's official Excel template, with cell addresses read from the actual file. An early draft used a majority rule for half-days; after checking with the adviser and the real form, it was corrected to the count-and-compare rule the SF2 actually uses.",
      },
    ],
    diagram: {
      id: "tapt-offline-sync",
      title: "From tap to SF2",
      caption:
        "Taps are saved on the phone first and synced in order whenever a connection appears. Only adviser-confirmed sessions count toward the SF2.",
    },
    extraSections: [
      {
        title: "Getting the SF2 right",
        intro:
          "Requirements came from a site visit and questionnaire at the school, its real class program, a real DepEd school calendar, the official blank SF2 template read cell by cell, and direct confirmation of the half-day rule with the adviser.",
        bullets: [
          "Half-day rule: absent in none of a block's sessions is Present, in some is Tardy, in all is Absent.",
          "Suspensions and holidays mark a block as no class, so fully suspended days never count as absences. A suspension declared mid-session ends it; the data is kept but excluded.",
          "Learners are grouped by sex with subtotals, and the monthly summary fills Average Daily Attendance, percentage of attendance and five-consecutive-absence counts.",
          "Unconfirmed sessions don't block the export. They're flagged for the adviser, the same way a missing paper sheet is handled today.",
          "Advisers can also download a blank SF2 with the class list and school days filled in, for filling by hand.",
        ],
      },
    ],
    features: [
      "NFC scanning with the card's read-only UID; nothing is written to the card",
      "Session flow: start, tap, end (non-tappers become absent), adviser confirms",
      "Push notifications to the adviser for each finalized session",
      "Sync Problems screen for writes the server rejects, so nothing is skipped silently",
      "Roster import from the school's SF1 Excel export",
      "Weekly class schedule, holidays and suspensions managed by the admin",
      "Monthly SF2 export through a short-lived private link",
      "15-table PostgreSQL schema with row-level security on every table",
    ],
    process: [
      "About 60 commits between late August and October 2026. Testing covered 22 Vitest unit tests for sync ordering, backoff, error handling and suspension rules, emulator runs including offline and device-clock scenarios, a database test of the secretary's write rules, and checks that forged login tokens are rejected.",
      "A dry run at the partner school on real phones confirmed login, NFC scanning and push notifications work, and surfaced one limit: the sync queue is per phone, so each account needs its own device.",
      "At the thesis panel evaluation, the panel made ten suggestions. Nine were built, tested and deployed the same day, including database rules that stop secretaries from marking attendance by hand; two-factor authentication was deferred to future work.",
      "A 2 to 4 week pilot with two sections and 100 NFC cards is planned, with the paper SF2 kept in parallel to compare accuracy.",
    ],
    // Demo school ("Tapt Demo High School") with made-up learners and LRNs. The
    // phone shots come from an emulator, so the taps shown are seeded records.
    screenshots: [
      {
        src: "/projects/tapt/01-secretary-today.png",
        alt: "The secretary's home screen listing today's classes, with the current class in progress and earlier ones marked confirmed or pending adviser review.",
        width: 1080,
        height: 2400,
        caption: "The secretary's day at a glance: what's running now, and what still needs the adviser.",
        narrow: true,
      },
      {
        src: "/projects/tapt/02-scanning.png",
        alt: "The scanning screen showing \"NFC Ready to Scan\" for Earth and Life Science, 14 of 22 learners scanned, and a list of learners not yet scanned.",
        width: 1080,
        height: 2400,
        caption:
          "Taking attendance by NFC tap. Anyone who hasn't tapped is marked absent when the session ends. (Demo records: the emulator has no NFC reader.)",
        narrow: true,
      },
      {
        src: "/projects/tapt/03-offline.png",
        alt: "The scanning screen in airplane mode, with an amber banner saying the device is offline and changes will sync when it reconnects.",
        width: 1080,
        height: 2400,
        caption: "Works offline: taps are saved on the phone and upload once a connection is back.",
        narrow: true,
      },
      {
        src: "/projects/tapt/04-sync-problems.png",
        alt: "A Sync problems list showing attendance changes the server rejected, each with the error details and a Skip this change button.",
        width: 1080,
        height: 2400,
        caption:
          "When the server rejects an offline change, here a secretary marking attendance by hand, it's shown plainly instead of retrying forever.",
        narrow: true,
      },
      {
        src: "/projects/tapt/05-adviser-review.png",
        alt: "The adviser's session review with one learner's mark corrected to Late and labeled as edited, above a Confirm button.",
        width: 1080,
        height: 2400,
        caption: "The adviser reviews the secretary's record, corrects a mark, and confirms the session.",
        narrow: true,
      },
      {
        src: "/projects/tapt/06-sf2-export.png",
        alt: "The SF2 Export screen for October 2026 with an alert explaining that some days aren't confirmed yet and will be flagged in the file.",
        width: 1080,
        height: 2400,
        caption: "SF2 export flags unconfirmed days instead of passing them off as final.",
        narrow: true,
      },
      {
        src: "/projects/tapt/07-admin-schedule.png",
        alt: "The admin Schedule page listing eight subjects for a section with their AM or PM block, weekdays and class times.",
        width: 1440,
        height: 900,
        caption: "The admin web: each section's weekly class program, which drives the secretary's daily list.",
      },
      {
        src: "/projects/tapt/08-admin-suspension.png",
        alt: "The admin Calendar page with a Declare Event dialog filled in for a whole-day, school-wide class suspension due to a typhoon.",
        width: 1440,
        height: 900,
        caption: "Declaring a class suspension, so suspended days drop out of attendance and the SF2.",
      },
      {
        src: "/projects/tapt/09-sf2-filled.png",
        alt: "A filled DepEd School Form 2 for October 2026 with daily attendance columns, male and female learners grouped with daily totals, absences as X, tardies as shaded cells, and the monthly summary box.",
        width: 1653,
        height: 2177,
        caption:
          "The generated SF2 in DepEd's official template: day columns, sex grouping and the monthly summary, all computed from the taps.",
      },
    ],
  },
  {
    slug: "wholesale-ims",
    title: "Wholesale IMS",
    tagline:
      "An inventory and sales system that replaces a wholesale store's handwritten logbook.",
    meta: [
      { label: "Role", value: "Full-stack developer" },
      { label: "Type", value: "Capstone, team project" },
      { label: "Timeline", value: "Sep 2026 to present" },
      { label: "Status", value: "In development" },
    ],
    tech: ["Laravel", "React", "Inertia.js", "TypeScript", "MySQL", "Tailwind CSS", "Pest"],
    problem: [
      "The client is a wholesale and retail store in the Philippines selling cooking oil, vinegar, shrimp paste, salt, flour, sugar and similar goods. Every sale was written by hand in a logbook: date, quantity and item, price, total.",
      "Totals were computed by hand and often wrong. Stock wasn't tracked at all, so items went missing and nobody knew where or when. Customer credit (utang) lived in separate handwritten lists, one per customer.",
    ],
    asks: {
      title: "What the owner asked for",
      items: [
        "Monitor daily sales",
        "Monitor stock and deliveries",
        "See which customers have utang and how much they owe",
        "See which products are running low",
      ],
    },
    constraints: [
      "The owner checks the business from a phone while staff sell from a laptop at the counter, so every screen had to work on both.",
      "Stock sits in one store and two warehouses (bodega) and moves between them.",
      "Cooking oil is kept in bulk in a tank and repacked per order, so the same stock leaves as 350 ml bottles, 1.5 L bottles, bundles or 19 L containers.",
      "Not every product has a barcode, so checkout has to be fast by name search alone.",
      "Two staff and one owner, with different access: only the owner sees credit balances, prices and reports.",
    ],
    decisions: [
      {
        title: "One ledger for every stock change",
        body: "All stock changes go through a single class. Each one updates the stock row and writes a movement with its type, quantity, who did it, when, and the balance after. Current stock can always be explained from history, which is the whole point when the owner's problem is stock that disappears without a trace.",
      },
      {
        title: "Stock in base units, sold in any unit",
        body: "Each product counts stock in one base unit (liters for oil) and has selling units with a conversion. Selling a 350 ml bottle takes 0.35 L off the tank. This matches how the store actually repacks oil, with no separate repack step for staff to forget.",
      },
      {
        title: "Prices follow the customer",
        body: "Regular customers (suki) often get their own price. At checkout, the last price that customer paid fills in automatically, and staff can still edit any line. Every line stores the regular price, the final price and who changed it, so the owner gets a price changes report instead of guessing.",
      },
      {
        title: "Never turn a customer away",
        body: "If the system thinks stock is short, a sale still goes through and the screen warns that stock went below zero. Physical stock is often ahead of the records, and blocking the sale would cost the store a customer. Stock counts later reconcile the difference.",
      },
      {
        title: "Exact money, safe writes",
        body: "Quantities and money use decimals and BCMath, never floats, so ₱ totals and 0.35 L deductions don't drift. Anything that changes stock or money runs in a database transaction, and mistakes are voided, not deleted, so the audit trail stays intact.",
      },
    ],
    diagram: {
      id: "wholesale-ims-stock-flow",
      title: "How stock moves",
      caption:
        "Every way stock can change passes through the same ledger, which keeps both the current count and the full history.",
    },
    features: [
      "Checkout with name search, cash or credit, pick-up or delivery",
      "Printable receipt, labeled as not an official receipt",
      "Incoming deliveries per supplier and location",
      "Transfers between the store and warehouses",
      "Stock counts with a variance report",
      "Customer credit: balances, payments, due dates, opening balances",
      "Dashboard with today's sales, low stock and credit due",
      "Reports: daily sales, stock per location, price changes, variances",
      "Owner and staff roles, with no public sign-up",
    ],
    process: [
      "Requirements came from interviews with the store owner, written into a project spec before any code. Open questions were settled and recorded there too, like treating the ₱170 “diposit” as an ordinary product instead of building a refund feature nobody asked for.",
      "The build went in five phases: foundation, products and stock, sales, credit, then stock counts and reports. Each phase started with a plan of tables, pages and routes before implementation.",
      "Business rules live in dedicated action classes instead of controllers, and the project has 160 Pest tests covering those rules and the owner/staff restrictions.",
    ],
    // Demo data only ("Sample Trading Co."): no real client names or amounts.
    screenshots: [
      {
        src: "/projects/wholesale-ims/01-dashboard.png",
        alt: "Owner dashboard with colored tiles for today's sales, cash, credit, transactions, total owed and overdue, above panels for low stock, orders to deliver, credit due and stock-count differences.",
        width: 1440,
        height: 900,
        caption:
          "The owner's daily overview. Each color has one meaning (green for money in, orange for utang, red for problems), so the overdue total and low-stock items stand out at a glance.",
      },
      {
        src: "/projects/wholesale-ims/02-checkout.png",
        alt: "New sale screen with three items for a regular customer; the flour line shows a sack price of ₱1,150 labeled \"Last price paid\", and credit (utang) is selected.",
        width: 1440,
        height: 900,
        caption:
          "Checkout for a regular customer: the last price they paid fills in automatically (₱1,150 instead of the regular ₱1,180), and the system computes the total. Staff can still edit any price, and every change is logged.",
      },
      {
        src: "/projects/wholesale-ims/03-product-units.png",
        alt: "Product page for cooking oil showing stock per location in liters and five selling units from 350 ml to a 19 L container, each with how much it takes from stock and its price.",
        width: 1440,
        height: 900,
        caption:
          "Oil is stored in bulk and repacked per order, so stock is counted in liters and each selling unit converts to liters. A 1.5 L bottle takes exactly 1.5 L from stock, with no separate repacking step.",
      },
      {
        src: "/projects/wholesale-ims/04-stock-movements.png",
        alt: "Stock history for cooking oil listing sales, a stock count, a delivery and a transfer, each with location, date, who did it, the change in liters and the running balance.",
        width: 1440,
        height: 900,
        caption:
          "Every stock change is recorded with who did it and when, so current stock can always be explained. The −2.5 L stock count entry is exactly the kind of missing stock the owner could never trace on paper.",
      },
      {
        src: "/projects/wholesale-ims/05-credit.png",
        alt: "Credit (utang) list with total owed and overdue tiles, and six customers with their balances; three show red overdue badges.",
        width: 1440,
        height: 900,
        caption:
          "Owner-only view of who owes money, replacing separate handwritten utang lists. Overdue customers sort to the top, so the owner knows whom to collect from first.",
      },
      {
        src: "/projects/wholesale-ims/06-variance-report.png",
        alt: "Stock count differences report with a date filter, a per-product total and a table of each difference with system quantity, counted quantity and who counted.",
        width: 1440,
        height: 900,
        caption:
          "Physical counts compared with what the system expected. Negative differences make missing stock visible, one of the owner's main problems.",
      },
      {
        src: "/projects/wholesale-ims/08-mobile-dashboard.png",
        alt: "The dashboard on a phone, with stacked colored tiles for sales, cash, credit, total owed and overdue, followed by the low-stock list.",
        width: 390,
        height: 844,
        caption: "The same dashboard on the owner's phone, with today's sales and overdue utang visible without scrolling.",
        narrow: true,
      },
      {
        src: "/projects/wholesale-ims/09-mobile-credit.png",
        alt: "The credit (utang) list on a phone, with total owed and overdue tiles and customer cards showing balances and red overdue badges.",
        width: 390,
        height: 844,
        caption: "Collecting utang away from the counter: who owes what, and who is overdue.",
        narrow: true,
      },
      {
        src: "/projects/wholesale-ims/07-receipt.png",
        alt: "Printable receipt for a demo store with sale number, date, customer, cashier, two items, total and payment type, marked \"This is not an official receipt\".",
        width: 464,
        height: 536,
        caption: "A printable receipt, deliberately labeled non-official because BIR official receipts stay manual.",
        narrow: true,
      },
    ],
  },
]

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug)
}
