import type { Translations, TranslatedMacro } from '../types/common';

type ParsedLine = string | [string, number, string?];

const actionParser = new RegExp(
  /(\/(?:ac|action)\s+)(.*(?=(\s+<[a-z.1-9]+>))|.*(?!>))/,
);

class MacroParser {
  #en: string[];
  #jp: string[];
  #fr: string[];
  #de: string[];
  #dict: Map<string, number> = new Map();

  constructor(translations: Translations) {
    const { en, jp, fr, de } = translations;
    this.#en = en;
    this.#jp = jp;
    this.#fr = fr;
    this.#de = de;

    [en, jp, fr, de].filter(Boolean).forEach((actions) => {
      actions.forEach((action, index) => {
        this.#dict.set(action, index);
      });
    });
  }

  #composeLine(line: ParsedLine, translation: string[]): string {
    if (typeof line === 'string') {
      return line;
    }
    const translated = translation[line[1]];
    const quoted =
      translated.indexOf(' ') !== -1 ? `"${translated}"` : translated;
    return `${line[0]}${quoted}${line[2] || ''}`;
  }

  async parse(inputMacro: string): Promise<TranslatedMacro> {
    const lines: ParsedLine[] = inputMacro.split('\n').map((line) => {
      line = line.trim();
      const parseResult = actionParser.exec(line);
      if (parseResult) {
        const [_match, head, action, tail] = parseResult;
        const actionNoQuotes = action.replace(/['"]/g, '');
        if (this.#dict.has(actionNoQuotes)) {
          return [head, this.#dict.get(actionNoQuotes)!, tail] as [
            string,
            number,
            string?,
          ];
        }
      }
      return line;
    });

    return {
      en:
        this.#en &&
        lines.map((line) => this.#composeLine(line, this.#en)).join('\n'),
      jp:
        this.#jp &&
        lines.map((line) => this.#composeLine(line, this.#jp)).join('\n'),
      fr:
        this.#fr &&
        lines.map((line) => this.#composeLine(line, this.#fr)).join('\n'),
      de:
        this.#de &&
        lines.map((line) => this.#composeLine(line, this.#de)).join('\n'),
    };
  }
}

export default MacroParser;
