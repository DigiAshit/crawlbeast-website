"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import DownloadModal from "@/components/ui/download-modal";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.8, ease: easeWeb }
};

interface PlanItem {
  name: string;
  description?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  buttonText?: string;
  popular?: boolean;
  features: string[];
}

interface PricingBlockProps {
  title: string;
  description?: string;
  plans: PlanItem[];
}

export default function PricingBlock({
  title,
  description,
  plans
}: PricingBlockProps) {
  const [isYearlyBilling, setIsYearlyBilling] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.section 
      {...fadeInUp}
      className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-semibold tracking-wider text-[#0A39F0] font-mono">Pricing Plans</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4 font-display">{title}</h2>
        {description && (
          <p className="text-zinc-400 text-sm">{description}</p>
        )}

        {/* Toggle Billing Switch */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <span className={`text-sm ${!isYearlyBilling ? "text-white font-medium" : "text-zinc-500"}`}>Billed Monthly</span>
          <button
            onClick={(e) => { e.preventDefault(); setIsYearlyBilling(!isYearlyBilling); }}
            className="relative h-7 w-12 rounded-full bg-[#000F5C] border border-white/10 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle billing plan"
          >
            <motion.div
              layout
              className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white"
              animate={{ x: isYearlyBilling ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isYearlyBilling ? "text-white font-medium" : "text-zinc-500"}`}>Billed Annually</span>
            <span className="text-[10px] font-bold text-green-500 bg-green-950 border border-green-900/50 px-2 py-0.5 rounded">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const price = isYearlyBilling ? plan.yearlyPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.name}
              className={`glow-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden ${
                plan.popular ? "border-[#0A39F0]/60 shadow-[0_0_45px_rgba(10,57,240,0.25)] bg-[#000F5C]/80" : "bg-[#000F5C]/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-blue-950 border border-blue-900/40 px-3 py-1 text-[10px] font-bold text-[#0A39F0]">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                {plan.description && (
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">{plan.description}</p>
                )}

                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">${price}</span>
                  <span className="text-xs text-zinc-500 font-medium">/ month</span>
                </div>

                <hr className="border-white/5 my-6" />

                <ul className="flex flex-col gap-3.5 text-xs text-zinc-300 font-mono">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#0A39F0]/20 border border-[#0A39F0]/30">
                        <Check className="h-3.5 w-3.5 text-[#0A39F0]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full group flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold transition-all cursor-pointer bg-[#0A39F0] text-white hover:bg-[#002bd6] shadow-[0_4px_20px_rgba(10,57,240,0.3)]"
                >
                  {plan.buttonText || "Start Now"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.section>
  );
}
