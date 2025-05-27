import fs from 'fs';
import path from 'path';
import jsdom from 'jsdom';

interface Translations {
  [locale: string]: string[];
}

const getUrl = (locale: string) =>
  `https://${locale}.finalfantasyxiv.com/crafting_gathering_guide/carpenter/`;

const locales = ['na', 'jp', 'fr', 'de'];

const translations: Translations = {};

await Promise.all(
  locales.map(async (locale) => {
    console.log(`Fetching ${locale} translations...`);
    const resp = await fetch(getUrl(locale));
    const text = await resp.text();
    const doc = new jsdom.JSDOM(text).window.document;
    translations[locale] = [
      ...doc
        .querySelectorAll('.guide-table')[0]
        .querySelectorAll('tbody tr strong'),
    ].map((el) => {
      const text = el.innerHTML;
      const rubyStart = text.indexOf('<ruby>');
      if (rubyStart !== -1) {
        const midKanji = text.match(/(?<=ruby>)(.*?)(?=<)/g)?.join('') || '';
        const rubyEnd = text.lastIndexOf('</ruby>');
        return `${text.slice(0, rubyStart)}${midKanji}${text.slice(rubyEnd + 7)}`;
      }
      return text;
    });
  }),
);

try {
  fs.writeFileSync(
    path.resolve(import.meta.dirname, '../assets/crafterActions.json'),
    JSON.stringify(translations, locales.sort(), 2),
    'utf-8',
  );
  console.log('Translation file written successfully');
} catch (err) {
  console.error('Error writing translation file', err);
}
