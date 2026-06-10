"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DownloadModal from "@/components/ui/download-modal";
import Image from "next/image";


const navItems = [
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Image src="/crawlBeast.png" alt="CrawlBeast Logo" width={28} height={28} style={{ height: "auto" }} className="object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Crawl<span className="text-accent-blue">Beast</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium transition-colors hover:text-white text-zinc-400 py-1"
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-accent-blue"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all hover:bg-zinc-200 cursor-pointer"
          >
            Download Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-zinc-900 bg-black md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  onClick={() => setIsOpen(false)}
                  href={item.href}
                  className={`text-base font-medium transition-colors ${
                    pathname === item.href ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-zinc-900 my-2" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0A39F0] hover:bg-[#002bd6] py-3 text-sm font-semibold text-white transition-all shadow-[0_4px_20px_rgba(10,57,240,0.3)] cursor-pointer"
              >
                Download Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
    <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
