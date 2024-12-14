"use client";

import { useState } from "react";
import { getTranslations, translateFromCollection } from ".";
import { SupportedLocales } from "../types";

export function useTranslations({ locale }: { locale: SupportedLocales }) {
  const [translations] = useState(getTranslations(locale));

  const translate = ({ key, fallbackText }: { key: string; fallbackText?: string }): string => {
    return translateFromCollection(translations, { key, fallbackText });
  };

  return {
    translate,
  };
}
