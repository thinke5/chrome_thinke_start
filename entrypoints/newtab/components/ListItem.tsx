import { JSXElement } from 'solid-js';
import { engine, data as pageData, setData } from '../App';

/** 列表项 */
export default function ListItem(props: { idx: number; idy: number; onClick?: () => void; children: JSXElement }) {
  let $div: HTMLDivElement;
  const isSelect = () => pageData.x === props.idx && pageData.y === props.idy;
  createEffect(() => {
    if (isSelect() && $div) {
      $div.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'nearest' });
    }
  });
  return (
    <div
      ref={$div!}
      class="px-6 py-4 text-dark dark:text-gray-2 b-b-1 b-solid b-0 dark:b-gray-7/60 b-gray/40 cursor-pointer"
      classList={{
        'bg-light/30 dark:bg-bluegray-6/60': isSelect(),
      }}
      onMouseOver={() => setData({ x: props.idx, y: props.idy })}
      onClick={props.onClick}>
      {props.children}
    </div>
  );
}
