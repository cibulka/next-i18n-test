import { STATE } from '../constants';
import { LOCALES } from '../constants/i18n';

export type Locale = typeof LOCALES[number];

export type State = typeof STATE[keyof typeof STATE];
