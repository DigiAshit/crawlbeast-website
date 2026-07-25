import { Metadata } from "next";
import BlogListing from "@/components/BlogListing";
import { getPageMetadata } from "@/lib/metadata";
import { client } from "@/lib/sanity.client";
import { postsQuery } from "@/lib/sanity.queries";
import { blogPosts, BlogPost } from "@/data/blog-posts";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return await getPageMetadata(
    {
      metaTitle: "CrawlBeast Blog | Technical SEO Insights & Guides",
      metaDescription: "Read the latest technical SEO guides, website crawl workflows, and SEO audit tips for agencies from the CrawlBeast team.",
      openGraphTitle: "CrawlBeast Blog | Technical SEO Insights & Guides",
      openGraphDescription: "Read the latest technical SEO guides, website crawl workflows, and SEO audit tips for agencies from the CrawlBeast team.",
    },
    "Blog"
  );
}

export default async function BlogPage() {
  let sanityPosts: any[] = [];
  try {
    sanityPosts = await client.fetch(postsQuery);
  } catch (error) {
    console.error("Failed to fetch posts from Sanity:", error);
  }

  // Combine static and sanity posts, avoiding duplicates by slug
  const allPostsMap = new Map<string, BlogPost>();
  
  // Load static baseline posts
  blogPosts.forEach(post => {
    allPostsMap.set(post.slug, post);
  });
  
  // Merge Sanity posts, overriding any matching static slugs
  sanityPosts.forEach(post => {
    allPostsMap.set(post.slug, {
      title: post.title,
      slug: post.slug,
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || "",
      category: post.category,
      author: post.author || "CrawlBeast Team",
      date: post.date,
      readingTime: post.readingTime || "5 min read",
      featuredImage: post.featuredImage || blogPosts.find(p => p.slug === post.slug)?.featuredImage || "/crawlBeast.png",
      content: post.content, // Could be Portable Text array
      keywords: post.keywords || [],
    });
  });

  const posts = Array.from(allPostsMap.values());

  return <BlogListing initialPosts={posts} />;
}
