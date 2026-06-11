import { client } from "@/lib/sanity.client";
import { pageBySlugQuery } from "@/lib/sanity.queries";
import PageBuilder from "@/components/page-builder";
import StaticContact from "@/components/static-contact";
import { getPageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch(pageBySlugQuery, { slug: "contact" });
    if (!page) {
      return {
        title: "Contact Us | CrawlBeast",
        description: "Get in touch with our team for questions, partnerships, support, or pricing options.",
      };
    }
    return await getPageMetadata(page.seoSettings, page.title);
  } catch (err) {
    console.error("Error generating metadata for contact:", err);
    return {
      title: "Contact Us | CrawlBeast",
    };
  }
}

export default async function ContactPage() {
  let page: any = null;
  try {
    page = await client.fetch(pageBySlugQuery, { slug: "contact" });
  } catch (err) {
    console.error("Error querying contact page from Sanity:", err);
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

  return <StaticContact />;
}
