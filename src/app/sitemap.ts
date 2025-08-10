import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://amitnandan.vercel.app", lastModified: new Date() }];
}
