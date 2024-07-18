import UnoCSS from 'unocss/postcss';

export default {
  content: ['assets/**', 'entrypoints/**', 'components/**'],
  plugins: [UnoCSS()],
};
