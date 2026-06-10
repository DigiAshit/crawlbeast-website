import { groq } from 'next-sanity'

export const pageBySlugQuery = groq`
  *[_type == "page" && (slug.current == $slug || slug.current == "/" + $slug || "/" + slug.current == $slug)][0] {
    title,
    "slug": slug.current,
    pageType,
    contentBlocks[] {
      ...,
      _type == "blockPricing" => {
        ...,
        plans[] {
          ...,
          features[]
        }
      },
      _type == "blockFeatureGrid" => {
        ...,
        features[] {
          ...,
          title,
          description,
          icon
        }
      },
      _type == "blockTestimonial" => {
        ...,
        testimonials[] {
          ...,
          quote,
          author,
          role,
          initials
        }
      },
      _type == "blockFaq" => {
        ...,
        faqs[] {
          ...,
          question,
          answer
        }
      }
    },
    seoSettings {
      ...,
      openGraphImage {
        asset-> {
          _id,
          url
        }
      }
    }
  }
`

export const settingsQuery = groq`
  *[_type == "settings" && _id == "settings"][0] {
    siteName,
    companyName,
    companyLogo {
      asset-> {
        _id,
        url
      }
    },
    supportEmail,
    defaultMetaTitle,
    defaultMetaDescription,
    defaultOgImage {
      asset-> {
        _id,
        url
      }
    },
    defaultTwitterSite,
    googleAnalyticsId,
    googleTagManagerId,
    microsoftClarityId,
    socialProfiles[] {
      platform,
      url
    }
  }
`
