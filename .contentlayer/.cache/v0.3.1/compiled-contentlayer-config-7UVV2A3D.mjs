// contentlayer.config.ts
import { makeSource } from "contentlayer/source-files";

// lib/contentlayer/types/page/Page.ts
import path from "path";
import { defineDocumentType } from "contentlayer/source-files";
var DIR = "pages";
var Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `${DIR}/*/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    emoji: {
      type: "string",
      description: "Optional emoji",
      required: false
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => {
        const result = path.basename(post._raw.sourceFileName, ".mdx").split(".").filter(Boolean);
        if (result.length !== 2)
          throw new Error("NOPE");
        return result[0];
      }
    },
    locale: {
      type: "string",
      resolve: (post) => {
        const result = path.basename(post._raw.sourceFileName, ".mdx").split(".").filter(Boolean);
        if (result.length !== 2)
          throw new Error("NOPE");
        return result[1];
      }
    }
  }
}));

// contentlayer.config.ts
var contentlayer_config_default = makeSource({
  contentDirExclude: [".DS_Store"],
  contentDirPath: "content",
  documentTypes: [Page]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-7UVV2A3D.mjs.map
