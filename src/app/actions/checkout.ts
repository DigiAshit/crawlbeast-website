"use server";

import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u4287n71",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});

export async function processFounderCheckout(formData: {
  name: string;
  email: string;
  companyName?: string;
}) {
  const { name, email, companyName } = formData;

  // 1. Validation
  if (!name || !name.trim()) {
    return { error: "Full Name is required" };
  }
  if (!email || !email.trim()) {
    return { error: "Email Address is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { error: "Please enter a valid email address" };
  }

  // 2. Save lead to Sanity under "founderCheckout" document type
  try {
    const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
      console.warn("Sanity write token is missing. Founder checkout document will not be created.");
    } else {
      await writeClient.create({
        _type: "founderCheckout",
        name: name.trim(),
        email: email.trim().toLowerCase(),
        companyName: companyName ? companyName.trim() : undefined,
        status: "pending",
        submittedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error("Failed to save founder checkout to Sanity:", err);
    // Continue despite Sanity failures so payment flow is never blocked
  }

  // 3. Retrieve and return the PayPal URL
  const paypalUrl = process.env.PAYPAL_FOUNDER_URL || "https://www.paypal.com/ncp/payment/YTEJ3CJGHYR7Es";

  return { success: true, redirectUrl: paypalUrl };
}
