"use client";

import { useState } from "react";
import { 
  Search, ArrowRight, Keyboard
} from "lucide-react";

const articles = [
  {
    id: "intro",
    category: "Getting Started",
    title: "Introduction to CrawlBeast",
    desc: "Understand the desktop-first local crawling architecture and how it differs from traditional cloud-based SaaS auditors.",
    content: (
      <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
        <p>
          CrawlBeast is a desktop-first technical SEO auditing tool designed to bypass standard SaaS subscription limits. By executing the multi-threaded crawl engine locally on your machine, CrawlBeast can scan thousands of pages in seconds without consuming external proxy/API credits.
        </p>
        <h4 className="text-sm font-semibold text-white mt-6 mb-2">Key Advantages</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-white">Raw Speed:</strong> Multi-threaded desktop request workers crawl up to 250 URLs per second depending on target server configurations.</li>
          <li><strong className="text-white">Absolute Privacy:</strong> Your audit databases, project settings, and site map structures remain on your local machine. No data leaves your computer.</li>
          <li><strong className="text-white">Cost Efficiency:</strong> Crawl up to 1,000 URLs completely free, or upgrade once to crawl unlimited projects and pages.</li>
        </ul>
      </div>
    )
  },
  {
    id: "install",
    category: "Getting Started",
    title: "Installation & Setup",
    desc: "Step-by-step instructions on deploying the application binary on macOS, Windows, and Linux operating systems.",
    content: (
      <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
        <p>
          Deploying CrawlBeast takes less than 30 seconds. Download the binary package matching your computer&apos;s OS version and follow the instructions below:
        </p>
        <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-4 font-mono text-xs text-accent-blue space-y-2">
          <div># Install on Ubuntu/Debian Linux</div>
          <div>$ sudo dpkg -i crawlbeast_1.4.2_amd64.deb</div>
        </div>
        <h4 className="text-sm font-semibold text-white mt-6 mb-2">Gatekeeper Exceptions (macOS)</h4>
        <p>
          Because CrawlBeast is a developer utility, macOS may ask for confirmation on the first launch. Right-click the app in your Applications folder and select <strong>Open</strong> to override the launch verification flag.
        </p>
      </div>
    )
  },
  {
    id: "crawl-config",
    category: "Configuration",
    title: "Crawler User-Agent & Speed Limits",
    desc: "Configure custom HTTP headers, user-agents, request threads, and connection timeout rules.",
    content: (
      <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
        <p>
          You can modify the request signatures and limits directly from the project setup tab. Setting appropriate speeds helps prevent triggering cloudfire limits on target hosts.
        </p>
        <h4 className="text-sm font-semibold text-white mt-6 mb-2">Configurable Values</h4>
        <table className="w-full text-xs text-left border-collapse border border-zinc-900">
          <thead>
            <tr className="bg-zinc-950 border-b border-zinc-900 text-zinc-400">
              <th className="p-2.5">Key</th>
              <th className="p-2.5">Default</th>
              <th className="p-2.5">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            <tr>
              <td className="p-2.5 font-mono text-white">User-Agent</td>
              <td className="p-2.5 font-mono">CrawlBeast/1.4</td>
              <td className="p-2.5">Identifies the crawler. Can be set to Googlebot or custom.</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-white">Max Threads</td>
              <td className="p-2.5 font-mono">20</td>
              <td className="p-2.5">Number of concurrent HTTP connection processes.</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-white">Delay (ms)</td>
              <td className="p-2.5 font-mono">0</td>
              <td className="p-2.5">Cooldown delay between queries.</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },
  {
    id: "robots",
    category: "Configuration",
    title: "Overriding Robots.txt Guidelines",
    desc: "Learn how to override live robots.txt directives to crawl staging sites and local folders.",
    content: (
      <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
        <p>
          By default, CrawlBeast respects all <code className="text-accent-blue font-mono">Disallow</code> rules in your website&apos;s <code className="text-accent-blue font-mono">robots.txt</code> file. However, if you are auditing staging sites or private local environments, you can choose to bypass robots.txt limits.
        </p>
        <p>
          Toggle the <strong>Ignore Robots.txt</strong> slider under the Crawl Options submenu to enable this override. Note: Please run audits responsibly and avoid crawler overload on live production databases.
        </p>
      </div>
    )
  },
  {
    id: "errors",
    category: "Issue Database",
    title: "Common SEO Errors Explained",
    desc: "Understand key SEO diagnostic categories: 404 pages, social open-graph header missing, circular canonical links, and media alternate texts.",
    content: (
      <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
        <p>
          CrawlBeast identifies dozens of technical mistakes. Below are the most critical metrics you should inspect first:
        </p>
        <ul className="list-none space-y-4 mt-4">
          <li className="p-4 rounded-lg bg-zinc-950 border border-zinc-900">
            <span className="text-xs font-bold text-amber-500 block mb-1">404 Broken Paths</span>
            <p className="text-xs">
              Occurs when an internal anchor link refers to a missing page. Update the reference link target or setup redirection paths to prevent index confusion.
            </p>
          </li>
          <li className="p-4 rounded-lg bg-zinc-950 border border-zinc-900">
            <span className="text-xs font-bold text-emerald-500 block mb-1">Missing OpenGraph (Social Headers)</span>
            <p className="text-xs">
              If social share parameters like og:title or og:description are missing, social networks will fall back to default layouts, lowering engagement.
            </p>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: "gsc",
    category: "Exporting Reports",
    title: "Google Search Console API Sync",
    desc: "Synchronize raw indexing statuses directly from GSC API keys into your local audit sheets.",
    content: (
      <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
        <p>
          Synchronizing Search Console statistics allows CrawlBeast to map actual impressions, clicks, and indexing status indicators alongside crawl diagnostics.
        </p>
        <h4 className="text-sm font-semibold text-white mt-6 mb-2">Connection Setup</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create a Google Cloud credentials file (.json client secret).</li>
          <li>Import the credentials block under the Integrations tab.</li>
          <li>Select the specific GSC URL property matching your project.</li>
        </ol>
      </div>
    )
  }
];

const categories = ["Getting Started", "Configuration", "Issue Database", "Exporting Reports"];

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState("intro");

  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedArticle = articles.find((art) => art.id === activeArticle) || articles[0];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden bg-grid-noise py-20 px-6">
      {/* Glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />

      {/* Docs Shell */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-zinc-950/80 border border-zinc-900 pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue"
            />
          </div>

          {/* Navigation Links Category group */}
          <div className="flex flex-col gap-6">
            {categories.map((cat) => {
              const catArticles = filteredArticles.filter((art) => art.category === cat);
              if (catArticles.length === 0) return null;
              return (
                <div key={cat} className="flex flex-col gap-2">
                  <h3 className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 px-3">
                    {cat}
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {catArticles.map((art) => (
                      <li key={art.id}>
                        <button
                          onClick={() => setActiveArticle(art.id)}
                          className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors ${
                            activeArticle === art.id
                              ? "bg-zinc-900 text-white font-medium border-l-2 border-accent-blue"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-950/40"
                          }`}
                        >
                          {art.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Quick Keyboard shortcuts */}
          <div className="glow-card p-5 rounded-xl border border-zinc-900 bg-zinc-950/20 hidden lg:block">
            <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5">
              <Keyboard className="h-4 w-4 text-accent-blue" />
              Keyboard Shortcuts
            </h4>
            <div className="flex flex-col gap-2.5 text-[10px] text-zinc-500 font-mono">
              <div className="flex justify-between">
                <span>New Project</span>
                <kbd className="bg-zinc-900 px-1.5 py-0.5 rounded text-white border border-zinc-800">CMD N</kbd>
              </div>
              <div className="flex justify-between">
                <span>Start Crawl</span>
                <kbd className="bg-zinc-900 px-1.5 py-0.5 rounded text-white border border-zinc-800">Space</kbd>
              </div>
              <div className="flex justify-between">
                <span>Search Docs</span>
                <kbd className="bg-zinc-900 px-1.5 py-0.5 rounded text-white border border-zinc-800">/</kbd>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="lg:col-span-9">
          <div className="glow-card rounded-2xl p-8 sm:p-12 bg-zinc-950/20 backdrop-blur-sm min-h-[500px]">
            {/* Header detail */}
            <span className="text-[10px] uppercase font-bold text-accent-blue tracking-wider">
              {selectedArticle.category}
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2.5 mb-3">
              {selectedArticle.title}
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-b border-zinc-900 pb-6">
              {selectedArticle.desc}
            </p>

            {/* Main Article Content */}
            <div className="article-body">
              {selectedArticle.content}
            </div>

            {/* Bottom docs footer */}
            <div className="border-t border-zinc-900 mt-12 pt-8 flex items-center justify-between text-xs text-zinc-500">
              <span>Last updated: June 2026</span>
              <a href="/contact" className="text-accent-blue hover:underline flex items-center gap-1">
                Was this page helpful? Let us know
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
