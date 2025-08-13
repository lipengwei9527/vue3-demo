/**
 * @name 节流
 * @param {Function} callback 要执行的回调函数
 * @param {Number} delay 延迟时间
 * @param {Boolean} isImmediate 是否立即执行回调函数
 * @returns {Function}
 */
type Func = (...args: any[]) => void;

export function throttle<T extends Func>(
  callback: T,
  delay: number = 1000,
  isImmediate: boolean = false
) {
  let timer: number | undefined = undefined;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) return;
    if (!isImmediate) return callback.apply(this, args);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = undefined;
      if (isImmediate) callback.apply(this, args);
    }, delay);
  } as T;
}
/**
 * @name 防抖
 * @description 只有最后一次触发才执行
 * @param {Function}callback  要执行的回调函数
 * @param {Number}interval 触发间隔
 * @returns
 */
export function debounce<T extends Func>(
  callback: T,
  interval: number = 1000
): T {
  let timer: number | undefined = undefined;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, interval);
  } as T;
}
type FieldType =
  | "number"
  | "string"
  | "undefined"
  | "null"
  | "object"
  | "array"
  | "function"
  | "date"
  | "regexp"
  | "bigint"
  | "symbol";
/**
 * @name 变量类型
 * @description: 检测变量的类型
 * @param {any} field  要检测的类型
 * @return {FieldType}
 */
export function varType(field: any): FieldType {
  return Object.prototype.toString
    .call(field)
    .slice(8, -1)
    .toLowerCase() as FieldType;
}
export function setCache(key: string, value: any) {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(key, JSON.stringify(value));
  });
}
export function getCache(key: string) {
  const cache = localStorage.getItem(key);
  if (cache) {
    return JSON.parse(cache);
  }
  return null;
}
