import router from "../router";
const routes = router.options.routes;
const backRoutes = routes[0].children;
type MenuType = {
  activeIndex: string;
  openedMenus: string[];
  menus: { index: string; title: string; [key: string]: any }[];
};
// 后台项目菜单配置
export function getMenus() {
  const navMenus: MenuType = {
    activeIndex: "",
    menus: [],
    openedMenus: [],
  };
  navMenus.menus = getNavMenus();
  navMenus.activeIndex = navMenus.menus[0].index;

  const sideMenus: MenuType = {
    activeIndex: "",
    menus: [],
    openedMenus: [],
  };
  const menuMap = getMenuMap();
  sideMenus.menus = menuMap[navMenus.activeIndex];
  sideMenus.activeIndex = sideMenus.menus[0]?.index;
  return {
    navMenus,
    sideMenus,
    menuMap,
  };
}
export function getNavMenus() {
  return (
    backRoutes?.map((item) => {
      return {
        index: item.path,
        title: item.name as string,
        // children: item.children,
      };
    }) || []
  );
}
export function getMenuMap() {
  return (
    backRoutes?.reduce((pre, cur) => {
      pre[cur.path] = cur.children?.map((item) => {
        return {
          index: item.path,
          title: item.name,
        };
      });
      return pre;
    }, {} as Record<string, any>) || {}
  );
}
