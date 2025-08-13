declare interface DayInfo {
  day: number; //几号:1-1号...
  date: string; //日期:例:2024/03/04
  type: string; //pre-上月,cur-当月,next-下月
  disabled: boolean; // 该日是否禁止选择
}
