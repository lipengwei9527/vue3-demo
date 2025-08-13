import { computed, WritableComputedRef } from "vue";
import { varType } from "@/utils/general";
export function useVModel<
  T extends object,
  K extends string & keyof T,
  Name extends `update:${K}`
>(
  prop: T,
  propName: K,

  emits: (event: Name, ...args: any[]) => void
) {
  const event = `update:${propName}` as Name;
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      // 如果属性值是对象就再代理该属性值，并返回
      // 否则就是基本属性，触发事件
      if (varType(target[key as keyof typeof target]) == "object") {
        return new Proxy(prop[propName] as object, {
          set(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            console.log(`output->value`, res);
            if (varType(target[key as keyof typeof target])) {
              return new Proxy(target[key as keyof typeof target], handler);
            }
            return res;
          },
        });
      } else {
        emits(event, target);
      }
      // console.log(
      //   `output->外层get--------------------------ket:${key}---------------------------------`,
      //   "target",
      //   target,
      //   "key",
      //   key,
      //   "receiver",
      //   receiver,
      //   "res",
      //   res
      // );
      return res;
    },
    set(target, key, value, receiver) {
      target[key as keyof typeof target] = value;
      emits(event, target);
      return Reflect.set(target, key, value, receiver);
    },
  };
  return computed({
    get() {
      console.log(`computed output get->value`);
      return new Proxy(prop[propName] as object, handler);
    },
    set(value) {
      console.log(`computed output set->value`);
      emits(event, value);
      return true;
    },
  }) as WritableComputedRef<T[K], T[K]>;
}
