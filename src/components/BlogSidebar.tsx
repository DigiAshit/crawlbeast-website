"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { usePopup } from "@/components/PopupContext";

export default function BlogSidebar() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { openPopup } = usePopup();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <div className="sticky top-28 space-y-8 max-w-[280px]">
      {/* Widget 1: Author Card */}
      <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50/50">
        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">
          Published By
        </h5>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-[#0676FE] flex items-center justify-center text-white text-sm font-extrabold shadow-md shadow-primary/20">
            CB
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">CrawlBeast Team</h4>
            <p className="text-[10px] font-medium text-zinc-500">SEO Research & Dev</p>
          </div>
        </div>
        <p className="text-xs text-zinc-600 leading-relaxed">
          Technical SEO engineers building local website crawling technology to help agencies audit sites faster without cloud restrictions.
        </p>
      </div>

      {/* Widget 2: Product Promotion CTA */}
      <div className="border border-[#0676FE]/20 rounded-2xl p-6 bg-gradient-to-br from-[#0e1629] to-[#07090e] text-white relative overflow-hidden shadow-xl shadow-primary/5">
        <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none">
          <ShieldCheck className="h-32 w-32" />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-[#0676FE]" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0676FE]">
            Featured Tool
          </span>
        </div>
        <h4 className="text-base font-extrabold text-white mb-2 leading-snug">
          Audit Client Sites 10x Faster
        </h4>
        <p className="text-zinc-400 text-xs leading-relaxed mb-5">
          Run high-speed local audits. Zero monthly cloud limits, total data privacy, and custom agency PDF report exports.
        </p>
        <button
          onClick={openPopup}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0676FE] hover:bg-blue-600 transition-colors py-2.5 px-4 text-xs font-bold text-white shadow-lg shadow-primary/10 cursor-pointer"
        >
          Download Free
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Widget 3: Newsletter Widget */}
      <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50/50">
        <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
          Get SEO Insights
        </h5>
        <p className="text-xs text-zinc-600 leading-relaxed mb-4">
          Join 2,000+ agency founders receiving weekly technical SEO diagnostic checklists and crawling guides.
        </p>
        {isSubscribed ? (
          <div className="text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
            Thanks! You have been subscribed.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Mail className="h-3.5 w-3.5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-white border border-zinc-200 focus:border-primary/50 rounded-xl py-2 pl-9 pr-3 text-xs text-zinc-800 placeholder-zinc-400 outline-none transition-all focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-zinc-900 hover:bg-zinc-800 transition-colors text-white font-bold py-2 rounded-xl text-xs"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
