import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { pageBySlugQuery } from '@/lib/sanity.queries'
import PageBuilder from '@/components/page-builder'
import { getPageMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const slugPath = slug.join('/')

  try {
    const page = await client.fetch(pageBySlugQuery, { slug: slugPath })
    if (!page) {
      return {
        title: 'Page Not Found | CrawlBeast',
        description: 'The page you are looking for does not exist.',
      }
    }
    return await getPageMetadata(page.seoSettings, page.title)
  } catch (err) {
    console.error('Error generating metadata:', err)
    return {
      title: 'CrawlBeast',
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const slugPath = slug.join('/')

  let page: any = null
  try {
    page = await client.fetch(pageBySlugQuery, { slug: slugPath })
  } catch (err) {
    console.error(`Error fetching page for slug ${slugPath}:`, err)
  }

  if (!page) {
    notFound()
  }

  // Inject dynamic structured data JSON-LD if present
  const structuredData = page.seoSettings?.structuredData

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-[#000420] via-[#000F5C] to-[#00178A] overflow-hidden bg-grid-noise pb-20">
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient" />
        <div className="absolute inset-0 pointer-events-none bg-bottom-radial-gradient" />
        <div className="bg-column-lines" />

        <PageBuilder blocks={page.contentBlocks} />
      </div>

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
    </>
  )
}
