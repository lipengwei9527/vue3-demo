import { DirectiveBinding } from "vue";

export default {
  mounted(el: HTMLElement, bind: DirectiveBinding) {
    el;
    bind;
    // console.log(`output->el,bind`, el, bind);
  },
};
