"use client";
import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setMsg("");
      }, 5000);
    }, 1200);
  };

  return (
    <main className="flex-1 py-16 md:py-24 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-secondary mb-3 uppercase tracking-wider">
            Contact Support
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            How Can We Help You?
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Have questions about crawl setups, custom volume plans, or desktop features? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-4xl mx-auto items-start">
          
          {/* Support Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0e1320] border border-white/5 p-6 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                Support Details
              </h3>
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-secondary rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">
                    Email Support
                  </h4>
                  <a href="mailto:support@crawlbeast.com" className="text-sm font-semibold text-white hover:text-primary transition-colors">
                    support@crawlbeast.com
                  </a>
                  <p className="text-[10px] text-zinc-500 mt-1 font-semibold">Average reply: &lt; 12 hours</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-secondary rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-1">
                    Office Location
                  </h4>
                  <p className="text-sm font-semibold text-white">
                    Delhi, India
                  </p>
                </div>
              </div>

            </div>

            <p className="text-zinc-600 text-xs leading-relaxed px-4 font-semibold">
              Note: We do not offer support over phone lines. Please write to support@crawlbeast.com or submit a ticket via this page.
            </p>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-[#0e1320] border border-white/5 p-8 rounded-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 bg-success/10 border border-success/20 text-success rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Message Transmitted</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Thank you! Your ticket was generated successfully. Our engineering team will review it and reply within 12 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                  Open Support Ticket
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sophia Miller"
                    className="w-full bg-[#07090e] border border-white/5 focus:border-primary/50 rounded-lg py-3 px-4 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sophia@scaleagency.com"
                    className="w-full bg-[#07090e] border border-white/5 focus:border-primary/50 rounded-lg py-3 px-4 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Describe your crawl issue or license questions..."
                    className="w-full bg-[#07090e] border border-white/5 focus:border-primary/50 rounded-lg py-3 px-4 text-sm text-white placeholder-zinc-600 outline-none resize-none transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-lg text-sm transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/15"
                >
                  {loading ? (
                    <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Transmit Ticket
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </main>
  );
};

export default ContactPage;
