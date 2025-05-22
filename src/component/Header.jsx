import React from 'react';
import { Typography, Box } from 'MuiBarrel';

const Header = () => {
  return (
    <Box component="header" sx={{ marginBottom: '1rem' }}>
      <Typography variant="h5">FFXIV Crafting Macro Translate</Typography>
      <Typography variant="caption">
        Translate crafting macros into your in-game language.
      </Typography>
    </Box>
  );
};

export default Header;
