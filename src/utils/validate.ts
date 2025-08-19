/**
 * @description 校验是否为数字(包括正数、负数和小数，当是小数时开头只能有1个0)
 * @param value
 * @returns
 */
export function isNumber(value: string | number) {
  if (typeof value === "number") value = value.toString();
  const reg = /^-?([1-9]\d*(\.\d+)?|0(\.0*[1-9]\d*)?)$/;
  return reg.test(value);
}
/**
 * @description:  转换为千分制
 * @param {string} value: 数字或者字符串类型的数字
 * @return {*}
 */
export function toThousand(value: string | number): string {
  return Intl.NumberFormat("en-US").format(Number(value));
}
/**
 * @deprecated 是否是千分制数字(包括正数、负数和小数，当是小数时开头只能有1个0)
 * @param value
 * @returns {boolean}
 */
export function isThousand(value: string) {
  const reg = /^-?(\d{1,3}(,\d{3})*|\d+)(\.\d+)?|^-?0(\.0*[1-9]\d*)?$/;
  return reg.test(value);
}
/**
 * 截取两个指定字符串之间的字符
 * @param {string} str
 * @param {string} start
 * @param {string} end
 * @returns {string|null}
 */
export function getBetween(str: string, start: string, end: string): string {
  const reg = new RegExp(`${start}(.*?)${end}`);
  const match = str.match(reg);
  return match ? match[1] : "";
}
