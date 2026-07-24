export interface ProductSpec {
  k: string;
  v: string;
}

export interface PriceTier {
  label: string;
  price: number;
}

export type StockStatus = "in-stock" | "made-to-order" | "out-of-stock";

export interface Product {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  categorySlug: string;
  material: string;
  height: string;
  weight?: string;
  moq: string;
  rating: number;
  reviewCount?: number;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  occasions: string[];
  images: string[];
  specs: ProductSpec[];
  priceTiers?: PriceTier[];
  stock: StockStatus;
  stockLabel?: string;
  description?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  hindi: string;
  description?: string;
  productCount?: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: number;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  sections: BlogSection[];
}

export interface CartLine {
  productId: string;
  name: string;
  material: string;
  height: string;
  qty: number;
  price: number;
}

export interface WishlistLine {
  productId: string;
  name: string;
  material: string;
  height: string;
  price: number;
}

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  businessName?: string;
  gstNumber?: string;
}

export interface OrderStage {
  title: string;
  detail: string;
  done: boolean;
}

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export interface DemoOrder {
  id: string;
  shortId: string;
  customerName: string;
  placedDate: string;
  estimatedDelivery: string;
  paymentMethod: string;
  status: OrderStatus;
  items: CartLine[];
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
  stages: OrderStage[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  category: string;
  items: FaqItem[];
}

export interface JobRole {
  title: string;
  location: string;
  type: string;
}

export interface ContactDesk {
  tag: string;
  title: string;
  phone: string;
  email: string;
}

export interface WholesaleTrustStat {
  stat: string;
  label: string;
}

export interface WholesaleStep {
  n: string;
  title: string;
  desc: string;
}

export interface WholesaleBuyer {
  title: string;
  desc: string;
}
