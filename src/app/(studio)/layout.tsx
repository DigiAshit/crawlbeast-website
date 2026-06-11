import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CrawlBeast Studio",
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

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
