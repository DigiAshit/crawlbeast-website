import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Clock } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { blogPosts } from "@/data/blog-posts";
import { getPageMetadata } from "@/lib/metadata";
import { client, urlFor } from "@/lib/sanity.client";
import { postBySlugQuery } from "@/lib/sanity.queries";
import TableOfContents from "@/components/TableOfContents";
import BlogSidebar from "@/components/BlogSidebar";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BlogCTA from "@/components/BlogCTA";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 0;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let post: any = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed to fetch post metadata from Sanity:", error);
  }

  if (!post) {
    post = blogPosts.find((p) => p.slug === slug);
  }

  if (!post) {
    return await getPageMetadata(undefined, "Article Not Found");
  }

  return await getPageMetadata(
    {
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || "",
      openGraphTitle: post.metaTitle || post.title,
      openGraphDescription: post.metaDescription || "",
    },
    post.title
  );
}

// Custom Portable Text Renderers for Light Theme Blog
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="leading-relaxed mb-7">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-4xl font-extrabold tracking-tight mt-10 mb-6">{children}</h1>,
    h2: ({ children }: any) => {
      // Get text content recursively from children nodes to generate unique slug ID
      const text = React.Children.toArray(children)
        .map((c: any) => (typeof c === 'string' ? c : c?.props?.node?.text || ''))
        .join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return <h2 id={id} className="text-2xl font-extrabold mt-12 mb-6 pb-2 border-b border-zinc-100">{children}</h2>;
    },
    h3: ({ children }: any) => {
      const text = React.Children.toArray(children)
        .map((c: any) => (typeof c === 'string' ? c : c?.props?.node?.text || ''))
        .join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return <h3 id={id} className="text-xl font-bold mt-8 mb-4">{children}</h3>;
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#0676FE] bg-blue-50 px-5 py-3 my-6 italic text-[#1e40af] rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 space-y-2.5 my-6">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 space-y-2.5 my-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-zinc-950">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => <code className="bg-zinc-100 text-zinc-900 rounded px-1.5 py-0.5 font-mono text-sm">{children}</code>,
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).url();
      return (
        <div className="my-8 relative rounded-2xl overflow-hidden border border-zinc-200 shadow-lg bg-zinc-50/50 p-4">
          <img src={imageUrl} alt={value.alt || "Article Image"} loading="lazy" className="w-full h-auto object-contain mx-auto" />
        </div>
      );
    }
  }
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  let post: any = null;
  try {
    post = await client.fetch(postBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed to fetch post from Sanity:", error);
  }

  // Fallback to static post
  if (!post) {
    post = blogPosts.find((p) => p.slug === slug);
  } else {
    // Map sanity post fields to match static baseline
    post = {
      title: post.title,
      slug: post.slug,
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || "",
      category: post.category,
      author: post.author || "CrawlBeast Team",
      date: post.date,
      readingTime: post.readingTime || "5 min read",
      featuredImage: post.featuredImage || blogPosts.find(p => p.slug === slug)?.featuredImage || "/crawlBeast.png",
      content: post.content,
      keywords: post.keywords || [],
    };
  }

  if (!post) {
    notFound();
  }

  // Extract Table of Contents items (H2s)
  let tocItems: { id: string; text: string }[] = [];
  if (typeof post.content === 'string') {
    tocItems = Array.from(post.content.matchAll(/<h2 id="([^"]+)"[^>]*>(.*?)<\/h2>/g)).map((m: any) => ({
      id: m[1],
      text: m[2].replace(/<[^>]*>/g, '')
    }));
  } else if (Array.isArray(post.content)) {
    post.content.forEach((block: any) => {
      if (block._type === 'block' && block.style === 'h2') {
        const text = block.children?.map((c: any) => c.text || '').join('') || '';
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (id && text) {
          tocItems.push({ id, text });
        }
      }
    });
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const ctaText = slug === "best-seo-audit-tool-for-agencies"
    ? "Try CrawlBeast for faster technical SEO audits and agency-ready reports."
    : slug === "how-agencies-perform-seo-audits"
    ? "Use CrawlBeast to standardize technical SEO audits across client websites."
    : slug === "website-crawler-for-agencies"
    ? "Trial CrawlBeast on representative client sites and evaluate the resulting workflow."
    : slug === "broken-link-checker"
    ? "Use CrawlBeast to crawl a site locally, identify broken links, and organize the repair work."
    : slug === "seo-audit-for-ecommerce"
    ? "Use CrawlBeast to segment and prioritize technical issues across ecommerce templates."
    : slug === "why-seo-audits-take-so-long"
    ? "Use CrawlBeast to reduce crawl setup and issue-sorting work while keeping human validation in the audit."
    : slug === "seo-audit-for-law-firms"
    ? "Use CrawlBeast to collect and prioritize technical evidence across law-firm practice, attorney, and location pages."
    : slug === "wordpress-seo-audit"
    ? "Use CrawlBeast to crawl WordPress output locally and prioritize the technical patterns that need CMS, theme, plugin, or hosting fixes."
    : slug === "crawlbeast-vs-sitebulb"
    ? "Test CrawlBeast on a representative site and evaluate the resulting crawl-to-action workflow."
    : slug === "screaming-frog-alternative"
    ? "Trial CrawlBeast alongside your existing crawler on a representative client site."
    : slug === "technical-seo-audit-checklist"
    ? "Use CrawlBeast to collect local crawl evidence, prioritize technical patterns, and prepare a validated repair backlog."
    : "Use CrawlBeast to turn technical crawl findings into clearer client audit reports.";

  return (
    <div className="relative min-h-screen bg-white">
      {/* Scroll Progress Indicator */}
      <ReadingProgressBar />

      {/* Hero Header Section (Dark Background, Small Height 180-250px) */}
      <header className="relative bg-[#07090E] border-b border-white/5 py-12 sm:py-16 text-white overflow-hidden">
        {/* Background glow highlights */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient opacity-60" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#0676FE] bg-blue-950/40 border border-blue-900/40 px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-[44px] font-extrabold tracking-tight leading-tight mb-6 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              Published: {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-zinc-500" />
              By {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area (White Background, 3-Column Grid) */}
      <main className="bg-white text-zinc-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Table of Contents */}
            <aside className="lg:col-span-3 lg:max-w-[220px]">
              <TableOfContents tocItems={tocItems} />
            </aside>

            {/* Center Column: Article content */}
            <article className="lg:col-span-7 max-w-[860px] mx-auto w-full">
              {/* Featured Image (One Prominent Copy at Top of Body) */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50/50 p-6 mb-10 w-full">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full h-full object-contain mx-auto"
                />
              </div>

              {/* Parsed Clean Markdown Content */}
              <div className="blog-content-white">
                {typeof post.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <PortableText value={post.content} components={portableTextComponents} />
                )}
              </div>

              {/* Premium Lead Capture CTA */}
              <BlogCTA ctaText={ctaText} />
            </article>

            {/* Right Column: Sticky Sidebar Widgets */}
            <aside className="lg:col-span-2 lg:max-w-[280px]">
              <BlogSidebar />
            </aside>
          </div>

          {/* Related Articles Section (Keep Reading) */}
          {relatedPosts.length > 0 && (
            <section className="border-t border-zinc-200 mt-20 pt-16">
              <h3 className="text-2xl font-extrabold text-zinc-950 mb-10">Keep Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((rPost) => (
                  <article
                    key={rPost.slug}
                    className="group border border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <Link href={`/blog/${rPost.slug}`} className="block relative aspect-video rounded-2xl overflow-hidden mb-5 bg-white border border-zinc-150 p-4">
                        <img 
                          src={rPost.featuredImage} 
                          alt={rPost.title} 
                          className="w-full h-full object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <div className="flex items-center gap-2.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        <span className="text-[#0676FE]">{rPost.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {rPost.readingTime}
                        </span>
                      </div>

                      <Link href={`/blog/${rPost.slug}`}>
                        <h4 className="text-base font-bold text-zinc-900 group-hover:text-[#0676FE] transition-colors line-clamp-2 mb-3 leading-snug">
                          {rPost.title}
                        </h4>
                      </Link>
                      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 mb-5">
                        {rPost.metaDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-250/20 pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-[#0676FE] flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                          CB
                        </div>
                        <span className="text-xs text-zinc-600 font-medium">{rPost.author}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">{rPost.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
