import React from 'react';
import { createRoot } from 'react-dom/client';
import { getTranslations } from 'Util';
import { Container, Paper } from 'MuiBarrel';
import { MacroTrans, Header } from './component';

const macroTransRoot = createRoot(document.body);
macroTransRoot.render(
  <React.StrictMode>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Header />
        <MacroTrans {...getTranslations()} />
      </Paper>
    </Container>
  </React.StrictMode>
);
