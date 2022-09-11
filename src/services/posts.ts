import fs from "fs/promises";
import { marked } from "marked";
import path from "path";
import { promisify } from "util";
import {
  SupportedLocales,
  PostLocalized,
  LOCALIZED_POST,
  LocalizedPostKey,
  isSupportedLocales,
  PostLocalizedSerializable,
} from "../types";

const parsePromisified = (
  src: Parameters<typeof marked>[0],
  options: Parameters<typeof marked>[1]
): Promise<string> => {
  return new Promise((resolve, reject) => {
    return marked(src, options, (error, result) => {
      if (error) return reject(error);

      return resolve(result);
    });
  });
};

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
    writtenAt: new Date(match?.groups?.writtenAt ?? Date.now()),
    postId: match?.groups?.postId ?? "",
    locale,
    slug: match?.groups?.slug ?? "",
    fileName: name,
  };
};

const getPostByKey = async (key: LocalizedPostKey): Promise<PostLocalized> => {
  const file = await fs.readFile(path.resolve(POSTS_FOLDER_PATH, key.fileName));
  const postLocalized: PostLocalized = JSON.parse(file.toString());
  return {
    ...postLocalized,
    writtenAt: new Date(postLocalized.writtenAt),
  };
};

export const getPostsSummaries = async (locale?: SupportedLocales): Promise<PostLocalized[]> => {
  const fileNames = await readPostsFolder();

  const { localizedPostFileNames } = groupFilesNamesByType(fileNames);

  const postKeys = localizedPostFileNames
    .map(convertFileNameToPostKey)
    .filter((postKey) => !!postKey.postId);

  const filteredKeys = postKeys.filter((key) => {
    if (!locale) return true;

    return key.locale === locale;
  });

  return await filteredKeys.reduce(async (accPromise, key) => {
    const acc = await accPromise;

    const postLocalized: PostLocalized = await getPostByKey(key);

    acc.push(postLocalized);

    return acc;
  }, Promise.resolve([] as PostLocalized[]));
};

export const getPost = async (
  slug: string
): Promise<null | {
  htmlContent: string;
  post: PostLocalizedSerializable;
}> => {
  const fileNames = await readPostsFolder();
  const { localizedPostFileNames } = groupFilesNamesByType(fileNames);
  const postKey = localizedPostFileNames
    .map(convertFileNameToPostKey)
    .find((postKey) => postKey.slug === slug);

  if (!postKey) return null;

  const post = await getPostByKey(postKey);
  const postFile = `${postKey.slug}.md`;
  const markdownContent = await fs.readFile(path.resolve(POSTS_FOLDER_PATH, postFile));
  const htmlContent: string = await parsePromisified(markdownContent.toString(), {
    gfm: true,
  });

  return {
    htmlContent,
    post: {
      ...post,
      writtenAt: post.writtenAt.toISOString(),
    },
  };
};
