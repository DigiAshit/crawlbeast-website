import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { PopupProvider } from "@/components/PopupContext";
import PopupDialog from "@/components/PopupDialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "CrawlBeast | Turn SEO Insights Into Revenue",
  description: "Run powerful desktop SEO audits locally. Analyze sitemaps, uncover rendering errors, index broken links, and audit images with speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-[#07090E] text-[#F8FAFC]">
        <PopupProvider>
          {/* Download Dialog Modal */}
          <PopupDialog />

          {/* Sticky Header */}
          <Header />
          
          {/* Main App Page content */}
          <div className="flex flex-col flex-1 pt-[80px]">
            {children}
          </div>
          
          {/* General Footer */}
          <Footer />
        </PopupProvider>
      </body>
    </html>
  );
}
