"use client";

import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email || !email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email must be valid");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setLoading(false);
      onClose();
      // Redirect to download page with parameters
      window.location.href = `/download?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to submit lead");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#000F5C] via-[#000420] to-[#000420] p-8 sm:p-10 text-center shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors hover:bg-white/5"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Inner Content Grid */}
            <div className="flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4.5 py-1.5 text-xs text-zinc-300 font-medium mb-6">
                <div className="flex h-4 w-4 items-center justify-center rounded bg-white/10">
                  <ChevronRight className="h-3.5 w-3.5 text-white" />
                </div>
                <span>Our Approach</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Download for Free
              </h2>

              {/* Subtitle */}
              <p className="text-sm text-zinc-300 max-w-xs sm:max-w-sm leading-relaxed mb-8">
                Run powerful SEO audits, uncover technical issues, and improve rankings faster.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl bg-white/95 text-black placeholder-zinc-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue font-medium disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    required
                    placeholder="jane@framer.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl bg-white/95 text-black placeholder-zinc-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue font-medium disabled:opacity-50"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 text-left px-1">{error}</p>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary-blue to-accent-blue py-3 font-bold text-sm text-white transition-all shadow-[0_4px_20px_rgba(10,57,240,0.3)] hover:opacity-95 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    "Start Your Free Audit"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
