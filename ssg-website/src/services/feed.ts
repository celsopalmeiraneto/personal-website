import { PostLocalized, SupportedLocales } from "../types";
import { getPostsSummaries, getPost } from "./posts";
import fs from "fs/promises";
import path from "path";

const escapeXml = (s: string | undefined): string =>
  (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Safely wrap HTML in CDATA, splitting any literal ']]>' sequences
const wrapCdata = (html: string): string => {
  return `<![CDATA[${html.replace(/]]>/g, "]]\\]\]><![CDATA[>")}]]>`; // split closing sequences
};

const siteUrl = "https://celsoneto.com.br";
const makePostUrl = (slug: string) => `${siteUrl}/posts/${slug}`;

const buildRssItem = (post: PostLocalized, htmlContent: string) => {
  const title = escapeXml(post.title);
  const summary = escapeXml(post.summary);
  const url = makePostUrl(post.slug);
  const guid = escapeXml(post.slug);
  const pubDate = post.writtenAt.toUTCString();

  const contentCdata = wrapCdata(htmlContent ?? "");

  return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <description>${summary}</description>
      <guid isPermalink="false">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <content:encoded>${contentCdata}</content:encoded>
    </item>`;
};

const buildAtomEntry = (post: PostLocalized, htmlContent: string) => {
  const title = escapeXml(post.title);
  const summary = escapeXml(post.summary);
  const url = makePostUrl(post.slug);
  const id = url;
  const updated = post.writtenAt.toISOString();
  const contentCdata = wrapCdata(htmlContent ?? "");

  return `
    <entry>
      <title>${title}</title>
      <link rel="alternate" type="text/html" href="${url}" />
      <id>${id}</id>
      <updated>${updated}</updated>
      <summary>${summary}</summary>
      <content type="html">${contentCdata}</content>
    </entry>`;
};

export const generateRss = async (
  postsWithContent: Array<{ post: PostLocalized; html: string }>,
) => {
  const items = postsWithContent.map(({ post, html }) => buildRssItem(post, html)).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Celso Palmeira Neto's</title>
    <link>${siteUrl}</link>
    <description>All items from the website</description>
    <ttl>60</ttl>
    <atom:link href="${siteUrl}/rss/main.rss" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
};

export const generateAtom = async (
  postsWithContent: Array<{ post: PostLocalized; html: string }>,
) => {
  const mostRecent =
    postsWithContent[0]?.post?.writtenAt?.toISOString() ?? new Date().toISOString();
  const entries = postsWithContent.map(({ post, html }) => buildAtomEntry(post, html)).join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Celso Palmeira Neto's</title>
  <link href="${siteUrl}/atom/main.atom" rel="self" type="application/atom+xml" />
  <link href="${siteUrl}" />
  <id>${siteUrl}/</id>
  <updated>${mostRecent}</updated>
  <author><name>Celso Palmeira Neto</name></author>
  ${entries}
</feed>`;
};

export const generateAndWriteFeeds = async () => {
  const unsortedPosts = await getPostsSummaries(SupportedLocales.AmericanEnglish);
  const posts = unsortedPosts.sort((a, b) => b.writtenAt.getTime() - a.writtenAt.getTime());

  const postsWithContent: Array<{ post: PostLocalized; html: string }> = [];

  for (const p of posts) {
    try {
      const result = await getPost(p.slug);
      if (result) {
        // result.post has writtenAt as ISO string; ensure we produce Date on post
        const post: PostLocalized = {
          ...p,
          writtenAt: new Date(result.post.writtenAt),
        };
        postsWithContent.push({ post, html: result.htmlContent });
      }
    } catch (e) {
      // ignore individual post failures
      // continue without blocking feed generation
    }
  }

  const rssXml = await generateRss(postsWithContent);
  const atomXml = await generateAtom(postsWithContent);

  const outDirRss = path.resolve("out", "rss");
  const outDirAtom = path.resolve("out", "atom");
  await fs.mkdir(outDirRss, { recursive: true });
  await fs.mkdir(outDirAtom, { recursive: true });

  await fs.writeFile(path.resolve(outDirRss, "main.rss"), rssXml, "utf-8");
  await fs.writeFile(path.resolve(outDirAtom, "main.atom"), atomXml, "utf-8");
};
