"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

/** Older browsers, or a page that isn't focused, can refuse the async
 *  Clipboard API; a hidden textarea with execCommand still works there. */
function copyWithFallback(text: string) {
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()
  const ok = document.execCommand("copy")
  document.body.removeChild(textarea)
  return ok
}

// A mailto: link does nothing on computers with no default mail app, so this
// gives every visitor a way to grab the address.
export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle")

  useEffect(() => {
    if (status === "idle") return
    const timer = setTimeout(() => setStatus("idle"), 2000)
    return () => clearTimeout(timer)
  }, [status])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus("copied")
    } catch {
      setStatus(copyWithFallback(email) ? "copied" : "failed")
    }
  }

  const label = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy"

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={status === "idle" ? `Copy email address ${email}` : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
        focusRing
      )}
    >
      {status === "copied" ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
      {/* Announced to screen readers when it changes to "Copied". */}
      <span aria-live="polite">{label}</span>
    </button>
  )
}
