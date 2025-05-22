import React, { useMemo, useRef } from 'react';
import { Button } from 'MuiBarrel';
import { MacroParser } from 'Util';
import MacroTextArea from './MacroTextArea';
import MacroTabs from './MacroTabs';
import styles from './MacroTrans.module.css';

const MacroTrans = ({ en, jp, fr, de }) => {
  const inputRef = useRef(null);
  const parser = useMemo(
    () => new MacroParser({ en, jp, fr, de }),
    [en, jp, fr, de],
  );
  const [outputMacros, setOutputMacros] = React.useState('');

  const handleTranslate = async () => {
    const inputMacro = inputRef.current.value;
    setOutputMacros(await parser.parse(inputMacro));
  };

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
