import fs from "fs/promises";
import path from "path";
import { SupportedLocales, PostSummary } from "../types";

export const getPostsSummaries = async (
  locale?: SupportedLocales
): Promise<PostSummary[]> => {
  const postsFolderPath = path.resolve("data", "posts");
  const fileNames = await fs.readdir(postsFolderPath);
  const jsonFiles = fileNames.filter((file) => file.endsWith(".json"));

  const promises = jsonFiles.map<Promise<PostSummary>>(async (filename) => {
    const file = await fs.readFile(path.resolve(postsFolderPath, filename));
    return JSON.parse(file.toString());
  });

  const summaries = await Promise.all(promises);

  if (locale) return summaries.filter((summary) => !!summary.locales[locale]);

  return summaries;
};
