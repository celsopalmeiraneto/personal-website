import fs from "fs/promises";
import { marked } from "marked";
import path from "path";
import highlight from "highlight.js";
import {
  SupportedLocales,
  PostLocalized,
  LOCALIZED_POST,
  LocalizedPostKey,
  isSupportedLocales,
  PostLocalizedSerializable,
  AssetMetadata,
} from "../types";

marked.use({
  renderer: {
    code(code, language) {
      const languageArray = language ? [language] : [];
      const highlightedContent = highlight.highlightAuto(code, languageArray);

      return `<pre><code class="hljs">${
        highlightedContent.illegal ? code : highlightedContent.value
      }</code></pre>`;
    },
  },
});

const POSTS_FOLDER_PATH = path.resolve("..", "data", "posts");
const PUBLIC_FOLDER_PATH = path.resolve("public");

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

const createSymlinkForAssetFolder = async (relativeAssetsPath: string): Promise<string> => {
  const assetsPath = path.resolve(POSTS_FOLDER_PATH, relativeAssetsPath.trim());
  const publicAssetsPath = path.resolve(PUBLIC_FOLDER_PATH, "posts", relativeAssetsPath.trim());

  try {
    await fs.readlink(publicAssetsPath);
  } catch {
    await fs.symlink(assetsPath, publicAssetsPath);
  }

  return assetsPath;
};

const readCoverMetadata = async (assetsPath: string): Promise<AssetMetadata | undefined> => {
  try {
    const coverMetadataRaw = await fs.readFile(path.resolve(assetsPath, "cover.json"));
    return JSON.parse(coverMetadataRaw.toString());
  } catch {
    return undefined;
  }
};

const getPostByKey = async (key: LocalizedPostKey): Promise<PostLocalized> => {
  const file = await fs.readFile(path.resolve(POSTS_FOLDER_PATH, key.fileName));
  const parsedContents = JSON.parse(file.toString());
  const postLocalized: PostLocalized = {
    ...parsedContents,
    writtenAt: new Date(parsedContents.writtenAt),
  };

  if (postLocalized.assetsPath?.trim()) {
    const assetsPath = await createSymlinkForAssetFolder(postLocalized.assetsPath);
    postLocalized.coverMetadata = await readCoverMetadata(assetsPath);
  }

  return postLocalized;
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
  const htmlContent: string = await marked(markdownContent.toString(), {
    gfm: true,
    async: true,
  });

  return {
    htmlContent,
    post: {
      ...post,
      writtenAt: post.writtenAt.toISOString(),
    },
  };
};
