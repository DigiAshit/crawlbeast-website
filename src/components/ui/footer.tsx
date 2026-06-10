"use client";

import Link from "next/link";
import { useState } from "react";
import { Send, Check } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 1200);
  };

  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Logo and Tagline */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Image src="/crawlBeast.png" alt="CrawlBeast Logo" width={24} height={24} style={{ height: "auto" }} className="object-contain" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Crawl<span className="text-accent-blue">Beast</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Simplifying your workflow, one feature at a time. Powering smarter teams with smarter software.
            </p>
            <div className="text-sm text-zinc-500 mt-2">
              Email:{" "}
              <a href="mailto:support.crawlbeast@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
                support.crawlbeast@gmail.com
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-3 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Pages</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Resources</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
                <li>
                  <Link href="/download" className="hover:text-white transition-colors">
                    Download
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Subscribe to Newsletter</h4>
            <p className="text-sm text-zinc-400">
              Be the first to get exclusive offers, product releases, and technical SEO insights.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2 max-w-sm">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribed || loading}
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={subscribed || loading}
                  className="inline-flex items-center justify-center rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : subscribed ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-green-500 font-medium">
                  Thanks for subscribing! Check your inbox soon.
                </p>
              )}
            </form>
          </div>
        </div>

        <hr className="border-zinc-900 my-12" />

        {/* Copyright */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500">
          <div>
            &copy; Copyright {new Date().getFullYear()} | Design & Developed By Onixtheme. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-350 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-350 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
