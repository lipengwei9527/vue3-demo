import { nanoid } from "nanoid";
export function createNameThroughPath(path: string): string {
  let chunkName = "";
  if (path.includes("node_modules")) {
    chunkName =
      path.toString().split("node_modules/")[2].split("/")[0].toString() +
      `vendor-${chunkName}`;
    return `vendor-${chunkName}`;
  }
  // if (chunkName.includes("src/views")) {
  //   // 提取页面目录名作为 chunk 名
  //   console.log(`output->目录名`, chunkName);
  //   // const match = chunkName.match(/src[\/\\]views[\/\\]([^\/\\]+)/);
  //   // if (match) {
  //   //   return `views-${match[1]}`;
  //   // }
  //   return `views-${nanoid(6)}`;
  // }
  return chunkName;
}
