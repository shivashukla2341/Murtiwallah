"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

/**
 * Smart image component that shows a real <Image> if the src resolves,
 * or quietly falls back to the grey placeholder if the file is missing.
 *
 * Usage:
 *   <SiteImage src="/products/nataraja-shiva.jpg" alt="Nataraja Shiva" fill />
 */
function SiteImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-200 text-neutral-500",
          className
        )}
      >
        <ImageIcon className="size-6 opacity-60" strokeWidth={1.5} />
        <span className="line-clamp-2 max-w-[85%] text-center text-[10px] leading-tight text-neutral-600">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
      className={cn("object-cover", className)}
      onError={() => setErrored(true)}
    />
  );
}

export { SiteImage };
