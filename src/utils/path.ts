// import { getBetween } from "./validate";
export function createNameThroughPath(path: string): string {
  let chunkName = "";
  // 依赖包分包
  if (path.includes("node_modules")) {
    chunkName =
      path.toString().split("node_modules/")[2].split("/")[0].toString() +
      `${chunkName}`;
    return `vendor-${chunkName}`;
  }
  // src下views页面分包
  // if (path.includes("src/views/")) {
  //   chunkName = path.split("/")[6];
  //   if (chunkName.includes("index")) {
  //     chunkName = path.split("/")[5];
  //   }
  //   return `views-${chunkName}`;
  // }
  // src下除views之外的目录分包
  // if (path.includes("src/")) {
  //   return getBetween(path, "src/", "/");
  // }
  return chunkName;
}
