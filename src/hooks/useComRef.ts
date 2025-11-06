import { ref } from "vue";
/**
* 创建一个引用类型的钩子函数，用于存储组件实例的引用。
*
* @param _comp 组件构造函数，必须是抽象类，用于指定组件类型。
* @returns 返回一个 Vue 的 ref 对象，该对象持有组件实例的引用。
*/
export function useCompRef<T extends abstract new (...args: any) => any>(
  _comp: T
) {
  return ref<InstanceType<T>>();
}
