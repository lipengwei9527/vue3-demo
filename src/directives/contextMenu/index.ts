import { createApp, App, DirectiveBinding } from "vue";
import menuContextComp from "./index.vue";
let app: App<Element> | null = null;

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    app = createApp(menuContextComp, { el, list: binding.value });
    app.mount(el);
  },
  unmounted() {
    if (app) app.unmount();
  },
};
