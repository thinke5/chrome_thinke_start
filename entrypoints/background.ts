import requestMap from '@/request';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if ((requestMap as any)[message.method]) {
      (requestMap as any)[message.method](message.param, sendResponse);
    }
    return true;
  });
});
