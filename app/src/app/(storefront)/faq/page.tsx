import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqGroups } from "@/lib/mock";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Ordering, wholesale and shipping questions, answered.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[760px] px-5 py-11 sm:px-8">
      <p className="mb-2.5 font-devanagari text-sm text-accent-700">प्रश्न — FAQ</p>
      <h1 className="mb-9 text-[32px] sm:text-[38px]">Frequently Asked Questions</h1>

      <div className="flex flex-col gap-9">
        {faqGroups.map((group) => (
          <div key={group.category}>
            <h2 className="mb-2 text-[20px]">{group.category}</h2>
            <Accordion defaultValue={[`${group.category}-0`]}>
              {group.items.map((item, i) => (
                <AccordionItem key={item.q} value={`${group.category}-${i}`}>
                  <AccordionTrigger className="font-heading text-[15px] font-semibold">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-foreground/72">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
