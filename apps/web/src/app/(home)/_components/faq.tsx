"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FAQS } from "@/lib/constants";

export function FAQ() {
  return (
    <section className="relative bg-[#F9F4ED] py-24 sm:py-32">
      <div className="container mx-auto max-w-[800px] px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-bold text-4xl text-[#23191A] tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#23191A]/70">
            Common questions and answers about NectaFi.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <Accordion type="single" collapsible className="space-y-6">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="group border-[#23191A]/5 bg-gradient-to-br from-white via-white/95 to-white/90 rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(35,25,26,0.05)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(242,150,0,0.12)]"
              >
                <AccordionTrigger className="group py-6 px-8 hover:no-underline [&[data-state=open]>div>span]:text-[#F29600]">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-left font-medium text-[#23191A] text-lg transition-colors duration-200">{faq.question}</span>
                    <span className="ml-4 text-[#23191A]/40 text-2xl transition-all duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:text-[#F29600]">
                      +
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <p className="text-base text-[#23191A]/70 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
