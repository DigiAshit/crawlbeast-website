import { client } from "@/lib/sanity.client";
import { pageBySlugQuery } from "@/lib/sanity.queries";
import PageBuilder from "@/components/page-builder";
import StaticDownload from "@/components/static-download";
import { getPageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch(pageBySlugQuery, { slug: "download" });
    if (!page) {
      return {
        title: "Download CrawlBeast | Desktop SEO Auditing Application",
        description: "Download CrawlBeast and start finding technical SEO issues locally on your desktop.",
      };
    }
    return await getPageMetadata(page.seoSettings, page.title);
  } catch (err) {
    console.error("Error generating metadata for download:", err);
    return {
      title: "Download CrawlBeast",
    };
  }
}

export default async function DownloadPage() {
  let page: any = null;
  try {
    page = await client.fetch(pageBySlugQuery, { slug: "download" });
  } catch (err) {
    console.error("Error querying download page from Sanity:", err);
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

  return <StaticDownload />;
}
