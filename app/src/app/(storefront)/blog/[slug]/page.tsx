import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Plate } from "@/components/ui/plate";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/mock";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-[860px] px-5 py-9 sm:px-8">
      <div className="mb-6 text-[13px] text-foreground/60">
        <Link href="/" className="text-inherit no-underline hover:text-accent-700">
          Home
        </Link>
        {" / "}
        <Link href="/blog" className="text-inherit no-underline hover:text-accent-700">
          Journal
        </Link>
        {" / "}
        {post.title}
      </div>

      <Badge variant="neutral" className="mb-3">
        {post.tag}
      </Badge>
      <h1 className="mb-3 text-[32px] sm:text-[40px]">{post.title}</h1>
      <p className="mb-7 text-[13.5px] text-foreground/60">
        {post.author} · {post.date} · {post.readTime}
      </p>

      <Plate className="mb-9 aspect-2/1 w-full">
        <ImagePlaceholder label={post.title} />
      </Plate>

      <div className="flex flex-col gap-7">
        {post.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="mb-2.5 text-[22px]">{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mb-3 text-[15px] leading-relaxed text-foreground/78">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-border pt-9">
          <h2 className="mb-6 text-[22px]">More from the Journal</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="flex flex-col gap-2.5 text-foreground no-underline"
              >
                <div className="aspect-3/2 overflow-hidden rounded-lg border border-border">
                  <ImagePlaceholder label={p.title} />
                </div>
                <div className="font-heading text-[15px] font-semibold">{p.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
