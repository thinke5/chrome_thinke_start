import { Transition, TransitionGroup } from 'solid-transition-group';
import { Bookmarks } from 'wxt/browser';
import ListItem from './ListItem';

/** 书签 */
export default function BookmarkList(props: { list?: Bookmarks.BookmarkTreeNode[] }) {
  return (
    <Transition name="slide-fade">
      <Show when={props.list?.length} fallback={<div />}>
        <div class="bg-bluegray-3/68 dark:bg-bluegray-8/68 backdrop-blur-sm rd-xl shadow-xl flex flex-col overflow-x-hidden overflow-y-auto scrollbar-none h-max max-h-[--lh] flex-[0_1_50%] mr-8">
          <TransitionGroup name="group-item">
            <For each={props.list}>
              {(item, i) => (
                <ListItem idy={i()} idx={0} onClick={() => window.open(item.url, '_top')}>
                  <span class="text-sm text-oneline text-ellipsis overflow-hidden block w-full">{item.title}</span>
                  <span class="text-xs text-oneline text-ellipsis overflow-hidden block w-4/5 text-blueGray-6">
                    {item.url}
                  </span>
                </ListItem>
              )}
            </For>
          </TransitionGroup>
        </div>
      </Show>
    </Transition>
  );
}
