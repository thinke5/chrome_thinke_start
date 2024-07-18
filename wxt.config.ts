import { defineConfig } from 'wxt';
import unocss from 'unocss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
 

  outDir: 'dist',
  modules: ['@wxt-dev/module-solid'],
  manifest: {
    permissions: ['bookmarks'],
    host_permissions: ['*://*.google.com/*', '*://*.bing.com/*', '*://*.baidu.com/*'],
    icons: {
      16: 'icon/16.webp',
      32: 'icon/32.webp',
      48: 'icon/48.webp',
      96: 'icon/96.webp',
      128: 'icon/128.webp',
    },
  },
   
});
