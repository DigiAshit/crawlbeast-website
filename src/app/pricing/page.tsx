"use client";
import React, { useState } from "react";
import { usePopup } from "@/components/PopupContext";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PricingPage: React.FC = () => {
  const { openPopup } = usePopup();
  const [isYearly, setIsYearly] = useState(false);

  // Pro price: $12 monthly, $9 yearly
  // Advanced price: $22 monthly, $19 yearly
  const plans = [
    {
      name: "Free Plan",
      desc: "Perfect for beginners and small audits.",
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        "Crawl up to 1,000 URLs",
        "Up to 5 active projects",
        "Core SEO checks (meta, links, images)",
        "Community support forums",
        "All future features included",
        "Email Support"
      ],
      cta: "Download Now",
      featured: false
    },
    {
      name: "Pro Plan",
      desc: "For freelancers and SEO professionals.",
      priceMonthly: 12,
      priceYearly: 9,
      features: [
        "Crawl up to 20,000 URLs",
        "Up to 100 active projects",
        "All SEO checks enabled",
        "Faster crawling performance",
        "All future features included",
        "Email Support"
      ],
      cta: "Start Now",
      featured: true
    },
    {
      name: "Advanced Plan",
      desc: "For agencies and heavy search users.",
      priceMonthly: 22,
      priceYearly: 19,
      features: [
        "Crawl up to 100,000 URLs",
        "Unlimited active projects",
        "Priority crawl speed settings",
        "Detailed csv exporter scripts",
        "All future features included",
        "Email Support"
      ],
      cta: "Start Now",
      featured: false
    }
  ];

  return (
    <main className="flex-1 py-16 md:py-24 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-secondary mb-3 uppercase tracking-wider">
            Pricing Plans
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Flexible Plans for Every Team Size
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Simple, transparent pricing. Start free, upgrade when you need more power.
          </p>
        </div>

        {/* Toggle billing option */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setIsYearly(false)}
            className={`text-sm font-semibold cursor-pointer transition-colors ${
              !isYearly ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Billed Monthly
          </button>
          
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-12 h-7 rounded-full bg-white/10 border border-white/5 relative p-0.5 transition-colors cursor-pointer"
            aria-label="Toggle annual pricing"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ float: isYearly ? "right" : "left" }}
            />
          </button>

          <button
            onClick={() => setIsYearly(true)}
            className={`text-sm font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
              isYearly ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Billed Annually
            <span className="text-[10px] font-bold text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Save 20%
            </span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan) => {
            const currentPrice = isYearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={plan.name}
                className={`relative bg-[#0e1320] border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.featured
                    ? "border-primary shadow-2xl shadow-primary/5 lg:scale-105"
                    : "border-white/5 hover:border-zinc-800"
                }`}
              >
                {/* Featured Badge */}
                {plan.featured && (
                  <span className="absolute -top-3 right-6 inline-flex items-center gap-1 bg-gradient-to-r from-primary to-secondary text-white font-bold text-[9px] uppercase tracking-wider py-1 px-3 rounded-full">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6">{plan.desc}</p>
                  
                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span className="text-4xl md:text-5xl font-extrabold text-white font-mono tracking-tight">
                      ${currentPrice}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      / month {isYearly && currentPrice > 0 ? ", billed annually" : ""}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs md:text-sm text-zinc-300 font-medium">
                        <Check className="h-4 w-4 text-secondary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={openPopup}
                  className={`w-full py-3.5 px-6 rounded-lg text-sm font-semibold transition-all cursor-pointer active:scale-95 ${
                    plan.featured
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/10"
                      : "bg-white/5 border border-white/5 hover:border-zinc-700 text-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Pricing Sub-note */}
        <p className="text-center text-xs text-zinc-600 mt-16 max-w-md mx-auto leading-relaxed">
          Need a custom crawling volume or custom enterprise licensing options? <br />
          <a href="mailto:support@crawlbeast.com" className="text-primary hover:underline font-semibold">
            Contact support@crawlbeast.com
          </a> for custom quotes.
        </p>
      </div>
    </main>
  );
};

export default PricingPage;
