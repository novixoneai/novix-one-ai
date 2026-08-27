export interface PageMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schema?: Record<string, any>;
}

export function setPageMetadata(meta: PageMetadata) {
  // Update title
  document.title = meta.title;
  updateOrCreateMeta("description", meta.description);

  // OG tags
  updateOrCreateMeta("og:title", meta.ogTitle || meta.title, "property");
  updateOrCreateMeta("og:description", meta.ogDescription || meta.description, "property");
  if (meta.ogImage) {
    updateOrCreateMeta("og:image", meta.ogImage, "property");
  }

  // Canonical URL
  if (meta.canonicalUrl) {
    updateOrCreateCanonical(meta.canonicalUrl);
  }

  // Structured data
  if (meta.schema) {
    updateOrCreateSchema(meta.schema);
  }
}

function updateOrCreateMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateOrCreateCanonical(url: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

function updateOrCreateSchema(schema: Record<string, any>) {
  let element = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(schema);
}

// Schema generators
export function generateLocalBusinessSchema(overrides?: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Novix One",
    "description": "AI automation agency for small businesses in Miami",
    "url": "https://novixone.co",
    "telephone": "833-325-0830",
    "email": "jorges@novixone.co",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "areaServed": ["Miami", "Florida", "United States"],
    "serviceType": [
      "AI Voice Agents",
      "Business Automation",
      "Appointment Booking",
      "Web Development"
    ],
    ...overrides,
  };
}

export function generateOrganizationSchema(overrides?: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Novix One",
    "description": "AI automation agency offering voice agents, workflow automation, custom apps, and websites",
    "url": "https://novixone.co",
    "logo": "https://novixone.co/images/novix-one-logo-full.png",
    "telephone": "833-325-0830",
    "email": "jorges@novixone.co",
    "sameAs": [
      "https://www.linkedin.com/company/novix-one",
      "https://twitter.com/novixone"
    ],
    ...overrides,
  };
}

export function generateServiceSchema(name: string, description: string, overrides?: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Novix One",
      "url": "https://novixone.co"
    },
    "areaServed": ["Miami", "Florida", "United States"],
    ...overrides,
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateLegalServiceSchema(overrides?: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "AI Answering Service for Law Firms",
    "description": "24/7 AI answering service designed specifically for law firms. Never miss another client call.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Novix One",
      "url": "https://novixone.co"
    },
    "areaServed": ["Miami", "Florida", "United States"],
    "telephone": "833-325-0830",
    "url": "https://novixone.co/law-offices",
    ...overrides,
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
