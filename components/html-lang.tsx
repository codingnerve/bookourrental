"use client";

import { useEffect } from "react";

import { getDictionary, type Locale } from "@/data/i18n";

/**
 * The root layout hard-codes `<html lang="en">`. Pages in another language
 * set the right value here so screen readers and translators pick it up, and
 * put it back when the visitor navigates away.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  const lang = getDictionary(locale).htmlLang;

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = lang;
    return () => {
      root.lang = previous;
    };
  }, [lang]);

  return null;
}
