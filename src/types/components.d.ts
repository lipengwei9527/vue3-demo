import type {
  InputProps,
  ElSelectV2,
  ElSelect,
  FormItemProps,
  FormProps,
} from "element-plus";
/**
 * @description 日期组件类型信息
 */
export interface DayInfo {
  day: number; //几号:1-1号...
  date: string; //日期:例:2024/03/04
  type: string; //pre-上月,cur-当月,next-下月
  disabled: boolean; // 该日是否禁止选择
}

/***************************************************************************************************/
/**
 * @description 侧边栏控件类型
 */
// export type CtrlType = DiyContainerType | DiyFormItemType;
export type CtrlType = {
  id: string | number;
  label: string;
  type: UnionCtrlType;
  value?: string;
  disabled?: boolean;
  required?: boolean;
};
/**
 * @description 侧边栏一级标题及其包含的控件类型
 */
export type BaseCtrlsType = {
  id: string | number;
  title: string;
  type: "ctrlContainer";
  ctrls: CtrlType[];
};

/***************************************************************************************************/

/**
 * @description 控件类型，除了容器控件之外的表单控件类型
 */
export type UnContainerCtrlType = Exclude<UnionCtrlType, "DiyContainer">;
export type UnionCtrlType =
  | "DiyContainer"
  | "DiyInput"
  | "DiySelect"
  | "DiyDatePicker";

/**
 * @description 除了容器控件，所有表单控件都有的基础类型
 */
export interface DiyCtrlType {
  value: any;
  // disabled?: boolean;
}
// export type DiyInputType = ReadonlyToPartial<InputProps>;
export type DiyInputType = DiyCtrlType;
export type DiySelectType = DiyCtrlType;

/**
 *  @description 表单中自定义组件的类型
 */
export type CompCfgType = DiyInputType | DiySelectType;
/**
 * @description 表单项的类型，表单项中包含控件类型信息
 */
export type DiyFormItemType = {
  id: number | string;
  type: UnContainerCtrlType;
  typeName: string; // 类型中文名
  prop: string; //绑定的字段
  label: string; //绑定的字段要显示的中文名
  rules?: Array;
  isFullLine?: boolean; //是否占满一行
  compCfg: CompCfgType; //
};
/**
 * @description 容器控件类型
 */
export interface DiyContainerType {
  id: number | string;
  label: string;
  type: "DiyContainer";
  typeName: "容器";
  // config必须要有，没有数值也要返回一个空数组，否则不能往该容器内拖拽内容
  // config: DiyContainerType[];
  config: (DiyContainerType | DiyFormItemType)[];
}
/**
 * @description 表单配置的全部类型
 */
export type ExFormConfigType = ReadonlyToPartial<FormProps> & {
  id: number;
  name: string; //表单配置名称
  type:'DiyForm',
  mode: FormModeType;
  containerCfg?: DiyContainerType[];
};
// 创建工具类型：将只读属性转为可选属性
type ReadonlyToPartial<T> = {
  // 移除 readonly 修饰符，并添加 ? 使其变为可选
  -readonly [P in keyof T]?: T[P];
};
export type FormModeType = "create" | "edit" | "read";
