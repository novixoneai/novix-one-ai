export interface PageMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schema?: Record<string, any>;
}

// Single source of truth for per-route title/description/OG/canonical tags.
// Used client-side (setPageMetadata) and server-side (server.ts injects these
// into the static HTML shell so crawlers and link previews that don't run JS
// still see the right tags, since this is a client-rendered SPA).
export const ROUTE_META: Record<string, Omit<PageMetadata, "schema">> = {
  "/": {
    title: "AI Automation Agency Miami | Voice Agents & Automation",
    description: "AI automation agency Miami. 24/7 AI voice agents, appointment booking, and workflow automation for small businesses. Get a free assessment.",
    ogTitle: "AI Automation Agency Miami | Novix One",
    ogDescription: "AI voice agents and automation solutions for small businesses. Never miss another customer call.",
    ogImage: "https://novixone.co/images/og-image.png",
    canonicalUrl: "https://novixone.co/",
  },
  "/es": {
    title: "Agencia de IA Miami | Agentes de Voz y Automatización",
    description: "Automatización de IA para negocios pequeños en Miami. Agentes de voz 24/7, reservas automáticas y automatización de flujos. Evaluación gratuita.",
    ogTitle: "Agencia de Automatización AI Miami | Novix One",
    ogDescription: "Agentes de voz y automatización para negocios pequeños. Nunca pierdas otra llamada de cliente.",
    ogImage: "https://novixone.co/images/og-image.png",
    canonicalUrl: "https://novixone.co/es",
  },
  "/law-offices": {
    title: "AI Answering Service for Law Firms Miami | 24/7 Calls",
    description: "Never miss another client call. AI answering service for Miami law firms. 24/7 availability, bilingual support, intake qualification, Florida Bar compliant.",
    ogTitle: "AI Answering Service for Law Firms | Novix One",
    ogDescription: "24/7 AI receptionist for law firms. Never miss a client call again. English and Spanish support.",
    ogImage: "https://novixone.co/images/og-image.png",
    canonicalUrl: "https://novixone.co/law-offices",
  },
  "/database-reactivation": {
    title: "CRM Database Reactivation | Turn Dead Leads Into Revenue | Novix One",
    description: "Your CRM is full of leads you already paid for. Novix One's AI reactivates them — personalized outreach at scale, live in 14 days, at a fraction of new-lead cost.",
    ogTitle: "Database Reactivation | Novix One",
    ogDescription: "AI reactivation for dormant CRM leads. See what your database is worth with our free calculator.",
    ogImage: "https://novixone.co/images/og-image.png",
    canonicalUrl: "https://novixone.co/database-reactivation",
  },
  "/blog/missed-calls-cost": {
    title: "The Real Cost of Missed Calls for Your Business | Novix One",
    description: "Calculate how much revenue your business loses from missed calls. See the real cost and how AI answering services recover lost income.",
    ogTitle: "How to Calculate the Cost of Missed Calls | Novix One",
    ogDescription: "Missed calls are missed revenue. Here's how to calculate what they're actually costing your business.",
    ogImage: "https://novixone.co/images/og-image.png",
    canonicalUrl: "https://novixone.co/blog/missed-calls-cost",
  },
  "/blog/ai-vs-virtual-assistant": {
    title: "AI Answering Services vs. Virtual Assistants | Novix One",
    description: "Compare AI answering services vs. virtual assistants. See why AI wins on cost, availability, and reliability for small business phone handling.",
    ogTitle: "AI Answering Services vs. Virtual Assistants | Novix One",
    ogDescription: "Cost, availability, and reliability compared: AI answering services vs. hiring a virtual assistant.",
    ogImage: "https://novixone.co/images/og-image.png",
    canonicalUrl: "https://novixone.co/blog/ai-vs-virtual-assistant",
  },
  "/blog/law-firm-phone-answering": {
    title: "Law Firm Phone Answering: AI vs. Human | Novix One",
    description: "Compare AI vs. human receptionists for law firms. See how AI answering services capture missed leads, improve client experience, and save costs.",
    ogTitle: "Law Firm Phone Answering: AI vs. Human Receptionists | Novix One",
    ogDescription: "How AI answering services stack up against human receptionists for law firm intake and client calls.",
    ogImage: "https://novixone.co/images/og-image.png",
    canonicalUrl: "https://novixone.co/blog/law-firm-phone-answering",
  },
};

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

export function generateArticleSchema(overrides: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": overrides.headline,
    "description": overrides.description,
    "url": overrides.url,
    "datePublished": overrides.datePublished,
    "dateModified": overrides.dateModified ?? overrides.datePublished,
    "image": overrides.image ?? "https://novixone.co/images/og-image.png",
    "author": {
      "@type": "Organization",
      "name": "Novix One",
      "url": "https://novixone.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Novix One",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novixone.co/images/novix-one-logo-full.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": overrides.url
    }
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
