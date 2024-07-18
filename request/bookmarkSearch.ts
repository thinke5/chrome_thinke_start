import { browser } from 'wxt/browser';
export async function bookmarkSearch(query: string, callback: (v: any) => void) {
  if (!query) {
    return callback({ code: 0, data: [] });
  }
  const data = await browser.bookmarks.search(query);
  return callback({ code: 0, data });
}
