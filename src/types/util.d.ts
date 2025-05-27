declare module 'Util' {
  import type { Translations, TranslatedMacro } from './common';

  export class MacroParser {
    constructor(translations: Translations);
    parse(inputMacro: string): Promise<TranslatedMacro>;
  }

  export function getTranslations(): Translations;
}
