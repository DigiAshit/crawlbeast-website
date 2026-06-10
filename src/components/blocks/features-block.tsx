"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, Bug, BarChart3, Globe, Cpu, Clock, 
  TrendingUp, Shield, Check, Star, Zap, Settings, 
  Search, Terminal, Mail, Info, FileText, ArrowRight 
} from "lucide-react";
import { useState } from "react";
import DownloadModal from "@/components/ui/download-modal";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
  transition: { duration: 0.8, ease: easeWeb }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeWeb }
  }
};

const iconMap: Record<string, React.ComponentType<any>> = {
  "sparkles": Sparkles,
  "bug": Bug,
  "bar-chart": BarChart3,
  "globe": Globe,
  "cpu": Cpu,
  "clock": Clock,
  "trending-up": TrendingUp,
  "shield": Shield,
  "check": Check,
  "star": Star,
  "zap": Zap,
  "settings": Settings,
  "search": Search,
  "terminal": Terminal,
  "mail": Mail,
  "info": Info,
  "file-text": FileText,
};

interface FeatureItem {
  icon?: string;
  title: string;
  description?: string;
}

interface FeaturesBlockProps {
  sectionTitle: string;
  sectionDescription?: string;
  features: FeatureItem[];
}

export default function FeaturesBlock({
  sectionTitle,
  sectionDescription,
  features
}: FeaturesBlockProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.section 
      {...fadeInUp}
      className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-semibold tracking-wider text-[#0A39F0]">Features</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">{sectionTitle}</h2>
        {sectionDescription && (
          <p className="text-zinc-400 text-sm">{sectionDescription}</p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
      >
        {features.map((feature, idx) => {
          const IconComponent = iconMap[feature.icon || ""] || Sparkles;
          
          // Map dynamic sizes for grid items to mimic bento structure
          let colSpan = "md:col-span-3"; // Default: half grid width
          if (features.length > 3) {
            if (idx === 0 || idx === 1) {
              colSpan = "md:col-span-3";
            } else if (idx === 2) {
              colSpan = "md:col-span-2";
            } else {
              colSpan = "md:col-span-4";
            }
          }

          return (
            <motion.div 
              key={idx} 
              variants={cardVariants} 
              className={`glow-card p-8 rounded-2xl ${colSpan} flex flex-col justify-between`}
            >
              <div>
                <IconComponent className="h-8 w-8 text-[#0A39F0] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                {feature.description && (
                  <p className="text-xs text-zinc-400 leading-relaxed">{feature.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[#0A39F0] hover:bg-[#002bd6] transition-all font-semibold text-sm text-white px-6 py-3.5 shadow-[0_4px_20px_rgba(10,57,240,0.3)] cursor-pointer"
        >
          Get Started Today
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.section>
  );
}
