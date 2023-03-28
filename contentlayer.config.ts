import { makeSource } from 'contentlayer/source-files';

import { Page } from './lib/contentlayer/types/page/Page';

export default makeSource({
  contentDirExclude: ['.DS_Store'],
  contentDirPath: 'content',
  documentTypes: [Page],
});
