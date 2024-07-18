export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*.bing.com/*', '*://*.baidu.com/*'],
  main() {},
});
