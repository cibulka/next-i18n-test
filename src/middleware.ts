import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';

import { EXT_FILES } from '@/constants';
import { LOCALE_DEFAULT, LOCALES } from '@/constants/i18n';

const LOCALES_MUTABLE = [...LOCALES];

export async function middleware(req: NextRequest) {
  const languages = req.headers.get('Accept-language');
  if (typeof languages !== 'string') throw new Error('Non-string languages in header');

  let locale = new Negotiator({
    headers: {
      'Accept-language': languages,
    },
  }).language(LOCALES_MUTABLE);

  const ext = req.url.split('.').pop();
  if (ext && EXT_FILES.includes(ext)) return NextResponse.next();

  if (!locale) locale = LOCALE_DEFAULT;

  // Redirect if lng in path is not supported
  if (
    !LOCALES.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith(`/thumbnail`) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}`, req.url));
  }

  return NextResponse.next();
}
