/**
 * @description 获取浏览器视口的宽度高度
 */
import { ref } from "vue";
// 不包括浏览器滚动条
// 视口的宽度
const vw = ref(document.documentElement.clientWidth);
// 视口的高度
const vh = ref(document.documentElement.clientHeight);
window.addEventListener("resize", () => {
  vw.value = document.documentElement.clientWidth;
  vh.value = document.documentElement.clientHeight;
});
/**
 * @description 获取视口的宽度高度
 * @returns { vw, vh}
 * vw-视口的宽度
 * vh-视口的高度
 */
export default function () {
  return {
    vw,
    vh,
  };
}
