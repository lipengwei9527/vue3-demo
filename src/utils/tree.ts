/**
 * @example 平铺数组转为树数组
 * @param {Array} data 要转换的数据
 * @param {String} pidKey 父节点pid的key
 * @param {String} idKey 唯一标识：根据该key判断哪些数据添加到该条数据的children中
 * @param {String} rootId 根节点id
 * @param {Number} level 是否添加层级，level>=0，添加层级,顶层level数为输入的level，子级level数逐级加一
 * @returns {Array}
 */
export function flatTransTree(
  data: any[],
  rootId: number | string = 0,
  pidKey: string = "pid",
  idKey: string = "id",
  level: number = -1
) {
  let arr: any[] = [];
  data.forEach((item: any) => {
    if (item[pidKey] == rootId) {
      if (level >= 0 && !item.level) {
        item.level = level++;
      }
      arr.push(item);
      let tempArr = data.filter((item) => item[pidKey] !== rootId);
      let children = flatTransTree(tempArr, item[idKey], pidKey, idKey, level);

      if (children.length !== 0) {
        item.children = children;
      }
    }
  });
  return arr;
}
/**
 * 树数组转为平铺数组
 * @param {Array} data 树结构数组
 * @returns {Array}
 */
export function treeTransFlat(data: any[]) {
  let res: any[] = [];
  data.forEach((item) => {
    let { children, ...obj } = item;
    res.push(obj);

    if (children && children.length != 0) {
      let arr = treeTransFlat(children);
      res.push(...arr);
    }
  });
  return res;
}
