import { BaseCompCtrls, DiyContainerType } from "@/types/components";
export const compList: BaseCompCtrls[] = [
  {
    title: "容器1",
    type: "box1",
    ctrls: [
      { label: "基本容器1", type: "baseBox" },
      { label: "基本容器2", type: "baseBox" },
      { label: "基本容器3", type: "baseBox" },
      { label: "基本容器4", type: "baseBox" },
    ],
  },
  {
    title: "基本表单项目",
    type: "baseFormItems",
    ctrls: [
      { label: "输入框", type: "input" },
      { label: "富文本", type: "textarea" },
      { label: "单选框", type: "radio" },
      { label: "复选框", type: "checkbox" },
    ],
  },
];

export const formCtrls: DiyContainerType[] = [
  { id: 1, title: "容器1", type: "DiyContainer" },
  { id: 2, title: "容器2", type: "DiyContainer" },
];
