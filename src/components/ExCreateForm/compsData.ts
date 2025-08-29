import {
  UnionCtrlType,
  DiyContainerType,
  DiyInputType,
  DiyFormItemType,
  DiySelectType,
} from "@/types/components";
import { AutoId } from "@/utils/general";
export const autoId = new AutoId();
// export type CompsCfg = {
//   DiyContainer: () => DiyContainerType;
//   DiyInput: () => DiyFormItemType;
//   DiySelect: () => DiyFormItemType;
//   DiyDatePicker: () => DiyFormItemType;
// };
// type CompsCfgType = {
//   [P in UnionCtrlType]: () => DiyContainerType | DiyFormItemType;
// };
/**
 * @description 获取初始化的控件信息
 * @param compName 控件名称
 * @returns
 */
export type Ctrls = {
  id: number | string;
  title: string;
  ctrls: (DiyContainerType | DiyFormItemType)[];
}[];
export const allCtrls: Ctrls = [
  { id: 1, title: "容器", ctrls: [getInitCompData("DiyContainer")] },
  {
    id: 2,
    title: "基本表单控件",
    ctrls: [
      getInitCompData("DiyInput"),
      getInitCompData("DiySelect"),
      getInitCompData("DiyDatePicker"),
    ],
  },
];
export function getInitCompData(compName: UnionCtrlType) {
  const compsCfg = {
    DiyContainer: getContainerCfg,
    DiyInput: getInputCfg,
    DiySelect: getSelectCfg,
    DiyDatePicker: getDiyDatePickerCfg,
  };
  return compsCfg[compName]();
}

function getContainerCfg(): DiyContainerType {
  const id = autoId.next();
  if (!id) ctrlIdError("DiyContainer");
  const DiyContainer: DiyContainerType = {
    id: id,
    label: "标题" + id,
    type: "DiyContainer",
    typeName: "容器",
    config: [],
  };
  return DiyContainer;
}
function getFormItemCfg(): Omit<DiyFormItemType, "compCfg"> {
  const id = autoId.next();
  if (!id) ctrlIdError("DiyFormItem");
  return {
    id,
    type: "DiyInput",
    typeName: "",
    label: "字段" + id,
    prop: "",
    isFullLine: true,
  };
}
function getInputCfg(): DiyFormItemType {
  //   const id = autoId.next();
  //   if (!id) ctrlIdError("DiyInput");
  const fromItem = getFormItemCfg();
  return {
    ...fromItem,
    type: "DiyInput",
    typeName: "输入框",
    compCfg: {
      value: "",
    },
  };
}
function getSelectCfg(): DiyFormItemType {
  //   const id = autoId.next();
  //   if (!id) ctrlIdError("DiySelect");
  const fromItem = getFormItemCfg();
  return {
    ...fromItem,
    type: "DiySelect",
    typeName: "选择器",
    compCfg: {
      value: "",
    },
  };
}
function getDiyDatePickerCfg(): DiyFormItemType {
  const fromItem = getFormItemCfg();
  return {
    ...fromItem,
    type: "DiyDatePicker",
    typeName: "日期选择器",
    compCfg: {
      value: "",
    },
  };
}
function ctrlIdError(str: string) {
  throw new Error(`初始化${str}控件id为空`);
}
