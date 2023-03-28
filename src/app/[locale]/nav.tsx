'use client';
import React from 'react';
import Link from 'next/link';

import { useIsActivePath, useLocale } from '@/hooks/useLocaleClient';
import { useTranslationClient } from '@/i18n/useTranslationClient';
import { LocaleSwitcher } from '@/components/locale-switcher/LocaleSwitcher';

export function Nav(props: { locale: string }) {
  const { t } = useTranslationClient('common', props.locale);

  const locale = useLocale(); // => en | ru | ua | fr
  const getIsActivePath = useIsActivePath();

  const links = [
    {
      href: '/',
      path: '',
      label: t('nav.home'),
    },
    {
      href: '/about',
      path: 'about',
      label: t('nav.about'),
    },
    {
      href: '/contact',
      path: 'contact',
      label: t('nav.contact'),
    },
  ];

  return (
    <header className="py-4">
      <h1 className="text-2xl text-center font-bold mb-4">Locales in URLs lead to hard refresh</h1>
      <div className="flex justify-center border-t border-b border-neutral-500 py-2">
        <LocaleSwitcher />
      </div>
      <div className="table ml-auto mr-auto">
        <div className="table-row">
          <div className="table-cell">
            <ul className="flex w-full justify-center gap-4 py-2">
              {links.map((link) => (
                <li key={link.href}>
                  {getIsActivePath(link.path) ? (
                    <strong className="font-bold">{link.label}</strong>
                  ) : (
                    <Link href={link.href} className="text-blue-500 underline">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
