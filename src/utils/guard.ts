import { getCurrentInstance } from "vue";
type HasEventListItem = { name: string; result: boolean };
export class HasEvent {
  list: HasEventListItem[];
  constructor(eventName: string | string[]) {
    if (typeof eventName == "string") {
      eventName = [eventName];
    }
    this.list = [];
    for (const item in eventName) {
      this.list.push({ name: item, result: false });
    }
  }
  get(eventName: string) {
    return this.list.find((item) => (item.name = eventName));
  }
}
export function hasEvent(eventName: string | string[]) {
  if (typeof eventName == "string") eventName = [eventName];
  const ins = getCurrentInstance();
  //   debugger;
  if (!ins) return [];
  const res = eventName.map((item) => {
    // item是以on开头的就直接返回，不是就首字母大写并拼接上on
    item = item.startsWith("on")
      ? item
      : "on" + item.charAt(0).toUpperCase() + item.slice(1);
    return {
      name: item,
      result: item in (ins.vnode.props || {}) ? true : false,
    };
  });
  return res;
}
