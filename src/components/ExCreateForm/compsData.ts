import {
  UnionCtrlType,
  DiyContainerType,
  DiyInputType,
  DiyFormItemType,
  DiySelectType,
} from "@/types/components";
import { AutoId } from "@/utils/general";
import { nanoid, customAlphabet } from "nanoid";
const char = "0123456789";
// const autoId = customAlphabet(char, 4);
const autoId = new AutoId();
export type CompsCfg = {
  DiyContainer: () => DiyContainerType;
  DiyInput: () => DiyFormItemType;
  DiySelect: () => DiyFormItemType;
  DiyDatePicker: () => DiyFormItemType;
};
/**
 * @description 获取初始化的控件信息
 * @param compName 控件名称
 * @returns
 */

export function getInitCompData(compName?: UnionCtrlType) {
  const compsCfg: CompsCfg = {
    DiyContainer: getContainerCfg,
    DiyInput: getInputCfg,
    DiySelect: getSelectCfg,
    DiyDatePicker: getDiyDatePickerCfg,
  };
  if (!compName) return compsCfg;
  return compsCfg[compName]();
}

function getContainerCfg(): DiyContainerType {
  const id = autoId.next();
  if (!id) ctrlIdError("DiyContainer");
  const DiyContainer: DiyContainerType = {
    id: id,
    title: "标题" + id,
    type: "DiyContainer",
    config: [],
  };
  return DiyContainer;
}
function getFormItemCfg(): DiyFormItemType {
  const id = autoId.next();
  if (!id) ctrlIdError("DiyFormItem");
  return {
    id,
    type: "DiyFormItem",
    label: "字段" + id,
    prop: "",
    compCfg: {},
  };
}
function getInputCfg(): DiyFormItemType {
//   const id = autoId.next();
//   if (!id) ctrlIdError("DiyInput");
  return {
    ...getFormItemCfg(),
    compCfg: {
      type: "DiyInput",
    },
  };
}
function getSelectCfg(): DiyFormItemType {
//   const id = autoId.next();
//   if (!id) ctrlIdError("DiySelect");
  return {
    ...getFormItemCfg(),
  };
}
function getDiyDatePickerCfg(): DiyFormItemType {
//   const id = autoId.next();
//   if (!id) ctrlIdError("getDiyDatePickerCfg");
  return {
    ...getFormItemCfg(),
  };
}
function ctrlIdError(str: string) {
  throw new Error(`初始化${str}控件id为空`);
}
