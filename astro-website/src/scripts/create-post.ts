import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const POSTS_DIR = path.resolve("..", "data", "posts");
const DEFAULT_LOCALE = "en-US";
const USAGE = "Usage: npm run create-post -- <slug>";

const randomPostId = (): string =>
  randomBytes(64)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 5);

const createNewPost = async (slug: string): Promise<string> => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid slug "${slug}". Use lowercase letters, numbers and dashes.`);
  }

  const fileName = `${slug}.${DEFAULT_LOCALE}.md`;
  const filePath = path.resolve(POSTS_DIR, fileName);

  const content = `---
title: "${slug}"
summary: ""
slug: "${slug}"
postId: "${randomPostId()}"
locale: "${DEFAULT_LOCALE}"
availableLocales: ["${DEFAULT_LOCALE}"]
postTags: []
tags: []
writtenAt: "${new Date().toISOString()}"
---

Write your post here.
`;

  await fs.writeFile(filePath, content, { flag: "wx" });

  return filePath;
};

const slug = process.argv[2];

if (!slug) {
  console.error(USAGE);
  process.exit(1);
}

try {
  const filePath = await createNewPost(slug);
  console.log("New post created:", path.relative(process.cwd(), filePath));
} catch (error) {
  if ((error as NodeJS.ErrnoException).code === "EEXIST") {
    console.error(`Post already exists: data/posts/${slug}.${DEFAULT_LOCALE}.md`);
  } else {
    console.error(error instanceof Error ? error.message : error);
  }
  process.exit(1);
}
