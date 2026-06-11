"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DownloadModal from "@/components/ui/download-modal";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.8, ease: easeWeb }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeWeb }
  }
};

const pricingFaqs = [
  {
    q: "Can I use the license on multiple devices?",
    a: "Licenses are intended for single-user usage. If you need usage across multiple systems, consider upgrading or contacting support."
  },
  {
    q: "What is included in the Free plan?",
    a: "The Free plan allows you to crawl up to 1,000 URLs per audit, manage up to 5 projects, run core SEO checks, and access our community support forum."
  },
  {
    q: "What happens when I reach my URL limit?",
    a: "Once you reach the crawl limit for your plan, the crawl will automatically pause. You can upgrade to a higher tier plan (Pro or Advanced) to crawl more URLs instantly."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes! You can upgrade your plan at any time through our customer portal. Any remaining balance on your previous plan will be credited pro-rata."
  },
  {
    q: "Does the app work offline?",
    a: "Yes! Because CrawlBeast runs directly on your desktop, you can review previous crawl reports, analyze audit scores, and work on fixing issues offline. An internet connection is only needed to run new active crawls."
  },
  {
    q: "How do I receive my license after payment?",
    a: "Your license key is delivered instantly via email as soon as the transaction is complete. You can enter the license key directly in the app settings to unlock premium limits."
  }
];

const plans = [
  {
    name: "Free Plan",
    desc: "Perfect for beginners and small audits.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    buttonText: "Download Now",
    popular: false,
    features: [
      "Crawl up to 1,000 URLs",
      "Up to 5 projects",
      "Core SEO checks (meta, links, images, etc.)",
      "Community support",
      "All future features included",
      "Email Support"
    ]
  },
  {
    name: "Pro Plan",
    desc: "For freelancers and SEO professionals.",
    monthlyPrice: 12,
    yearlyPrice: 9,
    buttonText: "Start Now",
    popular: true,
    features: [
      "Crawl up to 20,000 URLs",
      "Up to 100 projects",
      "All SEO checks",
      "Faster crawling performance",
      "All future features included",
      "Email Support"
    ]
  },
  {
    name: "Advanced Plan",
    desc: "For agencies and heavy users.",
    monthlyPrice: 22,
    yearlyPrice: 19,
    buttonText: "Start Now",
    popular: false,
    features: [
      "Crawl up to 100,000 URLs",
      "All Pro features",
      "Unlimited projects",
      "Priority crawl speed (maximum performance)",
      "All future features included",
      "Email Support"
    ]
  }
];

const comparisonMatrix = [
  { feature: "Crawl Limit", free: "1,000 URLs", pro: "20,000 URLs", advanced: "100,000 URLs" },
  { feature: "Project Limit", free: "5 Projects", pro: "100 Projects", advanced: "Unlimited" },
  { feature: "SEO Diagnostic Checks", free: "Core Checks", pro: "All Checks", advanced: "All Checks" },
  { feature: "Crawl Speed", free: "Standard", pro: "Fast", proHighlight: true, advanced: "Priority (Maximum)" },
  { feature: "Support SLA", free: "Community Forum", pro: "Email (24h)", advanced: "Priority Support (4h)" },
  { feature: "Export Formats", free: "CSV, PDF", pro: "CSV, PDF", advanced: "CSV, PDF, JSON" },
  { feature: "Future Updates", free: "Included", pro: "Included", advanced: "Included" }
];

