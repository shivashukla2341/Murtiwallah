import type { Category, Collection } from "@/lib/types";

const categories: Category[] = [
  { id: "ganesha", slug: "ganesha", name: "Ganesha", hindi: "गणेश", productCount: 148 },
  { id: "krishna", slug: "krishna", name: "Krishna", hindi: "कृष्ण", productCount: 96 },
  { id: "shiva", slug: "shiva", name: "Shiva", hindi: "शिव", productCount: 84 },
  { id: "durga", slug: "durga", name: "Durga", hindi: "दुर्गा", productCount: 62 },
  { id: "lakshmi", slug: "lakshmi", name: "Lakshmi", hindi: "लक्ष्मी", productCount: 71 },
  { id: "hanuman", slug: "hanuman", name: "Hanuman", hindi: "हनुमान", productCount: 113 },
  { id: "saibaba", slug: "saibaba", name: "Sai Baba", hindi: "साईं बाबा", productCount: 54 },
  { id: "buddha", slug: "buddha", name: "Buddha", hindi: "बुद्ध", productCount: 39 },
  { id: "bells", slug: "bells", name: "Temple Bells", hindi: "घंटी", productCount: 28 },
  { id: "showpieces", slug: "showpieces", name: "Metal Showpieces", hindi: "शोपीस", productCount: 47 },
];

const collections: Collection[] = [
  { id: "wedding", slug: "wedding-gifts", name: "Wedding Gifts" },
  { id: "corporate", slug: "corporate-gifts", name: "Corporate Gifts" },
  { id: "temple", slug: "temple-collection", name: "Temple Collection" },
  { id: "luxbrass", slug: "luxury-brass", name: "Luxury Brass" },
  { id: "marble", slug: "premium-marble", name: "Premium Marble" },
  { id: "moderndecor", slug: "modern-home-decor", name: "Modern Home Décor" },
  { id: "handmade", slug: "handmade-collection", name: "Handmade Collection" },
  { id: "festival", slug: "festival-specials", name: "Festival Specials" },
];

/** Curated material swatches shown in the homepage "Shop by Material" strip. */
export const HOME_MATERIALS = [
  "Brass",
  "Bronze",
  "Marble",
  "Wood",
  "Stone",
  "Copper",
  "Silver",
  "Panchdhatu",
  "Fiber",
  "Resin",
];

export const OCCASIONS = [
  "Diwali",
  "Navratri",
  "Ganesh Chaturthi",
  "Housewarming",
  "Wedding",
  "Temple Opening",
  "Corporate Gifts",
];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
