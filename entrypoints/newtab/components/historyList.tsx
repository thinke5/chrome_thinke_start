import { History } from 'wxt/browser';
import { Transition, TransitionGroup } from 'solid-transition-group';
import ListItem from './ListItem';

/** 历史列表 */
export default function HistoryList(props: { list?: History.HistoryItem[] }) {
  // createEffect(() => {
  //   console.log(props.list);
  // });
  return (
    <div
      class="bg-bluegray-3/68 dark:bg-bluegray-8/68 backdrop-blur-sm rd-xl shadow-xl flex flex-col overflow-x-hidden overflow-y-auto scrollbar-none h-max max-h-[--lh] w-100 ml-8 listBox"
      classList={{ active: !!props.list?.length }}>
      <TransitionGroup name="group-item">
        <For each={props.list}>
          {(item, i) => (
            <ListItem idy={i()} idx={2} onClick={() => window.open(item.url, '_top')}>
              <span class="text-sm text-oneline text-ellipsis overflow-hidden block w-full">{item.title || '?'}</span>
              <span class="text-xs text-oneline text-ellipsis overflow-hidden block w-4/5 text-blueGray-6">
                {item.url}
              </span>
            </ListItem>
          )}
        </For>
      </TransitionGroup>
    </div>
  );
}
