'use client';
import i18next, { Namespace } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import ChainedBackend from 'i18next-chained-backend';
import { initReactI18next, useTranslation as useTranslationLib } from 'react-i18next';

import { LOCALE_DEFAULT, LOCALES } from '@/constants/i18n';

i18next
  .use(initReactI18next)
  .use(initReactI18next)
  .use(ChainedBackend)
  .init({
    backend: {
      backends: [
        resourcesToBackend(
          (loc: string, ns: string) => import(`../../localization/${loc}/${ns}.json`),
        ),
        resourcesToBackend((loc: string, ns: string) => import(`./${loc}/${ns}.json`)),
      ],
    },
    supportedLngs: LOCALES,
    fallbackLng: LOCALE_DEFAULT,
    fallbackNS: 'common',
    defaultNS: 'common',
  });

export function useTranslationClient(ns: Namespace, locale: string) {
  if (i18next.resolvedLanguage !== locale) i18next.changeLanguage(locale);
  const t = useTranslationLib(ns);
  return t;
}
