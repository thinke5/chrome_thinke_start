import requestMap from '@/request';

export const bgAjax = <T = any>(method: keyof typeof requestMap, param: any) =>
  new Promise<T>(async (resolve, reject) => {
    const res = await browser.runtime.sendMessage({ method, param });
    // console.log('%c [ res ]-7', 'font-size:13px; background:#79a455; color:#bde899;', res);
    if (res.code === 0) {
      resolve(res.data);
    } else {
      reject();
    }
  });
