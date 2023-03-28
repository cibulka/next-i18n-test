import { Head } from '@/components/head/Head';
import { allPages } from '@/constants/content';
import { getDocument } from '@/server/getDocument';

export default async function HeadPage(props: { params: { locale: string; slug: string } }) {
  const page = getDocument(allPages, props.params.slug, props.params.locale);
  // @ts-expect-error Server component
  return <Head locale={props.params.locale} post={page} />;
}
