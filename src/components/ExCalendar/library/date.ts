import { DayInfo } from "@/types/components";
import { formateDate } from "@/utils/date";

export type modeType = "month" | "week";
// 显示的天数，日历中的格子数
const showDayNum = 7 * 6;
export type CalendarOptions = {
  // 周、月模式
  mode?: modeType;
  //是否显示全部日历信息
  /**
   * @description 日历信息显示天数
   * full-显示7*6天数
   * cur-只显示当月的天数信息，上月和下月的不显示
   * noNext-不显示下一个月的信息
   * noPre-不显示上一个月的信息
   */
  days?: "full" | "cur" | "noPre" | "noNext";
  /**
   * @description 日期格式
   */
  valueFormat?: FormateDateType;
  /**
   * @description 周起始日：值为1-7,1为周一，7为周日
   */
  firstDayOfWeek?: RangeType<1, 7>;
};
const calendarOptions: CalendarOptions = {
  mode: "month",
  days: "full",
  firstDayOfWeek: 1,
  valueFormat: "yyyy/MM/dd",
};
type MonthInfo = {
  days: number; //月份天数
  date: string; //年+月，例如：2025-10-
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
  const { firstDayOfWeek, valueFormat, mode } = options;

  time = formateDate(time, valueFormat);
  const connectFlag = valueFormat == "yyyy-MM-dd" ? "-" : "/";
  const list = time.split(connectFlag);
  // 周日历信息
  if (mode == "week") {
    return getWeekCalendarDate(time, options);
  }
  // 月日历信息
  // 变为传入时间月份的1号
  let date: string | Date =
    list[0] + connectFlag + list[1] + connectFlag + "01";
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  // 当月的一号是周几
  // 返回一个 0 到 6 之间的整数值，代表星期几：0 代表星期日，1 代表星期一，2 代表星期二
  let weekDay = date.getDay();
  weekDay = weekDay == 0 ? 7 : weekDay;
  const preMonth = getMonthInfo(new Date(year, month - 1, 0), valueFormat);
  const curMonth = getMonthInfo(new Date(year, month, 0), valueFormat);
  const nextMonth = getMonthInfo(new Date(year, month + 1, 0), valueFormat);
  const calendarData: DayInfo[] = [];
  // 获取上月信息
  let yearAndMonth = preMonth.date;
  for (let i = preMonth.days - weekDay + 2; i <= preMonth.days; i++) {
    let dayInfo = resetDayInfo();
    dayInfo.day = i;
    dayInfo.date = yearAndMonth + (i < 10 ? "0" + i : i);
    dayInfo.type = "pre";
    calendarData.push(dayInfo);
  }
  yearAndMonth = curMonth.date;
  // 获取当月信息
  for (let i = 1; i <= curMonth.days; i++) {
    let dayInfo = resetDayInfo();
    dayInfo.day = i;
    dayInfo.date = yearAndMonth + (i < 10 ? "0" + i : i);
    dayInfo.type = "cur";
    calendarData.push(dayInfo);
  }
  yearAndMonth = nextMonth.date;
  // 获取下月信息
  for (let i = 1; i <= showDayNum - (weekDay - 1) - curMonth.days; i++) {
    let dayInfo = resetDayInfo();
    dayInfo.day = i;
    dayInfo.date = yearAndMonth + (i < 10 ? "0" + i : i);
    dayInfo.type = "next";
    calendarData.push(dayInfo);
  }
  return calendarData;
}
function getWeekCalendarDate(
  date: string,
  options: CalendarOptions
): DayInfo[] {
  const { firstDayOfWeek, valueFormat } = options;
  let time = new Date(date);
  let weekday = time.getDay();
  const curMonth = time.getMonth();
  weekday = weekday == 0 ? 7 : weekday;
  // 一天的毫秒数
  const dayStep = 60 * 60 * 24 * 1000;

  const calendarData: DayInfo[] = [];
  const start = new Date(time.getTime() - dayStep * (weekday - 1));
  const startDay = start.getDate();
  for (let i = 0; i < 7; i++) {
    let dayInfo = resetDayInfo();
    start.setDate(startDay + i);
    dayInfo.day = start.getDate();
    dayInfo.date = formateDate(start, valueFormat);
    let month = start.getMonth();
    if (curMonth != month && time.getTime() > start.getTime()) {
      dayInfo.type = "pre";
    } else if (curMonth != month && time.getTime() < start.getTime()) {
      dayInfo.type = "next";
    } else {
      dayInfo.type = "cur";
    }
    calendarData.push(dayInfo);
  }
  return calendarData;
}
function getMonthInfo(
  time: Date,
  formate: FormateDateType = "yyyy-MM-dd"
): MonthInfo {
  let date = formateDate(time, formate);
  let days = new Date(date).getDate();
  let flag = "";
  let list: string[] = [];
  if (formate == "yyyy-MM-dd") {
    flag = "-";
  } else if (formate == "yyyy/MM/dd") {
    flag = "/";
  }
  list = date.split(flag);
  return {
    days,
    date: list[0] + flag + list[1] + flag,
  };
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
export function splitDate(date: string, valueFormat: FormateDateType) {
  let flag = "";
  if (valueFormat == "yyyy-MM-dd") {
    flag = "-";
  } else if (valueFormat == "yyyy/MM/dd") {
    flag = "/";
  }
  const list = date.split(flag);
  return {
    list,
    flag,
  };
}
