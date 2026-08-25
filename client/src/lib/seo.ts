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

export function getJsonLd(pathname: string): object[] {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  const results: object[] = [];
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
    });
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
      author: { "@type": "Organization", name: SITE.name, url: SITE.origin },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.origin },
      mainEntityOfPage: `${SITE.origin}${path}`,
    });
  }
  return results;
}

export function applySeo(meta: SeoMeta) {
  if (typeof document === "undefined") return;
  document.title = meta.title;
  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute("content", meta.description);
  const canonical = document.querySelector('link[rel="canonical"]');
  canonical?.setAttribute("href", `${SITE.origin}${meta.path === "/" ? "/" : meta.path}`);
}
