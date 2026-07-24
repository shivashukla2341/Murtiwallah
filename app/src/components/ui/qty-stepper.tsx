"use client"

import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 9999,
  className,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-md border border-border",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-foreground/7 disabled:pointer-events-none disabled:opacity-40"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="flex h-9 min-w-10 items-center justify-center border-x border-border text-sm tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-foreground/7 disabled:pointer-events-none disabled:opacity-40"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}

export { QtyStepper }
