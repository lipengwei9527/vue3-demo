type MenuType = "navMenus" | "sideMenus";
type Menus = {
  activeIndex: string; // 当前激活的菜单项
  openedMenus: string[]; // 打开的菜单项
  menus: MenusItem[]; //当前展示的全部菜单
};
type MenusItem = {
  [key: string]: any;
  index: string;
  title: string;
};
