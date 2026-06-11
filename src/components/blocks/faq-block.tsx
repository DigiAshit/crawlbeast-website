"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.8, ease: easeWeb }
};

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqBlockProps {
  title: string;
  faqs: FaqItem[];
}

export default function FaqBlock({
  title,
  faqs
}: FaqBlockProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <motion.section 
      {...fadeInUp}
      className="py-24 px-6 max-w-4xl mx-auto border-t border-zinc-900"
    >
      <div className="text-center mb-16">
        <span className="text-xs uppercase font-semibold tracking-wider text-[#0A39F0]">FAQs</span>
        <h2 className="text-3xl font-extrabold text-white mt-3 mb-4">{title}</h2>
        <p className="text-zinc-400 text-sm">
          Our platform brings everything you need into one place, making your work easier so you can concentrate on growing your business.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isFaqOpen = openFaq === idx;
          return (
            <div 
              key={idx}
              className={`transition-all duration-300 overflow-hidden ${
                isFaqOpen 
                  ? "border border-[#0A39F0] rounded-2xl bg-gradient-to-br from-[#000F5C] to-[#00178A]/40 shadow-[0_0_30px_rgba(10,57,240,0.15)] scale-[1.01]" 
                  : "border border-white/10 rounded-xl bg-gradient-to-br from-[#000F5C]/30 to-[#00178A]/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpenFaq(isFaqOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-medium text-white transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${isFaqOpen ? "rotate-180 text-[#0A39F0]" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isFaqOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 border-t border-white/10 text-xs text-zinc-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
