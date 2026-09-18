"use client"

import { Mascot } from "page-mascot"
import { cn } from "@/lib/utils"

export function BrandonMascot({
  size = 140,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <div style={{ imageRendering: "pixelated" }}>
      <Mascot
        directions="/mascots/brandon-pixel-directions.webp"
        reactions="/mascots/brandon-pixel-reactions.webp"
        size={size}
        label="Brandon, waving hello"
        className={cn(className)}
      />
    </div>
  )
}
