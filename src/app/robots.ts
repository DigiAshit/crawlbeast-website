import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Exclude Sanity Studio from indexing
    },
    sitemap: 'https://crawlbeast.com/sitemap.xml',
  }
}
