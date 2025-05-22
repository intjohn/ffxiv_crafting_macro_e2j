import { jp, fr, de, na } from 'Assets/crafterActions.json';

let translationsObj;

const loadTranslations = () => {
  translationsObj = {
    en: na,
    jp,
    de,
    fr,
  };
};

const getTranslations = () => {
  if (!translationsObj) {
    loadTranslations();
  }
  return translationsObj;
};

export { getTranslations };
