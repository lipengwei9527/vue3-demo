import { Ref } from "vue";
type Ids = String | Number;
// 两个相应式的数据交换数据
// export const changeRefData = <T>(ref: Ref, data: T, ids: Ids) => {
// //   if (typeof ids == "string" || typeof ids == "number") ids = [ids];
//     if (Array.isArray(ids)) {
//       // for (let id of ids) {
//       //     ref.value[id] = data;
//       // }
//       ref.value[ids as string] = data;
//     } else {
//       ref.value[ids as string] = data;
//     }
//   return ref;
// };
