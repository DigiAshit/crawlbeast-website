"use client";
import React, { useState } from "react";
import { usePopup } from "./PopupContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, CheckCircle, ArrowRight } from "lucide-react";

const PopupDialog: React.FC = () => {
  const { isOpen, closePopup } = usePopup();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Simulate file download trigger after a brief delay
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setEmail("");
        closePopup();
      }, 3000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!isLoading && !isSubmitted) closePopup();
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0e172a] to-[#07090e] p-8 shadow-2xl shadow-primary/10"
          >
            {/* Glowing Accent Border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary" />

            {/* Close Button */}
            {!isLoading && !isSubmitted && (
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {!isSubmitted ? (
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                  Download CrawlBeast
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Crawl up to 1,000 URLs for free natively on your desktop. Enter your details to get your download link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                        <User className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Andrej Karpathy"
                        className="w-full bg-[#07090e]/50 border border-white/5 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                        <Mail className="h-4 w-4" />
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="andrej@openai.com"
                        className="w-full bg-[#07090e]/50 border border-white/5 focus:border-primary/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-xl text-sm transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/30"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating License Key...
                      </span>
                    ) : (
                      <>
                        Download Now
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
                  className="mx-auto h-12 w-12 text-success flex items-center justify-center mb-4 bg-success/10 rounded-full"
                >
                  <CheckCircle className="h-8 w-8" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Audit Key Sent!
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Thank you, <strong className="text-zinc-200">{name}</strong>. We've sent your setup download link and license key to <strong className="text-zinc-200">{email}</strong>.
                </p>
                <p className="text-xs text-zinc-500 mt-6 animate-pulse">
                  Starting download shortly...
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupDialog;
