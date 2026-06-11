"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DownloadModal from "@/components/ui/download-modal";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.8, ease: easeWeb }
};

interface CtaBlockProps {
  heading: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export default function CtaBlock({
  heading,
  description,
  buttonText = "Download Now",
  buttonUrl = "#"
}: CtaBlockProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (buttonUrl === "#download" || buttonUrl === "/download" || buttonText.toLowerCase().includes("download")) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <motion.section 
      {...fadeInUp}
      className="relative py-24 px-6 max-w-5xl mx-auto text-center border border-white/10 rounded-3xl bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 overflow-hidden mt-12"
    >
      <div className="absolute inset-0 bg-radial-gradient opacity-50 pointer-events-none" />
      <span className="text-xs uppercase font-semibold tracking-wider text-[#0A39F0]">Welcome to CrawlBeast</span>
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-5 max-w-2xl mx-auto leading-tight">
        {heading}
      </h2>
      {description && (
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-8">
          {description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href={buttonUrl}
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[#0A39F0] hover:bg-[#002bd6] transition-all font-semibold text-sm text-white px-6 py-3.5 w-full sm:w-auto shadow-[0_4px_20px_rgba(10,57,240,0.3)] cursor-pointer"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.section>
  );
}
