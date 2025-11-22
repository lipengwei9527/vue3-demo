import { createVNode, render, DirectiveBinding } from "vue";
import menuContextComp from "./index.vue";
import { ExContextMenuItem } from "@/types/components";
import { isType } from "@/utils/isType";
type ExContextMenuProps = {
  el: HTMLElement | null;
  list: ExContextMenuItem[];
  disabled?: boolean;
  num?: any;
};
let props: ExContextMenuProps = initProps();
function init(el: HTMLElement, binding: DirectiveBinding) {
  if (isType(binding.value, "array")) {
    props.list = binding.value;
  } else {
    props = binding.value;
  }
  props.el = el;
  return props;
}
function initProps() {
  return {
    list: [],
    el: null,
  };
}
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    props = init(el, binding);
    const vnode = createVNode(menuContextComp, props);
    render(vnode, el);
  },
  beforeUpdate(el: HTMLElement, binding: DirectiveBinding) {
    props = init(el, binding);
    const vnode = createVNode(menuContextComp, props);
    render(vnode, el);
  },
  unmounted() {},
};
