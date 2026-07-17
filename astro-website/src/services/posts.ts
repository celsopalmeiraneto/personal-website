import fs from "node:fs/promises";
import path from "node:path";

export interface AssetMetadata {
  alt: string;
  sub: string;
  filename: string;
}

export const readCoverMetadata = async (assetsDir: string): Promise<AssetMetadata | undefined> => {
  try {
    const coverJson = await fs.readFile(path.resolve(assetsDir, "cover.json"));
    return JSON.parse(coverJson.toString());
  } catch {
    return undefined;
  }
};

export const wrapNotesSection = (html: string): string => {
  const lastH2Pattern = /<h2>([^<]*)<\/h2>(?![\s\S]*<h2>)/i;
  const match = lastH2Pattern.exec(html);

  if (!match || match[1].toLowerCase() !== "notes") return html;

  const beforeNotes = html.slice(0, match.index);
  const fromNotes = html.slice(match.index);

  return `${beforeNotes}<section class="notes">${fromNotes}</section>`;
};
