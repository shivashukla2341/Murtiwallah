import type { Metadata } from "next";

import { LegalPage, LegalSection } from "@/components/storefront/legal-page";

export const metadata: Metadata = { title: "Shipping Policy" };

const METHODS = [
  { method: "Standard", timeline: "6–8 days", cost: "Free" },
  { method: "Express", timeline: "2–3 days", cost: "₹450" },
  { method: "Freight (bulk)", timeline: "7–12 days", cost: "Quoted" },
];

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy" lastUpdated="1 July 2026">
      <LegalSection heading="Domestic Delivery">
        <p>We ship Pan-India from our Aligarh, Jaipur and Moradabad warehouses.</p>
        <table className="w-full text-[14px]">
          <thead>
            <tr>
              <th className="border-b border-border py-2 text-left text-[11px] tracking-[0.08em] text-foreground/60 uppercase">
                Method
              </th>
              <th className="border-b border-border py-2 text-left text-[11px] tracking-[0.08em] text-foreground/60 uppercase">
                Timeline
              </th>
              <th className="border-b border-border py-2 text-left text-[11px] tracking-[0.08em] text-foreground/60 uppercase">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {METHODS.map((m) => (
              <tr key={m.method}>
                <td className="border-b border-border py-2">{m.method}</td>
                <td className="border-b border-border py-2">{m.timeline}</td>
                <td className="border-b border-border py-2">{m.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </LegalSection>
      <LegalSection heading="Export Shipping">
        <p>
          We export to 42 countries. Export timelines and documentation (commercial invoice,
          packing list, certificate of origin) are confirmed with your wholesale quote.
        </p>
      </LegalSection>
      <LegalSection heading="Packaging">
        <p>
          Metal pieces ship in foam-cornered cartons; marble and stone pieces are fully
          foam-encased and crated for freight orders.
        </p>
      </LegalSection>
      <LegalSection heading="Delays">
        <p>
          Made-to-order and festival-season shipments may take longer than the standard window —
          the exact estimate is always shown at checkout before you pay.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