export default function StaticPricing() {
  const [isYearly, setIsYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#07090E] via-[#0b142c] to-[#07090E] overflow-hidden bg-grid-noise py-20 px-6">
      {/* Glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
      <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />
      <div className="bg-column-lines" />

      {/* Intro Header */}
      <motion.div {...fadeInUp} className="relative max-w-4xl mx-auto text-center mt-12 mb-16">
        <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue bg-blue-950/40 border border-blue-900/40 px-3 py-1 rounded-full">
          Pricing Plans
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mt-6 mb-4">
          Flexible Plans for Every SEO Workflow
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
          Simple, transparent pricing. Start free, upgrade when you need more crawling power and advanced reporting.
        </p>

        {/* Toggle Billing Switch */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <span className={`text-sm ${!isYearly ? "text-white font-medium" : "text-zinc-500"}`}>Billed Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative h-7 w-12 rounded-full bg-zinc-800 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle billing plan"
          >
            <motion.div
              layout
              className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white"
              animate={{ x: isYearly ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isYearly ? "text-white font-medium" : "text-zinc-500"}`}>Billed Annually</span>
            <span className="text-[10px] font-bold text-green-500 bg-green-950 border border-green-900/50 px-2 py-0.5 rounded">
              Save 20%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {plans.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
          return (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`glow-card rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden ${
                plan.popular ? "border-accent-blue/50 shadow-[0_0_45px_rgba(25,119,247,0.15)] bg-zinc-950/60" : "bg-zinc-950/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-blue-950 border border-blue-900/40 px-3 py-1 text-[10px] font-bold text-accent-blue">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-6">{plan.desc}</p>

                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">${price}</span>
                  <span className="text-xs text-zinc-500 font-medium">/ month</span>
                </div>

                <hr className="border-zinc-900 my-6" />

                <ul className="flex flex-col gap-3.5 text-xs text-zinc-350">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-blue-950/40 border border-blue-900/30">
                        <Check className="h-3.5 w-3.5 text-accent-blue" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={triggerModal}
                  className="w-full group flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold transition-all cursor-pointer bg-primary text-white hover:bg-blue-600 shadow-[0_4px_20px_rgba(6,118,254,0.15)]"
                >
                  {plan.buttonText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Plan Feature Comparison Table */}
      <motion.section 
        {...fadeInUp}
        className="relative mt-24 max-w-5xl mx-auto border-t border-zinc-900 pt-20"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-12">Compare Plan Features</h2>
        <div className="w-full overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm">
          <table className="w-full border-collapse text-left text-xs min-w-[600px]">
            <thead>
              <tr className="border-b border-zinc-900 text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                <th className="p-4.5">Features</th>
                <th className="p-4.5">Free</th>
                <th className="p-4.5">Pro</th>
                <th className="p-4.5">Advanced</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300">
              {comparisonMatrix.map((row) => (
                <tr key={row.feature} className="hover:bg-zinc-950/40 transition-colors">
                  <td className="p-4.5 font-medium text-white">{row.feature}</td>
                  <td className="p-4.5">{row.free}</td>
                  <td className={`p-4.5 ${row.proHighlight ? "text-accent-blue font-semibold" : ""}`}>
                    {row.pro}
                  </td>
                  <td className="p-4.5">{row.advanced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* FAQ Accordion Section */}
      <motion.section 
        {...fadeInUp}
        className="relative py-24 px-6 max-w-4xl mx-auto border-t border-zinc-900 mt-20"
      >
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue">FAQs</span>
          <h2 className="text-3xl font-extrabold text-white mt-3 mb-4">Everything You Need to Know</h2>
          <p className="text-zinc-400 text-sm">
            Our platform brings everything you need into one place, making your work easier so you can concentrate on growing your business.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {pricingFaqs.map((faq, idx) => {
            const isFaqOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-zinc-900 rounded-lg bg-zinc-950/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isFaqOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-medium text-white transition-colors hover:bg-zinc-950"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${isFaqOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isFaqOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 border-t border-zinc-900 text-xs text-zinc-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Bottom Callout */}
      <div className="relative py-12 px-6 max-w-5xl mx-auto text-center border-t border-zinc-900 rounded-2xl bg-zinc-950/20 mt-12 border border-zinc-900/50">
        <h3 className="text-xl font-bold text-white mb-2">Need a custom plan for large enterprise clients?</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
          If you need to crawl millions of pages or manage custom API nodes, contact our support team.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors"
        >
          Contact Support
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
