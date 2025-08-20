import {
  useRouter,
  Router,
  useRoute,
  RouteLocationNormalizedLoadedGeneric,
  RouteLocationRaw,
} from "vue-router";
/***************************************************************************************************/
/**
 * @class
 * @description 创建一个路由管理器
 */
export class CreateRouterManager {
  router: Router;
  route: RouteLocationNormalizedLoadedGeneric;
  constructor() {
    this.router = useRouter();
    this.route = useRoute();
  }
  navigateTo(to: RouteLocationRaw) {
    this.router.push(to);
  }
  goBack() {
    this.router.back();
  }
  refresh() {}
}

type Tab<T extends object> = {
  url: string; //跳转的url
  fullUrl?: string; //带参数的url
  //参数
  params?: {
    [P in keyof T]: T[P];
  };
};
/***************************************************************************************************/
/**
 * @class
 *@description 创建一个打开新标签页的实例
 */
export class CreateTabPage {
  readonly tabName: string;
  route: RouteLocationNormalizedLoadedGeneric;
  constructor(tabName: string) {
    this.tabName = tabName;
    this.route = useRoute();
  }
  openTab<T extends object>(to: Tab<T>) {
    // 将params中的参数都拼接到url上
    to.url = to.url + objTOPath(to.params || {});
    // 打开一个tabName频道的标签页
    window.open(to.url, this.tabName);
  }
  getParams() {
    console.log("window.location,csRouter", window.location, this.route);
    const params = Object.assign(this.route.params, this.route.query);
    // const res: Record<string, string> = {};
    // const params = new URLSearchParams(window.location.search);
    // for (const [key, value] of params.entries()) {
    //   res[key] = value;
    // }
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
