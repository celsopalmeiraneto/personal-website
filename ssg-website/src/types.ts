export enum SupportedLocales {
  AmericanEnglish = "en-US",
  BrazilianPortuguese = "pt-BR",
}

const SUPPORTED_LOCALES = Object.values(SupportedLocales);

export const isSupportedLocales = (value: string): value is SupportedLocales => {
  return SUPPORTED_LOCALES.includes(value as SupportedLocales);
};

export interface AssetMetadata {
  alt: string;
  sub: string;
  filename: string;
}

export interface PostLocalized {
  title: string;
  slug: string;
  summary: string;
  postId: string;
  locale: SupportedLocales;
  availableLocales: SupportedLocales[];
  postTags: string[];
  tags: string[];
  writtenAt: Date;
  assetsPath?: string;
  coverMetadata?: AssetMetadata;
}

export type PostLocalizedSerializable = Omit<PostLocalized, "writtenAt"> & {
  writtenAt: string;
};

export interface LocalizedPostKey {
  writtenAt: Date;
  postId: PostLocalized["postId"];
  locale: PostLocalized["locale"];
  slug: PostLocalized["slug"];
  fileName: string;
}

export const LOCALIZED_POST =
  /(?<writtenAt>.*)#(?<type>localizedPost)#(?<postId>.*)#(?<locale>.*)#(?<slug>.*)\.json/g;
