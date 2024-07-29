import { Transition, TransitionGroup } from 'solid-transition-group';
import { Bookmarks } from 'wxt/browser';
import ListItem from './ListItem';

/** 书签 */
export default function BookmarkList(props: { list?: Bookmarks.BookmarkTreeNode[] }) {
  return (
    <div
      class="bg-bluegray-3/68 dark:bg-bluegray-8/68 backdrop-blur-sm rd-xl shadow-xl flex flex-col overflow-x-hidden overflow-y-auto scrollbar-none h-max max-h-[--lh] w-2.5/10 mr-8 listBox"
      classList={{ active: !!props.list?.length }}>
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
  );
}
