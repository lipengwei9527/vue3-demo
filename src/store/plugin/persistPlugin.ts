/**
 * @description: 界面刷新前将state中的数据保存在localStorage中，刷新后从localStorage中恢复数据
 */

import { PiniaPluginContext } from "pinia";
const prefixKey = "piniaStore";
export default function persistPlugin(context: PiniaPluginContext) {
  const { store } = context;
  const storageKey = `${prefixKey}:${store.$id}`;
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(storageKey, JSON.stringify(store.$state));
  });
  const persistedState = localStorage.getItem(storageKey);
  if (persistedState) {
    store.$state = JSON.parse(persistedState);
    // localStorage.removeItem(storageKey);
  }
}
