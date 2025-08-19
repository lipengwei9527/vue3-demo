import type { CustomRouteRecordRaw } from "@/types/router";
import type { ExMenuItemType } from "@/types/store";
// 项目菜单配
export function getAllMenus(list: CustomRouteRecordRaw[]) {
  const allMenus: ExMenuItemType[] = list.map((item) => {
    return {
      index: item.name as string,
      title: item.labelName,
      isHidden: item.isHidden || false,
      children: item.children ? getAllMenus(item.children) : [],
    };
  });
  return allMenus;
}
export function getTopMenus(list: ExMenuItemType[]): ExMenuItemType[] {
  return list
    .filter((item) => !item.isHidden)
    .map((item) => {
      return {
        index: item.index,
        title: item.title,
        isHidden: item.isHidden,
        // children: item.children ? getTopMenus(item.children) : [],
      };
    });
}
export function getSIdeMenus(
  list: ExMenuItemType[],
  activeIndex?: string
): ExMenuItemType[] {
  let obj: ExMenuItemType | undefined;
  if (activeIndex) {
    obj = list.find((item) => item.index === activeIndex);
    list = obj?.children || [];
  }
  const sideMenus = list
    .filter((item) => !item.isHidden)
    .map((item) => {
      return {
        index: item.index,
        title: item.title,
        isHidden: item.isHidden,
        children: item.children ? getSIdeMenus(item.children) : [],
      };
    });
  return sideMenus;
}
