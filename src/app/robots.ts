export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://amitnandan.vercel.app/sitemap.xml",
  };
}
