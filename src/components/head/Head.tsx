import { AllTypes } from 'contentlayer/generated';

import { useTranslationServer } from '@/i18n/useTranslationServer';
import { Locale } from '@/types';

export async function Head(props: { locale: Locale; post?: AllTypes | null; title?: string }) {
  const { t } = await useTranslationServer('common', props.locale);
  const { t: tError } = await useTranslationServer('error', props.locale);

  let title: string;
  if (props.title) {
    title = props.title;
  } else if (props.post) {
    title = props.post.title;
  } else if (props.post === null) {
    title = `${tError('error404.title')}`;
  } else {
    title = `${t('description')}`;
  }
  title = `${title} | Dotu Planner`;

  const description = t('description');

  return (
    <>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} name="og:title" />
      <meta content={title} name="og:description" />
    </>
  );
}
