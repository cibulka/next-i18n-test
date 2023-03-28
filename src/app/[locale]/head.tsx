import { allPages } from 'contentlayer/generated';

import { Head } from '@/components/head/Head';
import { getDocument } from '@/server/getDocument';

export default async function HeadPage(props: { params: { locale: string } }) {
  const page = getDocument(allPages, 'home', props.params.locale);
  // @ts-expect-error Server component
  return <Head locale={props.params.locale} post={page} />;
}
