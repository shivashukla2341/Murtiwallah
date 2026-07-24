import * as React from "react"
import Link from "next/link"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Ported from the Classical design system's .btn / .btn-primary / .btn-secondary
  / .btn-ghost — buttons are outlined or text-only, never solid-filled. See
  the design system's source styles.css for the rules this mirrors.
*/
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border font-heading text-sm font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-transparent text-accent-700 hover:bg-accent-100 active:bg-accent-200",
        secondary:
          "border-border bg-transparent text-foreground hover:bg-foreground/7 active:bg-foreground/14",
        ghost:
          "border-transparent bg-transparent px-1 text-accent-700 hover:bg-accent-100 active:bg-accent-200",
        destructive:
          "border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10",
        link: "border-transparent text-accent-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-4",
        sm: "h-8 gap-1 rounded-sm px-3 text-[13px]",
        lg: "h-12 gap-2 px-6 text-[15px]",
        icon: "size-8 rounded-md p-0",
        block: "h-9 w-full gap-1.5 px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/** Button styled as a Next.js Link — Base UI has no asChild, so this wraps
 *  the render-prop polymorphism it uses instead. */
function LinkButton({
  href,
  className,
  variant = "primary",
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & { href: string }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={false}
      render={<Link href={href} {...props} />}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, LinkButton, buttonVariants }
