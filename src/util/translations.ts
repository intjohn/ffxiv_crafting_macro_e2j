import { jp, fr, de, na } from 'Assets/crafterActions.json';
import type { Translations } from '../types/common';

let translationsObj: Translations | undefined;

const loadTranslations = (): void => {
  translationsObj = {
    en: na,
    jp,
    de,
    fr,
  };
};

const getTranslations = (): Translations => {
  if (!translationsObj) {
    loadTranslations();
  }
  return translationsObj!;
};

export { getTranslations };
