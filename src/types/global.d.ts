/**
 * @description  获取函数类型的所有参数组成的联合类型
 * @example
 * function fn(a: number, b: string, c: false): string {}
 * type R = ParamsUnion<typeof fn>; //type R = string | number | false
 */
type ParamsUnion<T extends (...args: any[]) => any> = Parameters<T>[number];

/**
 * @description 生成从0到数字N的联合类型，包括0和N，N>=0
 * @example
 * PositiveRange<0> = 0
 * PositiveRange<3> = 0|1|2|3
 */
type PositiveRange<
  N extends number,
  A extends number[] = []
> = A["length"] extends N
  ? [...A, N][number]
  : PositiveRange<N, [...A, A["length"]]>;

// type NegativeRange<
//   N extends number,
//   A extends number[] = []
// > = A["length"] extends N
//   ? A.map<number, (v: number) => -v>(v => -v)[number]
//   : NegativeRange<[...A, A["length"]]>;
/**
 * @description 生成从数字S到数字N的联合类型，包括S和N，N>=S
 * @example
 * RangeType<3,3> = 3
 * RangeType<3,5> = 3|4|5
 */
type RangeType<S extends number, E extends number> =
  | Exclude<PositiveRange<E>, PositiveRange<S>>
  | S;
