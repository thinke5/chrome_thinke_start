export const searchEngineMap = {
  bing: {
    name: 'Bing',
    icon: 'i-tabler-brand-bing',
    search(text: string, limit?: string[]) {
      window.open(`https://www.bing.com/search?q=${encodeURIComponent(text)} ${getLimitStr(limit)}`, '_top');
    },
  },
  google: {
    name: '谷歌',
    icon: 'i-tabler-brand-google',
    search(text: string, limit?: string[]) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(text)} ${getLimitStr(limit)}`, '_top');
    },
  },
  baidu: {
    name: '百度',
    icon: 'i-tabler-brand-baidu',
    search(text: string, limit?: string[]) {
      window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(text)} ${getLimitStr(limit)}`, '_top');
    },
  },
};
export type IEngines = keyof typeof searchEngineMap;

function getLimitStr(limit?: string[]) {
  return limit?.map((v) => `-${encodeURIComponent(v)}`).join(' ') || '';
}
