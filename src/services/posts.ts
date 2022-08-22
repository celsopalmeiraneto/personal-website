import fs from "fs/promises";
import path from "path";
import {
  SupportedLocales,
  Post,
  PostWithLocale,
  PostLocalized,
} from "../types";

const LOCALIZED_POST =
  /\d*#(?<type>localizedPost)#(?<postId>.*)#(?<localizedSlug>.*)\.json/g;

export const getPostsSummaries = async (
  locale?: SupportedLocales
): Promise<PostWithLocale[]> => {
  const postsFolderPath = path.resolve("data", "posts");
  const fileNames = await fs.readdir(postsFolderPath);

  const allPostFiles = fileNames.filter((file) =>
    file.match(/\d*#post#.*\.json/)
  );
  const localizationFiles = fileNames.filter((file) =>
    file.match(LOCALIZED_POST)
  );

  const allPosts = await Promise.all(
    allPostFiles.map<Promise<Post>>(async (filename) => {
      const file = await fs.readFile(path.resolve(postsFolderPath, filename));
      return JSON.parse(file.toString());
    })
  );

  const filteredPosts = allPosts.filter((post) => {
    if (!locale) return true;

    return post.locales.includes(locale);
  });

  return await filteredPosts.reduce(async (accPromise, post) => {
    const acc = await accPromise;

    const localizedFile = localizationFiles.find((file) => {
      const [match] = Array.from(file.matchAll(LOCALIZED_POST));

      if (!match) return false;

      return match?.groups?.postId === post.id;
    });

    if (!localizedFile) return acc;

    const file = await fs.readFile(
      path.resolve(postsFolderPath, localizedFile)
    );
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
