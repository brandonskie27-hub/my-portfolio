"use client"

import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ResumeLink } from "@/components/resume-link"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

const linkFocusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function NavDivider() {
  return <span aria-hidden="true" className="h-4 w-px shrink-0 bg-border" />
}

function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
  // Link href="/" is a no-op when already on "/" (single-page site), so
  // clicking the logo would otherwise do nothing. Scroll to top instead,
  // while leaving modifier-clicks (new tab, etc.) to behave normally.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }
  event.preventDefault()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="relative">
        <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background/70 px-3 py-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)] backdrop-blur-md supports-backdrop-filter:bg-background/60">
          <Link
            href="/"
            onClick={handleLogoClick}
            className={cn(
              "mr-2 shrink-0 rounded-full text-sm font-semibold tracking-tight text-foreground",
              linkFocusRing
            )}
          >
            Brandon
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 && <NavDivider />}
                <a
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    linkFocusRing
                  )}
                >
                  {link.label}
                </a>
              </Fragment>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle className="rounded-full" />
            <ResumeLink className="px-4 py-1.5 text-sm" />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle className="rounded-full" />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              onClick={() => setOpen((value) => !value)}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted",
                linkFocusRing
              )}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] flex flex-col gap-1 rounded-3xl border border-border/60 bg-background/90 p-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)] backdrop-blur-md md:hidden"
            >
              <nav aria-label="Primary" className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      linkFocusRing
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <ResumeLink
                className="mt-1 px-4 py-2 text-center text-sm"
                onClick={() => setOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
