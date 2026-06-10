"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate submission
    setTimeout(() => {
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden bg-grid-noise py-20 px-6">
      {/* Background glow highlights */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
      <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />

      {/* Hero Header */}
      <div className="relative max-w-4xl mx-auto text-center mt-12 mb-20">
        <span className="text-xs uppercase font-semibold tracking-wider text-accent-blue bg-blue-950/40 border border-blue-900/40 px-3 py-1 rounded-full">
          Contact
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mt-6 mb-6">
          We’d Love to Hear From You
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Whether you have a question, feedback, partnership inquiry, or just want to say hello &mdash; we&apos;re here and ready to help.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Grid Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glow-card p-6 rounded-xl flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-950 border border-blue-900/40">
              <Mail className="h-5 w-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Email Us</h3>
              <p className="text-xs text-zinc-400 mb-2">For general support and inquiries.</p>
              <a href="mailto:support@onixtheme.com" className="text-xs text-accent-blue font-medium hover:underline">
                support@onixtheme.com
              </a>
            </div>
          </div>

          <div className="glow-card p-6 rounded-xl flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-950 border border-blue-900/40">
              <Phone className="h-5 w-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Call Us</h3>
              <p className="text-xs text-zinc-400 mb-2">Available Mon-Fri, 9am - 5pm PST.</p>
              <a href="tel:+12345678901" className="text-xs text-zinc-300 font-medium hover:text-white transition-colors">
                +1 (234) 567-8901
              </a>
            </div>
          </div>

          <div className="glow-card p-6 rounded-xl flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-950 border border-blue-900/40">
              <MapPin className="h-5 w-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Office Location</h3>
              <p className="text-xs text-zinc-400">
                44 Market Street, San Francisco
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Form */}
        <div className="lg:col-span-7">
          <div className="glow-card rounded-2xl p-8 bg-zinc-950/30 border border-zinc-900">
            <h2 className="text-lg font-bold text-white mb-6">Get in Touch</h2>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 border border-emerald-900/40 text-emerald-500 mb-4">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                    Thank you for reaching out. We have received your query and will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs text-accent-blue font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="firstName" className="text-xs text-zinc-400 font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        className="rounded-lg bg-zinc-950/80 border border-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lastName" className="text-xs text-zinc-400 font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        className="rounded-lg bg-zinc-950/80 border border-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs text-zinc-400 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="rounded-lg bg-zinc-950/80 border border-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs text-zinc-400 font-medium">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="rounded-lg bg-zinc-950/80 border border-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs text-zinc-400 font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="rounded-lg bg-zinc-950/80 border border-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 transition-colors font-semibold text-xs text-white py-3 mt-2 disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        Send Message
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
