"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Check, Globe } from "lucide-react";

interface FooterProps {
  siteName?: string;
  companyName?: string;
  supportEmail?: string;
  socialProfiles?: Array<{
    platform: string;
    url: string;
  }>;
}

const Footer: React.FC<FooterProps> = ({
  siteName = "CrawlBeast",
  companyName = "Digital Neighbour",
  supportEmail = "support@crawlbeast.com",
  socialProfiles = []
}) => {
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
            <img src="/crawlBeast.png" alt={siteName || "CrawlBeast"} className="h-8 w-auto object-contain rounded-lg" />
            <span className="font-extrabold text-lg tracking-tight text-white">{siteName || "CrawlBeast"}</span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Simplifying your technical auditing workflow, one page crawl at a time. Built for speed and visual clarity.
          </p>
          <div className="flex flex-col gap-2 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-zinc-600" />
              <a href={`mailto:${supportEmail || "support@crawlbeast.com"}`} className="hover:text-white transition-colors">
                {supportEmail || "support@crawlbeast.com"}
              </a>
            </span>
          </div>
          {socialProfiles && socialProfiles.length > 0 && (
            <div className="flex items-center gap-4 mt-2">
              {socialProfiles.map((profile, idx) => {
                const getSocialIcon = (platform: string) => {
                  switch (platform) {
                    case "twitter":
                      return (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      );
                    case "github":
                      return (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                      );
                    case "linkedin":
                      return (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      );
                    case "youtube":
                      return (
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      );
                    default:
                      return <Globe className="h-4 w-4" />;
                  }
                };
                return (
                  <a
                    key={idx}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors p-1"
                    aria-label={`Visit our ${profile.platform} profile`}
                  >
                    {getSocialIcon(profile.platform)}
                  </a>
                );
              })}
            </div>
          )}
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
        <div>© Copyright 2026 {companyName || "CrawlBeast"} | All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
