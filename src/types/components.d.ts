declare interface DayInfo {
  day: number; //几号:1-1号...
  date: string; //日期:例:2024/03/04
  type: string; //pre-上月,cur-当月,next-下月
  disabled: boolean; // 该日是否禁止选择
}
// 侧边栏控件类型
export type BaseCompCtrl = {
  label: string;
  type: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
};
// 侧边栏一级标题及其包含的控件类型
export type BaseCompCtrls = {
  title: string;
  type: string;
  ctrls: BaseCompCtrl[];
};

/***************************************************************************************************/

export type BaseFormCtrlFiled = {
  type: string;
  label: string;
};
export interface Container extends Omit<BaseFormCtrlFiled, "label"> {
  title: string;
  type: "container";
}
export type FormCtrl = Container;
