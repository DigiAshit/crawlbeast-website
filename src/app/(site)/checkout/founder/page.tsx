"use client";

import React, { useState, useEffect } from "react";
import { useFounderCampaign } from "@/components/FounderCampaignContext";
import { processFounderCheckout } from "@/app/actions/checkout";
import { Check, ArrowRight, ShieldCheck, Sparkles, CreditCard, HelpCircle } from "lucide-react";
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
    <div className="relative min-h-screen bg-gradient-to-b from-[#0b142c] via-[#0d1e45] to-[#07090E] overflow-hidden bg-grid-noise py-20 px-6">
      {/* Brighter background highlights */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[350px] bg-gradient-to-b from-accent-blue/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
      <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />

      {/* Main Grid: Left = Info/Benefits, Right = Form */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        {/* Left Side: Campaign Info, Price & Benefits */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0676FE]/20 border border-[#0676FE]/40 text-blue-300 mb-4 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              Founding Member Access
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Founder Lifetime Access
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Become an early adopter of CrawlBeast. Pay once, use forever. Secure all current and future features with no monthly subscription.
            </p>
          </div>

          {/* Pricing Highlight Card - Lighter & Brighter Accent */}
          <div className="glow-card p-6 rounded-2xl bg-white/10 border border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                One-Time Payment
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-zinc-400 line-through font-bold">$199</span>
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-950/80 border border-emerald-900/60 px-2.5 py-1 rounded">
                  Save 85%
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">
                Your Personal Offer Expires In
              </p>
              <p className="text-xs font-mono font-bold text-yellow-300 bg-black/60 px-3.5 py-2 rounded-lg border border-white/10 inline-block shadow-inner">
                {timeLeftFormattedFull}
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
              What&apos;s Included in Lifetime Access:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2.5 p-1">
                  <div className="h-5 w-5 rounded-full bg-white/10 border border-white/20 text-blue-300 flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-zinc-200 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Checkout Form (Styled Brighter with Glassmorphism) */}
        <div className="lg:col-span-5">
          <div className="glow-card rounded-2xl p-8 bg-white/5 border border-white/15 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent-blue" />
              Checkout Details
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="name" className="text-xs text-zinc-300 font-medium">
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
                  className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white/10 disabled:opacity-50 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="email" className="text-xs text-zinc-300 font-medium">
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
                  className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white/10 disabled:opacity-50 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="companyName" className="text-xs text-zinc-300 font-medium">
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
                  className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-blue focus:border-accent-blue focus:bg-white/10 disabled:opacity-50 transition-all"
                />
              </div>

              {status === "error" && (
                <div className="text-red-400 text-xs font-semibold bg-red-950/40 border border-red-900/50 rounded-lg p-3 text-center mt-2">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 transition-colors font-bold text-xs text-white py-3 mt-4 disabled:opacity-50 cursor-pointer shadow-lg shadow-accent-blue/20"
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

            <div className="mt-6 pt-6 border-t border-white/5 flex justify-center items-center gap-6 text-zinc-400 text-[10px]">
              <span className="flex items-center gap-1">🔒 SSL Secured Checkout</span>
              <span className="flex items-center gap-1">✓ PayPal Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row Below: How the Process Works (Spans Full Width) */}
      <div className="relative max-w-6xl mx-auto mt-16 border-t border-white/10 pt-16">
        <div className="glow-card p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-accent-blue" />
            How the Process Works
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 text-xs font-bold text-blue-300 mb-2">1</span>
              <h5 className="text-xs font-bold text-white">Enter Details</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Provide your contact details in the checkout form above to register your license key reference.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 text-xs font-bold text-blue-300 mb-2">2</span>
              <h5 className="text-xs font-bold text-white">Complete Payment</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Submit the form and checkout securely via PayPal's payment page to complete your $29 purchase.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 text-xs font-bold text-blue-300 mb-2">3</span>
              <h5 className="text-xs font-bold text-white">Redirect to App</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                After checkout, PayPal automatically redirects you back to our download page to grab the desktop installer.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20 text-xs font-bold text-blue-300 mb-2">4</span>
              <h5 className="text-xs font-bold text-white">License Activation</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Check your inbox for the activation license code. Enter the code inside the app to unlock your lifetime limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
