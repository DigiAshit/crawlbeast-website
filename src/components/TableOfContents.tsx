"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, AlignLeft } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  tocItems: TOCItem[];
}

export default function TableOfContents({ tocItems }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (tocItems.length === 0) return;

    // Set initial active heading
    setActiveId(tocItems[0].id);

    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px", // Trigger when heading is near top of screen
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      tocItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [tocItems]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setActiveId(id);
      setIsMobileOpen(false);
    }
  };

  if (tocItems.length === 0) return null;

  const activeText = tocItems.find((item) => item.id === activeId)?.text || "Jump to section";

  return (
    <>
      {/* Mobile Accordion Table of Contents */}
      <div className="block lg:hidden mb-8 border border-zinc-200 rounded-2xl bg-zinc-50 overflow-hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-zinc-900 focus:outline-none"
        >
          <span className="flex items-center gap-2 text-zinc-700">
            <AlignLeft className="h-4 w-4 text-[#0676FE]" />
            {isMobileOpen ? "Table of Contents" : activeText}
          </span>
          {isMobileOpen ? (
            <ChevronUp className="h-4 w-4 text-zinc-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          )}
        </button>

        {isMobileOpen && (
          <ul className="border-t border-zinc-200 divide-y divide-zinc-100 bg-white px-5 py-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className={`block py-3 text-sm transition-colors ${
                    activeId === item.id
                      ? "text-[#0676FE] font-bold"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop Sticky Table of Contents */}
      <div className="hidden lg:block sticky top-28 max-w-[220px] max-h-[calc(100vh-180px)] overflow-y-auto pr-2 scrollbar-thin">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
          Table of Contents
        </h4>
        <ul className="space-y-2 text-xs font-medium border-l border-zinc-200">
          {tocItems.map((item) => (
            <li key={item.id} className="relative -ml-[1px]">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`block pl-3 py-1 leading-snug transition-all ${
                  activeId === item.id
                    ? "text-[#0676FE] font-bold border-l-2 border-[#0676FE]"
                    : "text-zinc-500 hover:text-zinc-900 border-l border-transparent"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
