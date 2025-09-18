/*
 * @Date: 2024-04-19
 * @Author: lipengwei
 * @LastEditors: lipengwei
 * @Description: 当绑定的元素尺寸发生变化时触发handler事件返回元素的宽和高
 */

import { DirectiveBinding } from "vue";
type RectFn = (rect: Rect) => void;
const map = new WeakMap<Element, RectFn>();

// ResizeObserver:监听一个元素的尺寸变化
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target) as RectFn;
    // console.log("尺寸发生变化", entry, handler);
    if (handler) {
      const { inlineSize: offsetWidth, blockSize: offsetHeight } =
        entry.borderBoxSize[0];
      const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
      const e = entry.target;
      const { clientWidth, clientHeight, scrollWidth, scrollHeight } = e;
      handler({
        offsetWidth,
        offsetHeight,
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
        width,
        height,
      });
    }
  }
});
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<RectFn>) {
    // 监事尺寸变化
    ob.observe(el);
    map.set(el, binding.value);
  },
  unmounted(el: HTMLElement) {
    // 取消监听
    ob.unobserve(el);
  },
};
