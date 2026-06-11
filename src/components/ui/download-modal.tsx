"use client";

import { useState } from "react";
import { X, ChevronRight, User, Mail, ArrowRight, CheckCircle } from "lucide-react";
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
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setEmail("");
        onClose();
        // Redirect to download page with parameters
        window.location.href = `/download?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
      }, 1500);
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
            onClick={() => {
              if (!loading && !isSubmitted) onClose();
            }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0e1629] to-[#06080d] p-8 shadow-2xl"
          >
            {/* Glowing Accent Border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary" />

            {/* Close Button */}
            {!loading && !isSubmitted && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {!isSubmitted ? (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                  Download for Free
                </h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  Run powerful SEO audits, uncover technical issues, and improve rankings faster. Enter details to access.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 pl-0.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                        <User className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        className="w-full bg-[#06080d]/60 border border-zinc-850 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-650 outline-none transition-all focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 pl-0.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                        <Mail className="h-4 w-4" />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="jane@framer.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="w-full bg-[#06080d]/60 border border-zinc-850 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-650 outline-none transition-all focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 text-left px-1 mb-2 font-medium">{error}</p>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all hover:brightness-110 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/30 duration-300"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating License...
                      </span>
                    ) : (
                      <>
                        Start Your Free Audit
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="mx-auto h-12 w-12 text-success flex items-center justify-center mb-4 bg-success/10 rounded-full border border-success/20"
                >
                  <CheckCircle className="h-7 w-7 text-green-500" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Audit Key Sent!
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed px-2">
                  Thank you, <strong className="text-zinc-200">{name}</strong>. We've sent your setup download link and license key to <strong className="text-zinc-200">{email}</strong>.
                </p>
                <p className="text-[10px] text-zinc-500 mt-6 animate-pulse">
                  Starting download shortly...
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
