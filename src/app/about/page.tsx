"use client";
import React from "react";
import { usePopup } from "@/components/PopupContext";
import { Cpu, Globe, CheckCircle2, Shield } from "lucide-react";

const AboutPage: React.FC = () => {
  const { openPopup } = usePopup();

  return (
    <main className="flex-1 py-16 md:py-24 bg-grid-pattern">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-secondary mb-3 uppercase tracking-wider">
            About CrawlBeast
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Our Mission & Approach
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            CrawlBeast was built by Digital Neighbour to redefine how technical SEO professionals, consultants, and growth teams audit and scale search presence.
          </p>
        </div>

        {/* Content Details */}
        <div className="space-y-12 bg-[#0e1320] border border-white/5 p-8 md:p-12 rounded-3xl">
          
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Why Desktop-First?
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Traditional cloud-based crawlers are slow, rate-limited by shared proxy resources, and expensive to scale. By moving the heavy crawling and database operations directly to your desktop, we unlock performance that cloud crawlers simply cannot match.
            </p>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              CrawlBeast processes complex JavaScript, validates sitemaps, and checks for rendering blockages natively on your machine at speeds of up to 230 URLs per second—without cloud latency or browser delays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-secondary rounded-xl flex items-center justify-center shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Local Processing</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Data stays on your computer. SQLite database engines enable queries across 100k+ URLs without high memory footprints.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-secondary rounded-xl flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Privacy & Security</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We collect zero customer SEO data or website structure information. Your audit logs and CSV reports belong purely to you.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/5">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              About Digital Neighbour
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Digital Neighbour is a team of search specialists, developers, and analytics engineers committed to shipping lightweight, fast, and high-contrast software for technical marketers.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-primary/10 via-[#07090e] to-[#07090e] border border-white/5 p-8 rounded-2xl text-center flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-2">Ready to run smarter audits?</h3>
            <p className="text-xs text-zinc-400 mb-6">Download CrawlBeast for free and crawl up to 1,000 URLs today.</p>
            <button
              onClick={openPopup}
              className="bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-8 rounded-full text-sm cursor-pointer shadow-lg shadow-primary/10 transition-transform active:scale-95 hover:brightness-110"
            >
              Start Free Audit
            </button>
          </div>

        </div>

      </div>
    </main>
  );
};

export default AboutPage;
