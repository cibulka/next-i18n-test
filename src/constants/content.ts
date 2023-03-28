import { Page } from '@/server/getDocument';
import { Locale } from '@/types';

import { LOCALES } from './i18n';

export let allPages: Page[] = [];

LOCALES.forEach((locale: Locale) => {
  ['contact', 'home', 'about'].map((slug) => {
    allPages = [
      ...allPages,
      {
        emoji: 'X',
        locale,
        slug,
        title: slug.charAt(0).toLocaleUpperCase() + slug.slice(1),
        type: 'Page',
        content: `I am content of {slug}.`,
      },
    ];
  });
});
