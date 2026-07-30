"use client";

import React from "react";
import { useFounderCampaign } from "./FounderCampaignContext";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isCampaignActive } = useFounderCampaign();

  return (
    <div
      className={`flex flex-col flex-1 ${
        isCampaignActive ? "pt-[120px] md:pt-[120px]" : "pt-[80px]"
      } transition-all duration-300`}
    >
      {children}
    </div>
  );
}
