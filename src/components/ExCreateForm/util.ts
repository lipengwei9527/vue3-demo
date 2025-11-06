import { DiyContainerType, DiyFormItemType } from "@/types/components";

// 所有组件的通用菜单
const baseMenu = [
  {
    label: "删除",
    value: "delete",
  },
];
// 容器的左键菜单
const containerMenu = [
  {
    label: "删除容器",
    value: "deleteContainer",
  },
  {
    label: "删除所有子表单项",
    value: "deleteChild",
  },
];
/**
 * @description 根据控件类型获取左键菜单列表
 */
export function getContextMenu(item: DiyContainerType | DiyFormItemType) {
  if (item.type == "DiyContainer") return containerMenu;
  else return baseMenu;
}
