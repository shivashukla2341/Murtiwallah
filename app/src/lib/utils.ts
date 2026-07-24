import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
})

/** Formats a rupee amount the way every mockup does: "₹8,400" (no decimals). */
export function formatINR(amount: number) {
  return `₹${inrFormatter.format(amount)}`
}
