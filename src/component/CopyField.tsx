import React, { useState, useEffect, useCallback } from 'react';
import { InputAdornment, IconButton, Done, ContentCopy } from 'MuiBarrel';
import MacroTextArea from './MacroTextArea';

interface CopyFieldProps {
  content?: string;
  [key: string]: any;
}

const CopyField: React.FC<CopyFieldProps> = ({ content, ...rest }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      });
    }
  }, [content]);

  useEffect(() => setCopied(false), [content]);

  return (
    <MacroTextArea
      label="Translated Macro"
      variant="outlined"
      value={content}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                size="small"
                onClick={handleCopy}
                disabled={!content}
              >
                {copied ? (
                  <Done fontSize="small" />
                ) : (
                  <ContentCopy fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        },
        inputLabel: { shrink: true },
      }}
      fullWidth
      multiline
      rows={15}
      sx={{
        '& .MuiInputBase-root': {
          alignItems: 'baseline',
        },
      }}
      {...rest}
    />
  );
};

export default CopyField;
