export enum SupportedLocales {
  AmericanEnglish = "en-US",
  BrazilianPortuguese = "pt-BR",
}

export interface PostLocalized {
  title: string;
  slug: string;
  summary: string;
  postId: string;
  locale: SupportedLocales;
}

export interface Post {
  id: string;
  locales: SupportedLocales[];
  tags: string[];
}

export interface PostWithLocale extends Omit<Post, "locales"> {
  locale: SupportedLocales;
  localizedInfo: PostLocalized;
}
