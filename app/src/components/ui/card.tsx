import * as React from "react"

import { cn } from "@/lib/utils"

/* Ported from the Classical design system's .card — bordered, unfilled
   content surfaces; .elev-sm/md/lg supply the (whisper-quiet) elevation. */

const elevationClass = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
} as const

function Card({
  className,
  elevation = "none",
  ...props
}: React.ComponentProps<"div"> & { elevation?: keyof typeof elevationClass }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-2 rounded-md border border-border bg-transparent p-4",
        elevationClass[elevation],
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function CardKicker({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-kicker"
      className={cn(
        "text-[10px] tracking-[0.1em] text-accent-700 uppercase",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-[17px] leading-tight font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[13px] text-foreground/80", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardKicker,
  CardAction,
  CardDescription,
  CardContent,
}
