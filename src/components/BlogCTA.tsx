"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { usePopup } from "@/components/PopupContext";

interface BlogCTAProps {
  ctaText: string;
}

export default function BlogCTA({ ctaText }: BlogCTAProps) {
  const { openPopup } = usePopup();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-[#0e1629] to-[#07090e] p-8 sm:p-10 my-16 shadow-2xl text-white">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary" />
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5">
        <ShieldCheck className="h-64 w-64 text-[#0676FE]" />
      </div>
      <div className="relative z-10 max-w-2xl">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Ready to audit client websites faster?
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          {ctaText} Crawl client pages locally with total data privacy, speed, and unlimited monthly credits.
        </p>
        <button 
          onClick={openPopup}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0676FE] hover:bg-blue-600 transition-colors py-3.5 px-6 text-sm font-semibold text-white cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/30"
        >
          Download CrawlBeast
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
