import { AllTypes } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { useComponents } from '@/hooks/useComponents';

export async function MdxReader(props: { locale: string; post: AllTypes }) {
  const MDXContent = useMDXComponent(props.post.body.code);
  const components = useComponents(props.locale, props.post);
  return <MDXContent components={components} />;
}
