import { App } from "vue";
// 注册全局组件
export function setGlobalComponents(app: App<Element>) {
  // 默认只注册src/components文件夹下第二层级中的所有组件组件，第一层级和更深层级的组件不在注册
  const comps: Record<string, object> = import.meta.glob("./**/**/*.vue", {
    import: "default",
    eager: true,
  });
  Object.keys(comps).map((key) => {
    const paths = key.split("/");
    // 判断组件是否在components文件夹中，是就不注册该组件
    const has = paths.find((item) => item === "components");
    if (has) return;

    // console.log("compPath", paths);
    let compName = "";
    let len = paths.length;
    // 如果是index.vue文件，则取倒数第二个文件夹名为组件名，否则直接取文件名作为组件名
    if (paths[len - 1] === "index.vue") {
      compName = paths[len - 2];
    } else {
      compName = paths[len - 1].split(".")[0];
    }
    // console.log("compName", compName);
    app.component(compName, comps[key]);
  });
}
