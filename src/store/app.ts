import { defineStore } from "pinia";
import { getAllMenus, getTopMenus, getSIdeMenus } from "@/utils/menus";
import type { AppState } from "@/types/store";
import type { CustomRouteRecordRaw } from "@/types/router";
import router from "@/router";
const routes = router.options.routes as CustomRouteRecordRaw[];
const allMenus = getAllMenus(routes[0].children || []);
const topMenus = getTopMenus(allMenus);
const sideMenus = getSIdeMenus(allMenus, topMenus[0].index);
export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    num: {
      a: 1,
    },
    allMenus,
    currentMenu: {},
    topMenus: {
      activeIndex: topMenus[0].index,
      openedMenus: [],
      menus: topMenus,
    },
    sideMenus: {
      activeIndex: sideMenus[0].index,
      openedMenus: [sideMenus[0].index],
      menus: sideMenus,
    },
  }),
  actions: {
    setTopActiveIndex(index: string) {
      this.topMenus.activeIndex = index;
    },
    setSideActiveIndex(index: string) {
      this.sideMenus.activeIndex = index;
    },
    setSideMenus(index: string) {
      const sideMenus = getSIdeMenus(allMenus, index);
      this.sideMenus.openedMenus = [sideMenus[0].index];
      this.sideMenus.menus = sideMenus;
    },
  },
});
