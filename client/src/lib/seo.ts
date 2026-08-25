import { blogPosts, faqs, landingPages, SITE } from "../../../shared/siteData";

export type SeoMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

const homeMeta: SeoMeta = {
  title: "HVAC CRM & Workflow Automation Software | Syntha Airlabs",
  description: "Syntha Airlabs helps HVAC contractors manage leads, customers, scheduling, and follow-up in one clearer workflow. Book a demo today.",
  path: "/",
};

export function getSeo(pathname: string): SeoMeta {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  if (path === "/") return homeMeta;
  const landing = landingPages.find((page) => page.path === path);
  if (landing) return { title: `${landing.title.replace(/\.$/, "")} | Syntha Airlabs`, description: landing.description, path };
  if (path === "/pricing") return { title: "HVAC CRM Pricing & Plans | Syntha Airlabs", description: "Explore a practical way to bring HVAC CRM, scheduling, and lead workflows into one system. Talk with Syntha Airlabs about the right plan.", path };
  if (path === "/faq") return { title: "HVAC CRM Software FAQs | Syntha Airlabs", description: "Find answers about Syntha Airlabs HVAC CRM software, scheduling workflows, lead management, onboarding, and who the platform is for.", path };
  if (path === "/blog") return { title: "HVAC Business Resources & Insights | Syntha Airlabs", description: "Practical CRM, scheduling, lead management, and operations guidance for HVAC business owners and service teams.", path };
  const post = blogPosts.find((item) => path === `/blog/${item.slug}`);
  if (post) return { title: `${post.title} | Syntha Airlabs`, description: post.description, path };
  if (path === "/contact") return { title: "Book an HVAC CRM Conversation | Syntha Airlabs", description: "Tell Syntha Airlabs how your HVAC business handles leads, customers, and scheduling, and discover a clearer workflow.", path };
  return { title: "Page Not Found | Syntha Airlabs", description: "The requested Syntha Airlabs page could not be found.", path, noindex: true };
}

export function getJsonLd(pathname: string): object[] {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  const results: object[] = [];
  if (path === "/") {
    results.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.origin,
      email: SITE.email,
      description: SITE.description,
    });
    results.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE.origin,
      description: SITE.description,
      audience: { "@type": "BusinessAudience", audienceType: "HVAC contractors" },
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
