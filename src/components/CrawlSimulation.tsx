"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePopup } from "./PopupContext";
import { Play, RotateCcw, AlertTriangle, Cpu, Globe, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const CrawlSimulation: React.FC = () => {
  const { openPopup } = usePopup();

  // State parameters
  const [crawled, setCrawled] = useState(8421);
  const [issues, setIssues] = useState(12285);
  const [speed, setSpeed] = useState(230);
  const [status, setStatus] = useState("Status: Crawling...");
  const [statusTxt, setStatusTxt] = useState("Running Audit");
  const [isCrawling, setIsCrawling] = useState(true);

  // Issues sub-classes
  const [issue404, setIssue404] = useState(7);
  const [issueSocial, setIssueSocial] = useState(44);
  const [issueFollow, setIssueFollow] = useState(9667);
  const [issueAlt, setIssueAlt] = useState(1830);

  const total = 10000;

  useEffect(() => {
    if (!isCrawling) return;

    const interval = setInterval(() => {
      setCrawled((prev) => {
        const increment = Math.floor(Math.random() * 10) + 12;
        const next = prev + increment;

        if (next >= total) {
          clearInterval(interval);
          setIsCrawling(false);
          setStatus("Status: Complete");
          setStatusTxt("Idle / Ready");
          setSpeed(0);

          // Auto-restart simulation after 6 seconds to keep layout alive
          setTimeout(() => {
            setCrawled(8421);
            setIssues(12285);
            setIssue404(7);
            setIssueSocial(44);
            setIssueFollow(9667);
            setIssueAlt(1830);
            setSpeed(230);
            setStatus("Status: Crawling...");
            setStatusTxt("Running Audit");
            setIsCrawling(true);
          }, 6000);

          return total;
        }

        // Randomly add issues
        if (Math.random() > 0.4) {
          const newIssues = Math.floor(Math.random() * 4) + 1;
          setIssues((i) => i + newIssues);

          const roll = Math.random();
          if (roll < 0.1) {
            setIssue404((v) => v + 1);
          } else if (roll < 0.35) {
            setIssueSocial((v) => v + Math.floor(Math.random() * 2) + 1);
          } else if (roll < 0.7) {
            setIssueFollow((v) => v + Math.floor(Math.random() * 3) + 1);
          } else {
            setIssueAlt((v) => v + Math.floor(Math.random() * 2) + 1);
          }
        }

        // Variate speeds
        setSpeed(210 + Math.floor(Math.random() * 35));
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isCrawling]);

  const percentage = (crawled / total) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto border border-white/5 rounded-2xl bg-[#0e1320] shadow-2xl overflow-hidden shadow-primary/5">
      {/* Window Title Bar */}
      <div className="bg-[#07090e] border-b border-white/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-danger block" />
          <span className="w-3 h-3 rounded-full bg-warning block" />
          <span className="w-3 h-3 rounded-full bg-success block" />
        </div>
        <span className="font-mono text-xs text-zinc-500 font-medium tracking-wide">
          CrawlBeast App v1.4.2
        </span>
        <span
          className={`font-mono text-xs px-3 py-1 rounded-full border transition-all ${
            isCrawling
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-success/10 text-success border-success/20"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
        {/* Sidebar */}
        <div className="bg-[#080b13] border-r border-white/5 p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div>
              <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                Active Projects
              </h5>
              <ul className="space-y-1 text-sm font-semibold">
                <li className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-primary/10 text-secondary border-l-2 border-primary">
                  <Globe className="h-4 w-4 text-primary" />
                  digitalneighbour.co
                </li>
                <li className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                  <Globe className="h-4 w-4" />
                  brightbrands.nl
                </li>
                <li className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                  <Globe className="h-4 w-4" />
                  shopvibe.store
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                System Options
              </h5>
              <ul className="space-y-1 text-sm font-semibold text-zinc-400">
                <li className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                  <Cpu className="h-4 w-4" />
                  Crawl Settings
                </li>
                <li className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                  <Play className="h-4 w-4" />
                  Export Formats
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-[#0e1320] border border-white/5 p-4 rounded-xl flex flex-col gap-2">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              Selected Sitemaps
            </span>
            <span className="text-xs text-zinc-300 font-medium truncate">
              sitemap_index.xml
            </span>
          </div>
        </div>

        {/* Dashboard Main View */}
        <div className="md:col-span-3 p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5">
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                CrawlBeast Audit
              </h4>
              <p className="text-xs text-zinc-500 font-medium">by Digital Neighbour</p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-zinc-400">Plan: <strong className="text-white">Free</strong></span>
              <button
                onClick={openPopup}
                className="text-primary hover:text-white font-bold hover:underline transition-all cursor-pointer"
              >
                Upgrade
              </button>
            </div>
          </div>

          {/* Key Metrics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/2 border border-white/5 p-4 rounded-xl flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Live Audit Status
              </span>
              <span className="text-base font-bold text-zinc-200 font-mono">
                {statusTxt}
              </span>
            </div>
            <div className="bg-white/2 border border-white/5 p-4 rounded-xl flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Crawl Speed
              </span>
              <span className="text-base font-bold text-primary font-mono drop-shadow-[0_0_10px_rgba(6,118,254,0.2)]">
                {speed} URLs / sec
              </span>
            </div>
            <div className="bg-white/2 border border-white/5 p-4 rounded-xl flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                SEO Issues Detected
              </span>
              <span className="text-base font-bold text-danger font-mono">
                {issues.toLocaleString()} issues
              </span>
            </div>
          </div>

          {/* Ticker Progress Bar */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 font-mono">
              <span>Crawled Ratio</span>
              <span>
                {crawled.toLocaleString()} / {total.toLocaleString()} URLs
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${percentage}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
          </div>

          {/* Issue breakdowns */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <span>Audited Issue Classifications</span>
              <span className="text-[10px] text-danger bg-danger/10 border border-danger/20 py-0.5 px-2 rounded font-mono">
                Active Audit Log
              </span>
            </div>

            <div className="space-y-2">
              {/* 404 */}
              <div className="flex items-center justify-between p-3.5 bg-white/2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger block shadow-[0_0_8px_var(--color-danger)]" />
                  <div>
                    <h6 className="text-sm font-semibold text-white">404 Pages</h6>
                    <p className="text-[11px] text-zinc-500 font-medium">Broken links causing index errors</p>
                  </div>
                </div>
                <span className="font-mono text-sm text-zinc-400 font-semibold">{issue404} issues</span>
              </div>

              {/* Social Tags */}
              <div className="flex items-center justify-between p-3.5 bg-white/2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-warning block shadow-[0_0_8px_var(--color-warning)]" />
                  <div>
                    <h6 className="text-sm font-semibold text-white">Social Tags - Incomplete</h6>
                    <p className="text-[11px] text-zinc-500 font-medium">Missing OpenGraph metadata headers</p>
                  </div>
                </div>
                <span className="font-mono text-sm text-zinc-400 font-semibold">{issueSocial} issues</span>
              </div>

              {/* Follow links */}
              <div className="flex items-center justify-between p-3.5 bg-white/2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-warning block shadow-[0_0_8px_var(--color-warning)]" />
                  <div>
                    <h6 className="text-sm font-semibold text-white">External Follow-Links</h6>
                    <p className="text-[11px] text-zinc-500 font-medium">Unmoderated outgoing hyper-reference links</p>
                  </div>
                </div>
                <span className="font-mono text-sm text-zinc-400 font-semibold">
                  {issueFollow.toLocaleString()} issues
                </span>
              </div>

              {/* Images Alt */}
              <div className="flex items-center justify-between p-3.5 bg-white/2 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger block shadow-[0_0_8px_var(--color-danger)]" />
                  <div>
                    <h6 className="text-sm font-semibold text-white">Images Missing-Alt</h6>
                    <p className="text-[11px] text-zinc-500 font-medium">Images without alternate textual descriptors</p>
                  </div>
                </div>
                <span className="font-mono text-sm text-zinc-400 font-semibold">
                  {issueAlt.toLocaleString()} issues
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrawlSimulation;
