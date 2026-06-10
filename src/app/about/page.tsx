import { client } from "@/lib/sanity.client";
import { pageBySlugQuery } from "@/lib/sanity.queries";
import PageBuilder from "@/components/page-builder";
import StaticAbout from "@/components/static-about";
import { getPageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch(pageBySlugQuery, { slug: "about" });
    if (!page) {
      return {
        title: "About Us | CrawlBeast",
        description: "Built to solve technical SEO auditing speed. CrawlBeast runs directly on your desktop for complete speed, scale, and privacy.",
      };
    }
    return await getPageMetadata(page.seoSettings, page.title);
  } catch (err) {
    console.error("Error generating metadata for about:", err);
    return {
      title: "About Us | CrawlBeast",
    };
  }
}

export default async function AboutPage() {
  let page: any = null;
  try {
    page = await client.fetch(pageBySlugQuery, { slug: "about" });
  } catch (err) {
    console.error("Error querying about page from Sanity:", err);
  }

  if (page && page.contentBlocks && page.contentBlocks.length > 0) {
    const structuredData = page.seoSettings?.structuredData;
    return (
      <>
        <div className="relative min-h-screen bg-black overflow-hidden bg-grid-noise py-20 px-6">
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
          <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />
          <PageBuilder blocks={page.contentBlocks} />
        </div>
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredData }}
          />
        )}
      </>
    );
  }

  return <StaticAbout />;
}
