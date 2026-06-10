"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, Check, Bug, Sparkles, BarChart3, 
  Globe, Cpu, ChevronDown, Star,
  TrendingUp, Clock, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DownloadModal from "@/components/ui/download-modal";

// Animation settings inspired by Norrav and Framer systems
const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeWeb }
  }
};

const faqs = [
  {
    q: "Can I use the license on multiple devices?",
    a: "Licenses are intended for single-user usage. If you need usage across multiple systems, consider upgrading or contacting support."
  },
  {
    q: "What is included in the Free plan?",
    a: "The Free plan allows you to crawl up to 1,000 URLs per audit, manage up to 5 projects, run core SEO checks, and access our community support forum."
  },
  {
    q: "What happens when I reach my URL limit?",
    a: "Once you reach the crawl limit for your plan, the crawl will automatically pause. You can upgrade to a higher tier plan (Pro or Advanced) to crawl more URLs instantly."
  },
  {
    q: "Does the app work offline?",
    a: "Yes! Because CrawlBeast runs directly on your desktop, you can review previous crawl reports, analyze audit scores, and work on fixing issues offline. An internet connection is only needed to run new active crawls."
  },
  {
    q: "How do I receive my license after payment?",
    a: "Your license key is delivered instantly via email as soon as the transaction is complete. You can enter the license key directly in the app settings to unlock premium limits."
  }
];

const homepagePlans = [
  {
    name: "Free Plan",
    desc: "Perfect for beginners and small audits.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    buttonText: "Download Now",
    popular: false,
    features: [
      "Crawl up to 1,000 URLs",
      "Up to 5 projects",
      "Core SEO checks (meta, links, images, etc.)",
      "Community support"
    ]
  },
  {
    name: "Pro Plan",
    desc: "For freelancers and SEO professionals.",
    monthlyPrice: 39,
    yearlyPrice: 29,
    buttonText: "Start Now",
    popular: true,
    features: [
      "Crawl up to 20,000 URLs",
      "Up to 100 projects",
      "All SEO checks",
      "Faster crawling performance",
      "Email support"
    ]
  },
  {
    name: "Advanced Plan",
    desc: "For agencies and heavy users.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    buttonText: "Start Now",
    popular: false,
    features: [
      "Crawl up to 100,000 URLs",
      "All Pro features",
      "Unlimited projects",
      "Priority crawl speed (maximum performance)",
      "All future features included"
    ]
  }
];

