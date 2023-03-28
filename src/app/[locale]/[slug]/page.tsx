import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { MdxReader } from '@/components/md-reader/MdxReader';
import { LOCALES } from '@/constants/i18n';
import { getDocument } from '@/server/getDocument';
import { Locale } from '@/types';

export function generateStaticParams() {
  let result: { slug: string; locale: string }[] = [];

  LOCALES.forEach((locale) => {
    allPages.map(({ slug }) => {
      result = [...result, { slug, locale }];
    });
  });

  return result;
}

export default async function Page(props: { params: { locale: Locale; slug: string } }) {
  const post = getDocument(allPages, props.params.slug, props.params.locale);
  if (!post) notFound();

  return (
    <div className="flex flex-col m-auto prose">
      <h2>{post.title}</h2>
      {/* @ts-expect-error Async server component */}
      <MdxReader post={post} locale={props.params.locale} />
    </div>
  );
}
