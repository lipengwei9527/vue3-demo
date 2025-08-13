import { App } from "vue";
export function setGlobalDirectives(app: App<Element>) {
  const modules: Record<string, object> = import.meta.glob("./*/index.ts", {
    import: "default",
    eager: true,
  });
  Object.keys(modules).map((key) => {
    const dirKey = key.split("/")[1];
    app.directive(dirKey, modules[key]);
  });
}
