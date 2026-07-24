import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = ["Address", "Shipping", "Payment", "Review"];

export function CheckoutStepper({ current }: { current: number }) {
  return (
    <ol className="mb-9 flex items-center gap-2 sm:gap-3">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] whitespace-nowrap",
                active && "border-primary text-accent-700",
                done && "border-primary bg-accent-100 text-accent-700",
                !active && !done && "border-border text-foreground/50"
              )}
            >
              <span
                className={cn(
                  "flex size-4.5 items-center justify-center rounded-full text-[10px]",
                  active && "bg-primary text-white",
                  done && "bg-primary text-white",
                  !active && !done && "border border-border"
                )}
              >
                {done ? <Check className="size-3" /> : step}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {step < STEPS.length && (
              <div className={cn("h-px flex-1", done ? "bg-primary" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
