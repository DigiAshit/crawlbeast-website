import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { PopupProvider } from "@/components/PopupContext";
import PopupDialog from "@/components/PopupDialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity.client";
import { settingsQuery } from "@/lib/sanity.queries";
import Script from "next/script";
import { FounderCampaignProvider } from "@/components/FounderCampaignContext";
import StickyAnnouncementBar from "@/components/StickyAnnouncementBar";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import FounderPopups from "@/components/FounderPopups";
import "../globals.css";

// Revalidate all pages using this layout every 60 seconds
export const revalidate = 60;

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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/crawlBeast.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/crawlBeast.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: any = null;
  try {
    settings = await client.fetch(settingsQuery);
  } catch (err) {
    console.error("Error fetching site settings in RootLayout:", err);
  }

  const companyLogoUrl = settings?.companyLogo 
    ? urlFor(settings.companyLogo).url() 
    : undefined;

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        {/* Google Tag Manager */}
        {settings?.googleTagManagerId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${settings.googleTagManagerId}');
              `,
            }}
          />
        )}

        {/* Google Analytics */}
        {settings?.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}

        {/* Microsoft Clarity */}
        {settings?.microsoftClarityId && (
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window,document,"clarity","script","${settings.microsoftClarityId}");
              `,
            }}
          />
        )}

        {/* Custom Head HTML Injection */}
        {settings?.customHeadHtml && (
          <style dangerouslySetInnerHTML={{ __html: `</style>${settings.customHeadHtml}<style>` }} />
        )}

        {/* Custom Head Scripts Injection */}
        {settings?.customHeadScripts && (
          <style dangerouslySetInnerHTML={{ __html: `</style>${settings.customHeadScripts}<style>` }} />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[#07090E] text-[#F8FAFC]">
        <FounderCampaignProvider>
          <PopupProvider>
            {/* Sticky Announcement Bar */}
            <StickyAnnouncementBar />

            {/* Download Dialog Modal */}
            <PopupDialog />

            {/* Sticky Header */}
            <Header siteName={settings?.siteName} logoUrl={companyLogoUrl} />
            
            {/* Main App Page content */}
            <MainLayoutWrapper>
              {children}
            </MainLayoutWrapper>
            
            {/* Coordinated Campaign Popups & Floating Button */}
            <FounderPopups />

            {/* General Footer */}
            <Footer 
              siteName={settings?.siteName} 
              companyName={settings?.companyName} 
              supportEmail={settings?.supportEmail}
              socialProfiles={settings?.socialProfiles}
            />
          </PopupProvider>
        </FounderCampaignProvider>
      </body>
    </html>
  );
}
