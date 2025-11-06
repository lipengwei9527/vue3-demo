import { DayInfo } from "@/types/components";
import { formateDate } from "@/utils/date";

export type modeType = "month" | "week";
// 显示的天数，日历中的格子数
// let dayNum = 7 * 6;
// let connectFlag = "";
export type CalendarOptions = {
  // 周、月模式
  mode: modeType;
  //是否显示全部日历信息
  /**
   *
   * @description 日历信息显示天数
   * full-显示7*6天数
   * cur-只显示当月的天数信息，上月和下月的不显示
   * noNext-不显示下一个月的信息
   * noPre-不显示上一个月的信息
   */
  days: "full" | "cur" | "noPre" | "noNext";
  /**
   * @description 日期格式
   */
  valueFormat: FormateDateType;
  /**
   * @description 周起始日：值为1-7,1为周一，7为周日
   */
  firstDayOfWeek: RangeType<0, 7>;
};
let calendarOptions: CalendarOptions = {
  mode: "month",
  days: "full",
  firstDayOfWeek: 0,
  valueFormat: "yyyy/MM/dd",
};

/**
 * @description: 获取当前日历信息
 * @param {String} time
 * @return {*}
 */
export function getCalendarData(
  time: string | Date | number,
  options: CalendarOptions
): DayInfo[] {
  options = Object.assign(calendarOptions, options);
  const { firstDayOfWeek = 0, mode } = options;
  calendarOptions = options;
  // 循环起始日期
  let date = new Date(time);
  // 指定日期
  const targetDate = new Date(date);
  const calendarData: DayInfo[] = [];
  let cycCount = 0;
  if (mode == "month") {
    date.setDate(1);
    let weekDay = date.getDay();
    weekDay = weekDay == 0 ? 7 : weekDay;
    // 设置的月号=1号-(星期-2)+偏移量
    date.setDate(1 - (weekDay - 1) - firstDayOfWeek);
    cycCount = 42;
  } else if (mode == "week") {
    let monthDay = date.getDate();
    let weekDay = date.getDay();
    weekDay = weekDay == 0 ? 7 : weekDay;
    // 设置的月号 = 月号 - (星期 - 1)+偏移量
    date.setDate(monthDay - (weekDay - 1) - firstDayOfWeek);
    cycCount = 7;
  }
  const list = getDayInfoList(date, targetDate, cycCount);
  calendarData.push(...list);
  return calendarData;
}
function getDayInfoList(start: Date, targetDate: Date, count: number) {
  const { valueFormat } = calendarOptions;
  const curMonth = targetDate.getMonth();
  const list: DayInfo[] = [];
  for (let i = 0; i < count; i++) {
    const monthDay = start.getDate();
    const month = start.getMonth();
    const targetTime = targetDate.getTime();
    const startTime = start.getTime();
    let type = "";
    if (curMonth != month && targetTime > startTime) {
      type = "pre";
    } else if (curMonth == month) {
      type = "cur";
    } else if (curMonth != month && targetTime < startTime) {
      type = "next";
    }
    const info: DayInfo = {
      day: start.getDate(),
      date: formateDate(start, valueFormat),
      type,
      disabled: false,
    };
    list.push(info);
    start.setDate(monthDay + 1);
  }
  return list;
}

// 初始化日历当天所包含的信息
export function resetDayInfo(): DayInfo {
  return {
    day: 0,
    date: "",
    type: "",
    disabled: false,
  };
}
/**
 * @description 偏移数组
 * @param arr 要偏移的数组
 * @param offset 偏移量，正数为右移，负数为左移
 * @returns
 */
export function offsetArr<T>(arr: T[], offset: number): T[] {
  if (!arr.length || !offset || offset > arr.length) return arr;
  arr = JSON.parse(JSON.stringify(arr));
  const arr1 = arr.slice(-offset);
  const arr2 = arr.slice(0, -offset);
  return [...arr1, ...arr2];
}
offsetArr([1, 2, 3], 3);
