import 'i18next';

import common from '../../localization/en/common.json';
import error from '../../localization/en/error.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      error: typeof error;
    };
  }
}
