import { useRouter, RouteLocationRaw } from "vue-router";
type CustomRouter = {
  navigateTo: (to: RouteLocationRaw) => void;
  goBack: () => void;
  refresh: () => void;
};
export function CreateCustomRouter(): CustomRouter {
  const router = useRouter();
  // console.log(`output->router`, router);
  const navigateTo = (to: RouteLocationRaw) => {
    router.push(to);
  };

  const goBack = () => {
    router.back();
  };
  const refresh = () => {};
  return {
    navigateTo,
    goBack,
    refresh,
  };
}
type Tab<T extends object> = {
  url: string;
  fullUrl?: string; //带参数的url
  params?: {
    [P in keyof T]: T[P];
  };
};
/**
 * @class
 *
 */
export class CreateTabPage<T> {
  readonly tabName: string;
  channel: BroadcastChannel;
  isOtherTabChannel: boolean;
  params: T | null = null;
  constructor(tabName: string) {
    this.tabName = tabName;
    this.isOtherTabChannel = false;
    this.channel = new BroadcastChannel(this.tabName);
    // 同一个标签页下并不会触发message事件
    this.channel.addEventListener("message", (e) => {
      console.log(`output->bc`, e);
      this.isOtherTabChannel = true;
      this.params = e.data;
    });
  }
  openTab<T extends object>(to: Tab<T>) {
    // 将params中的参数都拼接到url上
    to.url = to.url + objTOPath(to.params || {});
    // 新打开一个tabName频道的标签页
    window.open(to.url, this.tabName);
  }
  getParams() {
    const params = new URLSearchParams(window.location.href);
    console.log(`output->window.location`, params.entries());

    return;
  }
  closeTab() {
    window.close();
  }
}

function pathTOObj(path: string) {
  let arr = path.split("?");
  let params: Record<string, string> = {};
  // path中不包含参数时
  if (arr.length <= 1) {
    return params;
  }
  arr = arr[1].split("&");
  // path中有参数时
  for (const index in arr) {
    const [key, value] = arr[index];
    params[key] = value;
  }
  return params;
}
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
