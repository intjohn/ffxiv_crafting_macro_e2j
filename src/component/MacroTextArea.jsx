import { TextField, styled } from 'MuiBarrel';

const MacroTextArea = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    fontFamily: 'monospace',
    fontSize: '.8rem',
    lineHeight: '1.05rem',
  }
}));

export default MacroTextArea;
