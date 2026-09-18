"use client"

import { useCallback, useEffect, useState } from "react"

/** TypingTest is mounted once at the layout level; anything elsewhere on
 *  the site (e.g. the trigger button after Skills) opens it by dispatching
 *  this event rather than needing a prop/context path down to the button. */
export const OPEN_TYPING_TEST_EVENT = "open-typing-test"

export function openTypingTest() {
  window.dispatchEvent(new Event(OPEN_TYPING_TEST_EVENT))
}

export function useTypingTestShortcut() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    function handleOpenEvent() {
      setOpen(true)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.key.toLowerCase() === "j") {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener(OPEN_TYPING_TEST_EVENT, handleOpenEvent)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener(OPEN_TYPING_TEST_EVENT, handleOpenEvent)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return { open, setOpen, close }
}
