import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../client/src/App";
import { getJsonLd, getSeo } from "../client/src/lib/seo";
import { blogPosts, faqs, publicPaths, SITE } from "../shared/siteData";

const root = process.cwd();
const outputDir = path.join(root, "vercel-dist");

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

function headFor(route: string) {
  const meta = getSeo(route);
  const canonical = `${SITE.origin}${meta.path === "/" ? "/" : meta.path}`;
  const robots = meta.noindex ? "noindex, follow" : "index, follow";
  const imageUrl = `${SITE.origin}${SITE.ogImage}`;
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${route.startsWith("/blog/") ? "article" : "website"}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta property="og:image:width" content="1600" />`,
    `<meta property="og:image:height" content="900" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
    ...getJsonLd(route).map((item) => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")}</script>`),
  ];
  return tags.join("\n    ");
}

async function writeRoute(template: string, route: string) {
  const markup = renderToStaticMarkup(<App ssrPath={route} />);
  const html = template.replace("<!--app-head-->", headFor(route)).replace("<!--app-html-->", markup).replace('<div id="root">', '<div id="root" data-ssr="true">');
  const targetDir = route === "/" ? outputDir : path.join(outputDir, route.slice(1));
  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(path.join(targetDir, "index.html"), html, "utf8");
}

async function main() {
  const template = await fs.readFile(path.join(outputDir, "index.html"), "utf8");
  await Promise.all(publicPaths.map((route) => writeRoute(template, route)));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map((route) => `<url><loc>${SITE.origin}${route === "/" ? "/" : route}</loc></url>`).join("")}</urlset>\n`;
  await fs.writeFile(path.join(outputDir, "sitemap.xml"), sitemap, "utf8");
  await fs.writeFile(path.join(outputDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE.origin}/sitemap.xml\n`, "utf8");
  await fs.writeFile(path.join(outputDir, "route-manifest.json"), JSON.stringify({ publicPaths, blogPosts: blogPosts.map(({ slug, title }) => ({ slug, title })), faqCount: faqs.length }, null, 2), "utf8");
}

main().catch((error) => { console.error(error); process.exit(1); });
