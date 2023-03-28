import { AllTypes } from 'contentlayer/generated';

import { Contact } from '@/blocks/contact/Contact';
import { LinkLocalized } from '@/blocks/link-localized/LinkLocalized';
import { PropsWithChildren } from 'react';

export function useComponents(locale: string, post?: AllTypes) {
  return {
    Contact: (p: { email?: string }) => <Contact mailto={p.email} />,
    LinkLocalized: (p: PropsWithChildren & { href: string; locale: string }) => (
      <LinkLocalized href={p.href} locale={p.locale}>
        {p.children}
      </LinkLocalized>
    ),
  };
}
