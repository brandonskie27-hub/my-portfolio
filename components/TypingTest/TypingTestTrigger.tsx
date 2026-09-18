"use client"

import { Keyboard } from "lucide-react"
import { openTypingTest } from "./useTypingTestShortcut"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function TypingTestTrigger() {
  return (
    <section className="w-full py-12 sm:py-16">
      <Reveal className="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
        <div className="flex w-full flex-col items-center gap-3 rounded-3xl border border-border/60 bg-card p-8 text-center sm:p-10">
          <p className="text-sm text-muted-foreground">
            Bored? Test your typing speed
          </p>
          <button
            type="button"
            onClick={openTypingTest}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted",
              focusRing
            )}
          >
            <Keyboard className="size-4" aria-hidden="true" />
            Typing Test
          </button>
          <p className="text-xs text-muted-foreground">
            or press{" "}
            <kbd className="rounded-sm border border-border/60 px-1 py-0.5 font-mono text-[10px]">
              alt
            </kbd>{" "}
            +{" "}
            <kbd className="rounded-sm border border-border/60 px-1 py-0.5 font-mono text-[10px]">
              j
            </kbd>{" "}
            anywhere
          </p>
        </div>
      </Reveal>
    </section>
  )
}
