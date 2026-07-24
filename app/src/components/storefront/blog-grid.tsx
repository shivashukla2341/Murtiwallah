"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Badge } from "@/components/ui/badge";

export function BlogGrid({ posts, tags }: { posts: BlogPost[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState("All");
  const [featured, ...rest] = posts;
  const filtered =
    activeTag === "All" ? rest : rest.filter((p) => p.tag === activeTag || `${p.tag}s` === activeTag);

  return (
    <>
      <div className="mb-11 flex flex-wrap gap-2.5">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-[13.5px] transition-colors",
              activeTag === tag
                ? "border-primary bg-accent-100 text-accent-700"
                : "border-border text-foreground hover:border-primary"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {activeTag === "All" && featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="mb-12 grid grid-cols-1 gap-8 rounded-lg border border-border p-2 text-foreground no-underline sm:grid-cols-2 sm:p-3"
        >
          <div className="aspect-3/2 overflow-hidden rounded-md sm:aspect-auto">
            <ImagePlaceholder label={featured.title} />
          </div>
          <div className="flex flex-col justify-center gap-3 p-3 sm:p-6">
            <Badge variant="neutral" className="self-start">
              {featured.tag}
            </Badge>
            <h2 className="text-[26px]">{featured.title}</h2>
            <p className="text-[14.5px] text-foreground/70">{featured.excerpt}</p>
            <span className="text-[12.5px] text-foreground/55">
              {featured.author} · {featured.date} · {featured.readTime}
            </span>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-3 text-foreground no-underline"
          >
            <div className="aspect-3/2 overflow-hidden rounded-lg border border-border">
              <ImagePlaceholder label={post.title} />
            </div>
            <Badge variant="neutral" className="self-start">
              {post.tag}
            </Badge>
            <div className="font-heading text-lg font-semibold">{post.title}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
