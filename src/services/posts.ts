import fs from "fs/promises";
import path from "path";
import { SupportedLocales, Post, PostWithLocale, PostLocalized } from "../types";

const LOCALIZED_POST = /\d*#(?<type>localizedPost)#(?<postId>.*)#(?<localizedSlug>.*)\.json/g;

const POSTS_FOLDER_PATH = path.resolve("data", "posts");

const readPostsFolder = (): Promise<string[]> => {
  return fs.readdir(POSTS_FOLDER_PATH);
};

const groupFilesNamesByType = (files: string[]) => {
  return {
    postFileNames: files.filter((file) => file.match(/\d*#post#.*\.json/)),
    localizedPostFileNames: files.filter((file) => file.match(LOCALIZED_POST)),
  };
};

export const getPostsSummaries = async (locale?: SupportedLocales): Promise<PostWithLocale[]> => {
  const fileNames = await readPostsFolder();
  const { postFileNames, localizedPostFileNames } = groupFilesNamesByType(fileNames);

  const allPosts = await Promise.all(
    postFileNames.map<Promise<Post>>(async (filename) => {
      const file = await fs.readFile(path.resolve(POSTS_FOLDER_PATH, filename));
      return JSON.parse(file.toString());
    })
  );

  const filteredPosts = allPosts.filter((post) => {
    if (!locale) return true;

    return post.locales.includes(locale);
  });

  return await filteredPosts.reduce(async (accPromise, post) => {
    const acc = await accPromise;

    const localizedFile = localizedPostFileNames.find((file) => {
      const [match] = Array.from(file.matchAll(LOCALIZED_POST));

      if (!match) return false;

      return match?.groups?.postId === post.id;
    });

    if (!localizedFile) return acc;

    const file = await fs.readFile(path.resolve(POSTS_FOLDER_PATH, localizedFile));
    const postLocalized: PostLocalized = JSON.parse(file.toString());

    const postWithLocale: PostWithLocale = {
      id: post.id,
      locale: postLocalized.locale,
      localizedInfo: postLocalized,
      tags: post.tags,
    };

    acc.push(postWithLocale);

    return acc;
  }, Promise.resolve([] as PostWithLocale[]));
};
