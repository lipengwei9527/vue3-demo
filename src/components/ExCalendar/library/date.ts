import { DayInfo } from "@/types/components";
import moment from "moment";
const showDayNum = 42; // 显示的天数，日历中的格子数
/**
 * @description: 获取指定时间的当月天数和星期，默认获取当月的天数和星期
 * @param {Date} date 
 * @param {number} num 
  @returns {*} 
 */
function getMonthInfo(
  date: Date | string | number,
  num: number = 0
): { days: number; firstDayOfMonth: number; date: string } {
  // 指定的月份
  date = moment(date).subtract(num, "month").format("YYYY-MM");
  const start = moment(date).startOf("month");
  const end = moment(date).endOf("month");
  const days = end.diff(start, "days") + 1;
  let firstDayOfMonth = new Date(date).getDay();
  if (firstDayOfMonth === 0) firstDayOfMonth = 7;
  return {
    date, // date: "2024/10",// date: 指定的月份
    days, // days: 31,// 月份天数
    firstDayOfMonth, // 2// 当月第一天是周几(1-周一,....7-周日)
  };
}
/**
 * @description: 获取当前日历信息
 * @param {String} time
 * @return {*}
 */
export function getCalendarData(time: string | Date | number): DayInfo[] {
  let date = new Date(time || new Date());
  // 初始化月份信息
  let preMonth = getMonthInfo(date, 1);
  let curMonth = getMonthInfo(date);
  let nextMonth = getMonthInfo(date, -1);
  let calendarData: DayInfo[] = [];
  // 获取上月信息
  for (let i = curMonth.firstDayOfMonth; i > 1; i--) {
    let dayInfo = resetDayInfo();
    dayInfo.day = preMonth.days - i + 2;
    dayInfo.date =
      preMonth.date +
      "-" +
      (dayInfo.day < 10 ? "0" + dayInfo.day : dayInfo.day);
    dayInfo.type = "pre";
    calendarData.push(dayInfo);
  }
  // 获取当月信息
  for (let i = 0; i < curMonth.days; i++) {
    let dayInfo = resetDayInfo();
    dayInfo.day = i + 1;
    dayInfo.date =
      curMonth.date +
      "-" +
      (dayInfo.day < 10 ? "0" + dayInfo.day : dayInfo.day);
    dayInfo.type = "cur";
    calendarData.push(dayInfo);
  }
  // 获取下月信息
  for (
    let i = 1;
    i < showDayNum - curMonth.days - curMonth.firstDayOfMonth + 2;
    i++
  ) {
    let dayInfo = resetDayInfo();
    dayInfo.day = i;
    dayInfo.date =
      nextMonth.date +
      "-" +
      (dayInfo.day < 10 ? "0" + dayInfo.day : dayInfo.day);
    dayInfo.type = "next";
    calendarData.push(dayInfo);
  }
  return calendarData;
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
