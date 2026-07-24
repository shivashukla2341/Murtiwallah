import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/storefront/legal-page";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="1 July 2026">
      <LegalSection heading="Acceptance of Terms">
        <p>
          By placing an order or using this site, you agree to these terms. If you don&rsquo;t agree,
          please don&rsquo;t use the site or place an order.
        </p>
      </LegalSection>
      <LegalSection heading="Pricing & GST">
        <p>
          All prices are listed per piece in Indian Rupees and exclude GST unless stated otherwise.
          GST is billed separately at checkout at the applicable rate for the product category.
        </p>
      </LegalSection>
      <LegalSection heading="Wholesale & MOQ Orders">
        <p>
          Wholesale pricing tiers unlock at the minimum order quantity (MOQ) listed on each product.
          Wholesale orders are confirmed only after a signed quote and advance payment, per the terms
          quoted by our wholesale desk.
        </p>
      </LegalSection>
      <LegalSection heading="Product Representation">
        <p>
          Our idols and décor are hand-finished, not machine-moulded — minor variation in patina,
          proportion and tool marks between individual pieces is normal and is not considered a
          manufacturing defect.
        </p>
      </LegalSection>
      <LegalSection heading="Limitation of Liability">
        <p>
          Murtiwallah&rsquo;s liability for any claim relating to an order is limited to the value of that
          order. We are not liable for indirect or consequential loss.
        </p>
      </LegalSection>
      <LegalSection heading="Governing Law">
        <p>
          These terms are governed by the laws of India, with courts in Aligarh, Uttar Pradesh
          having exclusive jurisdiction.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
