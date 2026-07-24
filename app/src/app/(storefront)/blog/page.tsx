import type { Metadata } from "next";

import { BlogGrid } from "@/components/storefront/blog-grid";
import { blogPosts, blogTags } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Journal",
  description: "Buying guides, comparisons and craft notes from Murtiwallah.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 py-11 sm:px-8">
      <p className="mb-2.5 font-devanagari text-sm text-accent-700">पत्रिका — Journal</p>
      <h1 className="mb-7 text-[32px] sm:text-[38px]">The Journal</h1>
      <BlogGrid posts={blogPosts} tags={blogTags} />
    </div>
  );
}
