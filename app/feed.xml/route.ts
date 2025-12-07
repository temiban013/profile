import { getAllPosts } from "@/lib/blog/content";

export async function GET() {
  const posts = getAllPosts({ locale: "en" });
  const baseUrl = "https://mariorafaelayala.com";

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mario Rafael Ayala - Blog</title>
    <link>${baseUrl}</link>
    <description>Software engineering insights and tutorials</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${postUrl}</guid>
      ${post.image ? `<image><url>${baseUrl}${post.image}</url><title>${escapeXml(post.title)}</title><link>${postUrl}</link></image>` : ""}
      ${post.tags.length > 0 ? post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ") : ""}
    </item>`;
    }).join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
