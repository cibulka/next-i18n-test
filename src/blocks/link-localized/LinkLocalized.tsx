import React, { PropsWithChildren } from 'react';
import Link from 'next/link';

import { changeLocaleInPathname } from '@/utils/url';

export function LinkLocalized(props: PropsWithChildren & { href: string; locale: string }) {
  const url = changeLocaleInPathname(props.href, props.locale);

  return (
    <Link href={url}>
      {props.children}
      <span>({url})</span>
    </Link>
  );
}
