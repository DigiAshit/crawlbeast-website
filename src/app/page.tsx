import { client } from "@/lib/sanity.client";
import { pageBySlugQuery } from "@/lib/sanity.queries";
import PageBuilder from "@/components/page-builder";
import StaticHomepage from "@/components/static-homepage";
import { getPageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch(pageBySlugQuery, { slug: "/" });
    if (!page) {
      return {
        title: "CrawlBeast | Desktop SEO Auditing Application",
        description: "Run powerful SEO audits directly from your desktop. Analyze websites, uncover critical issues, and turn data into actionable insights faster than ever.",
        icons: {
          icon: "/crawlBeast.png",
        }
      };
    }
    return await getPageMetadata(page.seoSettings, page.title);
  } catch (err) {
    console.error("Error generating metadata for homepage:", err);
    return {
      title: "CrawlBeast | Desktop SEO Auditing Application",
    };
  }
}

export default async function Home() {
  let page: any = null;
  try {
    page = await client.fetch(pageBySlugQuery, { slug: "/" });
    if (!page) {
      page = await client.fetch(pageBySlugQuery, { slug: "home" });
    }
  } catch (err) {
    console.error("Error querying homepage from Sanity:", err);
  }

  if (page && page.contentBlocks && page.contentBlocks.length > 0) {
    const structuredData = page.seoSettings?.structuredData;
    return (
      <>
        <div className="relative min-h-screen bg-gradient-to-b from-[#000420] via-[#000F5C] to-[#00178A] overflow-hidden bg-grid-noise pb-20">
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
          <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />
          <div className="bg-column-lines" />
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

  return <StaticHomepage />;
}
