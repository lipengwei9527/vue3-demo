/***************************************************************************************************/
/**
 * @description appStore中定义的类型定义，用于在项目中引用和扩展。
 */
import type { BaseCtrlsType } from "./components";
type MenuType = "navMenus" | "sideMenus";
type ExMenus = {
  activeIndex: string; // 当前激活的菜单项
  openedMenus: string[]; // 打开的菜单项
  menus: ExMenuItemType[]; //当前展示的全部菜单
};
export type ExMenuItemType = {
  index: string;
  title: string;
  isHidden?: boolean;
  children?: ExMenuItemType[];
};
export type AppState = {
  num?: {
    a: number;
  };
  allMenus: ExMenuItemType[];
  currentMenu: {};
  topMenus: ExMenus;
  sideMenus: ExMenus;
};
/***************************************************************************************************/
/**
 * @description useExCreateFormStore
 */
export type ExCreateFormState = {
  formData: object;
  baseCtrls: BaseCtrlsType[];
};
