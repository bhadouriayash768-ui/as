import { blogPosts, faqs, landingPages, SITE } from "../../../shared/siteData";

export type SeoMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

const homeMeta: SeoMeta = {
  title: "Website Design for Growing Businesses | Syntha Airlabs",
  description: "Syntha Airlabs designs clear, high-performing business websites and landing pages that help growing businesses build trust and make the next step easier.",
  path: "/",
};

export function getSeo(pathname: string): SeoMeta {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  if (path === "/") return homeMeta;
  const landing = landingPages.find((page) => page.path === path);
  if (landing) return { title: `${landing.title.replace(/\.$/, "")} | Syntha Airlabs`, description: landing.description, path };
  if (path === "/pricing") return { title: "Website Design Services & Project Fit | Syntha Airlabs", description: "Understand how Syntha Airlabs approaches website design, landing pages, project fit, and the next step for a growing business.", path };
  if (path === "/faq") return { title: "Business Website Design FAQs | Syntha Airlabs", description: "Find practical answers about business website design, landing pages, existing-site improvements, project fit, and getting started with Syntha Airlabs.", path };
  if (path === "/blog") return { title: "Website Design & Lead Generation Resources | Syntha Airlabs", description: "Practical guidance on business websites, digital presence, landing pages, and clearer paths from visitor to enquiry.", path };
  const post = blogPosts.find((item) => path === `/blog/${item.slug}`);
  if (post) return { title: `${post.title} | Syntha Airlabs`, description: post.description, path };
  if (path === "/contact") return { title: "Start a Website Project | Syntha Airlabs", description: "Tell Syntha Airlabs what you are building, what feels unclear, and what kind of website or landing page would make the next step easier.", path };
  return { title: "Page Not Found | Syntha Airlabs", description: "The requested Syntha Airlabs page could not be found.", path, noindex: true };
}

function breadcrumbFor(path: string, label: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE.origin}${path}` },
    ],
  };
}

export function getJsonLd(pathname: string): object[] {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  const results: object[] = [];
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.origin,
    email: SITE.email,
    logo: `${SITE.origin}${SITE.ogImage}`,
    description: SITE.description,
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
  if (path === "/") {
    results.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.origin,
      email: SITE.email,
      description: SITE.description,
      serviceType: ["Business website design", "Website design services", "Landing page design services"],
      knowsAbout: ["Business website design", "Conversion-focused landing pages", "Digital presence", "Lead generation websites"],
    });
    results.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.origin,
      description: SITE.description,
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.origin },
    });
    results.push(organization);
  } else {
    results.push(organization);
  }
  const landing = landingPages.find((page) => page.path === path);
  if (landing) {
    results.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: landing.title,
      serviceType: landing.eyebrow,
      description: landing.description,
      provider: { "@type": "Organization", name: SITE.name, url: SITE.origin },
      url: `${SITE.origin}${path}`,
    });
    results.push(breadcrumbFor(path, landing.eyebrow));
  }
  if (path === "/faq") {
    results.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
    results.push(breadcrumbFor(path, "FAQ"));
  }
  if (path === "/pricing") {
    results.push(breadcrumbFor(path, "Pricing"));
  }
  if (path === "/blog") {
    results.push(breadcrumbFor(path, "Blog"));
  }
  if (path === "/contact") {
    results.push(breadcrumbFor(path, "Contact"));
  }
  const post = blogPosts.find((item) => path === `/blog/${item.slug}`);
  if (post) {
    results.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: `${SITE.origin}${SITE.ogImage}`,
      author: { "@type": "Organization", name: SITE.name, url: SITE.origin },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.origin },
      mainEntityOfPage: `${SITE.origin}${path}`,
    });
    results.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.origin}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE.origin}${path}` },
      ],
    });
  }
  return results;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attr, value);
  }
}

export function applySeo(meta: SeoMeta) {
  if (typeof document === "undefined") return;
  document.title = meta.title;
  const canonicalUrl = `${SITE.origin}${meta.path === "/" ? "/" : meta.path}`;
  const imageUrl = `${SITE.origin}${SITE.ogImage}`;
  setMeta('meta[name="description"]', "content", meta.description);
  setMeta('link[rel="canonical"]', "href", canonicalUrl);
  setMeta('meta[property="og:title"]', "content", meta.title);
  setMeta('meta[property="og:description"]', "content", meta.description);
  setMeta('meta[property="og:url"]', "content", canonicalUrl);
  setMeta('meta[property="og:image"]', "content", imageUrl);
  setMeta('meta[name="twitter:title"]', "content", meta.title);
  setMeta('meta[name="twitter:description"]', "content", meta.description);
  setMeta('meta[name="twitter:image"]', "content", imageUrl);
}
