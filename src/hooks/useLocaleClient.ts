'use client';
import { LOCALES, LOCALE_DEFAULT } from '@/constants/i18n';
import { Locale } from '@/types';
import {
  getSegmentsInPath,
  normalizePathname,
  stripLeadingSlash,
  stripLocalesFromPathname,
} from '@/utils/url';
import { usePathname } from 'next/navigation';

/* Hooks */

export function useLocaleStrict() {
  const pathname = usePathname();
  const locale = pathname?.split('/').filter(Boolean)[0] as Locale;
  return LOCALES.includes(locale) ? locale : undefined;
}

export function useLocale() {
  const locale = useLocaleStrict();
  return locale || LOCALE_DEFAULT;
}

export function useIsActivePath(segments = 1) {
  const pathname = usePathname();

  return function isActivePath(path: string) {
    return pathname && normalizePathname(pathname, segments) === normalizePathname(path, segments);
  };
}
