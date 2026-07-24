import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/storefront/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="1 July 2026">
      <LegalSection heading="Information We Collect">
        <p>
          We collect information you give us directly — name, phone, email, shipping address and
          GST details — when you place an order, request a wholesale quote, or contact us. We also
          collect standard technical data (IP address, browser type, pages visited) via cookies and
          analytics to keep the site working properly.
        </p>
      </LegalSection>
      <LegalSection heading="How We Use Your Information">
        <p>
          To process and ship orders, generate GST invoices, respond to enquiries, send order and
          shipping updates, and — if you&rsquo;ve opted in — send our journal newsletter. We do not sell
          your personal data.
        </p>
      </LegalSection>
      <LegalSection heading="Sharing With Third Parties">
        <p>
          We share order data only with the vendors needed to fulfil it: payment processors (for
          transaction verification), logistics partners (for delivery) and, where legally required,
          government authorities.
        </p>
      </LegalSection>
      <LegalSection heading="Data Security">
        <p>
          Payment details are processed by PCI-DSS compliant providers and are never stored on our
          servers. Account and order data is encrypted in transit and at rest.
        </p>
      </LegalSection>
      <LegalSection heading="Your Rights">
        <p>
          You can request a copy of the data we hold on you, ask us to correct it, or request
          deletion (subject to statutory invoice-retention requirements) by writing to
          help@murtiwallah.in.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
