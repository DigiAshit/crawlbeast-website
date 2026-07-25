"use client";
import React, { useEffect, useState } from "react";
import { usePopup } from "@/components/PopupContext";

export default function GatedDownload({ children }: { children: React.ReactNode }) {
  const { openPopup, isOpen } = usePopup();
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsUnlocked = () => {
      // 1. Check URL parameters (redirected from lead capture)
      const params = new URLSearchParams(window.location.search);
      if (params.get("email") && params.get("name")) {
        const unlockData = {
          unlocked: true,
          timestamp: Date.now()
        };
        localStorage.setItem("crawlbeast_download_unlocked", JSON.stringify(unlockData));
        return true;
      }

      // 2. Check localStorage
      const stored = localStorage.getItem("crawlbeast_download_unlocked");
      if (!stored) return false;

      try {
        const data = JSON.parse(stored);
        if (data && data.unlocked) {
          const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
          if (Date.now() - data.timestamp < thirtyDaysMs) {
            return true;
          }
        }
      } catch (e) {
        if (stored === "true") return true;
      }
      return false;
    };

    const unlocked = checkIsUnlocked();
    setIsUnlocked(unlocked);

    if (!unlocked) {
      openPopup({ gated: true });
    }
  }, [openPopup]);

  // Reactive listener to open state to check when user submits
  useEffect(() => {
    if (isUnlocked === false && !isOpen) {
      const stored = localStorage.getItem("crawlbeast_download_unlocked");
      if (stored) {
        setIsUnlocked(true);
      } else {
        // If they bypassed it somehow, reopen it
        openPopup({ gated: true });
      }
    }
  }, [isOpen, isUnlocked, openPopup]);

  if (isUnlocked === null || isUnlocked === false) {
    return (
      <div className="fixed inset-0 z-40 bg-[#07090E] flex flex-col items-center justify-center p-6 bg-grid-noise select-none">
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        <div className="relative flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#0676FE] border-t-transparent" />
          <h3 className="text-sm font-bold text-white tracking-wide">Securing Download Access</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Please fill out the license activation form to unlock your download links.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
