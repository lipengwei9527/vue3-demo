// 类型映射，用于类型收窄
type JsTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  bigint: bigint;
  symbol: symbol;
  undefined: undefined;
  null: null;
  object: object;
  function: Function;
  array: any[];
  date: Date;
  regexp: RegExp;
  promise: Promise<any>;
  map: Map<any, any>;
  set: Set<any>;
  error: Error;
  weakmap: WeakMap<any, any>;
  weakset: WeakSet<any>;
  element: Element;
};
// 定义所有JS类型字符串的联合类型
type JSTypeNames = keyof JsTypeMap;
// 主函数：检查类型并实现类型收窄
export function isType<T extends JSTypeNames>(
  value: unknown,
  typeStr: T
): value is JsTypeMap[T] {
  switch (typeStr) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number" && !isNaN(value as number);
    case "boolean":
      return typeof value === "boolean";
    case "bigint":
      return typeof value === "bigint";
    case "symbol":
      return typeof value === "symbol";
    case "undefined":
      return typeof value === "undefined";
    case "null":
      return value === null;
    case "object":
      return (
        typeof value === "object" && value !== null && !Array.isArray(value)
      );
    case "function":
      return typeof value === "function";
    case "array":
      return Array.isArray(value);
    case "date":
      return value instanceof Date;
    case "regexp":
      return value instanceof RegExp;
    case "promise":
      return value instanceof Promise;
    case "map":
      return value instanceof Map;
    case "set":
      return value instanceof Set;
    case "error":
      return value instanceof Error;
    case "weakmap":
      return value instanceof WeakMap;
    case "weakset":
      return value instanceof WeakSet;
    case "element":
      return typeof value === "object" && value !== null && "tagName" in value;
    default:
      return false;
  }
}
