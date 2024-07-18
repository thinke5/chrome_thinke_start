import wmlPreset from '@thinke/unocss-wml-preset';
import { defineConfig, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,tsx,ts}'],
  },
  presets: [
    presetIcons({}),
    presetUno({
      dark: 'media',
    }), // base
    wmlPreset({
      autoRem: false,
    }), // 预设 & 移动rem兼容 && pc适配
  ],
});
