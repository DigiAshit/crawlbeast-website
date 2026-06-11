"use client";
import React from "react";
import { usePopup } from "@/components/PopupContext";
import { Apple, Monitor, Terminal as LinuxIcon, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const DownloadPage: React.FC = () => {
  const { openPopup } = usePopup();

  const options = [
    {
      os: "macOS",
      architecture: "Apple Silicon & Intel",
      ext: ".dmg",
      icon: Apple,
      version: "v1.4.2",
      badge: "Universal Build"
    },
    {
      os: "Windows",
      architecture: "x64 / ARM64",
      ext: ".exe",
      icon: Monitor,
      version: "v1.4.2",
      badge: "Installer Pack"
    },
    {
      os: "Linux",
      architecture: "AppImage / Debian",
      ext: ".AppImage",
      icon: LinuxIcon,
      version: "v1.4.2",
      badge: "Portable Binary"
    }
  ];

  return (
    <main className="flex-1 py-16 md:py-24 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-secondary mb-3 uppercase tracking-wider">
            Client Downloads
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Get CrawlBeast Desktop
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Run complete technical audits locally directly from your system. Choose your download target below.
          </p>
        </div>

        {/* Operating Systems grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.os}
                className="bg-[#0e1320] border border-white/5 hover:border-primary/20 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center text-zinc-300 group-hover:text-primary transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-zinc-500 bg-white/5 py-0.5 px-2.5 rounded border border-white/5">
                      {opt.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{opt.os}</h3>
                  <p className="text-zinc-500 text-xs font-semibold mb-4">{opt.architecture}</p>

                  <div className="space-y-2 text-xs text-zinc-400 font-semibold mb-8">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">File Type</span>
                      <span>{opt.ext}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Version</span>
                      <span>{opt.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">License</span>
                      <span>Free Audit (1,000 URLs)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={openPopup}
                  className="w-full bg-white/5 hover:bg-gradient-to-r hover:from-primary hover:to-secondary text-white font-semibold py-3.5 px-4 rounded-lg text-sm transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/5 group-hover:border-transparent cursor-pointer shadow-lg shadow-black/30"
                >
                  <Download className="h-4 w-4" />
                  Download Free Client
                </button>
              </div>
            );
          })}
        </div>

        {/* Security / Verification notes */}
        <div className="max-w-md mx-auto text-center mt-16 p-6 bg-white/2 border border-white/5 rounded-xl flex items-center gap-4">
          <Sparkles className="h-8 w-8 text-secondary shrink-0" />
          <div className="text-left">
            <h5 className="text-xs font-bold text-white mb-0.5">Verified Safe Software</h5>
            <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
              All binaries are digitally signed, secure, and contain zero trackers. CrawlBeast stores data locally on your system only.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default DownloadPage;
