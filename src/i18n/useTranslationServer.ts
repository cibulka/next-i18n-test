
import { createInstance, Namespace } from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { LOCALES, LOCALE_DEFAULT } from '@/constants/i18n';
import { Locale } from '@/types';

const initI18next = async (namespace: Namespace, locale: Locale) => {
  const i18nInstance = createInstance();
  await i18nInstance
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
      lng: locale,
      fallbackNS: 'common',
      defaultNS: 'common',
      ns: namespace,
    });
  return i18nInstance;
};

export async function useTranslationServer(namespace: Namespace, locale: Locale) {
  const i18nextInstance = await initI18next(namespace, locale);
  return {
    t: i18nextInstance.getFixedT(locale, namespace),
    i18n: i18nextInstance,
  };
}
