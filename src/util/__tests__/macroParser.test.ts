import { describe, it, expect } from 'vitest';
import MacroParser from '../macroParser';
import type { Translations } from '../../types/common';

describe('MacroParser', () => {
  const mockTranslations: Translations = {
    en: ['Careful Synthesis', 'Basic Touch', "Master's Mend"],
    jp: ['模範作業', '加工', 'マスターズメンド'],
    fr: ['Synthèse prudente', 'Toucher simple', 'Réparation de maître'],
    de: ['Vorsichtige Synthese', 'Basale Verarbeitung', 'Meisterreparatur'],
  };

  it('should correctly initialize with translations', () => {
    const parser = new MacroParser(mockTranslations);
    expect(parser).toBeInstanceOf(MacroParser);
  });

  it('should translate a simple macro from English to other languages', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro = '/ac "Careful Synthesis"\n/ac "Basic Touch"';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: '/ac "Careful Synthesis"\n/ac "Basic Touch"',
      jp: '/ac 模範作業\n/ac 加工',
      fr: '/ac "Synthèse prudente"\n/ac "Toucher simple"',
      de: '/ac "Vorsichtige Synthese"\n/ac "Basale Verarbeitung"',
    });
  });

  it('should translate a simple macro from Japanese to other languages', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro = '/ac 模範作業\n/ac 加工';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: '/ac "Careful Synthesis"\n/ac "Basic Touch"',
      jp: '/ac 模範作業\n/ac 加工',
      fr: '/ac "Synthèse prudente"\n/ac "Toucher simple"',
      de: '/ac "Vorsichtige Synthese"\n/ac "Basale Verarbeitung"',
    });
  });

  it('should translate a simple macro from French to other languages', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro = '/ac "Synthèse prudente"\n/ac "Toucher simple"';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: '/ac "Careful Synthesis"\n/ac "Basic Touch"',
      jp: '/ac 模範作業\n/ac 加工',
      fr: '/ac "Synthèse prudente"\n/ac "Toucher simple"',
      de: '/ac "Vorsichtige Synthese"\n/ac "Basale Verarbeitung"',
    });
  });

  it('should translate a simple macro from German to other languages', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro = '/ac "Vorsichtige Synthese"\n/ac "Basale Verarbeitung"';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: '/ac "Careful Synthesis"\n/ac "Basic Touch"',
      jp: '/ac 模範作業\n/ac 加工',
      fr: '/ac "Synthèse prudente"\n/ac "Toucher simple"',
      de: '/ac "Vorsichtige Synthese"\n/ac "Basale Verarbeitung"',
    });
  });

  it('should recognize both /ac and /action', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro = '/ac "Careful Synthesis"\n/action "Basic Touch"';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: '/ac "Careful Synthesis"\n/action "Basic Touch"',
      jp: '/ac 模範作業\n/action 加工',
      fr: '/ac "Synthèse prudente"\n/action "Toucher simple"',
      de: '/ac "Vorsichtige Synthese"\n/action "Basale Verarbeitung"',
    });
  });

  it('should handle macros with wait commands and other non-action lines', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro = '/ac "Careful Synthesis"\n/wait 3\n/ac "Basic Touch"';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: '/ac "Careful Synthesis"\n/wait 3\n/ac "Basic Touch"',
      jp: '/ac 模範作業\n/wait 3\n/ac 加工',
      fr: '/ac "Synthèse prudente"\n/wait 3\n/ac "Toucher simple"',
      de: '/ac "Vorsichtige Synthese"\n/wait 3\n/ac "Basale Verarbeitung"',
    });
  });

  it('should handle actions with modifiers', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro =
      '/ac "Careful Synthesis" <wait.3>\n/ac "Basic Touch" <wait.2>';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: '/ac "Careful Synthesis" <wait.3>\n/ac "Basic Touch" <wait.2>',
      jp: '/ac 模範作業 <wait.3>\n/ac 加工 <wait.2>',
      fr: '/ac "Synthèse prudente" <wait.3>\n/ac "Toucher simple" <wait.2>',
      de: '/ac "Vorsichtige Synthese" <wait.3>\n/ac "Basale Verarbeitung" <wait.2>',
    });
  });

  it('should handle unknown actions by leaving them unchanged', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro = '/ac "Unknown Action"\n/ac "Careful Synthesis"';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: '/ac "Unknown Action"\n/ac "Careful Synthesis"',
      jp: '/ac "Unknown Action"\n/ac 模範作業',
      fr: '/ac "Unknown Action"\n/ac "Synthèse prudente"',
      de: '/ac "Unknown Action"\n/ac "Vorsichtige Synthese"',
    });
  });

  it('should trim two-ends spacing and keep garbages', async () => {
    const parser = new MacroParser(mockTranslations);
    const inputMacro =
      '  this is   \t even NOT a  \t\n validmacro \n/ac \t "Careful Synthesis"';

    const result = await parser.parse(inputMacro);

    expect(result).toMatchObject({
      en: 'this is   \t even NOT a\nvalidmacro\n/ac \t "Careful Synthesis"',
      jp: 'this is   \t even NOT a\nvalidmacro\n/ac \t 模範作業',
      fr: 'this is   \t even NOT a\nvalidmacro\n/ac \t "Synthèse prudente"',
      de: 'this is   \t even NOT a\nvalidmacro\n/ac \t "Vorsichtige Synthese"',
    });
  });
});
