"use client";

import React, { useState, useEffect } from "react";
import { useFounderCampaign } from "@/components/FounderCampaignContext";
import { processFounderCheckout } from "@/app/actions/checkout";
import { Check, ArrowRight, ShieldCheck, Sparkles, CreditCard, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FounderCheckoutPage() {
  const router = useRouter();
  const { isCampaignActive, timeLeftFormattedFull, timeRemainingMs } = useFounderCampaign();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect to pricing page if accessed directly while campaign is inactive/expired
  useEffect(() => {
    if (isMounted && !isCampaignActive && timeRemainingMs <= 0) {
      router.push("/pricing");
    }
  }, [isMounted, isCampaignActive, timeRemainingMs, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const response = await processFounderCheckout({
        name: formData.name,
        email: formData.email,
        companyName: formData.companyName || undefined,
      });

      if (response.success && response.redirectUrl) {
        setStatus("success");
        // Redirect to PayPal checkout link
        window.location.href = response.redirectUrl;
      } else {
        setStatus("error");
        setErrorMsg(response.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setStatus("error");
      setErrorMsg("Network error. Please check your internet connection.");
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-blue border-t-transparent" />
      </div>
    );
  }

  const benefits = [
    "Unlimited Projects",
    "Unlimited Website Crawls",
    "Unlimited URLs",
    "Unlimited Reports",
    "All Current Features",
    "All Future Features",
    "Lifetime Updates",
    "Priority Support",
    "No Monthly Subscription",
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#07090E] via-[#0b142c] to-[#07090E] overflow-hidden bg-grid-noise py-20 px-6">
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
      <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        {/* Left Side: Campaign Info, Price & Benefits */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0676FE]/10 border border-[#0676FE]/20 text-accent-blue mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Founding Member Access
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Founder Lifetime Access
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Become an early adopter of CrawlBeast. Pay once, use forever. Secure all current and future features with no monthly subscription.
            </p>
          </div>

          {/* Pricing Highlight Card */}
          <div className="glow-card p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                One-Time Payment
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-zinc-500 line-through font-bold">$199</span>
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-xs font-medium text-emerald-500 bg-emerald-950 border border-emerald-900/40 px-2 py-0.5 rounded">
                  Save 85%
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                Your Personal Offer Expires In
              </p>
              <p className="text-xs font-mono font-bold text-yellow-300 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 inline-block">
                {timeLeftFormattedFull}
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              What&apos;s Included in Lifetime Access:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-blue-950 border border-blue-900/40 text-accent-blue flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-zinc-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Step-by-Step Instructions & Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Instructions Box */}
          <div className="glow-card p-6 rounded-2xl bg-blue-950/20 border border-blue-900/30">
            <h4 className="text-xs font-bold text-accent-blue uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              How the process works:
            </h4>
            <ol className="flex flex-col gap-3 text-xs text-zinc-400 leading-relaxed list-decimal pl-4">
              <li>
                Enter your details in the checkout form below.
              </li>
              <li>
                Click <strong className="text-white">"Continue to Secure Payment"</strong> to be redirected to PayPal to complete your purchase.
              </li>
              <li>
                After successful payment, you will be redirected back to the <strong className="text-white">download page</strong>.
              </li>
              <li>
                You will receive an email containing your unique license activation code. Enter it inside the CrawlBeast desktop application to activate your Founder Lifetime Access.
              </li>
            </ol>
          </div>

          {/* Form */}
          <div className="glow-card rounded-2xl p-8 bg-zinc-950/30 border border-zinc-900">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent-blue" />
              Checkout Details
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="name" className="text-xs text-zinc-400 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="rounded-lg bg-zinc-950/80 border border-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="email" className="text-xs text-zinc-400 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="rounded-lg bg-zinc-950/80 border border-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="companyName" className="text-xs text-zinc-400 font-medium">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Agency Inc."
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="rounded-lg bg-zinc-950/80 border border-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50"
                />
              </div>

              {status === "error" && (
                <div className="text-red-500 text-xs font-semibold bg-red-950/20 border border-red-900/30 rounded-lg p-3 text-center mt-2">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 transition-colors font-semibold text-xs text-white py-3 mt-4 disabled:opacity-50 cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Secure Payment
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-900 flex justify-center items-center gap-6 text-zinc-600 text-[10px]">
              <span className="flex items-center gap-1">🔒 SSL Secured Checkout</span>
              <span className="flex items-center gap-1">✓ PayPal Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
