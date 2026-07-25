import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity.client'
import { blogPosts } from '@/data/blog-posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://crawlbeast.com'

  // 1. Static routes
  const staticRoutes = [
    '',
    '/about',
    '/pricing',
    '/blog',
    '/docs',
    '/download',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Dynamic Sanity pages
  let dynamicPages: any[] = []
  try {
    dynamicPages = await client.fetch(`*[_type == "page" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`)
  } catch (err) {
    console.error('Error fetching pages for sitemap:', err)
  }

  const sanityRoutes = dynamicPages
    .filter((page) => {
      // Normalize and exclude duplicate mappings or covered static pages
      const cleanSlug = page.slug.startsWith('/') ? page.slug : `/${page.slug}`
      return !['/', '/about', '/pricing', '/blog', '/docs', '/download', '/contact'].includes(cleanSlug)
    })
    .map((page) => {
      const cleanSlug = page.slug.startsWith('/') ? page.slug : `/${page.slug}`
      return {
        url: `${baseUrl}${cleanSlug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

  // 3. Blog articles
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...sanityRoutes, ...blogRoutes]
}
