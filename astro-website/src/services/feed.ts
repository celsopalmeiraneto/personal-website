import { marked } from "marked";
import highlight from "highlight.js";
import fs from "node:fs/promises";
import path from "node:path";
import type { AstroIntegration } from "astro";

marked.use({
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      if (lang === "mermaid") {
        return `<pre class="mermaid">${text}</pre>`;
      }
      const languageArray = lang ? [lang] : [];
      const highlightedContent = highlight.highlightAuto(text, languageArray);
      return `<pre><code class="hljs">${
        highlightedContent.illegal ? text : highlightedContent.value
      }</code></pre>`;
    },
  },
});

interface PostData {
  title: string;
  summary: string;
  slug: string;
  writtenAt: Date;
  locale: string;
}

function parseFrontmatter(rawMd: string): { data: Record<string, unknown>; body: string } | null {
  const match = rawMd.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const frontmatterStr = match[1];
  const body = match[2];
  const data: Record<string, unknown> = {};
  for (const line of frontmatterStr.split("\n")) {
    const [_, key, value] = line.match(/^(\w+):\s*(.+)$/) ?? [];
    if (!key) continue;
    const trimmed = value.trim();
    try {
      data[key] = JSON.parse(trimmed);
    } catch {
      data[key] = trimmed.replace(/^["']|["']$/g, "");
    }
  }
  return { data, body };
}

async function getEnPosts(): Promise<Array<{ data: PostData; body: string }>> {
  const postsDir = path.resolve("..", "data", "posts");
  const files = await fs.readdir(postsDir);
  const mdFiles = files.filter((f) => f.endsWith(".en-US.md"));
  const result: Array<{ data: PostData; body: string }> = [];
  for (const file of mdFiles) {
    const raw = await fs.readFile(path.resolve(postsDir, file), "utf-8");
    const parsed = parseFrontmatter(raw);
    if (!parsed) continue;
    result.push({
      data: {
        title: String(parsed.data.title ?? ""),
        summary: String(parsed.data.summary ?? ""),
        slug: String(parsed.data.slug ?? ""),
        writtenAt: new Date(String(parsed.data.writtenAt ?? "")),
        locale: String(parsed.data.locale ?? "en-US"),
      },
      body: parsed.body,
    });
  }
  return result;
}

const escapeXml = (s: string | undefined): string =>
  (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const wrapCdata = (html: string): string => {
  return `<![CDATA[${html.replace(/]]>/g, "]]\\]\\]><![CDATA[>")}]]>`;
};

const siteUrl = "https://celsoneto.com.br";
const makePostUrl = (slug: string) => `${siteUrl}/posts/${slug}`;

export function feedPlugin(): AstroIntegration {
  return {
    name: "generate-feeds",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        console.log("Generating RSS + Atom feeds...");
        const posts = await getEnPosts();
        const sorted = posts.sort(
          (a, b) => b.data.writtenAt.getTime() - a.data.writtenAt.getTime(),
        );

        const postsWithContent: Array<{
          title: string;
          summary: string;
          slug: string;
          writtenAt: Date;
          html: string;
        }> = [];

        for (const post of sorted) {
          const rawHtml: string = await marked(post.body || "", { gfm: true, async: true });
          postsWithContent.push({
            title: post.data.title,
            summary: post.data.summary,
            slug: post.data.slug,
            writtenAt: post.data.writtenAt,
            html: rawHtml,
          });
        }

        const rssItems = postsWithContent
          .map((p) => {
            const title = escapeXml(p.title);
            const summary = escapeXml(p.summary);
            const url = makePostUrl(p.slug);
            const guid = escapeXml(p.slug);
            const pubDate = p.writtenAt.toUTCString();
            const contentCdata = wrapCdata(p.html ?? "");
            return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <description>${summary}</description>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <content:encoded>${contentCdata}</content:encoded>
    </item>`;
          })
          .join("\n");

        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Celso Palmeira Neto's</title>
    <link>${siteUrl}</link>
    <description>All items from the website</description>
    <ttl>60</ttl>
    <atom:link href="${siteUrl}/rss/main.rss" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

        const atomEntries = postsWithContent
          .map((p) => {
            const title = escapeXml(p.title);
            const summary = escapeXml(p.summary);
            const url = makePostUrl(p.slug);
            const id = url;
            const updated = p.writtenAt.toISOString();
            const contentCdata = wrapCdata(p.html ?? "");
            return `
    <entry>
      <title>${title}</title>
      <link rel="alternate" type="text/html" href="${url}" />
      <id>${id}</id>
      <updated>${updated}</updated>
      <summary>${summary}</summary>
      <content type="html">${contentCdata}</content>
    </entry>`;
          })
          .join("\n");

        const mostRecent =
          postsWithContent[0]?.writtenAt?.toISOString() ?? new Date().toISOString();

        const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Celso Palmeira Neto's</title>
  <link href="${siteUrl}/atom/main.atom" rel="self" type="application/atom+xml" />
  <link href="${siteUrl}" />
  <id>${siteUrl}/</id>
  <updated>${mostRecent}</updated>
  <author><name>Celso Palmeira Neto</name></author>
  ${atomEntries}
</feed>`;

        const outDir = path.resolve(dir.pathname || "dist");
        const rssDir = path.resolve(outDir, "rss");
        const atomDir = path.resolve(outDir, "atom");
        await fs.mkdir(rssDir, { recursive: true });
        await fs.mkdir(atomDir, { recursive: true });
        await fs.writeFile(path.resolve(rssDir, "main.rss"), rssXml, "utf-8");
        await fs.writeFile(path.resolve(atomDir, "main.atom"), atomXml, "utf-8");
        console.log("Feeds generated successfully.");
      },
    },
  };
}
