import { LOCALES } from '@/constants/i18n';

export function stripLeadingSlash(pathname: string) {
  return pathname.replace(/^\/+/, '');
}

export function getSegmentsInPath(pathname: string, segments: number) {
  return pathname.split('/').filter(Boolean).slice(0, segments).join('/');
}

export function stripLocalesFromPathname(pathname: string) {
  let result = pathname;
  LOCALES.forEach((locale) => {
    const regex = new RegExp(`^/${locale}`, '');
    result = result.replace(regex, '');
  });
  return result;
}

export function changeLocaleInPathname(pathname: string, locale: string) {
  let result = pathname;
  result = stripLocalesFromPathname(pathname);
  result = stripLeadingSlash(result);
  result = `/${locale}/${result}`;
  return result;
}

export function normalizePathname(p: string, segments: number) {
  let result = p;
  result = stripLeadingSlash(result);
  result = stripLocalesFromPathname(result);
  result = getSegmentsInPath(result, segments);
  return result;
}
