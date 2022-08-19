export enum SupportedLocales {
  AmericanEnglish = "en-US",
  BrazilianPortuguese = "pt-BR",
}

export interface PostLocalizedSummary {
  title: string;
  slug: string;
  summary: string;
}

export interface PostSummary {
  id: string;
  locales: Record<SupportedLocales, PostLocalizedSummary>;
  tags: string[];
}
