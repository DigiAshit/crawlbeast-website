"use client";

import { motion } from "framer-motion";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.8, ease: easeWeb }
};

interface ChangelogBlockProps {
  version: string;
  date: string;
  description?: string;
}

export default function ChangelogBlock({
  version,
  date,
  description
}: ChangelogBlockProps) {
  return (
    <motion.section 
      {...fadeInUp}
      className="py-12 px-6 max-w-4xl mx-auto text-left text-white border-b border-zinc-900 last:border-b-0"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#0A39F0]/20 border border-[#0A39F0]/30 text-[#0A39F0]">
            {version}
          </span>
          <span className="text-xs text-zinc-500 font-mono">
            Released on {date}
          </span>
        </div>
      </div>
      {description && (
        <div className="mt-4 text-sm text-zinc-350 leading-relaxed font-sans">
          {description}
        </div>
      )}
    </motion.section>
  );
}
