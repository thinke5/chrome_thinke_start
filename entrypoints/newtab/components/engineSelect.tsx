import { Select } from '@ark-ui/solid';
import { Index, Portal } from 'solid-js/web';
import { data, setData, engine } from '../App';
import { IEngines, searchEngineMap } from '../searchEngineMap';
import { localStorageKey } from '@/config';

/** 选择引擎 会记忆，没有手动选择时 会从 谷歌->bing ->baidu 的顺序选择 */
export default function EngineSelect() {
  const items = Object.keys(searchEngineMap) as IEngines[];
  function setEngine(v: IEngines) {
    setData('curEngine', v);
  }
  createEffect(() => {
    localStorage.setItem(localStorageKey.engine, data.curEngine);
  });
  onMount(() => {
    autoChange();
  });
  return (
    <Select.Root
      class="s-full bg-blueGray-3 dark:bg-blueGray-6 f-c/c "
      items={items}
      value={[data.curEngine]}
      onValueChange={(v) => setEngine(v.value[0] as any)}>
      <Select.Control>
        <Select.Trigger class="b-none bg-transparent text-lightblue-8 dark:text-bluegray cursor-pointer">
          <i class={`${engine().icon} text-3xl ml-2`}>{data.curEngine}</i>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup class="bg-light/60 dark:bg-dark/50 backdrop-blur-sm shadow-lg rd-md mt-2 overflow-hidden">
              <Index each={items}>
                {(item) => (
                  <Select.Item
                    item={item()}
                    class="flex text-xl px-4 py-2 hover:bg-light/40 dark:hover:bg-dark/60 text-bluegray-7 dark:text-gray">
                    <Select.ItemText>
                      <i class={`${searchEngineMap[item()].icon}`}>{data.curEngine}</i>
                    </Select.ItemText>
                    <Select.ItemIndicator class="text-lightblue-8 dark:text-bluegray">✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  );
}

function autoChange() {
  if (data.curEngine === 'google' || data.curEngine === 'bing') {
    return;
  }
  // 自动切换 谷歌
  fetch('https://www.google.com/search', { mode: 'no-cors' })
    .then(() => setData('curEngine', 'google'))
    .catch(() => {
      // 自动切换 bing
      fetch('https://www.bing.com/search', { mode: 'no-cors' })
        .then(() => setData('curEngine', 'bing'))
        .catch(() => {});
    });
}
