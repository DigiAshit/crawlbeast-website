"use client";

import { useState } from "react";
import { 
  Monitor, Cpu, ChevronDown, Check, 
  ShieldCheck, History, ArrowDownToLine, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const changelog = [
  {
    version: "v1.4.2",
    date: "June 2026",
    title: "Performance tuning & export expansion",
    changes: [
      "Optimized multi-threaded parsing for 15% crawl speed increase (speeds up to 250 URLs/sec).",
      "Added native Excel (.xlsx) export capability alongside raw CSV support.",
      "Fixed sub-domain canonical resolution error where root page checked circular loops.",
      "Enhanced user-agent override selector in project configuration tab."
    ]
  },
  {
    version: "v1.4.0",
    date: "April 2026",
    title: "AI SEO Diagnostics Alpha",
    changes: [
      "Integrated local tokenization support for offline issue explanation blueprints.",
      "Introduced layout view render tests targeting mobile responsiveness viewport errors.",
      "Added visual crawl progress charts and live diagnostic logs to dashboard UI."
    ]
  },
  {
    version: "v1.3.5",
    date: "February 2026",
    title: "Google Search Console API Integration",
    changes: [
      "Enabled importing indexing status directly from Google Search Console into CrawlBeast.",
      "Added robots.txt override support for local staging audits.",
      "Fixed duplicate meta description warning trigger for pages using paginated query queries."
    ]
  }
];

export default function Download() {
  const [downloading, setDownloading] = useState<"windows" | "mac" | null>(null);
  const [success, setSuccess] = useState<"windows" | "mac" | null>(null);
  const [activeLog, setActiveLog] = useState<number | null>(0);

  const handleDownload = (platform: "windows" | "mac") => {
    setDownloading(platform);
    setTimeout(() => {
      setDownloading(null);
      setSuccess(platform);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden bg-grid-noise py-20 px-6">
      {/* Glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
      <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />

      {/* Hero Content (Requested Content) */}
      <div className="relative max-w-4xl mx-auto text-center mt-12 mb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-1.5 text-xs text-zinc-400 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
          <span>Unlock Smarter SEO</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4"
        >
          Download CrawlBeast
        </motion.h1>

        {/* Heading 2 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-accent-blue mb-6"
        >
          Your website audit is ready to get smarter.
        </motion.h2>

        {/* Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Download CrawlBeast and start finding the SEO issues that actually impact rankings.
        </motion.p>

        {/* Two CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 rounded-2xl border border-zinc-850 bg-zinc-950/40 backdrop-blur-sm relative"
        >
          {/* Download for Windows */}
          <div className="flex flex-col justify-between items-center text-center p-4">
            <Monitor className="h-10 w-10 text-accent-blue mb-4" />
            <h3 className="text-sm font-bold text-white mb-1">CrawlBeast for Windows</h3>
            <span className="text-[10px] text-zinc-500 mb-6">Windows 10/11 (64-bit)</span>
            
            <button
              onClick={() => handleDownload("windows")}
              disabled={downloading !== null}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 transition-colors py-3 text-xs font-semibold text-white disabled:opacity-50"
            >
              {downloading === "windows" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : success === "windows" ? (
                <>
                  <Check className="h-4 w-4" />
                  Started
                </>
              ) : (
                <>
                  <ArrowDownToLine className="h-4 w-4" />
                  Download for Windows
                </>
              )}
            </button>
          </div>

          {/* Download for Mac */}
          <div className="flex flex-col justify-between items-center text-center p-4 border-t sm:border-t-0 sm:border-l border-zinc-850 pt-6 sm:pt-4 sm:pl-6">
            <Cpu className="h-10 w-10 text-accent-blue mb-4" />
            <h3 className="text-sm font-bold text-white mb-1">CrawlBeast for macOS</h3>
            <span className="text-[10px] text-zinc-500 mb-6">Intel & Apple Silicon (macOS 11+)</span>

            <button
              onClick={() => handleDownload("mac")}
              disabled={downloading !== null}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 transition-colors py-3 text-xs font-semibold text-white disabled:opacity-50"
            >
              {downloading === "mac" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : success === "mac" ? (
                <>
                  <Check className="h-4 w-4" />
                  Started
                </>
              ) : (
                <>
                  <ArrowDownToLine className="h-4 w-4" />
                  Download for Mac
                </>
              )}
            </button>
          </div>

          <div className="sm:col-span-2 flex items-center justify-center gap-2 text-[10px] text-zinc-500 border-t border-zinc-900 pt-4 mt-2">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
            <span>Secure download. Code signed & verified.</span>
          </div>
        </motion.div>
      </div>

      {/* Installation guides */}
      <section className="relative max-w-4xl mx-auto border-t border-zinc-900 pt-16 mb-24">
        <h2 className="text-xl font-bold text-white text-center mb-12">How to Install</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-accent-blue">1</span>
              On macOS
            </h3>
            <ol className="list-decimal pl-5 text-xs text-zinc-400 space-y-2">
              <li>Open the downloaded <code className="text-accent-blue">CrawlBeast.dmg</code> file.</li>
              <li>Drag the CrawlBeast icon into your Applications folder.</li>
              <li>Double-click the app icon to run it from Applications.</li>
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-accent-blue">2</span>
              On Windows
            </h3>
            <ol className="list-decimal pl-5 text-xs text-zinc-400 space-y-2">
              <li>Double-click the downloaded <code className="text-accent-blue">CrawlBeast.msi</code> installer file.</li>
              <li>Follow the standard Windows setup wizard screens.</li>
              <li>Launch the application using the desktop shortcut icon.</li>
            </ol>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-accent-blue">3</span>
              On Linux
            </h3>
            <ol className="list-decimal pl-5 text-xs text-zinc-400 space-y-2">
              <li>Open your terminal in the downloads folder path directory.</li>
              <li>Run <code className="text-accent-blue font-mono">sudo dpkg -i crawlbeast.deb</code>.</li>
              <li>Launch from applications launcher or run <code className="text-accent-blue font-mono">crawlbeast</code>.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Changelog Accordions */}
      <section className="relative max-w-3xl mx-auto border-t border-zinc-900 pt-16">
        <h2 className="text-xl font-bold text-white text-center mb-10 flex items-center justify-center gap-2">
          <History className="h-5 w-5 text-accent-blue" />
          Release Log & Changelog
        </h2>

        <div className="flex flex-col gap-4">
          {changelog.map((log, idx) => {
            const isOpen = activeLog === idx;
            return (
              <div 
                key={log.version}
                className="border border-zinc-900 rounded-lg bg-zinc-950/30 overflow-hidden"
              >
                <button
                  onClick={() => setActiveLog(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div>
                    <span className="text-sm font-bold text-white mr-3">{log.version}</span>
                    <span className="text-xs text-zinc-500 mr-4 font-mono">{log.date}</span>
                    <span className="text-xs text-zinc-400 hidden sm:inline">{log.title}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 border-t border-zinc-900 text-xs text-zinc-400">
                        <ul className="list-disc pl-5 space-y-2">
                          {log.changes.map((change, cIdx) => (
                            <li key={cIdx} className="leading-relaxed">{change}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
