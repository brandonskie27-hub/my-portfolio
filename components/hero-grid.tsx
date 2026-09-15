"use client"

import { useEffect, useRef } from "react"

const GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
} as const

export function HeroGrid() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const spotlight = spotlightRef.current
    const section = spotlight?.closest("section")
    if (!spotlight || !section) return

    function handleMove(event: MouseEvent) {
      const rect = section!.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(() => {
        spotlight!.style.setProperty("--spot-x", `${x}%`)
        spotlight!.style.setProperty("--spot-y", `${y}%`)
        frameRef.current = null
      })
    }

    function handleEnter() {
      spotlight!.classList.add("is-active")
    }

    function handleLeave() {
      spotlight!.classList.remove("is-active")
    }

    section.addEventListener("mousemove", handleMove)
    section.addEventListener("mouseenter", handleEnter)
    section.addEventListener("mouseleave", handleLeave)

    return () => {
      section.removeEventListener("mousemove", handleMove)
      section.removeEventListener("mouseenter", handleEnter)
      section.removeEventListener("mouseleave", handleLeave)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <>
      {/* Always-faint base texture; this is what touch/no-hover devices see. */}
      <div
        aria-hidden="true"
        className="hero-grid-base pointer-events-none absolute inset-0 z-0"
        style={GRID_STYLE}
      />
      {/* Brighter reveal masked to a soft circle that follows the cursor;
          stays invisible unless the device reports real hover + a fine pointer. */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="hero-grid-spotlight pointer-events-none absolute inset-0 z-0"
        style={GRID_STYLE}
      />
    </>
  )
}
