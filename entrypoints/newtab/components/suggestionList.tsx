import { Transition, TransitionGroup } from 'solid-transition-group';
import { engine, startSearch } from '../App';
import ListItem from './ListItem';

/** 建议列表 */
export default function SuggestionList(props: { list?: string[] }) {
  return (
    <div
      class="bg-bluegray-3/68 dark:bg-bluegray-8/68 backdrop-blur-sm rd-xl shadow-xl flex flex-col overflow-hidden h-max max-h-[--lh] w-5/10 listBox"
      classList={{ active: !!props.list?.length }}>
      <TransitionGroup name="group-item">
        <For each={props.list}>
          {(item, i) => (
            <ListItem idy={i()} idx={1} onClick={() => startSearch(item)}>
              <span class="text-base text-oneline text-ellipsis overflow-hidden block w-full">{item}</span>
            </ListItem>
          )}
        </For>
      </TransitionGroup>
    </div>
  );
}

//#region 文本高亮
/** 文本高亮   */
export function TextHightlight(props: { children: string; query: string }) {
  let $el: HTMLSpanElement;
  // createEffect(() => {
  //   const arr = props.children.split(props.query);
  //   console.log('%c [ arr ]-31', 'font-size:13px; background:#3db53a; color:#81f97e;', arr);
  // });
  return (
    <span ref={$el!} class="[&::highlight]:text-red">
      {props.children}
    </span>
  );
}
//#endregion
