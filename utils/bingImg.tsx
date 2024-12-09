import { createSignal } from 'solid-js';
// import dayjs from 'dayjs';

const key = 'bingBgImg';

// const url = 'https://tenapi.cn/v2/bing';

export function bingImg() {
  const lsData = localStorage.getItem(key);
  let defdata: any = {};
  try {
    if (lsData) {
      defdata = JSON.parse(lsData);
    }
  } catch (error) {}
  const [bgimgInfo, setBgimgInfo] = createSignal<{ img: string; time: string; desc: string }>(defdata);

  onMount(async () => {
    const data: {
      images: [
        {
          startdate: '20241208';
          fullstartdate: '202412081600';
          enddate: '20241209';
          url: '/th?id=OHR.GuanacosChile_ZH-CN7011761081_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp';
          urlbase: '/th?id=OHR.GuanacosChile_ZH-CN7011761081';
          copyright: '两只原驼,托雷斯德尔帕恩国家公园 , 智利 (© Floris van Breugel/NPL/Minden Pictures)';
          title: '态度和高度';
        }
      ];
      tooltips: {};
    } = await fetch(`https://bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN`).then((res) => res.json());
    const imgInfo = data.images[0];

    const oldTime = bgimgInfo().time; // 缓存中的时间
    const newTime = imgInfo.fullstartdate;
    // 如果缓存中的时间 和当前时间不一致，则更新图片
    if (imgInfo && oldTime !== newTime) {
      const img = await fetch(`https://bing.com${imgInfo.urlbase}_1920x1080.webp`);
      const base64 = await blobToBase64(await img.blob());
      // 保存&缓存
      setBgimgInfo({ img: base64, time: newTime, desc: imgInfo.copyright });
      localStorage.setItem(key, JSON.stringify(bgimgInfo()));
    }
  });

  return bgimgInfo;
}

const blobToBase64 = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise<string>((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result as any);
    };
  });
};
