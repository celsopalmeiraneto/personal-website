import { SupportedLocales } from "../types";
import enUS from "./translations-en-US.json";
import ptBR from "./translations-pt-BR.json";
import { get } from "lodash";

export const getTranslations = (locale: SupportedLocales) => {
  if (locale === "en-US") {
    return enUS;
  }

  if (locale === "pt-BR") {
    return ptBR;
  }

  return enUS;
};

export const translateFromCollection = (
  translations: ReturnType<typeof getTranslations>,
  {
    key,
    fallbackText,
  }: {
    key: string;
    fallbackText?: string;
  }
): string => {
  const text = get(translations, key);

  if (typeof text !== "string") {
    return fallbackText ?? "";
  }

  return text;
};
