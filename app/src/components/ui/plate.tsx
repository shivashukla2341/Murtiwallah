import * as React from "react"

import { cn } from "@/lib/utils"

/* The Classical design system's .plate — every content photograph is matted
   through this wrapper so it reads as a tipped-in book plate, not a banner. */
function Plate({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="plate"
      className={cn("plate overflow-hidden rounded-lg", className)}
      {...props}
    />
  )
}

export { Plate }
