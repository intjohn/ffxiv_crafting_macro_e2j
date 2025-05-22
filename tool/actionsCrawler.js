import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import jsdom from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getUrl = locale => 
  `https://${locale}.finalfantasyxiv.com/crafting_gathering_guide/carpenter/`;

const locales = ['na', 'jp', 'fr', 'de'];

const translations = {};

await Promise.all(
  locales.map(async locale => {
    const resp = await fetch(getUrl(locale));
    const text = await resp.text();
    const doc = new jsdom.JSDOM(text).window.document;
    translations[locale] = [...doc
      .querySelectorAll('.guide-table')[0]
      .querySelectorAll('tbody tr strong')
    ]
      .map(el => {
        const text = el.innerHTML;
        const rubyStart = text.indexOf('<ruby>');
        if (rubyStart !== -1) {
          const midKanji = text.match(/(?<=ruby>)(.*?)(?=<)/g).join('');
          const rubyEnd = text.lastIndexOf('</ruby>');
          return `${text.slice(0, rubyStart)}${midKanji}${text.slice(rubyEnd + 7)}`;
        }
        return text;
      });
  })
);

try {
  fs.writeFileSync(
    path.resolve(__dirname, '../assets/crafterActions.json'),
    JSON.stringify(translations, null, 2),
    'utf-8'
  );
} catch (err) {
  console.error('Error writing translation file', err);
}
