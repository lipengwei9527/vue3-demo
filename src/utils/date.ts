import moment from "moment";
/**
 * @description 输入时间，返回指定格式的时间
 * @param date 输入的时间
 * @param format 指定格式
 * @return {String}
 */
export function formateDate(
  date: Date | number | string,
  format: string = "YYYY-MM-DD"
) {
  // moment不能转换字符串类型的时间戳，要先转换成数字再格式化
  //   if (typeof date === "number") return moment(Number(date)).format(format);
  //   else
  return moment(new Date(date)).format(format);
}

export function deepProxy(obj: object, handler: object) {
  return new Proxy(obj, handler);
}
