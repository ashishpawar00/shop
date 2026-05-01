import Head from 'next/head';

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'लक्ष्मी कृषि केंद्र (Laxmi Krashi Kendra)',
    description: 'Trusted agricultural supply store offering seeds, fertilizers, pesticides, and crop support for 25+ years.',
    url: 'https://laxmikrashikendra.com',
    telephone: '+919977938192',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Market, Siratha',
      addressLocality: 'Siratha',
      addressRegion: 'Madhya Pradesh',
      postalCode: '470335',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.5,
      longitude: 78.5
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00'
      }
    ],
    priceRange: '₹₹',
    image: 'https://laxmikrashikendra.com/og-image.jpg',
    sameAs: []
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

export function ProductJsonLd({ product }) {
  if (!product) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || undefined,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Laxmi Krashi Kendra'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Laxmi Krashi Kendra'
      }
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

export function BreadcrumbJsonLd({ items }) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url || undefined
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
