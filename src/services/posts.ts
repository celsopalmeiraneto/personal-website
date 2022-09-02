import fs from "fs/promises";
import path from "path";
import {
  SupportedLocales,
  PostLocalized,
  LOCALIZED_POST,
  LocalizedPostKey,
  isSupportedLocales,
} from "../types";

const POSTS_FOLDER_PATH = path.resolve("data", "posts");

const readPostsFolder = (): Promise<string[]> => {
  return fs.readdir(POSTS_FOLDER_PATH);
};

const groupFilesNamesByType = (files: string[]) => {
  return {
    localizedPostFileNames: files.filter((file) => file.match(LOCALIZED_POST)),
  };
};

const convertFileNameToPostKey = (name: string): LocalizedPostKey => {
  const [match] = name.matchAll(LOCALIZED_POST);

  const partialLocale = match?.groups?.locale ?? "";
  const locale = isSupportedLocales(partialLocale)
    ? partialLocale
    : SupportedLocales.AmericanEnglish;

  return {
    postId: match?.groups?.postId ?? "",
    locale,
    slug: match?.groups?.slug ?? "",
    fileName: name,
  };
};

export const getPostsSummaries = async (locale?: SupportedLocales): Promise<PostLocalized[]> => {
  const fileNames = await readPostsFolder();

  const { localizedPostFileNames } = groupFilesNamesByType(fileNames);

  const postKeys = localizedPostFileNames
    .map(convertFileNameToPostKey)
    .filter((postKey) => !!postKey.postId && !!postKey.slug);

  const filteredKeys = postKeys.filter((key) => {
    if (!locale) return true;

    return key.locale === locale;
  });

  return await filteredKeys.reduce(async (accPromise, key) => {
    const acc = await accPromise;

    const file = await fs.readFile(path.resolve(POSTS_FOLDER_PATH, key.fileName));
    const postLocalized: PostLocalized = JSON.parse(file.toString());

    acc.push(postLocalized);

    return acc;
  }, Promise.resolve([] as PostLocalized[]));
};
