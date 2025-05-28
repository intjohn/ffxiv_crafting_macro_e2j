import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MacroTrans from '../MacroTrans';
import type { TranslatedMacro } from '../../types/common';

const checkTranslatedMacros = async (expected: TranslatedMacro) => {
  const { en, jp, fr, de } = expected;
  const pairs = [
    ['EN', en],
    ['JP', jp],
    ['FR', fr],
    ['DE', de],
  ];

  for (const [tabName, macro] of pairs) {
    if (!macro) continue;

    const tab = screen.getByRole('tab', { name: tabName });
    await userEvent.click(tab);

    await waitFor(() => {
      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveTextContent(macro, { normalizeWhitespace: false });
    });
  }
};

describe('MacroTrans', () => {
  const mockTranslations = {
    en: ['Careful Synthesis', 'Basic Touch'],
    jp: ['模範作業', '加工'],
    fr: ['Synthèse prudente', 'Toucher simple'],
    de: ['Vorsichtige Synthese', 'Basale Verarbeitung'],
  };

  it('renders the input field and translate button', () => {
    render(<MacroTrans {...mockTranslations} />);

    const inputField = screen.getByRole('textbox', { name: 'Source Macro' });
    const translateButton = screen.getByRole('button', { name: 'Translate' });

    expect(inputField).toBeInTheDocument();
    expect(translateButton).toBeEnabled();
  });

  it('translates macro text when clicking translate button', async () => {
    const mockMacro = '/ac "Careful Synthesis"';
    const expected = {
      en: mockMacro,
      jp: '/ac 模範作業',
      fr: '/ac "Synthèse prudente"',
      de: '/ac "Vorsichtige Synthese"',
    };

    const user = userEvent.setup();
    render(<MacroTrans {...mockTranslations} />);

    const input = screen.getByRole('textbox', { name: 'Source Macro' });
    await user.type(input, mockMacro);

    const translateButton = screen.getByRole('button', { name: 'Translate' });
    await user.click(translateButton);

    await checkTranslatedMacros(expected);
  });

  it('handles empty input gracefully', async () => {
    const mockMacro = '';
    const expected = {
      en: mockMacro,
      jp: mockMacro,
      fr: mockMacro,
      de: mockMacro,
    };

    const user = userEvent.setup();
    render(<MacroTrans {...mockTranslations} />);

    const translateButton = screen.getByRole('button', { name: 'Translate' });
    await user.click(translateButton);

    await checkTranslatedMacros(expected);
  });

  it('preserves non-action lines in translations', async () => {
    const mockMacro = '/echo "Starting craft"\n/ac "Careful Synthesis"';
    const expected = {
      en: mockMacro,
      jp: '/echo "Starting craft"\n/ac 模範作業',
      fr: '/echo "Starting craft"\n/ac "Synthèse prudente"',
      de: '/echo "Starting craft"\n/ac "Vorsichtige Synthese"',
    };

    const user = userEvent.setup();
    render(<MacroTrans {...mockTranslations} />);

    const input = screen.getByRole('textbox', { name: 'Source Macro' });
    const echoLine = '/echo "Starting craft"';
    const actionLine = '/ac "Careful Synthesis"';
    await user.type(input, `${echoLine}\n${actionLine}`);

    const translateButton = screen.getByRole('button', { name: 'Translate' });
    await user.click(translateButton);

    await checkTranslatedMacros(expected);
  });

  it('maintains proper formatting in translations', async () => {
    const mockMacro = '/ac "Careful Synthesis" <wait.3>';
    const expected = {
      en: mockMacro,
      jp: '/ac 模範作業 <wait.3>',
      fr: '/ac "Synthèse prudente" <wait.3>',
      de: '/ac "Vorsichtige Synthese" <wait.3>',
    };

    const user = userEvent.setup();
    render(<MacroTrans {...mockTranslations} />);

    const input = screen.getByRole('textbox', { name: 'Source Macro' });
    await user.type(input, '/ac "Careful Synthesis" <wait.3>');

    const translateButton = screen.getByRole('button', { name: 'Translate' });
    await user.click(translateButton);

    await checkTranslatedMacros(expected);
  });
});
