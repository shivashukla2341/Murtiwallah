import Link from "next/link";

import { NewsletterForm } from "@/components/layout/newsletter-form";

/* lucide-react ships no brand/logo glyphs, so these are the same hand-drawn
   inline marks the mockup uses (Footer.dc.html) rather than an icon import. */
const SOCIAL_LINKS: { label: string; path: React.ReactNode }[] = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </>
    ),
  },
  {
    label: "Facebook",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "YouTube",
    path: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

const SHOP_LINKS = [
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Shop All Idols" },
  { href: "/products", label: "Shop by Material" },
  { href: "/products", label: "Festival Collection" },
];

const BUSINESS_LINKS = [
  { href: "/wholesale", label: "Wholesale" },
  { href: "/wholesale", label: "Export" },
  { href: "/wholesale", label: "Custom Temple Orders" },
  { href: "/about", label: "Craftsmanship" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Journal" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-[1320px] px-5 pt-12 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="font-heading text-[22px] text-primary">ॐ</span>
              <span className="font-heading text-[21px] font-semibold">Murtiwallah</span>
            </div>
            <p className="mb-4 max-w-[30ch] text-[13.5px] text-foreground/72">
              Handcrafted idols and temple décor, wholesaled to India and exported worldwide since
              generations of the same karigar families.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-accent-700"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    {path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Business" links={BUSINESS_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />

          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="mb-3.5 text-xs tracking-[0.1em] text-foreground uppercase">Newsletter</h3>
            <p className="mb-3 text-[13px] text-foreground/72">
              Craft notes and new arrivals, twice a month.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <hr className="hr mt-11" />
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6.5 text-[12.5px] text-foreground/60">
          <span>© 2026 Murtiwallah. All rights reserved.</span>
          <div className="flex flex-wrap gap-5">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-foreground/72 hover:text-accent-700">
                {l.label}
              </Link>
            ))}
            <span>GST: 27ABCDE1234F1Z5</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3.5 text-xs tracking-[0.1em] text-foreground uppercase">{title}</h3>
      <div className="flex flex-col gap-2.5">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="text-[13.5px] text-foreground/72 no-underline hover:text-accent-700"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
