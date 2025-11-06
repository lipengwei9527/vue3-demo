/**
 * @description 输入时间,返回指定格式的时间
 * 格式错误时,直接返回date
 * @param date 输入的时间
 * @param format 格式类型：yyyy-MM-dd | yyyy/MM/dd
 * @return {String}
 */
export function formateDate(
  date: Date | number | string,
  format: FormateDateType = "yyyy-MM-dd"
) {
  let time = new Date(date);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let monthDay = time.getDate();
  let MM = month < 10 ? "0" + month : "" + month;
  let dd = monthDay < 10 ? "0" + monthDay : "" + monthDay;
  if (format == "yyyy-MM-dd") {
    return `${year}-${MM}-${dd}`;
  } else if (format == "yyyy/MM/dd") {
    return `${year}/${MM}/${dd}`;
  }
  return `${year}-${MM}-${dd}`;
}
/**
 * @description 根据时间获取当月的天数
 * @param date 当月的时间
 * @returns
 * @example
 * 获取11月份有几天
 * getMonthDays('2025-11-05')
 */
export function getMonthDays(date: string | number | Date) {
  date = new Date(date);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}
