"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/data/blog-posts";

const easeWeb: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeWeb }
};

interface BlogListingProps {
  initialPosts: BlogPost[];
}

export default function BlogListing({ initialPosts }: BlogListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "SEO Tools", "SEO Workflows", "SEO Reporting"];

  const filteredPosts = initialPosts
    .filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#07090E] via-[#0b142c] to-[#07090E] overflow-hidden bg-grid-noise py-20 px-6">
      {/* Background glow highlights */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
      <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header section */}
        <div className="text-center mt-12 mb-16">
          <motion.span 
            {...fadeInUp}
            className="text-xs uppercase font-semibold tracking-wider text-accent-blue bg-blue-950/40 border border-blue-900/40 px-3 py-1 rounded-full"
          >
            SEO Insights
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeWeb }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mt-6 mb-6"
          >
            The CrawlBeast Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeWeb }}
            className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Technical SEO deep-dives, website crawling diagnostics, and website audit workflows built for modern agency growth.
          </motion.p>
        </div>

        {/* Controls: Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeWeb }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-between border-b border-white/5 pb-8 mb-12"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#0676FE] text-white shadow-lg shadow-primary/25"
                    : "bg-[#0e1320]/60 border border-white/5 text-zinc-400 hover:text-white hover:bg-[#161e31]/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-[#06080d]/60 border border-zinc-800 focus:border-primary/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-550 outline-none transition-all focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: easeWeb }}
                key={post.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#0e1320]/60 p-6 hover:bg-[#161e31]/60 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div>
                  {/* Image wrapper */}
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-video rounded-2xl overflow-hidden mb-6 bg-zinc-950/20">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Metadata info */}
                  <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">
                    <span className="text-[#0676FE]">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-bold text-white group-hover:text-[#0676FE] transition-colors line-clamp-2 mb-3 leading-snug">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-6">
                    {post.metaDescription}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300 border border-zinc-700">
                      CB
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">{post.author}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{post.date}</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-white/5 rounded-3xl bg-zinc-950/10"
          >
            <p className="text-zinc-400 text-sm">No articles found matching your search query.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
