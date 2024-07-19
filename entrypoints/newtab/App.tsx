import { localStorageKey } from '@/config';
import { bgAjax } from '@/utils/ajax';
import { bingImg } from '@/utils/bingImg';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { onClickOutside } from 'solidjs-use';
import { Bookmarks, History } from 'wxt/browser';
import './App.less';
import BookmarkList from './components/bookmarkList';
import EngineSelect from './components/engineSelect';
import SuggestionList from './components/suggestionList';
import { IEngines, searchEngineMap } from './searchEngineMap';
import SearchLimit from './components/searchLimit';
import HistoryList from './components/historyList';

type ICtxData = {
  curEngine: IEngines;
  x: number;
  y: number;
  limitKeys: string[];
};

export const [data, setData] = createStore<ICtxData>({
  curEngine: (localStorage.getItem(localStorageKey.engine) as any) ?? 'bing',
  x: 1,
  y: -1,
  limitKeys: [],
});
export const engine = () => searchEngineMap[data.curEngine];

/** 开始搜索 */
export function startSearch(text: string) {
  if (text) {
    engine().search(text, data.limitKeys);
  }
}

function App() {
  let $input: HTMLInputElement;
  const bingImgUrl = bingImg();
  const [isFocus, setIsFocus] = createSignal(false);
  const [searchText, setSearchText] = createSignal('');
  const engine = () => searchEngineMap[data.curEngine];

  const [suggestionList] = createResource(searchText, (query: string) =>
    bgAjax<string[]>('suggestionList', { engine: data.curEngine, query })
  );

  const [bookmarkList] = createResource(searchText, (query: string) =>
    bgAjax<Bookmarks.BookmarkTreeNode[]>('bookmarkSearch', query).then((arr) =>
      arr
        .filter((v) => v.url)
        .sort((a, b) => b.dateAdded! - a.dateAdded!)
        .slice(0, 30)
    )
  );

  const [historyList] = createResource(searchText, (query: string) =>
    bgAjax<History.HistoryItem[]>('historySearch', query)
  );

  const [$conent, set$Conent] = createSignal<HTMLDivElement>();
  let firstClick = true;
  onClickOutside($conent, () => {
    if (firstClick) {
      setIsFocus(true);
      $input?.focus();
      firstClick = false;
    } else {
      setIsFocus(false);
    }
  });

  const keyHandelMap = {
    ArrowDown() {
      const l = data.x === 0 ? bookmarkList()?.length : suggestionList()?.length;
      setData('y', Math.min(data.y + 1, l || -1));
    },
    ArrowUp() {
      setData('y', Math.max(-1, data.y - 1));
    },
    ArrowLeft() {
      if (data.y === -1) {
        return;
      }
      if (bookmarkList()?.length === -1) {
        setData('x', 1);
      } else {
        setData('x', Math.max(0, data.x - 1));
        setData('y', Math.min(bookmarkList()?.length || -1, data.y));
      }
    },
    ArrowRight() {
      if (data.y === -1) {
        return;
      }
      if (suggestionList()?.length === -1) {
        setData('x', 0);
      } else {
        setData('x', Math.min(2, data.x + 1));
        setData('y', Math.min(suggestionList()?.length || -1, data.y));
      }
    },
    Enter() {
      if (data.y === -1) {
        startSearch(searchText());
      } else {
        if (data.x === 0) {
          window.open(bookmarkList()![data.y].url, '_top');
        } else if (data.x === 2) {
          window.open(historyList()![data.y].url, '_top');
        } else {
          startSearch(suggestionList()![data.y]);
        }
      }
    },
  };
  function handelKeyDown(event: KeyboardEvent) {
    if (!event.isComposing) {
      const Fn = keyHandelMap[event.code as 'ArrowDown'];
      if (Fn) {
        Fn();
        if (data.y >= 0) {
          event.preventDefault();
        }
      }
    }
  }
  onMount(() => {
    document.addEventListener('keydown', handelKeyDown);
  });
  onCleanup(() => {
    document.removeEventListener('keydown', handelKeyDown);
  });
  return (
    <div
      class="bg-cover min-w-1000px"
      classList={{ pageFocus: isFocus() }}
      style={{ 'background-image': `url('${bingImgUrl()}')` }}>
      <main class="f-c/c h-dvh searchMain dark:bg-dark/33">
        <div
          class="f-c/c flex-col p-xl absolute top-42"
          ref={set$Conent}
          onClick={() => {
            setIsFocus(true);
            firstClick = false;
          }}>
          <div class="searchBox f-c/c">
            <div class="h-[--size] bg-light dark:bg-dark rd-full overflow-hidden f-c/s shadow-sm">
              <div class="s-[--size]">
                <EngineSelect />
              </div>
              <input
                ref={$input!}
                type="text"
                placeholder={`在 ${engine().name} 上搜索`}
                class="b-none outline-none bg-transparent h-full text-xl placeholder:text-sm px-4 min-w-500px w-50vw text-dark dark:text-gray-2"
                value={searchText()}
                onInput={(e) => {
                  setSearchText(e.target.value);
                  setData({ x: 1, y: -1 });
                }}
              />
              <SearchLimit />
            </div>
          </div>
          <div
            classList={{
              'h-12!': Boolean(bookmarkList()?.length || suggestionList()?.length || historyList()?.length),
            }}
            class="w-2 transition-height-200 h-0"></div>
          <div class="w-max @[--lh:160] max-h-[--lh] flex overflow-hidden">
            <BookmarkList list={bookmarkList()} />
            <SuggestionList list={suggestionList()} />
            <HistoryList list={historyList()} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
