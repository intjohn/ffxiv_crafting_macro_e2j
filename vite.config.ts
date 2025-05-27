import path from 'path';

export default {
  base: '/ffxiv_crafting_macro_e2j/',
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'assets'),
      MuiBarrel: path.resolve(__dirname, 'src/muiBarrel'),
      Util: path.resolve(__dirname, 'src/util'),
    },
  },
};
