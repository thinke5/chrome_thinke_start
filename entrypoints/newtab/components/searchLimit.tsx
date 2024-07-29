import { Portal } from 'solid-js/web';
import { Dialog, TagsInput, Switch } from '@ark-ui/solid';
import { data, setData } from '../App';
import { localStorageKey } from '@/config';

/** 搜索限制 */
export default function SearchLimit() {
  const lStr = localStorage.getItem(localStorageKey.limitkeys);
  const [limitKeyMap, setLimitKeyMap] = createStore<{ [str: string]: boolean }>(lStr ? JSON.parse(lStr) : {});
  const keyList = () => Object.keys(limitKeyMap);
  createEffect(() => {
    localStorage.setItem(localStorageKey.limitkeys, JSON.stringify(limitKeyMap));
    const k = Object.entries(limitKeyMap)
      .filter((v) => v[1])
      .map((v) => v[0]);
    setData('limitKeys', k);
  });
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger class="h-[--size] w-12 f-c/c dark:bg-bluegray-7 pr-2 cursor-pointer opacity-20 hover:opacity-100 transition b-none">
          <i class="i-tabler-eye-off text-blue text-2xl s-6 block" />
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop class="w-dvw h-dvh fixed top-0 left-0 backdrop-blur-md bg-light/20 dark:bg-dark-7/30" />
          <Dialog.Positioner class="w-dvw h-dvh fixed top-0 left-0 f-c/c">
            <Dialog.Content class="bg-white dark:bg-dark px-4 py-6 rd-xl">
              <TagsInput.Root
                value={keyList()}
                editable={false}
                onValueChange={({ value }) => {
                  // 删除
                  keyList().forEach((key) => {
                    if (!value.includes(key)) {
                      setLimitKeyMap(key, undefined as any);
                    }
                  });
                  // 新增
                  value.forEach((key) => {
                    const old = limitKeyMap[key];
                    if (typeof old === 'undefined') {
                      setLimitKeyMap(key, true);
                    }
                  });
                }}>
                <TagsInput.Context>
                  {(api) => (
                    <>
                      <TagsInput.Label class="text-sm text-dark dark:text-red-5/80">
                        搜索时需要排除的结果，可以过滤某些不想看的网站
                      </TagsInput.Label>
                      <TagsInput.Control class="py-2 pt-6 flex flex-wrap gap-2 max-w-100 overflow-hidden">
                        <Index each={api().value}>
                          {(value, index) => (
                            <TagsInput.Item index={index} value={value()}>
                              <TagsInput.ItemPreview class="b-1 b-solid b-orange rd bg-orange/7 px-2 py-1 f-c/c gap-1">
                                <Switch.Root
                                  class="f-c/s"
                                  checked={limitKeyMap[value()]}
                                  onChange={(e: any) => {
                                    setLimitKeyMap(value(), e.target.checked);
                                  }}>
                                  <Switch.Control class="w-6 h-3 bg-gray-2 dark:bg-dark-1 block rd-3 flex items-center  px-.5 data-[state=checked]:bg-orange data-[state=checked]:justify-end">
                                    <Switch.Thumb class="block s-2 rd-full bg-orange data-[state=checked]:bg-white" />
                                  </Switch.Control>
                                  <Switch.Label class="ml-1 pb-.5">
                                    <TagsInput.ItemText class="text-sm text-orange leading-none">
                                      {value()}
                                    </TagsInput.ItemText>
                                  </Switch.Label>
                                  <Switch.HiddenInput />
                                </Switch.Root>

                                <TagsInput.ItemDeleteTrigger class="b-none bg-transparent p-0 cursor-pointers">
                                  <i class="block h-4 i-tabler-trash text-pink-6"></i>
                                </TagsInput.ItemDeleteTrigger>
                              </TagsInput.ItemPreview>
                              <TagsInput.ItemInput />
                            </TagsInput.Item>
                          )}
                        </Index>
                        <TagsInput.Input
                          class="b-none rd bg-gray-3 dark:bg-gray-6 px-2 py-1 outline-none text-orange-6 dark:text-orange w-32 "
                          placeholder="输入关键字"
                        />
                        {/* <TagsInput.ClearTrigger>Clear All</TagsInput.ClearTrigger> */}
                      </TagsInput.Control>
                    </>
                  )}
                </TagsInput.Context>
                <TagsInput.HiddenInput />
              </TagsInput.Root>
              {/* <Dialog.CloseTrigger>Close</Dialog.CloseTrigger> */}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
