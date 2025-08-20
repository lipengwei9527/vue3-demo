import { useRouter, useRoute } from "vue-router";
const routeModel = import.meta.env.VITE_ROUTER_MODEL;
const routerPrefix = routeModel == "hash" ? "/#" : "";
type NavigateTo = ParamsUnion<ReturnType<typeof useRouter>["push"]>;
/***************************************************************************************************/
/**
 * @class
 * @description 创建一个路由管理器
 */
export class CreateRouterManager {
  router: ReturnType<typeof useRouter>;
  route: ReturnType<typeof useRoute>;

  constructor() {
    this.router = useRouter();
    this.route = useRoute();
  }
  navigateTo(to: NavigateTo) {
    this.router.push(to);
  }
  goBack() {
    this.router.back();
  }
  refresh() {}
}
type Tab = {
  path: string; //跳转的url
  params?: {
    [P: string]: any;
  };
};
/***************************************************************************************************/
/**
 * @class
 *@description 创建一个打开新标签页的实例
 */
export class CreateTabPage {
  readonly tabName: string;
  route: ReturnType<typeof useRoute>;
  constructor(tabName: string) {
    this.tabName = tabName;
    this.route = useRoute();
  }
  openTab(to: Tab) {
    // 将params中的参数都拼接到url上
    to.path = to.path + objTOPath(to.params || {});
    // 路由模式为hash则拼接/#/字符串，否则拼接空字符串
    to.path = routerPrefix + to.path;
    // 打开一个tabName频道的标签页
    window.open(to.path, this.tabName);
  }
  getParams() {
    console.log("window.location,csRouter", window.location, this.route);
    const params = Object.assign(this.route.params, this.route.query);
    return params;
  }
  closeTab() {
    window.close();
  }
}
/***************************************************************************************************/
/**
 * @description 将data转换为键值对字符串,返回值不为空在前面加一个?,为空就返回空字符串
 * @param  data 任意对象
 * @returns {string} 键值对字符串
 */
function objTOPath<T extends object>(data: T): string {
  // 如果data对象不存在或者data中没有属性就返回空字符串
  if (!Object.keys(data).length) return "";
  let arr: string[] = [];
  let char = "";
  for (const key in data) {
    arr.push(`${key}=${data[key]}`);
  }
  char = arr.join("&");
  // 有参数就返回?+char,无参数就返回char
  return char && "?" + char;
}
