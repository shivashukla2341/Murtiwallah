import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Stands in for real product/editorial photography (none is supplied with
 * this build) everywhere the mockups used <image-slot placeholder="...">.
 * Kept visually quiet — a tinted surface with a centered glyph — so layouts
 * read correctly without pretending to be a real photo.
 */
function ImagePlaceholder({
  label,
  className,
  shape = "rect",
}: {
  label?: string;
  className?: string;
  shape?: "rect" | "circle";
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-200 text-neutral-500",
        shape === "circle" && "rounded-full",
        className
      )}
    >
      <ImageIcon className="size-6 opacity-60" strokeWidth={1.5} />
      {label && (
        <span className="line-clamp-2 max-w-[85%] text-center text-[10px] leading-tight text-neutral-600">
          {label}
        </span>
      )}
    </div>
  );
}

export { ImagePlaceholder };
