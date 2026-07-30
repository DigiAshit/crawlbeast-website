"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useFounderCampaign } from "./FounderCampaignContext";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyAnnouncementBar() {
  const { isCampaignActive, timeLeftFormattedBar } = useFounderCampaign();

  return (
    <AnimatePresence>
      {isCampaignActive && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 h-10 bg-gradient-to-r from-accent-blue via-[#0676FE] to-indigo-600 text-white flex items-center justify-center text-xs font-medium px-4 shadow-lg select-none"
        >
          <Link
            href="/checkout/founder"
            className="flex items-center gap-1.5 hover:opacity-90 transition-opacity tracking-wide"
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[10px] bg-white/15 px-1.5 py-0.5 rounded mr-1">
              Founder Launch
            </span>
            <span>Get Lifetime Access for <strong>$29</strong></span>
            <span className="text-white/40 mx-1.5">•</span>
            <span>Ends in <span className="font-mono bg-black/25 px-1.5 py-0.5 rounded text-yellow-300">{timeLeftFormattedBar}</span></span>
            <ArrowRight className="h-3 w-3 ml-1 text-white animate-bounce-horizontal shrink-0" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
