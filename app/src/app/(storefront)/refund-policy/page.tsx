import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/storefront/legal-page";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" lastUpdated="1 July 2026">
      <LegalSection heading="Retail Orders">
        <p>
          Retail orders can be returned within 7 days of delivery for a full refund, provided the
          piece is unused and in its original packaging.
        </p>
      </LegalSection>
      <LegalSection heading="Custom & Made-to-Order">
        <p>
          Custom sizing, custom temple orders and made-to-order marble/large brass pieces are final
          sale and not eligible for return, except for manufacturing defects.
        </p>
      </LegalSection>
      <LegalSection heading="Wholesale & Bulk Orders">
        <ul className="list-disc pl-5">
          <li>Samples are non-refundable but credited against your first bulk order.</li>
          <li>Bulk orders are covered by the terms in your signed wholesale quote.</li>
          <li>Damage claims on bulk shipments must be reported within 48 hours of delivery.</li>
        </ul>
      </LegalSection>
      <LegalSection heading="Damaged or Incorrect Items">
        <p>
          Report damaged or incorrect items within 48 hours of delivery with photos to
          help@murtiwallah.in — we&rsquo;ll arrange a replacement or refund at no extra cost.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
