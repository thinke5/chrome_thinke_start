import { load } from 'cheerio';

const engineSuggestionMap = {
  bing: {
    url: 'https://www.bing.com/AS/Suggestions?pt=page.serp&mkt=zh-cn&cvid=0&qry=',
    func: (txt: string) => {
      const htmlDoc = load(txt, {}, false);
      const lis = htmlDoc('ul#sa_ul').find('li.sa_sg');

      return lis.toArray().map((li) => li.attribs.query);
    },
  },
  google: {
    url: 'https://www.google.com/complete/search?client=psy-ab&hl=zh-CN&q=',
    func: (txt: string) => {
      const data = JSON.parse(txt);
      const arr = data[1];
      return arr.map((v: any[]) => v[0]);
    },
  },
  baidu: {
    url: 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=',
    func: (txt: string) => {
      const data = JSON.parse(txt);
      const arr = data.g;
      return arr.map((v: any) => v.q);
    },
  },
};

export async function suggestionList(param: { engine: string; query: string }, callback: (res: any) => void) {
  if (!param.query) {
    return callback({ code: 0, data: [] });
  }
  const target = engineSuggestionMap[param.engine as 'bing'];

  fetch(`${target.url}${encodeURIComponent(param.query)}`)
    .then((res) => res.text())
    .then((txt) => target.func(txt))
    .then((res) => callback({ code: 0, data: res }))
    .catch((err) => {
      console.log(err);
      callback({ code: 500 });
    });
}
