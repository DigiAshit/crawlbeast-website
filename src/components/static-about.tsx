"use client";

import { useState } from "react";
import { Shield, Sparkles, Heart, Eye, ArrowRight } from "lucide-react";
import DownloadModal from "@/components/ui/download-modal";
import { motion } from "framer-motion";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.8, ease: easeWeb }
};

const values = [
  {
    icon: Heart,
    title: "User-First Always",
    desc: "Every decision we make starts with a simple question: Will this make life better for our users? We design with empathy and listen actively."
  },
  {
    icon: Sparkles,
    title: "Simplicity is Power",
    desc: "We believe the best tools are the ones you don’t have to think about. Complexity slows people down, so we build products that are intuitive."
  },
  {
    icon: Shield,
    title: "Transparency Builds Trust",
    desc: "From pricing to product updates, we keep it clear and honest. We believe relationships are built on openness, not hidden terms or vague promises."
  },
  {
    icon: Eye,
    title: "Your Time is Valuable",
    desc: "That's why we automate the repetitive stuff, streamline the complex, and give you real-time insights that drive real results, no fluff, no bloat."
  }
];

const stats = [
  { value: "10,000+", label: "Active Crawlers" },
  { value: "50M+", label: "URLs Audited" },
  { value: "99.9%", label: "Local Uptime" },
  { value: "4.9/5", label: "Professional Rating" }
];

export default function StaticAbout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#07090E] via-[#0b142c] to-[#07090E] overflow-hidden bg-grid-noise py-20 px-6">
      {/* Background glow highlights */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
      <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />

      {/* Hero Header */}
      <div className="relative max-w-4xl mx-auto text-center mt-12 mb-20">
        <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue bg-blue-950/40 border border-blue-900/40 px-3 py-1 rounded-full">
          About Us
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mt-6 mb-6">
          Built to Solve the Real Problem
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Simplifying your workflow, one feature at a time. Our platform simplifies the way people manage tasks, collaborate, and scale their operations, all in one place.
        </p>
      </div>

      {/* Core Philosophy Section */}
      <motion.section {...fadeInUp} className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-zinc-500">Our Story</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-6">How a Simple Idea Became a Platform</h2>
          <div className="flex flex-col gap-4 text-sm text-zinc-400 leading-relaxed">
            <p>
              CrawlBeast started from a basic frustration: running large-scale website audits via cloud-based platforms was slow, expensive, and limited by monthly crawl credits. We realized that modern computers have massive processing power that sits idle.
            </p>
            <p>
              By moving the crawler directly to the user&apos;s desktop, we bypassed cloud queues and subscription constraints. CrawlBeast executes multi-threaded web scanning locally with total data privacy, speed, and no recurring per-page fees.
            </p>
          </div>
        </div>
        <div className="glow-card p-8 rounded-2xl bg-zinc-950/30 border border-zinc-900 flex flex-col justify-center gap-6 min-h-[300px]">
          <h3 className="text-lg font-bold text-white">What We Do</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Whether you&apos;re a growing startup or a global enterprise, we provide the tools you need to streamline your workflow, automate what slows you down, and focus on what drives results. From real-time desktop auditing and intelligent diagnostics to seamless integrations, we&apos;re here to make your day-to-day operations smoother.
          </p>
        </div>
      </motion.section>

      {/* Stats Block */}
      <motion.section {...fadeInUp} className="relative max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 border-y border-zinc-900 py-12 bg-zinc-950/10 backdrop-blur-sm rounded-xl px-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-2 font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.section>

      {/* Value Cards Bento Grid */}
      <motion.section {...fadeInUp} className="relative max-w-5xl mx-auto mb-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.title} className="glow-card p-8 rounded-2xl flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-950 border border-blue-900/40">
                  <Icon className="h-5 w-5 text-accent-blue" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>


      {/* Bottom CTA Block */}
      <motion.section {...fadeInUp} className="relative py-16 px-6 max-w-5xl mx-auto text-center border border-zinc-900 rounded-3xl bg-zinc-950/20 overflow-hidden mt-24">
        <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
          Ready to experience the local desktop crawl?
        </h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-8">
          Download CrawlBeast and begin identifying crawl issues offline with speed and control.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent-blue hover:bg-blue-600 transition-colors font-medium text-xs text-white px-5 py-3 cursor-pointer shadow-[0_4px_20px_rgba(25,119,247,0.2)]"
          >
            Download CrawlBeast
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.section>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
