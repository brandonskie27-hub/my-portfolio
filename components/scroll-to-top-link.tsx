"use client"

import type { AnchorHTMLAttributes, MouseEvent } from "react"

type ScrollToTopLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export function ScrollToTopLink({ onClick, ...props }: ScrollToTopLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return
    // href="#top" would otherwise dump a "#top" hash into the URL bar for
    // every click - scroll manually instead so the address stays clean.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return <a href="#top" onClick={handleClick} {...props} />
}
