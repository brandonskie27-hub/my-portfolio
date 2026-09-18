"use client"

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { Keyboard } from "./Keyboard"
import { getRandomWords } from "./words"
import { useTypingTestShortcut } from "./useTypingTestShortcut"
import { cn } from "@/lib/utils"

const WORD_COUNT = 18
const PERSONAL_BEST_KEY = "typing-test-best-wpm"

function buildTarget() {
  return getRandomWords(WORD_COUNT).join(" ")
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-lg font-semibold text-foreground">{value}</span>
      <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}

export function TypingTest() {
  const { open, close } = useTypingTestShortcut()

  return (
    <AnimatePresence>
      {open && <TypingTestRun key="typing-test-run" close={close} />}
    </AnimatePresence>
  )
}

/** Mounted only while the overlay is open, so every field below starts
 *  fresh each time - no "reset state when reopened" effect needed. */
function TypingTestRun({ close }: { close: () => void }) {
  const [target, setTarget] = useState(buildTarget)
  const [typedText, setTypedText] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [finishTime, setFinishTime] = useState<number | null>(null)
  const [now, setNow] = useState<number>(() => Date.now())
  // Snapshot of the best WPM as it stood when this run started - frozen for
  // the whole run so "new best" is a plain comparison, not synced state.
  const [startingBest] = useState<number | null>(() => {
    if (typeof window === "undefined") return null
    const stored = window.localStorage.getItem(PERSONAL_BEST_KEY)
    return stored ? Number(stored) : null
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const finished = typedText.length > 0 && typedText.length >= target.length

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const restart = useCallback(() => {
    setTarget(buildTarget())
    setTypedText("")
    setStartTime(null)
    setFinishTime(null)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [])

  useEffect(() => {
    if (startTime === null || finished) return
    const id = setInterval(() => setNow(Date.now()), 100)
    return () => clearInterval(id)
  }, [startTime, finished])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        close()
      } else if (event.key === "Tab") {
        event.preventDefault()
        restart()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [close, restart])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.slice(0, target.length)
    if (startTime === null && value.length > 0) {
      setStartTime(Date.now())
    }
    setTypedText(value)
    if (value.length === target.length && finishTime === null) {
      setFinishTime(Date.now())
    }
  }

  let correctChars = 0
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === target[i]) correctChars++
  }
  const accuracy =
    typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 100

  const elapsedMs = startTime === null ? 0 : (finishTime ?? now) - startTime
  const elapsedSeconds = Math.floor(elapsedMs / 1000)
  const elapsedMinutes = elapsedMs / 60000
  const wpm = elapsedMinutes > 0 ? Math.round(correctChars / 5 / elapsedMinutes) : 0

  const isNewBest = finished && (startingBest === null || wpm > startingBest)

  // Persisting to localStorage is a genuine external-system side effect,
  // not React state, so it belongs here rather than in a state setter.
  useEffect(() => {
    if (isNewBest) {
      window.localStorage.setItem(PERSONAL_BEST_KEY, String(wpm))
    }
  }, [isNewBest, wpm])

  const nextChar = target[typedText.length]

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={() => inputRef.current?.focus()}
    >
      <motion.div
        className="relative w-full max-w-3xl rounded-3xl border border-border/60 bg-card p-6 text-card-foreground sm:p-10"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close typing test"
          onClick={close}
          className="absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center justify-center gap-8 font-mono">
          <Stat label="WPM" value={String(wpm)} />
          <Stat label="ACC" value={`${accuracy}%`} />
          <Stat label="TIME" value={`${elapsedSeconds}s`} />
        </div>

        <p
          className={cn(
            "mt-2 text-center text-xs font-medium text-foreground",
            !isNewBest && "invisible"
          )}
        >
          new best!
        </p>

        <div
          className="relative mx-auto mt-6 max-w-2xl font-mono text-xl leading-relaxed tracking-wide select-none sm:text-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {target.split("").map((char, i) => {
            const isCurrent = i === typedText.length
            let charClassName = "text-muted-foreground/50"
            if (i < typedText.length) {
              charClassName = typedText[i] === char ? "text-foreground" : "text-destructive"
            }
            return (
              <span key={i} className="relative">
                {isCurrent && (
                  <span
                    aria-hidden="true"
                    className="typing-caret absolute top-0.5 -left-px bottom-0.5 w-0.5 bg-foreground"
                  />
                )}
                <span className={charClassName}>{char}</span>
              </span>
            )
          })}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleChange}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Typing test input"
          className="sr-only"
        />

        <div className="mt-10 flex justify-center">
          <Keyboard nextChar={nextChar} />
        </div>

        <div className="mt-4 flex justify-center gap-6 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded-sm border border-border/60 px-1 py-0.5 font-mono text-[10px]">
              tab
            </kbd>
            restart
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded-sm border border-border/60 px-1 py-0.5 font-mono text-[10px]">
              esc
            </kbd>
            close
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
