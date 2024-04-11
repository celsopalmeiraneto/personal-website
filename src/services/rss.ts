import { PostLocalized, SupportedLocales } from "../types";
import { getPostsSummaries } from "./posts";
import fs from "fs/promises";
import path from "path";

const parsePostIntoRssItem = (post: PostLocalized) => {
  return `
<item>
  <title>${post.title}</title>
  <link>https://celsoneto.com.br/posts/${post.slug}</link>
  <description>${post.summary}</description>
  <guid isPermalink="false">${post.slug}</guid>
  <pubDate>${post.writtenAt.toUTCString()}</pubDate>
</item>`.trim();
};

export const generate = async () => {
  const unsortedPosts = await getPostsSummaries(SupportedLocales.AmericanEnglish);
  const posts = unsortedPosts.sort((a, b) => {
    return b.writtenAt.getTime() - a.writtenAt.getTime();
  });

  return `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Celso Palmeira Neto's</title>
    <link>https://celsoneto.com.br</link>
    <description>All items from the website</description>
    <ttl>60</ttl>
    <atom:link href="https://celsoneto.com.br/rss/main.rss" rel="self" type="application/rss+xml" />
    ${posts.map(parsePostIntoRssItem).join("\n")}
  </channel>
</rss>`.trim();
};

export const generateAndWriteFeed = async () => {
  const feedXml = await generate();
  await fs.mkdir(path.resolve("out", "rss"), {
    recursive: true,
  });
  await fs.writeFile(path.resolve("out", "rss", "main.rss"), feedXml);
};
