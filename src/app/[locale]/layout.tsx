import React, { ReactNode } from 'react';

import '@/styles/app.css';

import { LOCALES } from '@/constants/i18n';
import { useTranslationServer } from '@/i18n/useTranslationServer';
import { Locale } from '@/types';

import { Nav } from './nav';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Layout(props: { children: ReactNode; params: { locale: Locale } }) {
  const { locale } = props.params;

  const { t } = await useTranslationServer('common', props.params.locale);

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="theme-page">
        <div className="relative flex flex-col" style={{ minHeight: '100vh' }}>
          <Nav locale={props.params.locale} />
          <div className="flex flex-1">{props.children}</div>
          <div className="flex justify-center py-4">❤️ {t('thanks')}</div>
        </div>
      </body>
    </html>
  );
}
