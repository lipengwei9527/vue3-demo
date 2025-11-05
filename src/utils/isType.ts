// 1. 定义支持的类型列表（字符串字面量联合类型）
type SupportedTypes =
  | "string" // 字符串（原始类型）
  | "number" // 数字（原始类型，排除 NaN）
  | "boolean" // 布尔值（原始类型）
  | "symbol" // 符号（原始类型）
  | "undefined" // 未定义
  | "null" // 空值
  | "function" // 函数
  | "array" // 数组
  | "object" // 纯对象（排除数组、null、内置对象等）
  | "date" // Date 实例
  | "regexp" // 正则表达式
  | "promise" // Promise 实例
  | "map" // Map 实例
  | "set" // Set 实例
  | "string-object" // String 对象（new String()）
  | "number-object" // Number 对象（new Number()）
  | "bigInt"; //BigInt

// 2. 类型映射：将字符串字面量映射到对应的 TypeScript 类型
type TypeMap<T extends SupportedTypes> = T extends "string"
  ? string
  : T extends "number"
  ? number
  : T extends "boolean"
  ? boolean
  : T extends "symbol"
  ? symbol
  : T extends "undefined"
  ? undefined
  : T extends "null"
  ? null
  : T extends "function"
  ? (...args: any[]) => any
  : T extends "array"
  ? any[]
  : T extends "object"
  ? object
  : T extends "date"
  ? Date
  : T extends "regexp"
  ? RegExp
  : T extends "promise"
  ? Promise<any>
  : T extends "map"
  ? Map<any, any>
  : T extends "set"
  ? Set<any>
  : T extends "string-object"
  ? String
  : T extends "number-object"
  ? Number
  : T extends "bigInt"
  ? BigInt
  : never;

// 3. 通用类型守卫：判断值是否为指定类型
export function isType<T extends SupportedTypes>(
  value: unknown,
  type: T
): value is TypeMap<T> {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number" && !isNaN(value);
    case "boolean":
      return typeof value === "boolean";
    case "symbol":
      return typeof value === "symbol";
    case "undefined":
      return value === undefined;
    case "null":
      return value === null;
    case "function":
      return typeof value === "function";
    case "array":
      return Array.isArray(value);
    case "object":
      return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof Date) &&
        !(value instanceof RegExp) &&
        !(value instanceof Promise) &&
        !(value instanceof Map) &&
        !(value instanceof Set) &&
        !(value instanceof String) &&
        !(value instanceof Number)
      );
    case "date":
      return value instanceof Date && !isNaN(value.getTime());
    case "regexp":
      return value instanceof RegExp;
    case "promise":
      return value instanceof Promise;
    case "map":
      return value instanceof Map;
    case "set":
      return value instanceof Set;
    case "string-object":
      return value instanceof String;
    case "number-object":
      return value instanceof Number;
    case "bigInt":
      return value instanceof BigInt;
    default:
      return false;
  }
}
