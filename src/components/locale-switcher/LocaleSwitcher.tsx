'use client';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { Float } from '@headlessui-float/react';

import { useLocale } from '@/hooks/useLocaleClient';
import { IconChevron, IconGlobe } from '@/icons';
import { LOCALES } from '@/constants/i18n';
import { usePathname } from 'next/navigation';
import { changeLocaleInPathname } from '@/utils/url';

function getLocaleLabel(locale: string) {
  switch (locale) {
    case 'cs':
      return 'Česky';
    case 'en':
      return 'English';
    case 'ua':
      return 'Українська';
    case 'fr':
      return 'Français';
    default:
      throw new Error(`Unknown locale ${locale}`);
  }
}

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  if (!pathname) throw new Error('NO PATHNAME');

  return (
    <Menu>
      <Float>
        <Menu.Button className="flex items-center text-sm">
          <span className="w-4 h-4 mr-2">
            <IconGlobe />
          </span>
          {getLocaleLabel(locale)}
          <span className="w-4 h-4 ml-2">
            <IconChevron />
          </span>
        </Menu.Button>
        <Menu.Items className="bg-neutral-100 border shadow-md mt-2">
          {LOCALES.map((locale) => (
            <Menu.Item key={locale}>
              {({ active }) => (
                <Link
                  className={[
                    'flex justify-between py-1 px-4 border-b border-neutral-500',
                    active && 'bg-blue-500',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  href={changeLocaleInPathname(pathname, locale)}
                >
                  <span className="mr-4">{getLocaleLabel(locale)}</span>
                  <span>{changeLocaleInPathname(pathname, locale)}</span>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Float>
    </Menu>
  );
}
