"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, Bug } from "lucide-react";
import DownloadModal from "@/components/ui/download-modal";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: easeWeb }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const wordReveal = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeWeb }
};

interface HeroBlockProps {
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundVariant?: string;
}

export default function HeroBlock({
  heading,
  subheading,
  ctaText = "Start Your Free Audit",
  ctaLink = "#",
  secondaryCtaText,
  secondaryCtaLink,
  backgroundVariant = "navy-gradient"
}: HeroBlockProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `/download?email=${encodeURIComponent(email)}`;
    }, 1000);
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    if (ctaLink === "#download" || ctaLink === "/download" || ctaText.toLowerCase().includes("download")) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    if (secondaryCtaLink === "#download" || secondaryCtaLink === "/download" || secondaryCtaText?.toLowerCase().includes("download")) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  // Split heading into words for staggered animation
  const words = heading.split(" ");

  return (
    <section className="relative pt-28 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Top Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easeWeb }}
        className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-1.5 text-xs text-zinc-400 mb-8"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#0A39F0]" />
        <span>Unlock Smarter SEO</span>
      </motion.div>

      {/* Rating Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easeWeb }}
        className="flex items-center gap-2 text-xs text-zinc-400 mb-8 bg-zinc-950/60 border border-zinc-900 px-3.5 py-1.5 rounded-full"
      >
        <div className="flex text-amber-400 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
        <span className="font-semibold text-white">4.9</span>
        <span className="text-zinc-500">from 100+ reviews</span>
      </motion.div>

      {/* Dynamic Heading with Stagger Animation */}
      <motion.h1 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="text-[40px] sm:text-[62px] font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-2 sm:mr-3">
            {word.toLowerCase().includes("revenue") || word.toLowerCase().includes("revenue.") ? (
              <motion.span 
                variants={wordReveal} 
                className="inline-block bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ) : (
              <motion.span variants={wordReveal} className="inline-block">{word}</motion.span>
            )}
          </span>
        ))}
      </motion.h1>

      {/* Subheading */}
      {subheading && (
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeWeb }}
          className="text-sm sm:text-lg text-zinc-400 mt-6 max-w-2xl leading-relaxed"
        >
          {subheading}
        </motion.p>
      )}

      {/* CTA Trigger / Email Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: easeWeb }}
        className="w-full max-w-md mt-10"
      >
        {ctaLink === "#download" || ctaLink === "/download" || ctaText.toLowerCase().includes("download") ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="jane@framer.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitted}
              className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#0A39F0] focus:border-[#0A39F0]"
            />
            <button
              type="submit"
              disabled={submitted}
              className="inline-flex items-center justify-center rounded-2xl bg-[#0A39F0] hover:bg-[#002bd6] transition-all font-semibold text-sm text-white px-6 py-3.5 shrink-0 disabled:opacity-50 shadow-[0_4px_20px_rgba(10,57,240,0.4)] cursor-pointer"
            >
              {submitted ? "Redirecting..." : ctaText}
            </button>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={ctaLink}
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center rounded-2xl bg-[#0A39F0] hover:bg-[#002bd6] transition-all font-semibold text-sm text-white px-6 py-3.5 w-full sm:w-auto shadow-[0_4px_20px_rgba(10,57,240,0.4)]"
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                onClick={handleSecondaryClick}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-semibold text-sm text-white px-6 py-3.5 w-full sm:w-auto"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
        <p className="text-xs text-zinc-500 mt-3.5 leading-relaxed">
          Download CrawlBeast and crawl up to 1,000 URLs for free.
        </p>
      </motion.div>

      {/* Floating Dashboard Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: easeWeb }}
        className="w-full max-w-5xl mt-20 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-3 shadow-2xl backdrop-blur-sm animate-float"
      >
        <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-4 py-3 rounded-t-xl text-left">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Bug className="h-3.5 w-3.5 text-[#0A39F0]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">CrawlBeast</div>
                <div className="text-[10px] text-zinc-500">by Digital Neighbour</div>
              </div>
            </div>
            <div className="hidden sm:flex h-5 items-center rounded-full bg-blue-950 border border-blue-900/50 px-2.5 text-[10px] font-medium text-[#0A39F0]">
              Live Audit Status
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold text-green-500 bg-green-950 border border-green-900/50 px-2 py-0.5 rounded">
              Plan: Free
            </span>
            <Link href="/pricing" className="text-[10px] text-zinc-400 hover:text-white transition-colors border border-zinc-800 px-2 py-0.5 rounded">
              Upgrade
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 bg-zinc-950 rounded-b-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-zinc-900 text-left">
          <div className="p-4 flex flex-col gap-4">
            <div>
              <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">Status</div>
              <div className="text-xs font-medium text-white flex items-center gap-1.5 mt-1">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Idle / Ready
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">Crawl Speed</div>
              <div className="text-xs font-medium text-white mt-1">230 URLs / sec</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-500">Crawled</div>
              <div className="text-xs font-medium text-white mt-1">8,421 / 10,000 URLs</div>
            </div>
            <div className="pt-2">
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#0A39F0] h-full rounded-full" style={{ width: "84%" }} />
              </div>
            </div>
          </div>
          <div className="p-4 md:col-span-3 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <span className="text-xs font-semibold text-white">SEO Issues Detected</span>
              <span className="text-xs font-bold text-[#0A39F0] bg-blue-950/50 px-2 py-0.5 rounded">12,285 issues</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-900 p-2.5 rounded-lg hover:border-zinc-800 transition-colors">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">404 Pages</span>
                  <span className="text-[10px] text-zinc-500">Broken links causing index errors</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-500 border border-amber-900/50">7 issues</span>
              </div>
              <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-900 p-2.5 rounded-lg hover:border-zinc-800 transition-colors">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">Social Tags - Incomplete</span>
                  <span className="text-[10px] text-zinc-500">Missing OpenGraph metadata headers</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-500 border border-emerald-900/50">44 issues</span>
              </div>
              <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-900 p-2.5 rounded-lg hover:border-zinc-800 transition-colors">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">External Follow-Links</span>
                  <span className="text-[10px] text-zinc-500">Unmoderated outgoing hyper-reference links</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-500 border border-emerald-900/50">9,667 issues</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
