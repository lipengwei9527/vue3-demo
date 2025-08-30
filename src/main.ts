import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "@/style/index.scss";
import "@/axios";
// 注册全局组件
// 已使用unplugin-vue-components插件全局注册组件
import { setGlobalComponents } from "@/components";
// 注册全局指令
import { setGlobalDirectives } from "@/directives";
import store from "@/store";
const app = createApp(App);
setGlobalComponents(app);
setGlobalDirectives(app);
app.use(router);
app.use(i18n);
app.use(store);
app.mount("#app");
