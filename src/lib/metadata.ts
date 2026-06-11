import { Metadata } from 'next'
import { client } from './sanity.client'
import { settingsQuery } from './sanity.queries'

export interface SeoSettings {
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  openGraphTitle?: string
  openGraphDescription?: string
  openGraphImage?: {
    asset?: {
      url: string
    }
  }
  openGraphImageAlt?: string
  twitterCardType?: 'summary' | 'summary_large_image'
  twitterSite?: string
  twitterCreator?: string
  robotsIndex?: boolean
  robotsFollow?: boolean
  structuredData?: string
}

export async function getPageMetadata(seo: SeoSettings | undefined, defaultTitle: string): Promise<Metadata> {
  let settings: any = null
  try {
    settings = await client.fetch(settingsQuery)
  } catch (err) {
    console.error('Error fetching site settings for metadata:', err)
  }

  const siteName = settings?.siteName || 'CrawlBeast'
  
  // Resolve title
  const rawTitle = seo?.metaTitle || settings?.defaultMetaTitle || defaultTitle
  const title = rawTitle.includes(siteName) ? rawTitle : `${rawTitle} | ${siteName}`

  // Resolve description
  const description = seo?.metaDescription || settings?.defaultMetaDescription || ''

  // Resolve canonical
  const canonical = seo?.canonicalUrl || undefined

  // Resolve OpenGraph Image
  let ogImageUrl = ''
  if (seo?.openGraphImage?.asset?.url) {
    ogImageUrl = seo.openGraphImage.asset.url
  } else if (settings?.defaultOgImage?.asset?.url) {
    ogImageUrl = settings.defaultOgImage.asset.url
  }

  // Resolve Twitter handles
  const twitterSite = seo?.twitterSite || settings?.defaultTwitterSite || ''
  const twitterCreator = seo?.twitterCreator || ''

  const metadata: Metadata = {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: {
      index: seo?.robotsIndex !== false,
      follow: seo?.robotsFollow !== false,
      googleBot: {
        index: seo?.robotsIndex !== false,
        follow: seo?.robotsFollow !== false,
      }
    },
    openGraph: {
      title: seo?.openGraphTitle || title,
      description: seo?.openGraphDescription || description,
      siteName,
      images: ogImageUrl ? [{ url: ogImageUrl, alt: seo?.openGraphImageAlt || title }] : [],
    },
    twitter: {
      card: seo?.twitterCardType || 'summary_large_image',
      title: seo?.openGraphTitle || title,
      description: seo?.openGraphDescription || description,
      site: twitterSite || undefined,
      creator: twitterCreator || undefined,
      images: ogImageUrl ? [ogImageUrl] : [],
    }
  }

  return metadata
}
