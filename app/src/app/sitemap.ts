import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/mock";
import { getAllProducts } from "@/lib/services/products";
import { getCategories } from "@/lib/services/categories";

const BASE_URL = "https://www.murtiwallah.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/products",
  "/categories",
  "/wholesale",
  "/blog",
  "/contact",
  "/faq",
  "/careers",
  "/privacy",
  "/terms",
  "/shipping-policy",
  "/refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), getAllProducts()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/categories/${c.slug}`,
    lastModified: new Date(),
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...blogEntries];
}
