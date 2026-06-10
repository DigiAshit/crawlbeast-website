"use client";

import HeroBlock from "./blocks/hero-block";
import FeaturesBlock from "./blocks/features-block";
import TestimonialsBlock from "./blocks/testimonials-block";
import FaqBlock from "./blocks/faq-block";
import CtaBlock from "./blocks/cta-block";
import PricingBlock from "./blocks/pricing-block";
import RichContentBlock from "./blocks/rich-content-block";
import ChangelogBlock from "./blocks/changelog-block";

interface BlockData {
  _key: string;
  _type: string;
  [key: string]: any;
}

interface PageBuilderProps {
  blocks: BlockData[] | undefined;
}

export default function PageBuilder({ blocks }: PageBuilderProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return (
      <div className="relative min-h-[50vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#000420] via-[#000F5C] to-[#00178A] overflow-hidden bg-grid-noise text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">No Content Blocks Defined</h1>
          <p className="text-xs text-zinc-400">Open Sanity Studio to add sections to this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full relative">
      {blocks.map((block) => {
        switch (block._type) {
          case "blockHero":
            return (
              <HeroBlock
                key={block._key}
                heading={block.heading}
                subheading={block.subheading}
                ctaText={block.ctaText}
                ctaLink={block.ctaLink}
                secondaryCtaText={block.secondaryCtaText}
                secondaryCtaLink={block.secondaryCtaLink}
                backgroundVariant={block.backgroundVariant}
              />
            );
          case "blockFeatureGrid":
            return (
              <FeaturesBlock
                key={block._key}
                sectionTitle={block.sectionTitle}
                sectionDescription={block.sectionDescription}
                features={block.features || []}
              />
            );
          case "blockTestimonial":
            return (
              <TestimonialsBlock
                key={block._key}
                title={block.title}
                testimonials={block.testimonials || []}
              />
            );
          case "blockFaq":
            return (
              <FaqBlock
                key={block._key}
                title={block.title}
                faqs={block.faqs || []}
              />
            );
          case "blockCta":
            return (
              <CtaBlock
                key={block._key}
                heading={block.heading}
                description={block.description}
                buttonText={block.buttonText}
                buttonUrl={block.buttonUrl}
              />
            );
          case "blockPricing":
            return (
              <PricingBlock
                key={block._key}
                title={block.title}
                description={block.description}
                plans={block.plans || []}
              />
            );
          case "blockRichContent":
            return (
              <RichContentBlock
                key={block._key}
                content={block.content}
              />
            );
          case "blockChangelog":
            return (
              <ChangelogBlock
                key={block._key}
                version={block.version}
                date={block.date}
                description={block.description}
              />
            );
          default:
            return (
              <div key={block._key} className="py-6 px-6 max-w-4xl mx-auto border border-white/5 bg-zinc-950/20 text-center text-xs text-zinc-500">
                Unknown content block: <span className="font-mono">{block._type}</span>
              </div>
            );
        }
      })}
    </div>
  );
}
