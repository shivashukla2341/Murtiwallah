"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

/* Ported from the Classical design system's .seg / .seg-opt — a segmented
   radio control used for sort order, status filters and quantity/tab
   switches throughout the storefront and admin. */

export type SegmentedControlOption = {
  value: string
  label: React.ReactNode
}

function SegmentedControl({
  options,
  value,
  onValueChange,
  className,
  "aria-label": ariaLabel,
}: {
  options: SegmentedControlOption[]
  value: string
  onValueChange: (value: string) => void
  className?: string
  "aria-label"?: string
}) {
  return (
    <RadioGroupPrimitive
      aria-label={ariaLabel}
      value={value}
      onValueChange={(v) => onValueChange(String(v))}
      className={cn(
        "inline-flex overflow-hidden rounded-md border border-border",
        className
      )}
    >
      {options.map((opt, i) => (
        <label
          key={opt.value}
          className={cn(
            "flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-[13px] transition-colors has-[[data-checked]]:text-accent-700 has-[[data-checked]]:shadow-[inset_0_0_0_1px_var(--primary)] not-has-[[data-checked]]:hover:bg-foreground/7",
            i > 0 && "border-l border-border"
          )}
        >
          <RadioPrimitive.Root
            value={opt.value}
            className="sr-only"
          />
          {opt.label}
        </label>
      ))}
    </RadioGroupPrimitive>
  )
}

export { SegmentedControl }
