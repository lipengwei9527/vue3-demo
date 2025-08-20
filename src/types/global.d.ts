/**
 * @description  获取函数类型的所有参数组成的联合类型
 * @example
 * function fn(a: number, b: string, c: false): string {}
 * type R = ParamsUnion<typeof fn>; //type R = string | number | false
 */
type ParamsUnion<T extends (...args: any[]) => any> = Parameters<T>[number];
