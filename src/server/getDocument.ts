import { AllTypes, Page } from 'contentlayer/generated';

import { LOCALE_DEFAULT } from '@/constants/i18n';

function mergeArticleMeta(postDefault: AllTypes, postTranslated: AllTypes | null) {
  if (!postTranslated) return postDefault;
  if (postTranslated.locale === postDefault.locale) return postTranslated;

  let result;
  switch (postDefault.type) {
    case 'Page':
      result = postTranslated as Page;
      if (!result.emoji) result.emoji = postDefault.emoji;
      return result;
    default:
      return postTranslated;
  }
}

export function getDocument(posts: AllTypes[], slug: string, locale: string) {
  const enPost = posts.find((p) => p.slug === slug && p.locale === LOCALE_DEFAULT);
  const post = posts.find((p) => p.slug === slug && p.locale === locale);
  return enPost ? mergeArticleMeta(enPost, post || null) : null;
}

export function getDocuments(
  posts: AllTypes[],
  locale: string,
  isPostIncluded?: (post: AllTypes) => boolean,
) {
  const slugs = Array.from(
    new Set(posts.filter((p) => (isPostIncluded ? isPostIncluded(p) : true)).map((p) => p.slug)),
  );

  let result: AllTypes[] = [];
  slugs.forEach((slug) => {
    const doc = getDocument(posts, slug, locale);
    if (doc) result = [...result, doc];
  });
  return result;
}
