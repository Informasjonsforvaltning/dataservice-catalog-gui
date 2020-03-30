import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import nb from '../l10n/nb';
import { helptextsNb } from '../l10n/helptexts.nb';

interface LocaleStrings extends LocalizedStringsMethods {
  [key: string]: any;
}

export const localization: LocaleStrings = new LocalizedStrings({
  nb: { ...nb, ...helptextsNb }
});

localization.setLanguage('nb');

export const isString = (str: any) =>
  typeof str === 'string' || str instanceof String;

export const translate = (translatableField: any | string): string =>
  isString(translatableField)
    ? translatableField
    : translatableField?.[localization.getLanguage()] ||
      translatableField?.nb ||
      translatableField?.no ||
      translatableField?.nn ||
      translatableField?.en ||
      '';
