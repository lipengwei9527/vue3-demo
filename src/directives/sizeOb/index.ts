/*
 * @Date: 2024-04-19
 * @Author: lipengwei
 * @LastEditors: lipengwei
 * @Description: 当绑定的元素尺寸发生变化时触发handler事件返回元素的宽和高(包括边框)
 */

import { DirectiveBinding } from "vue";

const map = new WeakMap<Element, Rect>();

// ResizeObserver:监听一个元素的尺寸变化
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target) as Rect;
    // console.log("尺寸发生变化", entry, handler);
    if (handler) {
      const { inlineSize, blockSize } = entry.borderBoxSize[0];
      handler({
        width: inlineSize, //元素的宽度(包括边框)
        height: blockSize, //元素的高度(包括边框)
      });
    }
  }
});
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<Rect>) {
    // 监事尺寸变化
    ob.observe(el);
    map.set(el, binding.value);
  },
  unmounted(el: HTMLElement) {
    // 取消监听
    ob.unobserve(el);
  },
};
