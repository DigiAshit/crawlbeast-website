"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePopup } from "./PopupContext";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openPopup } = usePopup();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Docs", path: "/docs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#07090e]/80 border-b border-white/5 backdrop-blur-md py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/crawlBeast.png"
              alt="CrawlBeast"
              className="h-9 w-auto object-contain rounded-lg transition-transform group-hover:scale-105"
            />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              CrawlBeast
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 text-sm font-semibold text-zinc-400">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className={`hover:text-white transition-colors relative py-2 ${
                        isActive ? "text-white" : ""
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="navUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Header Button */}
            <button
              onClick={openPopup}
              className="bg-white hover:bg-zinc-200 text-[#07090E] font-bold text-xs py-2.5 px-4 rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-white/5 active:scale-95"
            >
              Download Now
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[80px] z-30 md:hidden bg-[#07090e] border-b border-white/5 py-8 px-6 flex flex-col gap-6 shadow-2xl"
          >
            <ul className="flex flex-col gap-4 text-lg font-medium text-zinc-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setIsOpen(false);
                openPopup();
              }}
              className="w-full bg-white hover:bg-zinc-200 text-[#07090E] font-bold py-3 px-6 rounded-full text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5"
            >
              Download Now
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
