"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface FounderCampaignContextType {
  isCampaignActive: boolean;
  timeLeftFormattedBar: string;
  timeLeftFormattedFull: string;
  timeRemainingMs: number;
}

const FounderCampaignContext = createContext<FounderCampaignContextType | undefined>(undefined);

export function FounderCampaignProvider({ children }: { children: React.ReactNode }) {
  const [expiryTime, setExpiryTime] = useState<number | null>(null);
  const [timeRemainingMs, setTimeRemainingMs] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const key = "crawlbeast_founder_expiry";
    const stored = localStorage.getItem(key);
    let targetTime = 0;

    if (stored) {
      targetTime = parseInt(stored, 10);
      if (isNaN(targetTime)) {
        targetTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem(key, targetTime.toString());
      }
    } else {
      targetTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(key, targetTime.toString());
    }

    setExpiryTime(targetTime);
    setTimeRemainingMs(Math.max(0, targetTime - Date.now()));

    const interval = setInterval(() => {
      const remaining = Math.max(0, targetTime - Date.now());
      setTimeRemainingMs(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isCampaignActive = isMounted && expiryTime !== null && timeRemainingMs > 0;

  // Format countdown text
  const getFormattedTime = () => {
    if (timeRemainingMs <= 0) {
      return { bar: "00d 00h 00m", full: "00 Days • 00 Hours • 00 Minutes" };
    }

    const totalSeconds = Math.floor(timeRemainingMs / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const dStr = days.toString().padStart(2, "0");
    const hStr = hours.toString().padStart(2, "0");
    const mStr = minutes.toString().padStart(2, "0");
    const sStr = seconds.toString().padStart(2, "0");

    return {
      bar: `${dStr}d ${hStr}h ${mStr}m`,
      full: `${dStr} Days • ${hStr} Hours • ${mStr} Minutes • ${sStr} Seconds`
    };
  };

  const formatted = getFormattedTime();

  return (
    <FounderCampaignContext.Provider
      value={{
        isCampaignActive,
        timeLeftFormattedBar: formatted.bar,
        timeLeftFormattedFull: formatted.full,
        timeRemainingMs
      }}
    >
      {children}
    </FounderCampaignContext.Provider>
  );
}

export function useFounderCampaign() {
  const context = useContext(FounderCampaignContext);
  if (context === undefined) {
    return {
      isCampaignActive: false,
      timeLeftFormattedBar: "00d 00h 00m",
      timeLeftFormattedFull: "00 Days • 00 Hours • 00 Minutes",
      timeRemainingMs: 0
    };
  }
  return context;
}
