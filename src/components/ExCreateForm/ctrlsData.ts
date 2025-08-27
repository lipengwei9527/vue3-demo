import { BaseCtrlsType } from "@/types/components";
export const baseCtrls: BaseCtrlsType[] = [
  {
    id: "1",
    title: "容器1",
    type: "ctrlContainer",
    ctrls: [
      { id: "1-1", label: "基本容器1", type: "DiyContainer" },
      // { id: "1-2", label: "基本容器2", type: "DiyInput" },
      // { id: "1-3", label: "基本容器3", type: "DiyInput" },
      // { id: "1-4", label: "基本容器4", type: "DiyInput" },
    ],
  },
  {
    id: "2",
    title: "基本表单项目",
    type: "ctrlContainer",
    ctrls: [
      { id: "2-1", label: "输入框", type: "DiyInput" },
      // { id: "2-2", label: "富文本", type: "DiyTextarea" },
      { id: "2-3", label: "单选框", type: "DiySelect" },
      // { id: "2-4", label: "复选框", type: "DiyInput" },
    ],
  },
];
