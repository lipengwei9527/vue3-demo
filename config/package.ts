import pack from "../package.json";
// 生产中用到的包名,key为原始报名，value为去除@和/并且转换为驼峰命名法
const packList: { key: string; value: string }[] = [];
Object.keys(pack.dependencies).forEach((item) => {
  if (packList.find((item2) => item2.key == item)) return;
  const key = item;
  let value = item.replace(/@/g, "");
  value = value.replace(/\//g, "-");
  value = value
    .split("-")
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .join("");
  packList.push({ key, value });
});
export default packList;
