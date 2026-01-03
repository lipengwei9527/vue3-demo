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
  str = str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
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

export class AutoId {
  cur: number;
  len: number;
  str: string;
  constructor(cur: number = 0, len: number = 5, str: string = "0") {
    this.cur = cur;
    this.len = len;
    this.str = str;
  }
  next() {
    let cur = ++this.cur;
    let len = this.len - this.cur.toString().length;
    return cur.toString().padStart(len, this.str);
  }
}

/**
 * @description 分步执行任务
 * @param {()=>void}tasks 分步执行任务数组
 * @param {(taskChunk:(isGoRunning:()=>boolean)=>void)=>void}taskChunkCallback  调度器
 * @returns 
 * @example 
    stepTasks(tasks, (taskChunk) => {
        let count = 0;
        setTimeout(() => {
            // taskChunk是tasks中的元素任务
            // taskChunk的参数是isGoRunning函数,判断是否继续执行下一个任务,true继续,false停止
            taskChunk(() => count++ < 3);
        }, 1000);
    });
 * 
 */
export function stepTasks(
  tasks: Array<() => void>,
  taskChunkCallback: (taskChunk: (isGoRunning: () => boolean) => void) => void
) {
  let index = 0;
  if (index >= tasks.length) return;
  function run() {
    taskChunkCallback((isGoRunning) => {
      while (index < tasks.length && isGoRunning()) {
        tasks[index++]();
      }
      if (index < tasks.length) {
        run();
      }
    });
  }
  run();
}

/**
 *@description 在浏览器中利用空闲时间分步执行任务
 * @param tasks 分步执行任务数组
 */
export function idleStepTasks(tasks: Array<() => void>) {
  requestIdleCallback((idle) => {
    stepTasks(tasks, (taskChunk) => {
      taskChunk(() => idle.timeRemaining() > 0);
    });
  });
}

// function isBaseType<T>(value: T): boolean {
//   const baseType = [
//     "string",
//     "number",
//     "boolean",
//     "undefined",
//     "null",
//     "symbol",
//     "bigint",
//   ];
//   const result = baseType.find((item) => item === typeof value);
//   if (result || value === null) {
//     return true;
//   }
//   return false;
// }
// export function deepClone<T>(value: T, options: Partial<CloneOptions>) {
//   const {
//     handleCircular = true,
//     skipFunctions = true,
//     shallow = false,
//   } = options;
//   let result;

//   // 基础类型直接返回
//   if (isBaseType(value)) return value;
//   // 函数直接返回
//   if (skipFunctions && typeof value == "function") {
//     return value;
//   }
//   if (Object.prototype.toString.call(value) == "[object Object]") {
//   }

//   // return result;
//   return result;
// }
// deepClone(new Date());

export interface CloneOptions {
  /** 是否处理循环引用，默认为 true */
  handleCircular: boolean;

  /** 是否跳过函数克隆，默认为 true */
  skipFunctions: boolean;

  /** 是否为浅克隆模式，默认为 false */
  shallow: boolean;
}
export function Singleton<T extends new (...args: any[]) => any>(
  constructor: T
) {
  let instance: InstanceType<T>;
  return function (...args: ConstructorParameters<T>): InstanceType<T> {
    if (instance) return instance;
    instance = new constructor(...args);
    return instance;
  };
}
