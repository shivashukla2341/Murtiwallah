import type {
  BlogPost,
  ContactDesk,
  FaqGroup,
  JobRole,
  Testimonial,
  WholesaleBuyer,
  WholesaleStep,
  WholesaleTrustStat,
} from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Murtiwallah rebuilt our Ganesh Chaturthi supply chain — on-time, every year.",
    name: "Shree Siddhivinayak Trust",
    role: "Temple Trust",
  },
  {
    id: 2,
    quote:
      "Our customers can feel the difference in the finishing. Repeat orders every month.",
    name: "Om Decor, Jaipur",
    role: "Retail Shop",
  },
  {
    id: 3,
    quote: "I specify their marble pieces for every farmhouse project now.",
    name: "Ananya Rao",
    role: "Interior Designer",
  },
  {
    id: 4,
    quote:
      "Consistent quality across container shipments — rare in this category.",
    name: "Dharma Exports LLC",
    role: "Exporter",
  },
];

export const blogTags = ["All", "Buying Guides", "Comparisons", "Vastu", "Care Guides"];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-choose-a-brass-murti",
    tag: "Buying Guide",
    title: "How to Choose a Brass Murti",
    excerpt:
      "Casting method, weight, finish and MOQ sampling — what to check before you commit to a wholesale order.",
    author: "Team Murtiwallah",
    date: "12 Jun 2026",
    readTime: "6 min read",
    sections: [
      {
        heading: "1. Casting Method",
        paragraphs: [
          "Most wholesale brass murtis are made using either sand casting or the lost-wax (cire perdue) method. Lost-wax casting captures finer detail — ornaments, facial expressions, drapery folds — and is what our Aligarh karigars use for anything above 12 inches. Sand-cast pieces are faster and cheaper, and suit simpler, high-volume festival SKUs.",
          "Ask your supplier which method was used before you commit to a large order — it's the single biggest driver of both price and finish quality.",
        ],
      },
      {
        heading: "2. Weight",
        paragraphs: [
          "Weight is the most reliable proxy for metal purity and wall thickness. A hollow-cast murti will always weigh noticeably less than a solid one of the same size, and thin walls dent in transit. Always ask for weight-per-piece in the spec sheet, not just height — two 18-inch Hanuman murtis can differ by 2kg depending on casting thickness.",
        ],
      },
      {
        heading: "3. Finish & Patina",
        paragraphs: [
          "Antique gold-tone, dark bronze patina and mirror-polished brass all age differently. Antique finishes hide handling marks well and are the most forgiving for retail shelf life; mirror-polished finishes look striking on day one but show fingerprints and need more careful packaging.",
        ],
      },
      {
        heading: "4. MOQ & Sampling",
        paragraphs: [
          "Always request a paid sample before placing a bulk order, even from an established supplier — casting batches vary. Reputable wholesalers (us included) will credit the sample cost against your first bulk order once you confirm.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "marble-vs-brass-what-lasts",
    tag: "Comparison",
    title: "Marble vs Brass: What Lasts",
    excerpt:
      "Both are built for generations — but they age, ship and price very differently. Here's how to decide.",
    author: "Team Murtiwallah",
    date: "28 May 2026",
    readTime: "5 min read",
    sections: [
      {
        heading: "Durability",
        paragraphs: [
          "Marble resists scratching and UV fading better than any metal finish, but it's brittle in transit — corners and fingers are the first casualties of rough handling. Brass and bronze flex rather than chip, which is why we crate metal murtis more loosely and marble ones with full foam encasement.",
        ],
      },
      {
        heading: "Cost at scale",
        paragraphs: [
          "Brass pricing tracks the LME metal rate and moves week to week; marble pricing is comparatively stable but has a higher fixed labour cost per piece, so it doesn't discount as steeply at high volumes as brass does.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "temple-placement-guide-for-home",
    tag: "Vastu",
    title: "Temple Placement Guide for Home",
    excerpt:
      "Direction, height and daily light — the vastu basics dealers get asked about most.",
    author: "Team Murtiwallah",
    date: "14 May 2026",
    readTime: "4 min read",
    sections: [
      {
        heading: "Direction",
        paragraphs: [
          "The north-east corner (Ishaan kon) is considered most auspicious for a home temple, with the murti facing west so the person praying faces east.",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "caring-for-your-brass-murti",
    tag: "Care Guide",
    title: "Caring for Your Brass Murti",
    excerpt: "A simple monthly routine that keeps antique-gold finishes looking new.",
    author: "Team Murtiwallah",
    date: "2 May 2026",
    readTime: "3 min read",
    sections: [
      {
        heading: "Monthly clean",
        paragraphs: [
          "A dry microfiber cloth handles daily dusting. For monthly cleaning, a mix of tamarind pulp and water restores shine without stripping antique-tone lacquer — avoid metal polish on lacquered pieces.",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "reading-a-wholesale-quote",
    tag: "Buying Guide",
    title: "How to Read a Wholesale Quote",
    excerpt: "GST, freight, and MOQ tiers explained line by line.",
    author: "Team Murtiwallah",
    date: "20 Apr 2026",
    readTime: "5 min read",
    sections: [
      {
        heading: "What's usually itemised",
        paragraphs: [
          "A proper wholesale quote breaks out ex-factory price, GST (billed separately at 18% for most idol categories), packaging, and freight — ask for all four lines rather than one bundled number, so you can compare suppliers fairly.",
        ],
      },
    ],
  },
];

export const faqGroups: FaqGroup[] = [
  {
    category: "Ordering & Products",
    items: [
      {
        q: "Can I order a single piece, or is everything wholesale-only?",
        a: "Both — every product page shows a retail price for single-piece orders as well as wholesale tiers that unlock at the listed MOQ. There's no minimum for retail checkout.",
      },
      {
        q: "Are the product photos of the exact piece I'll receive?",
        a: "For made-to-order marble and large brass pieces, photos are representative — hand-finished work has natural variation in patina and minor tool marks, which we consider part of the craft, not a defect.",
      },
      {
        q: "Do you offer custom sizing or custom murtis?",
        a: "Yes, for temple and hospitality orders. Use the Wholesale quote form and select \"Custom Temple Orders\" as your requirement.",
      },
    ],
  },
  {
    category: "Wholesale & Bulk",
    items: [
      {
        q: "What's the minimum order for wholesale pricing?",
        a: "MOQ varies by product and is shown on every product page — typically 5 to 50 pieces depending on size and material.",
      },
      {
        q: "Can I get a sample before placing a bulk order?",
        a: "Yes. Request a paid sample through the Wholesale desk; the sample cost is credited against your first bulk order.",
      },
      {
        q: "Do you export outside India?",
        a: "Yes, to 42 countries — see the Shipping Policy for export timelines and documentation.",
      },
    ],
  },
  {
    category: "Shipping & Returns",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery is 6–8 days pan-India; Express is 2–3 days. Made-to-order and freight/bulk shipments take longer — the exact window is shown at checkout.",
      },
      {
        q: "What's your return policy?",
        a: "Retail orders can be returned within 7 days of delivery. Custom and made-to-order pieces are final sale. See the Refund Policy for full terms.",
      },
    ],
  },
];

export const careers: JobRole[] = [
  { title: "Wholesale Account Manager", location: "Aligarh, UP", type: "Full-time" },
  { title: "Master Karigar — Brass Casting", location: "Moradabad, UP", type: "Full-time" },
  { title: "Export Logistics Coordinator", location: "Delhi NCR", type: "Full-time" },
  { title: "Product Designer", location: "Remote, India", type: "Full-time" },
];

export const contactDesks: ContactDesk[] = [
  { tag: "Retail", title: "Customer Support", phone: "+91 98765 43210", email: "help@murtiwallah.in" },
  { tag: "Wholesale", title: "Dealer Desk", phone: "+91 98765 43211", email: "wholesale@murtiwallah.in" },
  { tag: "Export", title: "Export Desk", phone: "+91 98765 43212", email: "export@murtiwallah.in" },
  { tag: "Temple Orders", title: "Custom Orders", phone: "+91 98765 43213", email: "temples@murtiwallah.in" },
];

export const wholesaleTrustStats: WholesaleTrustStat[] = [
  { stat: "10,000+", label: "Dealers" },
  { stat: "50,000+", label: "Products" },
  { stat: "42", label: "Export Countries" },
  { stat: "6", label: "Warehouses" },
  { stat: "24hr", label: "Quote Turnaround" },
  { stat: "100%", label: "GST Billed" },
];

export const wholesaleSteps: WholesaleStep[] = [
  { n: "01", title: "Enquire", desc: "Tell us your product, quantity and city — takes two minutes." },
  { n: "02", title: "Sample", desc: "We ship a paid sample; cost is credited to your first order." },
  { n: "03", title: "Quote", desc: "GST-billed quote with MOQ pricing tiers within 24 hours." },
  { n: "04", title: "Order", desc: "Confirm and pay — advance or full, your call." },
  { n: "05", title: "Dispatch", desc: "Pan-India logistics or export documentation, handled end to end." },
];

export const wholesaleBuyers: WholesaleBuyer[] = [
  { title: "Temple Trusts", desc: "Full sanctum installs, festival stock and annual replenishment." },
  { title: "Interior Designers", desc: "Curated marble and brass pieces for residential and hospitality projects." },
  { title: "Corporate Buyers", desc: "Branded festival gifting at volume, GST-invoiced." },
  { title: "Exporters", desc: "Container-consistent quality with full export documentation." },
  { title: "Dealers", desc: "Shelf-ready stock across every material and price tier." },
];

export const aboutProcess = [
  { n: 1, title: "Design & Proportion", desc: "Every piece starts as a scale drawing measured against shastra ratios, not a mould catalogue." },
  { n: 2, title: "Rough Cast or Carve", desc: "Metal is lost-wax cast; stone is rough-cut by hand from a single block." },
  { n: 3, title: "Hand Finishing", desc: "Eyes, ornaments and drapery folds are finished entirely by hand — the step that separates a murti from a casting." },
  { n: 4, title: "Inspection & Dispatch", desc: "Every piece is inspected for casting purity and finish before it leaves the workshop." },
];

export const aboutValues = [
  { title: "Craft Over Speed", desc: "We'd rather ship six weeks late than ship a piece our karigars aren't proud of." },
  { title: "Fair to the Karigar", desc: "Piece-rate pay is benchmarked above market, with festival-season bonuses." },
  { title: "Honest Grading", desc: "We tell you when a piece has natural variation — we don't hide it in the photos." },
  { title: "Pan-India Reliability", desc: "The same delivery promise whether you're ordering 1 piece or 1,000." },
];
