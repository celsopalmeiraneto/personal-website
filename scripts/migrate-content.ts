import fs from "node:fs/promises";
import path from "node:path";

const POSTS_DIR = path.resolve("data", "posts");
const ARCHIVE_DIR = path.resolve(POSTS_DIR, "_archive");

const LOCALIZED_POST =
  /(?<writtenAt>.*)#(?<type>localizedPost)#(?<postId>.*)#(?<locale>.*)#(?<slug>.*)\.json/;

interface ParsedKey {
  writtenAt: string;
  postId: string;
  locale: string;
  slug: string;
  fileName: string;
}

function parseFileName(name: string): ParsedKey | null {
  const match = name.match(LOCALIZED_POST);
  if (!match?.groups) return null;

  return {
    writtenAt: match.groups.writtenAt,
    postId: match.groups.postId,
    locale: match.groups.locale,
    slug: match.groups.slug,
    fileName: name,
  };
}

function buildFrontmatter(json: Record<string, unknown>): string {
  const lines = ["---"];

  if (json.title) lines.push(`title: ${JSON.stringify(json.title)}`);
  if (json.summary) lines.push(`summary: ${JSON.stringify(json.summary)}`);
  if (json.slug) lines.push(`slug: ${JSON.stringify(json.slug)}`);
  if (json.postId) lines.push(`postId: ${JSON.stringify(json.postId)}`);
  if (json.locale) lines.push(`locale: ${JSON.stringify(json.locale)}`);
  if (json.postTags) lines.push(`postTags: ${JSON.stringify(json.postTags)}`);
  if (json.tags) lines.push(`tags: ${JSON.stringify(json.tags)}`);
  if (json.availableLocales)
    lines.push(`availableLocales: ${JSON.stringify(json.availableLocales)}`);
  if (json.writtenAt) lines.push(`writtenAt: ${JSON.stringify(json.writtenAt)}`);
  if (json.assetsPath) lines.push(`assetsPath: ${JSON.stringify(json.assetsPath)}`);

  lines.push("---");
  lines.push("");

  return lines.join("\n");
}

async function main() {
  const files = await fs.readdir(POSTS_DIR);

  const jsonFiles = files.filter((f) => f.endsWith(".json") && f.match(LOCALIZED_POST));

  if (jsonFiles.length === 0) {
    console.log("No localized post JSON files found. Already migrated?");
    return;
  }

  const usedMdFiles = new Set<string>();

  for (const jsonFile of jsonFiles) {
    const parsed = parseFileName(jsonFile);
    if (!parsed) {
      console.warn(`Could not parse: ${jsonFile}`);
      continue;
    }

    const jsonPath = path.resolve(POSTS_DIR, jsonFile);
    const jsonRaw = await fs.readFile(jsonPath, "utf-8");
    const jsonData = JSON.parse(jsonRaw);

    const mdFileName = `${parsed.slug}.md`;
    const mdPath = path.resolve(POSTS_DIR, mdFileName);
    usedMdFiles.add(mdFileName);

    let markdownContent = "";
    try {
      markdownContent = await fs.readFile(mdPath, "utf-8");
    } catch {
      console.warn(`Markdown file not found for slug: ${parsed.slug}, creating empty.`);
      markdownContent = `# ${jsonData.title ?? parsed.slug}\n`;
    }

    const outputFileName = `${parsed.slug}.${parsed.locale}.md`;
    const outputPath = path.resolve(POSTS_DIR, outputFileName);

    const output = buildFrontmatter(jsonData) + markdownContent;
    await fs.writeFile(outputPath, output, "utf-8");
    console.log(`Created: ${outputFileName}`);
  }

  await fs.mkdir(ARCHIVE_DIR, { recursive: true });

  for (const jsonFile of jsonFiles) {
    await fs.rename(path.resolve(POSTS_DIR, jsonFile), path.resolve(ARCHIVE_DIR, jsonFile));
    console.log(`Archived JSON: ${jsonFile}`);
  }

  for (const mdFile of usedMdFiles) {
    try {
      await fs.rename(path.resolve(POSTS_DIR, mdFile), path.resolve(ARCHIVE_DIR, mdFile));
      console.log(`Archived MD: ${mdFile}`);
    } catch {
      console.warn(`Could not archive MD file: ${mdFile}`);
    }
  }

  console.log(`\nDone. Migrated ${jsonFiles.length} posts.`);
  console.log(`Old files archived to ${ARCHIVE_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
