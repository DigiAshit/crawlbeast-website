import { client } from "@/lib/sanity.client";
import { pageBySlugQuery } from "@/lib/sanity.queries";
import PageBuilder from "@/components/page-builder";
import StaticDocs from "@/components/static-docs";
import { getPageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch(pageBySlugQuery, { slug: "docs" });
    if (!page) {
      return {
        title: "Documentation | CrawlBeast",
        description: "Technical SEO documentation, installation manuals, shortcuts, and configuration options.",
      };
    }
    return await getPageMetadata(page.seoSettings, page.title);
  } catch (err) {
    console.error("Error generating metadata for docs:", err);
    return {
      title: "Documentation | CrawlBeast",
    };
  }
}

export default async function DocsPage() {
  let page: any = null;
  try {
    page = await client.fetch(pageBySlugQuery, { slug: "docs" });
  } catch (err) {
    console.error("Error querying docs page from Sanity:", err);
  }

  if (page && page.contentBlocks && page.contentBlocks.length > 0) {
    const structuredData = page.seoSettings?.structuredData;
    return (
      <>
        <div className="relative min-h-screen bg-black overflow-hidden bg-grid-noise py-20 px-6">
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
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

  return <StaticDocs />;
}
