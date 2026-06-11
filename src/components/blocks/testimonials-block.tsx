"use client";

import { motion } from "framer-motion";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.8, ease: easeWeb }
};

interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  initials?: string;
}

interface TestimonialsBlockProps {
  title: string;
  testimonials: TestimonialItem[];
}

export default function TestimonialsBlock({
  title,
  testimonials
}: TestimonialsBlockProps) {
  return (
    <motion.section 
      {...fadeInUp}
      className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-semibold tracking-wider text-[#0A39F0] font-mono">Testimonials</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4 font-display">{title}</h2>
        <p className="text-zinc-400 text-sm">
          From freelance consultants to enterprise teams — what they say about CrawlBeast.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test, idx) => (
          <div 
            key={idx} 
            className="bg-gradient-to-br from-[#000F5C]/80 to-[#00178A]/20 border border-white/10 shadow-sm hover:shadow-xl hover:border-[#0A39F0]/40 transition-all duration-300 p-6 rounded-2xl flex flex-col justify-between h-full hover:shadow-[0_0_30px_rgba(10,57,240,0.15)] text-white"
          >
            <p className="text-xs text-zinc-300 leading-relaxed mb-6 italic">
              “{test.quote}”
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
              <div className="h-9 w-9 rounded-full bg-[#0A39F0]/20 border border-[#0A39F0]/30 flex items-center justify-center text-xs font-bold text-[#0A39F0] font-mono">
                {test.initials || test.author.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{test.author}</h4>
                {test.role && (
                  <p className="text-[10px] text-zinc-400 font-mono">{test.role}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
