import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ArrowUpRight, Plus, X } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      id: "1",
      question: "How fast is Resolva Core?",
      answer: (
        <>
          Arrow Dynamics is a Framer Component to build interactive animations
          and patterns. It is one single, blazing fast, code-component with
          Property Controls that make it easy to customise grid layout,
          interactions, motion controls and object parameters, etc.{" "}
          <a
            href="#"
            className="inline-flex items-center gap-1 text-white hover:underline"
          >
            See Examples <ArrowUpRight className="w-3 h-3" />
          </a>
        </>
      ),
    },
    {
      id: "2",
      question: "How fast is Resolva Core?",
      answer:
        "Lightning-fast processing with bank-grade security. Your transactions are completed in seconds.",
    },
    {
      id: "3",
      question: "How fast is Resolva Core?",
      answer: "We process payments instantly with 99.9% uptime guarantee.",
    },
    {
      id: "4",
      question: "How fast is Resolva Core?",
      answer: "Real-time transaction tracking with instant notifications.",
    },
  ];
  return (
    <div className="w-full bg-[url(/faqBg.png)] bg-cover bg-no-repeat bg-center py-8 md:py-[67px] font-inter">
      <div className="max-w-[73rem] mx-auto px-4">
        <div className="flex flex-col gap-2 md:gap-4 items-center text-center mb-12 md:mb-24">
          <h2 className="font-medium text-2xl md:text-3xl lg:text-4xl tracking-[0.35px] text-white">
            Frequently Asked Questions
          </h2>
          <p className="font-normal text-base md:text-lg lg:text-xl tracking-[-0.45px] bg-gradient-to-r from-[#C3CBCA] to-[#B2C1C0] bg-clip-text text-transparent">
            Need more clarifications? Reach out to Cas here at
            cas@resolvalabs.com
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="1"
          className="space-y-0 border-l border-t border-[#0E173B] max-w-[60rem] mx-auto"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-[#0E173B] last:border-b-0"
            >
              <AccordionTrigger className="group py-4 md:py-8 hover:no-underline">
                <div className="flex items-center gap-2 md:gap-3 w-full pl-4 md:pl-8">
                  {/* Icons with smooth transition */}
                  <div className="flex-shrink-0 relative w-6 md:w-7 h-6 md:h-7">
                    <Plus
                      className="
            absolute inset-0 w-6 md:w-7 h-6 md:h-7 text-[#4d5164] 
            transition-transform duration-300 
            group-data-[state=open]:opacity-0
            group-data-[state=open]:scale-75
          "
                    />
                    <X
                      className="
            absolute inset-0 w-6 md:w-7 h-6 md:h-7 text-[#4d5164] 
            transition-transform duration-300 opacity-0 scale-75
            group-data-[state=open]:opacity-100
            group-data-[state=open]:scale-100
          "
                    />
                  </div>

                  <h3 className="text-lg md:text-xl lg:text-2xl tracking-[-0.45px] font-normal text-white">
                    {faq.question}
                  </h3>
                </div>
              </AccordionTrigger>

              {/* Smooth accordion open/close animation */}
              <AccordionContent
                className="
      pb-4 md:pb-8 pt-0 pl-4 md:pl-8 text-[#CAD5E2] max-w-3xl text-sm md:text-base
      data-[state=open]:animate-accordion-down
      data-[state=closed]:animate-accordion-up
    "
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
