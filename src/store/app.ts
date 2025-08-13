import { defineStore } from "pinia";
import { getMenus } from "@/utils/menus";
type LayoutType = "backLayout" | "docLayout";

type AppState = {
  layoutType: LayoutType;
  menus: any[]; //原始菜单数据
  menuMap: Record<string, MenusItem[]>; //顶部菜单和侧边菜单的映射关系
  navMenus: Menus;
  sideMenus: Menus;
};
const { sideMenus, navMenus, menuMap } = getMenus();
export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    layoutType: "docLayout",
    menus: [], //原始菜单数据
    menuMap,
    // 侧边菜单
    navMenus: {
      activeIndex: navMenus.activeIndex,
      openedMenus: navMenus.openedMenus,
      menus: navMenus.menus,
    },
    sideMenus: {
      activeIndex: sideMenus.activeIndex,
      openedMenus: sideMenus.openedMenus,
      menus: sideMenus.menus,
    },
  }),
  getters: {},
  actions: {
    // 获取默认展示的菜单项
    GET_MENUS() {
      // return getMenus();
    },
    // 设置默认激活的菜单项
    setActive(type: MenuType, path: string) {
      if (!type) return;
      this[type].activeIndex = path;
    },
    // 增加默认展开的菜单项
    addOpeneds(type: MenuType, path: string) {
      if (!type) return;
      this[type].openedMenus.push(path);
    },
    // 移除默认展开的菜单项
    removeOpeneds(type: MenuType, path: string) {
      const index = this[type].openedMenus.indexOf(path); // 找到要删除的菜单项的索引
      if (index > -1) {
        this[type].openedMenus.splice(index, 1); // 删除菜单项
      }
    },
    setSideMenus(key: string) {
      this.sideMenus.menus = this.menuMap[key];
    },
  },
});