export default function StaticHomepage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isYearlyBilling, setIsYearlyBilling] = useState(true);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `/download?email=${encodeURIComponent(email)}`;
    }, 1000);
  };

  const triggerModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#000420] via-[#000F5C] to-[#00178A] overflow-hidden bg-grid-noise pb-20">
      {/* Background glow highlights */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
      <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />
      <div className="bg-column-lines" />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: easeWeb }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-1.5 text-xs text-zinc-400 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
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
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="font-semibold text-white">4.9</span>
          <span className="text-zinc-500">from 100+ reviews</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-[40px] sm:text-[62px] font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]"
        >
          <motion.span variants={wordReveal} className="inline-block">Turn</motion.span>{" "}
          <motion.span variants={wordReveal} className="inline-block">SEO</motion.span>{" "}
          <motion.span variants={wordReveal} className="inline-block">Insights</motion.span>{" "}
          <br className="hidden sm:inline" />
          <motion.span 
            variants={wordReveal} 
            className="inline-block bg-gradient-to-r from-accent-blue via-blue-500 to-indigo-500 bg-clip-text text-transparent"
          >
            Into Revenue.
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeWeb }}
          className="text-sm sm:text-lg text-zinc-400 mt-6 max-w-2xl leading-relaxed"
        >
          Run powerful SEO audits directly from your desktop. Analyze websites, uncover critical issues, and turn data into actionable insights faster than ever.
        </motion.p>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: easeWeb }}
          className="w-full max-w-md mt-10"
        >
          <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3">
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
              {submitted ? "Redirecting..." : "Start Your Free Audit"}
            </button>
          </form>
          <p className="text-xs text-zinc-500 mt-3.5 leading-relaxed">
            Download CrawlBeast and crawl up to 1,000 URLs for free.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
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
                  <Bug className="h-3.5 w-3.5 text-accent-blue" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">CrawlBeast</div>
                  <div className="text-[10px] text-zinc-500">by Digital Neighbour</div>
                </div>
              </div>
              <div className="hidden sm:flex h-5 items-center rounded-full bg-blue-950 border border-blue-900/50 px-2.5 text-[10px] font-medium text-accent-blue">
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
                  <div className="bg-accent-blue h-full rounded-full" style={{ width: "84%" }} />
                </div>
              </div>
            </div>
            <div className="p-4 md:col-span-3 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                <span className="text-xs font-semibold text-white">SEO Issues Detected</span>
                <span className="text-xs font-bold text-accent-blue bg-blue-950/50 px-2 py-0.5 rounded">12,285 issues</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-900 p-2.5 rounded-lg hover:border-zinc-800 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">404 Pages</span>
                    <span className="text-[10px] text-zinc-500">Broken links causing index errors</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-500 border border-amber-900/50">
                    7 issues
                  </span>
                </div>
                <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-900 p-2.5 rounded-lg hover:border-zinc-800 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">Social Tags - Incomplete</span>
                    <span className="text-[10px] text-zinc-500">Missing OpenGraph metadata headers</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-500 border border-emerald-900/50">
                    44 issues
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Steps Section */}
      <motion.section 
        {...fadeInUp}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue">Our Approach</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">Simple Steps to Get Started</h2>
          <p className="text-zinc-400 text-sm">
            Your all-in-one SEO audit workflow &mdash; built for speed, clarity, and real results.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={cardVariants} className="bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 border border-white/10 hover:border-[#0A39F0]/40 shadow-xl hover:shadow-[0_0_30px_rgba(10,57,240,0.15)] transition-all duration-300 p-8 rounded-2xl flex flex-col justify-between text-white">
            <div>
              <span className="text-xs font-bold text-zinc-400 block mb-6 font-mono">Step 01</span>
              <h3 className="text-lg font-bold text-white mb-3 font-display">Add Projects & Sitemaps</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Create projects in seconds. Add your website or sitemap and organize audits by client or campaign.
              </p>
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 border border-white/10 hover:border-[#0A39F0]/40 shadow-xl hover:shadow-[0_0_30px_rgba(10,57,240,0.15)] transition-all duration-300 p-8 rounded-2xl flex flex-col justify-between text-white">
            <div>
              <span className="text-xs font-bold text-zinc-400 block mb-6 font-mono">Step 02</span>
              <h3 className="text-lg font-bold text-white mb-3 font-display">Run Deep SEO Audits</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Crawl up to 10,000 URLs per project. Identify technical SEO issues, broken links, missing tags, and performance gaps instantly.
              </p>
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 border border-white/10 hover:border-[#0A39F0]/40 shadow-xl hover:shadow-[0_0_30px_rgba(10,57,240,0.15)] transition-all duration-300 p-8 rounded-2xl flex flex-col justify-between text-white">
            <div>
              <span className="text-xs font-bold text-zinc-400 block mb-6 font-mono">Step 03</span>
              <h3 className="text-lg font-bold text-white mb-3 font-display">Analyze, Fix & Improve</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Get structured audit reports with scores, issue breakdowns, and (soon) AI-powered recommendations to fix problems faster.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex justify-center mt-12">
          <button
            onClick={triggerModal}
            className="inline-flex items-center justify-center rounded-2xl bg-[#0A39F0] border-0 text-white font-semibold text-sm px-6 py-3.5 transition-all hover:bg-[#002bd6] shadow-[0_4px_20px_rgba(10,57,240,0.3)] cursor-pointer"
          >
            Download Now
          </button>
        </div>
      </motion.section>

      {/* Bento Grid Features Section */}
      <motion.section 
        {...fadeInUp}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue">Solve Real Problems</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">Everything You Need to Audit & Scale SEO</h2>
          <p className="text-zinc-400 text-sm">
            Built specifically for freelancers, consultants, and agencies who need fast, reliable SEO insights.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          <motion.div variants={cardVariants} className="glow-card p-8 rounded-2xl md:col-span-3 flex flex-col justify-between">
            <div>
              <BarChart3 className="h-8 w-8 text-accent-blue mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Structured Audit Reports</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Get clear, structured insights to streamline your auditing workflows:
              </p>
              <ul className="flex flex-col gap-2.5 text-xs text-zinc-350">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-blue" /> Total URLs crawled</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-blue" /> Success vs failed pages</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-blue" /> SEO health scores</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-blue" /> Issue breakdowns</li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="glow-card p-8 rounded-2xl md:col-span-3 flex flex-col justify-between">
            <div>
              <Globe className="h-8 w-8 text-accent-blue mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">Powerful Website Crawling</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Scan entire websites and sitemaps with absolute precision. Identify critical technical errors, broken internal paths, and accessibility discrepancies across all pages without relying on cloud limitations.
              </p>
            </div>
            <div className="h-10 mt-6 flex items-center justify-start gap-4">
              <span className="text-xs text-zinc-500 font-mono">No proxy required</span>
              <span className="text-xs text-zinc-500 font-mono">Multi-threaded engine</span>
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="glow-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-between">
            <div>
              <Cpu className="h-8 w-8 text-accent-blue mb-6" />
              <h3 className="text-lg font-bold text-white mb-3">Desktop Performance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                No browser lag. No cloud delays. Run audit crawls locally directly on your desktop with speed and complete control.
              </p>
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="glow-card p-8 rounded-2xl md:col-span-4 flex flex-col justify-between">
            <div>
              <Sparkles className="h-8 w-8 text-accent-blue mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered SEO Insights <span className="text-[10px] font-semibold text-accent-blue bg-blue-950 border border-blue-900/40 px-2 py-0.5 rounded ml-2">Coming Soon</span></h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Turn raw audit data into high-value actionable strategies. Automatically generate:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ul className="flex flex-col gap-2 text-xs text-zinc-350">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent-blue" /> Detailed issue explanations</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent-blue" /> Actionable fix recommendations</li>
                </ul>
                <ul className="flex flex-col gap-2 text-xs text-zinc-350">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent-blue" /> Priority scoring based on impact</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent-blue" /> Content & technical suggestions</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex justify-center mt-12">
          <button
            onClick={triggerModal}
            className="group inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[#0A39F0] hover:bg-[#002bd6] transition-all font-semibold text-sm text-white px-6 py-3.5 shadow-[0_4px_20px_rgba(10,57,240,0.3)] cursor-pointer"
          >
            Get Started Today
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        {...fadeInUp}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue font-mono">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4 font-display">Trusted by 1200+ SEO professionals</h2>
          <p className="text-zinc-400 text-sm">
            From freelance consultants to enterprise teams — what they say about CrawlBeast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 border border-white/10 shadow-sm hover:shadow-xl hover:border-[#0A39F0]/40 transition-all duration-300 p-6 rounded-2xl flex flex-col justify-between h-full hover:shadow-[0_0_30px_rgba(10,57,240,0.15)] text-white">
            <p className="text-xs text-zinc-300 leading-relaxed mb-6 italic">
              “CrawlBeast reduced our technical audit workflow by 70%. The white-label reporting is clean, clear, and presentation-ready. Our clients read them, and the task prioritization makes execution effortless.”
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
              <div className="h-9 w-9 rounded-full bg-[#0A39F0]/20 border border-[#0A39F0]/30 flex items-center justify-center text-xs font-bold text-[#0A39F0] font-mono">
                SM
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Sophia Miller</h4>
                <p className="text-[10px] text-zinc-400 font-mono">VP of SEO · Scale Agency</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 border border-white/10 shadow-sm hover:shadow-xl hover:border-[#0A39F0]/40 transition-all duration-300 p-6 rounded-2xl flex flex-col justify-between h-full hover:shadow-[0_0_30px_rgba(10,57,240,0.15)] text-white">
            <p className="text-xs text-zinc-300 leading-relaxed mb-6 italic">
              “I have tested every crawler out there. CrawlBeast’s memory-efficient desktop crawling is incredible. It captured complex JavaScript rendering errors that other tools glossed over entirely. Highly recommended.”
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
              <div className="h-9 w-9 rounded-full bg-[#0A39F0]/20 border border-[#0A39F0]/30 flex items-center justify-center text-xs font-bold text-[#0A39F0] font-mono">
                LB
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Lucas Bennett</h4>
                <p className="text-[10px] text-zinc-400 font-mono">Technical SEO Consultant</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 border border-white/10 shadow-sm hover:shadow-xl hover:border-[#0A39F0]/40 transition-all duration-300 p-6 rounded-2xl flex flex-col justify-between h-full hover:shadow-[0_0_30px_rgba(10,57,240,0.15)] text-white">
            <p className="text-xs text-zinc-300 leading-relaxed mb-6 italic">
              “Our store audit revealed 340 duplicate meta descriptions generated by our layout theme. We fixed them within a week and recorded a 23% organic session boost inside two months. Excellent software.”
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
              <div className="h-9 w-9 rounded-full bg-[#0A39F0]/20 border border-[#0A39F0]/30 flex items-center justify-center text-xs font-bold text-[#0A39F0] font-mono">
                CD
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Chloe Davies</h4>
                <p className="text-[10px] text-zinc-400 font-mono">Head of E-commerce · ShopVibe</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        {...fadeInUp}
        className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue font-mono">Pricing Plans</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4 font-display">Flexible Plans for Every Team Size</h2>
          <p className="text-zinc-400 text-sm">
            Simple, transparent pricing. Start free, upgrade when you need more power.
          </p>

          <div className="flex justify-center items-center gap-4 mt-10">
            <span className={`text-sm ${!isYearlyBilling ? "text-white font-medium" : "text-zinc-500"}`}>Billed Monthly</span>
            <button
              onClick={(e) => { e.preventDefault(); setIsYearlyBilling(!isYearlyBilling); }}
              className="relative h-7 w-12 rounded-full bg-[#000F5C] border border-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle billing plan"
            >
              <motion.div
                layout
                className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white"
                animate={{ x: isYearlyBilling ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isYearlyBilling ? "text-white font-medium" : "text-zinc-500"}`}>Billed Annually</span>
              <span className="text-[10px] font-bold text-green-500 bg-green-950 border border-green-900/50 px-2 py-0.5 rounded">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {homepagePlans.map((plan) => {
            const price = isYearlyBilling ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`glow-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden ${
                  plan.popular ? "border-[#0A39F0]/60 shadow-[0_0_45px_rgba(10,57,240,0.25)] bg-[#000F5C]/80" : "bg-[#000F5C]/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-blue-950 border border-blue-900/40 px-3 py-1 text-[10px] font-bold text-[#0A39F0]">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">{plan.desc}</p>

                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white">${price}</span>
                    <span className="text-xs text-zinc-500 font-medium">/ month</span>
                  </div>

                  <hr className="border-white/5 my-6" />

                  <ul className="flex flex-col gap-3.5 text-xs text-zinc-300 font-mono">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#0A39F0]/20 border border-[#0A39F0]/30">
                          <Check className="h-3.5 w-3.5 text-[#0A39F0]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={triggerModal}
                    className={`w-full group flex items-center justify-center gap-1.5 rounded-2xl py-3 text-sm font-semibold transition-all cursor-pointer ${
                      plan.popular
                        ? "bg-[#0A39F0] text-white hover:bg-[#002bd6] shadow-[0_4px_20px_rgba(10,57,240,0.3)]"
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* FAQ Accordion Section */}
      <motion.section 
        {...fadeInUp}
        className="py-24 px-6 max-w-4xl mx-auto border-t border-zinc-900"
      >
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue">FAQs</span>
          <h2 className="text-3xl font-extrabold text-white mt-3 mb-4">Everything You Need to Know</h2>
          <p className="text-zinc-400 text-sm">
            Our platform brings everything you need into one place, making your work easier so you can concentrate on growing your business.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isFaqOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className={`transition-all duration-300 overflow-hidden ${
                  isFaqOpen 
                    ? "border border-[#0A39F0] rounded-2xl bg-gradient-to-br from-[#000F5C] to-[#00178A]/40 shadow-[0_0_30px_rgba(10,57,240,0.15)] scale-[1.01]" 
                    : "border border-white/10 rounded-xl bg-gradient-to-br from-[#000F5C]/30 to-[#00178A]/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isFaqOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-medium text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${isFaqOpen ? "rotate-180 text-[#0A39F0]" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isFaqOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 border-t border-white/10 text-xs text-zinc-300 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Bottom CTA Block */}
      <motion.section 
        {...fadeInUp}
        className="relative py-24 px-6 max-w-5xl mx-auto text-center border border-white/10 rounded-3xl bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 overflow-hidden mt-12"
      >
        <div className="absolute inset-0 bg-radial-gradient opacity-50 pointer-events-none" />
        <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue">Welcome to CrawlBeast</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-5 max-w-2xl mx-auto leading-tight">
          Your website audit is ready to get smarter.
        </h2>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-8">
          Download CrawlBeast for free and start finding the SEO issues that actually impact rankings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={triggerModal}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[#0A39F0] hover:bg-[#002bd6] transition-all font-semibold text-sm text-white px-6 py-3.5 w-full sm:w-auto shadow-[0_4px_20px_rgba(10,57,240,0.3)] cursor-pointer"
          >
            Download Now
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-semibold text-sm text-white px-6 py-3.5 w-full sm:w-auto"
          >
            View Pricing
          </Link>
        </div>
      </motion.section>

      {/* Global popup DownloadModal */}
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
