import React, { useMemo, useRef, useCallback } from 'react';
import { Button } from 'MuiBarrel';
import { MacroParser } from 'Util';
import MacroTextArea from './MacroTextArea';
import MacroTabs from './MacroTabs';
import styles from './MacroTrans.module.css';
import type { Translations, TranslatedMacro } from '../types/common';

const MacroTrans: React.FC<Translations> = ({ en, jp, fr, de }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const parser = useMemo(
    () => new MacroParser({ en, jp, fr, de }),
    [en, jp, fr, de],
  );
  const [outputMacros, setOutputMacros] = React.useState<TranslatedMacro>({});

  const handleTranslate = useCallback(async () => {
    if (!inputRef.current) return;
    const inputMacro = inputRef.current.value;
    setOutputMacros(await parser.parse(inputMacro));
  }, [parser]);

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <MacroTextArea
          label="Source Macro"
          variant="outlined"
          inputRef={inputRef}
          placeholder="Enter the macro here..."
          slotProps={{
            inputLabel: { shrink: true },
          }}
          rows={15}
          multiline
          fullWidth
        />
      </div>
      <div className={styles.buttonRow}>
        <Button variant="contained" onClick={handleTranslate}>
          Translate
        </Button>
      </div>
      <MacroTabs {...outputMacros} />
    </div>
  );
};

export default MacroTrans;
