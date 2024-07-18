import dayjs from 'dayjs';
import { browser } from 'wxt/browser';
export async function historySearch(query: string, callback: (v: any) => void) {
  if (!query) {
    return callback({ code: 0, data: [] });
  }
  const data = await browser.history.search({
    text: query,
    maxResults: 30,
    startTime: dayjs().add(-14, 'day').valueOf(),
    endTime: dayjs().valueOf(),
  });
  return callback({ code: 0, data });
}
