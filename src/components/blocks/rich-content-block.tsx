"use client";

import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.client";

interface RichContentBlockProps {
  content: any[];
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="relative my-8 w-full overflow-hidden rounded-xl border border-zinc-850 bg-zinc-950/40 p-2">
          <img
            src={urlFor(value).url()}
            alt={value.alt || "CrawlBeast Image"}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-10 mb-4 leading-snug border-b border-zinc-900 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold text-white mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#0A39F0] pl-4 italic text-zinc-400 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 text-zinc-300 space-y-2 mb-6 text-sm sm:text-base">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 text-zinc-300 space-y-2 mb-6 text-sm sm:text-base">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="rounded bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 font-mono text-xs text-[#0A39F0]">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => {
      const href = value?.href || "#";
      const rel = !href.startsWith("/") ? "noopener noreferrer" : undefined;
      const target = !href.startsWith("/") ? "_blank" : undefined;
      return (
        <a
          href={href}
          rel={rel}
          target={target}
          className="text-[#0A39F0] underline hover:text-blue-400 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

export default function RichContentBlock({ content }: RichContentBlockProps) {
  if (!content) return null;

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-left text-white">
      <div className="prose prose-invert max-w-none">
        <PortableText value={content} components={components} />
      </div>
    </section>
  );
}
