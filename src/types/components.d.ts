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

// 除了容器控件之外的表单控件类型
export type CtrlType = "DiyInput" | "DiySelect" | "ExDatePicker";

// 除了容器控件，所有控件都有的基础类型
export interface DiyCtrlType {
  id: number | string;
  type: CtrlType;
  field: string;
  label: string;
  value: any;
  disabled: boolean;
  isFullLine: boolean;
  rules: Array;
}
export interface ExInputType extends DiyCtrlType {}
export interface DiySelectType extends DiyCtrlType {
  options?: {
    label: string;
    value: string | number;
    disabled?: boolean;
  }[];
}
// 容器类型
export interface DiyContainerType {
  id: number | string;
  title: string;
  type: "DiyContainer";
  config?: DiyConfigType[];
}
// 表单配置中的每一项的类型
export type DiyConfigType = ExInputType | DiySelectType;
// 表单配置类型
export interface ExFormConfigType {
  id: number;
  name: string; //表单配置名称
  model: "create" | "edit" | "read";
  config: DiyContainerType[];
}
