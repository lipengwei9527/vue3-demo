import { App } from "vue";
// 注册全局组件
export function setGlobalComponents(app: App<Element>) {
  const comps: Record<string, object> = import.meta.glob("./**/**/index.vue", {
    import: "default",
    eager: true,
  });
  Object.keys(comps).map((key) => {
    const paths = key.split("/");
    const compName = paths[paths.length - 2];
    console.log("key", key);
    app.component(compName, comps[key]);
  });
}
