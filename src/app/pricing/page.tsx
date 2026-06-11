import { client } from "@/lib/sanity.client";
import { pageBySlugQuery } from "@/lib/sanity.queries";
import PageBuilder from "@/components/page-builder";
import StaticPricing from "@/components/static-pricing";
import { getPageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch(pageBySlugQuery, { slug: "pricing" });
    if (!page) {
      return {
        title: "Pricing Plans | CrawlBeast",
        description: "Simple, transparent pricing. Start free, upgrade when you need more crawling power and advanced reporting.",
      };
    }
    return await getPageMetadata(page.seoSettings, page.title);
  } catch (err) {
    console.error("Error generating metadata for pricing:", err);
    return {
      title: "Pricing Plans | CrawlBeast",
    };
  }
}

export default async function PricingPage() {
  let page: any = null;
  try {
    page = await client.fetch(pageBySlugQuery, { slug: "pricing" });
  } catch (err) {
    console.error("Error querying pricing page from Sanity:", err);
  }

  if (page && page.contentBlocks && page.contentBlocks.length > 0) {
    const structuredData = page.seoSettings?.structuredData;
    return (
      <>
        <div className="relative min-h-screen bg-[#000210] overflow-hidden bg-grid-noise py-20 px-6">
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

  return <StaticPricing />;
}
