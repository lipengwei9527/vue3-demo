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

/**
 * @description 大驼峰、小驼峰转短横线命名法
 */
export function toKebabCase(str: string) {
  str = str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  console.log("命名", str);
  return str;
}

/**
 * @description 将小驼峰和短横线转为大驼峰
 * @param str
 * @returns
 */
export function toPascalCase(str: string) {
  return str
    .split("-")
    .map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}

/**
 * 将大驼峰（PascalCase）或短横线（kebab-case）转换为小驼峰（camelCase）
 * @param str 输入字符串（如 'UserName'、'user-name'、'Age'）
 * @returns 小驼峰格式字符串（如 'userName'、'userName'、'age'）
 */
export function toCamelCase(str: string): string {
  if (str.length === 0) return str;

  // 先处理短横线格式：分割后转换为首字母大写，再拼接
  const processed = str
    .split("-")
    .map((part) => {
      // 空字符串部分直接返回（处理连续短横线的边缘情况）
      if (part === "") return "";
      // 首字母大写，拼接剩余部分
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");

  // 确保整个字符串的第一个字母为小写，拼接剩余部分
  return processed.charAt(0).toLowerCase() + processed.slice(1);
}
