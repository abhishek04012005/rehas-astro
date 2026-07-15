import { NextResponse } from "next/server";
import servicesData from "@/data/services.json";
import serviceSeoData from "@/data/serviceSeo.json";
import blogPosts from "@/data/blogPosts.json";

const baseUrl = "https://astrology.rehas.in";
const staticRoutes = [
  "",
  "about",
  "contact",
  "faq",
  "kundli",
  "services-list",
  "blog",
  "privacy-policy",
  "terms-of-service",
];

export async function GET() {
  const serviceSeoUrls = serviceSeoData
    .filter((entry) => entry.slug)
    .map((entry) => `services/${entry.slug}${entry.path ? `/${entry.path}` : ""}`);

  const serviceUrls = servicesData.map((service) => `/services/${service.slug}`);
  const blogUrls = blogPosts.map((post) => `/blog/${post.slug}`);
  const urls = [...staticRoutes, ...serviceUrls, ...serviceSeoUrls, ...blogUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map((url) => {
      const fullUrl = `${baseUrl}/${url}`;
      const priority = url === "" ? "1.0" : url === "blog" ? "0.9" : url.startsWith("services/") ? "0.9" : "0.8";
      return `  <url>
    <loc>${fullUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
