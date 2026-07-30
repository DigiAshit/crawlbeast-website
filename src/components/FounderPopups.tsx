"use client";

import React, { useEffect, useState } from "react";
import { useFounderCampaign } from "./FounderCampaignContext";
import { usePopup } from "./PopupContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FounderPopups() {
  const pathname = usePathname();
  const { isCampaignActive, timeLeftFormattedBar, timeLeftFormattedFull } = useFounderCampaign();
  
  // Connect to the main download gated popup state to prevent overlap
  const { isOpen: isDownloadPopupOpen } = usePopup();

  // Popup Visibility States
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showScrollPopup, setShowScrollPopup] = useState(false);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Exit Intent Event Listener
  useEffect(() => {
    if (!isMounted || !isCampaignActive || isDownloadPopupOpen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves out of the top of the viewport (indicating intent to close/change tabs)
      if (e.clientY < 15) {
        const lastShown = localStorage.getItem("crawlbeast_exit_intent_last_shown");
        const oneDayMs = 24 * 60 * 60 * 1000;
        
        if (!lastShown || Date.now() - parseInt(lastShown, 10) > oneDayMs) {
          setShowExitIntent(true);
          localStorage.setItem("crawlbeast_exit_intent_last_shown", Date.now().toString());
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isMounted, isCampaignActive, isDownloadPopupOpen]);

  // Scroll Popup Event Listener (50% scroll)
  useEffect(() => {
    if (!isMounted || !isCampaignActive || isDownloadPopupOpen || showExitIntent) return;

    // Skip if already shown in this session
    if (sessionStorage.getItem("crawlbeast_scroll_popup_shown") === "true") return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = window.scrollY / scrollHeight;
      if (scrollPercent >= 0.5) {
        setShowScrollPopup(true);
        sessionStorage.setItem("crawlbeast_scroll_popup_shown", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted, isCampaignActive, isDownloadPopupOpen, showExitIntent]);

  // If we are currently on the checkout page itself, do not trigger exit intent or scroll modals
  const isCheckoutPage = pathname === "/checkout/founder";
  if (isCheckoutPage) return null;

  if (!isMounted || !isCampaignActive) return null;

  // Render Coordinated states
  return (
    <>
      {/* 1. EXIT INTENT POPUP (Modal Overlay) */}
      <AnimatePresence>
        {showExitIntent && !isDownloadPopupOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0e1320] border border-blue-900/40 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Close offer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-950 border border-blue-900/40 text-accent-blue mb-5">
                <AlertCircle className="h-6 w-6" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Wait! Don&apos;t Lose Your Founder Pricing
              </h2>
              
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                Your personalized Founding Member offer is ending soon. Secure permanent **Lifetime Access for just $29** before the timer expires.
              </p>

              <div className="mb-6 p-4 rounded-xl bg-black/35 border border-white/5 text-center">
                <p className="text-[10px] uppercase font-semibold text-zinc-500 mb-1 tracking-wider">
                  Offer Expires In
                </p>
                <p className="text-sm font-mono font-bold text-yellow-300">
                  {timeLeftFormattedFull}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="sm:order-1 flex-1 inline-flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors font-semibold text-xs text-white py-3 cursor-pointer"
                >
                  Maybe Later
                </button>
                <Link
                  href="/checkout/founder"
                  onClick={() => setShowExitIntent(false)}
                  className="sm:order-2 flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 transition-colors font-bold text-xs text-white py-3 shadow-lg shadow-accent-blue/15 cursor-pointer"
                >
                  Claim Founder Access
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. SCROLL POPUP (Bottom-Right Floating Box) */}
      <AnimatePresence>
        {showScrollPopup && !showExitIntent && !isDownloadPopupOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 max-w-sm w-full bg-[#0e1320] border border-blue-900/40 rounded-xl p-5 shadow-2xl hidden md:block"
          >
            <button
              onClick={() => setShowScrollPopup(false)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss offer"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="flex gap-3.5 items-start">
              <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-blue-950 border border-blue-900/40 text-accent-blue">
                <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-xs font-extrabold text-white mb-1">
                  Founder Offer Ending Soon
                </h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed mb-3">
                  Unlock CrawlBeast forever for a one-time payment of $29. Ends in <span className="font-mono text-yellow-300 font-semibold">{timeLeftFormattedBar}</span>.
                </p>
                <Link
                  href="/checkout/founder"
                  onClick={() => setShowScrollPopup(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 transition-colors font-bold text-[10px] text-white px-3 py-2 cursor-pointer"
                >
                  Unlock Lifetime Access
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FLOATING CORNER BUTTON (Visible when scroll and exit intent popups are closed) */}
      <AnimatePresence>
        {!showExitIntent && !showScrollPopup && !isDownloadPopupOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed bottom-6 right-6 z-30"
          >
            <Link
              href="/checkout/founder"
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-accent-blue to-indigo-600 border border-blue-500/20 hover:brightness-110 shadow-lg shadow-blue-500/10 text-white transition-all text-xs font-semibold select-none cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
              </span>
              <span>🔥 Founder $29</span>
              <span className="text-white/40 font-normal">|</span>
              <span className="font-mono text-yellow-300">{timeLeftFormattedBar}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
