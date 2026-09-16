// The JSON-LD each route carries. Read by the prerender alone: a crawler reads
// it from the served document, so the browser bundle never needs it.

export const STRUCTURED_DATA = {
  '/': [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://deluxlavello.com/#organization',
      name: 'Delux Financial Solutions',
      legalName: 'Delux L Avello LLC',
      url: 'https://deluxlavello.com/',
      logo: 'https://deluxlavello.com/brand/logo.png',
      image: 'https://deluxlavello.com/og-card.png',
      email: 'support@deluxlavello.com',
      telephone: '+1-770-758-6195',
      description:
        'Credit education, credit building, and financial guidance in Houston, Texas. Virtual and mobile in-person consultations available by appointment.',
      founder: {
        '@id': 'https://deluxlavello.com/#educator',
      },
      sameAs: [
        'https://www.instagram.com/deluxlavellollc',
        'https://www.facebook.com/people/Delux-L-Avello/61584260922640/',
        'https://www.tiktok.com/@deluxbydarianavello',
        'https://www.youtube.com/@deluxbydarianavello',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Houston',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://deluxlavello.com/#educator',
      name: 'Darian Avello',
      jobTitle: 'The Credit Coach',
      url: 'https://deluxlavello.com/about/',
      worksFor: {
        '@id': 'https://deluxlavello.com/#organization',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://deluxlavello.com/#website',
      url: 'https://deluxlavello.com/',
      name: 'Delux Financial Solutions',
      inLanguage: 'en-US',
      publisher: {
        '@id': 'https://deluxlavello.com/#organization',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      '@id': 'https://deluxlavello.com/#business',
      name: 'Delux Financial Solutions',
      legalName: 'Delux L Avello LLC',
      parentOrganization: {
        '@id': 'https://deluxlavello.com/#organization',
      },
      url: 'https://deluxlavello.com/',
      logo: 'https://deluxlavello.com/brand/logo.png',
      image: 'https://deluxlavello.com/og-card.png',
      telephone: '+1-770-758-6195',
      email: 'support@deluxlavello.com',
      description:
        'Credit education, credit building, and financial guidance in Houston, Texas. Virtual and mobile in-person consultations available by appointment.',
      areaServed: {
        '@type': 'City',
        name: 'Houston',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Houston',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Credit Building',
              url: 'https://deluxlavello.com/services/credit-building/',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Credit Growth',
              url: 'https://deluxlavello.com/services/credit-growth/',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Credit Building + Credit Growth',
              url: 'https://deluxlavello.com/services/credit-building-and-growth/',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Debt Lawsuit Response Support',
              url: 'https://deluxlavello.com/services/debt-lawsuit-response/',
            },
          },
        ],
      },
    },
  ],
  '/services/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://deluxlavello.com/services/',
        },
      ],
    },
  ],
  '/services/credit-building/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://deluxlavello.com/services/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Credit Building',
          item: 'https://deluxlavello.com/services/credit-building/',
        },
      ],
    },
  ],
  '/services/credit-growth/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://deluxlavello.com/services/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Credit Growth',
          item: 'https://deluxlavello.com/services/credit-growth/',
        },
      ],
    },
  ],
  '/services/credit-building-and-growth/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://deluxlavello.com/services/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Credit Building + Credit Growth',
          item: 'https://deluxlavello.com/services/credit-building-and-growth/',
        },
      ],
    },
  ],
  '/services/debt-lawsuit-response/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://deluxlavello.com/services/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Debt Lawsuit Response Support',
          item: 'https://deluxlavello.com/services/debt-lawsuit-response/',
        },
      ],
    },
  ],
  '/how-it-works/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'How It Works',
          item: 'https://deluxlavello.com/how-it-works/',
        },
      ],
    },
  ],
  '/education/': [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Credit, in plain language',
      description:
        'Plain-language credit education: credit reports, credit scores, utilization, payment history, credit mix, and the mistakes that cost people the most.',
      image: 'https://deluxlavello.com/og-card.png',
      datePublished: '2026-08-23',
      dateModified: '2026-08-26',
      inLanguage: 'en-US',
      mainEntityOfPage: 'https://deluxlavello.com/education/',
      author: {
        '@type': 'Person',
        '@id': 'https://deluxlavello.com/#educator',
        name: 'Darian Avello',
        jobTitle: 'The Credit Coach',
        url: 'https://deluxlavello.com/about/',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://deluxlavello.com/#organization',
        name: 'Delux Financial Solutions',
        logo: {
          '@type': 'ImageObject',
          url: 'https://deluxlavello.com/brand/logo.png',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Education',
          item: 'https://deluxlavello.com/education/',
        },
      ],
    },
  ],
  '/partners/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Partners',
          item: 'https://deluxlavello.com/partners/',
        },
      ],
    },
  ],
  '/about/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://deluxlavello.com/about/',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://deluxlavello.com/#educator',
      name: 'Darian Avello',
      jobTitle: 'The Credit Coach',
      url: 'https://deluxlavello.com/about/',
      worksFor: {
        '@id': 'https://deluxlavello.com/#organization',
      },
    },
  ],
  '/contact/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: 'https://deluxlavello.com/contact/',
        },
      ],
    },
  ],
  '/privacy/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Privacy Policy',
          item: 'https://deluxlavello.com/privacy/',
        },
      ],
    },
  ],
  '/terms/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Terms of Use',
          item: 'https://deluxlavello.com/terms/',
        },
      ],
    },
  ],
  '/disclaimer/': [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://deluxlavello.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Credit & Financial Disclaimer',
          item: 'https://deluxlavello.com/disclaimer/',
        },
      ],
    },
  ],
};
