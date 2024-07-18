import { createSignal } from 'solid-js';
import dayjs from 'dayjs';

const key = 'bingImg';
const timeKey = 'bingImg_time';
const url = 'https://tenapi.cn/v2/bing';
export function bingImg() {
  const l_img = localStorage.getItem(key);
  const [img, setImg] = createSignal(l_img || url);
  setTimeout(async () => {
    const res = await fetch(url + '?format=json', { method: 'POST' });
    const data = await res.json();
    const oldTime = localStorage.getItem(timeKey);
    if (!oldTime || oldTime !== data.data.date) {
      if (data.code === 200) {
        const img = await fetch(data.data.url);
        const base64 = await blobToBase64(await img.blob());
        setImg(base64);
        localStorage.setItem(key, base64);
        localStorage.setItem(timeKey, data.data.date);
      }
    }
  }, 1);
  return img;
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
