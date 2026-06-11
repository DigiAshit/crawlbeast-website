"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Check } from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  return (
    <footer className="bg-[#05070a] border-t border-white/5 pt-20 pb-10" id="footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src="/crawlBeast.png" alt="CrawlBeast" className="h-8 w-auto object-contain rounded-lg" />
            <span className="font-extrabold text-lg tracking-tight text-white">CrawlBeast</span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Simplifying your technical auditing workflow, one page crawl at a time. Built for speed and visual clarity.
          </p>
          <div className="flex flex-col gap-2 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-zinc-600" />
              <a href="mailto:support@crawlbeast.com" className="hover:text-white transition-colors">
                support@crawlbeast.com
              </a>
            </span>
            <span>Office Location: <strong className="text-zinc-300 font-medium">Delhi, India</strong></span>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col gap-5">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Pages</h4>
          <ul className="flex flex-col gap-3 text-sm text-zinc-400 font-medium">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-5">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Resources</h4>
          <ul className="flex flex-col gap-3 text-sm text-zinc-400 font-medium">
            <li><Link href="/download" className="hover:text-white transition-colors">Download Client</Link></li>
            <li><Link href="/docs" className="hover:text-white transition-colors">Setup Guide</Link></li>
            <li><a href="mailto:support@crawlbeast.com" className="hover:text-white transition-colors">API Docs</a></li>
            <li><a href="mailto:support@crawlbeast.com" className="hover:text-white transition-colors">Direct Support</a></li>
          </ul>
        </div>

        {/* Subscription Column */}
        <div className="flex flex-col gap-5">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Subscribe to Newsletter</h4>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Be the first to get exclusive offers, product releases, and technical SEO insights.
          </p>

          <form onSubmit={handleSubscribe} className="relative mt-2">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yann.lecun@meta.ai"
                className="w-full bg-[#0c1018] border border-white/5 focus:border-primary/40 rounded-lg py-3 pl-4 pr-12 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-gradient-to-r from-primary to-secondary text-white rounded-md flex items-center justify-center transition-all cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
                aria-label="Submit newsletter form"
              >
                {subscribed ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
            {subscribed && (
              <p className="absolute left-0 top-full mt-2 text-xs text-success font-semibold">
                Successfully subscribed to technical audits feed!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-medium">
        <div>© Copyright 2026 CrawlBeast | All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
