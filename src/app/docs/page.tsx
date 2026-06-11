"use client";
import React, { useState } from "react";
import { Terminal, BookOpen, Settings, Share2, Play, Cpu } from "lucide-react";

const DocsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("welcome");

  const sections = [
    { id: "welcome", label: "Welcome", icon: BookOpen },
    { id: "install", label: "Installation Guide", icon: Terminal },
    { id: "projects", label: "Managing Projects", icon: Settings },
    { id: "crawling", label: "Crawl Settings", icon: Play },
    { id: "exports", label: "CSV Data Exports", icon: Share2 },
    { id: "performance", label: "Desktop Performance", icon: Cpu }
  ];

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="flex-1 py-12 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 lg:sticky lg:top-28 h-fit">
          <div className="bg-[#0e1320] border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Documentation
            </h3>
            <nav>
              <ul className="space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <li key={sec.id}>
                      <button
                        onClick={() => handleScrollTo(sec.id)}
                        className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-semibold transition-all text-left cursor-pointer ${
                          isActive
                            ? "bg-primary/10 text-secondary border-l-2 border-primary"
                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {sec.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Docs Content */}
        <article className="lg:col-span-3 bg-[#0e1320] border border-white/5 p-8 md:p-12 rounded-2xl prose prose-invert max-w-none">
          <div className="space-y-16">
            
            {/* Welcome Section */}
            <section id="welcome" className="scroll-mt-28">
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-4 border-b border-white/5 pb-4">
                Welcome to CrawlBeast Docs
              </h1>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                CrawlBeast is a high-performance desktop-based web crawler designed specifically for technical SEO auditing, sitemap parsing, and rendering inspection. Because the engine runs natively on your machine, it avoids cloud bandwidth and IP limitations, crawling up to 230 URLs per second.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Use these docs to configure crawls, optimize your machine's memory load, and extract audit lists for client pitches.
              </p>
            </section>

            {/* Installation Section */}
            <section id="install" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-4 border-b border-white/5 pb-2">
                Installation Guide
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                CrawlBeast packages are available for Windows, MacOS (Apple Silicon & Intel), and Linux:
              </p>
              <div className="bg-[#07090e] border border-white/5 p-4 rounded-xl font-mono text-xs text-zinc-300 space-y-2 mb-4">
                <p className="text-zinc-500"># macOS Installation via Curl</p>
                <p>curl -O https://download.crawlbeast.com/macos/CrawlBeast-latest.dmg</p>
                <p className="text-zinc-500 mt-2"># Linux AppImage Activation</p>
                <p>chmod +x CrawlBeast.AppImage && ./CrawlBeast.AppImage</p>
              </div>
              <p className="text-zinc-400 text-sm">
                After downloading, open the installer, agree to license terms, and input the registration key sent to your email.
              </p>
            </section>

            {/* Managing Projects */}
            <section id="projects" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-4 border-b border-white/5 pb-2">
                Managing Projects
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Projects bundle sitemaps, domains, and crawled history.
              </p>
              <ul className="list-disc list-inside text-zinc-400 text-sm space-y-2 pl-4">
                <li>Create projects from the sidebar in seconds</li>
                <li>Group audits by client sitemaps or custom campaign tags</li>
                <li>Audit files are stored locally in your app storage folder</li>
              </ul>
            </section>

            {/* Crawl Settings */}
            <section id="crawling" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-4 border-b border-white/5 pb-2">
                Crawl Settings
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Tweak crawling parameters to match your server limits:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
                <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">Concurrency Threads</h4>
                  <p className="text-zinc-500">Adjust active parallel requests. Recommended: 8-16 threads for standard domains.</p>
                </div>
                <div className="bg-white/2 border border-white/5 p-4 rounded-xl">
                  <h4 className="font-bold text-white mb-1">User-Agent Selection</h4>
                  <p className="text-zinc-500">Impersonate Googlebot, Bingbot, or use CrawlBeast agent headers for custom logging.</p>
                </div>
              </div>
            </section>

            {/* CSV Data Exports */}
            <section id="exports" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-4 border-b border-white/5 pb-2">
                CSV Data Exports
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Export audited columns immediately. Reports contain URL paths, response status codes, header details, alt descriptors, and sitemap structures.
              </p>
              <p className="text-zinc-400 text-sm">
                Click "CSV Exporter" on the sidebar navigation, specify folders, and generate spreadsheet templates ready for client reporting.
              </p>
            </section>

            {/* Desktop Performance */}
            <section id="performance" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-4 border-b border-white/5 pb-2">
                Desktop Performance
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Unlike web apps, CrawlBeast uses native multi-threaded database queries to prevent memory bottlenecks:
              </p>
              <ul className="list-disc list-inside text-zinc-400 text-sm space-y-2 pl-4">
                <li>Supports crawls exceeding 100,000 pages with minimal CPU consumption</li>
                <li>Stores crawled nodes in a local SQLite file to prevent memory exhaustion</li>
                <li>Uses hardware-accelerated rendering blocks for local dashboard rendering</li>
              </ul>
            </section>

          </div>
        </article>
      </div>
    </main>
  );
};

export default DocsPage;
