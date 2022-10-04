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
  <guid>${post.slug}</guid>
  <pubDate>${post.writtenAt.toUTCString()}</pubDate>
</item>`.trim();
};

export const generate = async () => {
  const unsortedPosts = await getPostsSummaries(SupportedLocales.AmericanEnglish);
  const posts = unsortedPosts.sort((a, b) => {
    return b.writtenAt.getTime() - a.writtenAt.getTime();
  });

  return `
<rss version="2.0">
  <channel>
    <title>Celso Palmeira Neto's - All Content</title>
    <link>https://celsoneto.com.br</link>
    <description>All items from the website</description>
    <ttl>60</ttl>
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
