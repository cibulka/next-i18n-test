import { allPages } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { MdxReader } from '@/components/md-reader/MdxReader';
import { getDocument } from '@/server/getDocument';
import { Locale } from '@/types';

export default async function Page(props: { params: { locale: Locale } }) {
  const post = getDocument(allPages, 'home', props.params.locale);
  if (!post) notFound();

  return (
    <div className="flex flex-col m-auto prose">
      <h2>{post.title}</h2>
      {/* @ts-expect-error Async server component */}
      <MdxReader post={post} locale={props.params.locale} />
    </div>
  );
}
